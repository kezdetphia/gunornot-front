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
import api from "../../services/authApiRequest";

//TODO: Handle deleting images from firebase when user deletes the product

function AddProduct({ user, setUserInfo, setProductsUpdated }) {
  const {
    selectedImages,
    uploadedImageUrls,
    loading,
    error,
    handleFileChange,
    allImagesUploaded,
    setUploadedImageUrls,
    setSelectedImages,
    setAllImagesUploaded,
  } = useImageUpload();

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const fileInputRef = useRef(null);

  // Function to validate form data
  const validateForm = useCallback(() => {
    const isFormValid =
      selectedImages.length > 0 &&
      formData.name.trim().length > 0 &&
      formData.description.trim().length > 0;
    setIsSubmitDisabled(!isFormValid);
  }, [selectedImages.length, formData.name, formData.description]);

  // Effect to validate form when relevant data changes
  useEffect(() => {
    validateForm();
  }, [selectedImages.length, formData, validateForm]);

  // Handler for input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      validateForm(); // Revalidate form whenever input changes
      return newFormData;
    });
  };

  // Handler for form submission
  const handleSubmit = async () => {
    if (allImagesUploaded) {
      try {
        // Send POST request to add new product
        const response = await api.post("/product/addproduct", {
          name: formData.name,
          img: uploadedImageUrls,
          userId: user?._id,
          description: formData.description,
        });

        // Update user info with new product
        setUserInfo((prevUser) => ({
          ...prevUser,
          products: [...prevUser.products, response.data._id],
        }));
        // Trigger products update in parent component
        setProductsUpdated((prevState) => !prevState);

        // Reset form and related states
        setFormData({ name: "", description: "" });
        setUploadedImageUrls([]);
        setSelectedImages([]);
        setAllImagesUploaded(false);

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
            {/* Product name input */}
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
            {/* Product description input */}
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
            {/* File input for image upload */}
            <IonItem>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </IonItem>
            {/* Error message display */}
            {error && (
              <IonItem>
                <IonLabel color="danger">{error}</IonLabel>
              </IonItem>
            )}
          </IonList>

          <IonGrid className="ion-padding-top">
            {/* Display uploaded images */}
            <IonRow>
              {uploadedImageUrls.map((url, index) => (
                <IonCol size="4" size-md="2" key={index}>
                  <IonImg src={url} className="uploaded-image" />
                </IonCol>
              ))}
            </IonRow>
            {/* Submit button */}
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
      {/* Loading indicator for image upload */}
      <IonLoading
        isOpen={loading}
        message={"Uploading images..."}
        spinner="crescent"
      />
    </>
  );
}

export default AddProduct;
