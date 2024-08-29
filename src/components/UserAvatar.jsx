import React from "react";
import { IonAvatar } from "@ionic/react";

const UserAvatar = ({ user }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <IonAvatar
      style={{
        margin: "0 auto",
        backgroundColor: "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
        color: "#fff",
      }}
    >
      {getInitials(user?.username)}
    </IonAvatar>
  );
};

export default UserAvatar;
