import React, { useCallback, useEffect, useRef, useState } from "react";
import { imageDb } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import "./addProduct.css";

import {
  IonButton,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonTextarea,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
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
  const fileInputRef = useRef(null);

  const validateForm = useCallback(() => {
    const isFormValid =
      selectedImages.length > 0 &&
      formData.name.trim().length > 0 &&
      formData.description.trim().length > 0;
    setIsSubmitDisabled(!isFormValid);
  }, [selectedImages.length, formData.name, formData.description]);

  useEffect(() => {
    validateForm();
  }, [selectedImages.length, formData, validateForm]);

  const handleUpload = useCallback(() => {
    setIsSubmitDisabled(true);
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
          validateForm();
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to upload images", error);
          setLoading(false);
        });
    }
  }, [selectedImages, uploadedImageUrls, validateForm]);

  useEffect(() => {
    if (selectedImages.length > 0 && !allImagesUploaded) {
      handleUpload();
    }
  }, [selectedImages, allImagesUploaded, handleUpload]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      validateForm();
      return newFormData;
    });
  };

  const handleFileChange = async (e) => {
    setLoading(true);
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
    setAllImagesUploaded(false);
    setLoading(false);
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
        setAllImagesUploaded(false);

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
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Post Your Product</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList className="ion-padding-top">
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
                ref={fileInputRef}
              />
            </IonItem>
          </IonList>

          <IonGrid className="ion-padding-top">
            <IonRow>
              {uploadedImageUrls.map((url, index) => (
                <IonCol size="4" size-md="2" key={index}>
                  <IonImg src={url} className="uploaded-image" />
                </IonCol>
              ))}
            </IonRow>
            <IonRow>
              <IonCol size="12" className="submit-button-container">
                <IonButton
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  expand="block"
                  className="submit-button"
                >
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
      <IonLoading
        isOpen={loading}
        message={"Uploading images..."}
        spinner="crescent"
      />
    </>
  );
}

export default AddProduct;
