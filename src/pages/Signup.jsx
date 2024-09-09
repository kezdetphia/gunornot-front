import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  useIonAlert,
  useIonLoading,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // Hooks for displaying alerts and loading indicators
  const [alert] = useIonAlert();
  const [present, dismiss] = useIonLoading();

  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
    username: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (formData.username.length < 4) {
      alert({
        header: "Error",
        message: "Username must be at least 4 characters long",
        buttons: [{ text: "OK" }],
      });
      return;
    }

    if (formData.password.length < 6) {
      alert({
        header: "Error",
        message: "Password must be at least 6 characters long",
        buttons: [{ text: "OK" }],
      });
      return;
    }

    if (formData.password !== formData.passwordRepeat) {
      alert({
        header: "Error",
        message: "Passwords do not match",
        buttons: [{ text: "OK" }],
      });
      return;
    }

    // Show loading indicator
    await present({ message: "Loading..." });

    try {
      // Send sign-up request to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/signup`,
        {
          formData,
        }
      );

      console.log("response data", response.data);
      if (response.status === 200) {
        // Hide loading indicator
        dismiss();
        // Show success alert
        alert({
          header: "Success",
          message: "You have successfully signed up",
          buttons: [{ text: "OK" }],
        });
        // Navigate to sign-in page
        navigate("/signin");
      } else {
        // Hide loading indicator
        dismiss();
        // Show error alert
        alert({
          header: "Error",
          message: response.data.msg || "An error occurred. Please try again.",
          buttons: [{ text: "OK" }],
        });
      }
    } catch (error) {
      console.log("error", error);
      // Hide loading indicator
      dismiss();
      // Show error alert
      alert({
        header: "Error",
        message:
          error.response?.data?.msg || "Invalid credentials. Please try again.",
        buttons: [{ text: "OK" }],
      });
    }
  };

  // Render sign-up form
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              {/* Username input field */}
              <IonItem>
                <IonLabel position="stacked">Username</IonLabel>
                <IonInput
                  type="text"
                  value={formData.username}
                  onIonChange={(e) =>
                    setFormData({ ...formData, username: e.detail.value })
                  }
                  required
                />
              </IonItem>
              {/* Email input field */}
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={formData.email}
                  onIonChange={(e) =>
                    setFormData({ ...formData, email: e.detail.value })
                  }
                  required
                />
              </IonItem>

              {/* Password input field */}
              <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={formData.password}
                  onIonChange={(e) =>
                    setFormData({ ...formData, password: e.detail.value })
                  }
                  required
                />
              </IonItem>
              {/* Password repeat input field */}
              <IonItem>
                <IonLabel position="stacked">Repeat Password</IonLabel>
                <IonInput
                  type="password"
                  value={formData.passwordRepeat}
                  onIonChange={(e) =>
                    setFormData({ ...formData, passwordRepeat: e.detail.value })
                  }
                  required
                />
              </IonItem>

              {/* Submit button */}
              <IonButton
                className="ion-margin-top"
                expand="full"
                type="submit"
                color="secondary"
              >
                SIGN UP
              </IonButton>
            </form>
            {/* Link to sign-in page */}
            <div className="ion-text-center ion-margin-top">
              <p>Have an account already?</p>
              <IonButton expand="block" fill="clear" routerLink="/signin">
                Sign In
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
