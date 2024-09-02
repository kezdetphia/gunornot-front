import React, { useEffect, useRef, useState } from "react";
import { imageDb } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  IonButton,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonLabel,
  IonTextarea,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonLoading, // Import IonLoading
} from "@ionic/react";
import axios from "axios";
import heic2any from "heic2any";

function AddProduct({ user, setUserInfo, setProductsUpdated }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [allImagesUploaded, setAllImagesUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Create ref for file input

  // Function to check form validity
  const validateForm = () => {
    const isFormValid =
      selectedImages.length > 0 &&
      formData.name.trim().length > 0 &&
      formData.description.trim().length > 0;
    setIsSubmitDisabled(!isFormValid);
  };

  // Enable submit button when conditions are met
  useEffect(() => {
    validateForm();
  }, [selectedImages, formData]);

  useEffect(() => {
    if (selectedImages.length > 0 && !allImagesUploaded) {
      handleUpload();
    }
  }, [selectedImages]);

  const handleUpload = () => {
    setIsSubmitDisabled(true);
    // setLoading(true); // Show loading indicator

    if (selectedImages.length > 0) {
      const uploadPromises = selectedImages.map((image) => {
        const imageRef = ref(imageDb, `files/${uuidv4()}`);
        return uploadBytes(imageRef, image).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        );
      });

      Promise.all(uploadPromises)
        .then((urls) => {
          const uniqueUrls = [...new Set([...uploadedImageUrls, ...urls])];
          setUploadedImageUrls(uniqueUrls);
          setAllImagesUploaded(true);
          validateForm(); // Revalidate form after upload
          setLoading(false); // Hide loading indicator after upload completes
        })
        .catch((error) => {
          console.error("Failed to upload images", error);
          setLoading(false); // Hide loading indicator on error
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      validateForm(); // Revalidate form whenever input changes
      return newFormData;
    });
  };

  const handleFileChange = async (e) => {
    setLoading(true); // Start loader as soon as file selection begins

    const files = Array.from(e.target.files);
    const convertedFiles = await Promise.all(
      files.map(async (file) => {
        if (file.type === "image/heic") {
          try {
            const convertedBlob = await heic2any({
              blob: file,
              toType: "image/jpeg",
            });
            return new File([convertedBlob], `${file.name}.jpeg`, {
              type: "image/jpeg",
            });
          } catch (error) {
            console.error("Failed to convert HEIC to JPEG", error);
            return null;
          }
        }
        return file;
      })
    );

    const validFiles = convertedFiles.filter(Boolean);
    setSelectedImages(validFiles);
    setAllImagesUploaded(false); // Reset flag until images are uploaded

    setLoading(false); // Hide loader after file processing is done
  };

  const handleSubmit = async () => {
    if (allImagesUploaded) {
      try {
        const response = await axios.post(
          "http://localhost:3001/product/addproduct",
          {
            name: formData.name,
            img: uploadedImageUrls,
            userId: user?._id,
            description: formData.description,
          }
        );

        setUserInfo((prevUser) => ({
          ...prevUser,
          products: [...prevUser.products, response.data._id],
        }));
        setProductsUpdated((prevState) => !prevState);

        setFormData({ name: "", description: "" });
        setUploadedImageUrls([]);
        setSelectedImages([]);
        setAllImagesUploaded(false); // Reset flag after successful submit

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Failed to submit data", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    }
  };

  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Post Your Product</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonInput
            name="name"
            value={formData.name}
            onIonChange={handleInputChange}
            label="Model"
            labelPlacement="floating"
            placeholder="Enter Product Name"
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            name="description"
            value={formData.description}
            onIonChange={handleInputChange}
            label="Description"
            labelPlacement="floating"
            placeholder="Describe your product"
          />
        </IonItem>
        <IonItem>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef} // Attach ref to file input
          />
        </IonItem>
      </IonList>
      <IonItem>
        <IonButton onClick={handleSubmit} disabled={isSubmitDisabled}>
          Submit
        </IonButton>
      </IonItem>
      <IonGrid>
        <IonRow>
          {uploadedImageUrls.map((url, index) => (
            <IonCol size="4" size-md="2" key={index}>
              <IonThumbnail>
                <IonImg
                  src={url}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </IonThumbnail>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <IonLoading
        isOpen={loading} // Control loading indicator visibility with state
        message={"Uploading images..."}
        spinner="crescent"
      />
    </>
  );
}

export default AddProduct;
