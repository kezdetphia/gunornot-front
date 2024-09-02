import React, { useEffect, useState } from "react";
import { imageDb } from "../firebase/firebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
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
} from "@ionic/react";
import axios from "axios";
import heic2any from "heic2any";

function AddProduct({ user, setUserInfo, setProductsUpdated }) {
  const [selectedImages, setSelectedImages] = useState([]); // State to store selected images
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // State to store uploaded image URLs
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isUploadDisabled, setIsUploadDisabled] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [allImagesUploaded, setAllImagesUploaded] = useState(false); // Track if all images are uploaded

  // Handle image upload to Firebase Storage
  const handleUpload = () => {
    setIsSubmitDisabled(true); // Disable submit button during upload

    if (selectedImages.length > 0) {
      const uploadPromises = selectedImages.map((image) => {
        const imageRef = ref(imageDb, `files/${uuidv4()}`);
        return uploadBytes(imageRef, image).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        );
      });

      // Update state with unique image URLs after upload
      Promise.all(uploadPromises).then((urls) => {
        const uniqueUrls = [...new Set([...uploadedImageUrls, ...urls])];
        setUploadedImageUrls(uniqueUrls);
        setAllImagesUploaded(true); // Mark all images as uploaded
        setIsSubmitDisabled(false); // Enable submit button after all images are uploaded
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = async (e) => {
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
            return null; // Skip this file if conversion fails
          }
        }
        return file; // Return the original file if it's not HEIC
      })
    );

    const validFiles = convertedFiles.filter(Boolean); // Filter out any null values
    setSelectedImages(validFiles);
    setIsUploadDisabled(validFiles.length === 0);
    setAllImagesUploaded(false); // Reset the upload status
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (allImagesUploaded) {
      try {
        const response = await axios.post(
          "http://localhost:3001/product/addproduct",
          {
            name: formData.name,
            img: uploadedImageUrls, // Send array of image URLs
            userId: user?._id,
            description: formData.description,
          }
        );

        // Update user info and trigger product update
        setUserInfo((prevUser) => ({
          ...prevUser,
          products: [...prevUser.products, response.data._id],
        }));
        setProductsUpdated((prevState) => !prevState);

        // Clear form and reset state
        setFormData({ name: "", description: "" });
        setUploadedImageUrls([]);
        setSelectedImages([]);
        setIsSubmitDisabled(true);
        setIsUploadDisabled(true);
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
          <input type="file" multiple onChange={handleFileChange} />
        </IonItem>
        <IonButton disabled={isUploadDisabled} onClick={handleUpload}>
          Upload
        </IonButton>
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
    </>
  );
}

export default AddProduct;
