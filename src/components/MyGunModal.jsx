import React, { useState, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonTextarea,
} from "@ionic/react";

function MyGunModal({ product, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const confirm = () => {
    onSave(formData);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Edit Product</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={confirm}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            name="name"
            value={formData.name}
            onIonChange={handleInputChange}
            label="Enter your name"
            labelPlacement="stacked"
            type="text"
            placeholder="Your name"
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            name="description"
            value={formData.description}
            onIonChange={handleInputChange}
            label="Enter description"
            labelPlacement="stacked"
            placeholder="Description"
          />
        </IonItem>
      </IonContent>
    </IonModal>
  );
}

export default MyGunModal;
