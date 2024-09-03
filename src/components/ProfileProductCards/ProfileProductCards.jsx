import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";

function ProfileProductCards({ myProducts }) {
  console.log("myProducts", myProducts);
  return (
    <IonGrid className="ion-no-padding">
      <IonRow>
        {myProducts?.map((product) => (
          <IonCol size="6" key={product?._id}>
            <IonCard>
              <img alt="Silhouette of mountains" src={product?.img} />
              <IonCardHeader>
                <IonCardTitle></IonCardTitle>
                <IonCardSubtitle>{product?.name}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <p>Rating: {product.rating?.$numberDecimal}</p>
                  <p>Total Likes: {product?.totalLikes}</p>
                  <p>Total Dislikes: {product?.totalDislikes}</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
}

export default ProfileProductCards;
