import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import useImageUpload from "../../hooks/useImageUpload";
import api from "../../services/authApiRequest"; // Import the api utility

function AddProduct({ user, setUserInfo, setProductsUpdated }) {
  const {
    selectedImages,
    uploadedImageUrls,
    loading,
    error,
    handleFileChange,
    allImagesUploaded,
    setUploadedImageUrls, // Destructure the state setter
    setSelectedImages, // Destructure the state setter
    setAllImagesUploaded, // Destructure the state setter
  } = useImageUpload();

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const fileInputRef = useRef(null); // Create ref for file input

  // Function to check form validity
  const validateForm = useCallback(() => {
    const isFormValid =
      selectedImages.length > 0 &&
      formData.name.trim().length > 0 &&
      formData.description.trim().length > 0;
    setIsSubmitDisabled(!isFormValid);
  }, [selectedImages.length, formData.name, formData.description]);

  // Enable submit button when conditions are met
  useEffect(() => {
    validateForm();
  }, [selectedImages.length, formData, validateForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      validateForm(); // Revalidate form whenever input changes
      return newFormData;
    });
  };

  const handleSubmit = async () => {
    if (allImagesUploaded) {
      try {
        const response = await api.post("/product/addproduct", {
          name: formData.name,
          img: uploadedImageUrls,
          userId: user?._id,
          description: formData.description,
        });

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
                maxLength={12}
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
            {error && (
              <IonItem>
                <IonLabel color="danger">{error}</IonLabel>
              </IonItem>
            )}
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
