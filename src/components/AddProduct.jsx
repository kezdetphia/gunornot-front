import React, { useEffect, useState } from "react";
import { imageDb } from "../firebase/firebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
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

//TODO: Need to delete the images from firebase if the product is deleted
//TODO: Need to add a loading spinner
//TODO: Need to add a toast message for success and error
//TODO: Need to use state to realod component after submission instead of       window.location.reload();

function AddProduct({ user }) {
  const [imgs, setImgs] = useState([]); // State to store multiple images
  const [imgUrls, setImgUrls] = useState([]);
  const [uploadedImgUrls, setUploadedImgUrls] = useState([]); // State to store the URLs of the uploaded images
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isUploadDisabled, setIsUploadDisabled] = useState(true);
  console.log("sisbutmiiiiii", isSubmitDisabled);

  const handleUpload = () => {
    setIsSubmitDisabled(false);
    if (imgs.length > 0) {
      console.log("issubmiut", isSubmitDisabled);
      const uploadPromises = imgs.map((img) => {
        const imgRef = ref(imageDb, `files/${v4()}`);
        return uploadBytes(imgRef, img).then((value) => {
          return getDownloadURL(value.ref);
        });
      });

      Promise.all(uploadPromises).then((urls) => {
        setImgUrls((data) => [...new Set([...data, ...urls])]); // Ensure unique URLs
        setUploadedImgUrls((data) => [...new Set([...data, ...urls])]); // Store the URLs of the uploaded images
      });
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imgs = await listAll(ref(imageDb, "files/"));
      const urls = await Promise.all(
        imgs.items.map((val) => getDownloadURL(val))
      );
      setImgUrls([...new Set(urls)]); // Ensure unique URLs
    };

    fetchImages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImgs(Array.from(e.target.files));
    setIsUploadDisabled(false);
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    console.log("Uploaded Image URLs:", uploadedImgUrls);

    try {
      const response = await axios.post(
        "http://localhost:3001/product/addproduct",
        {
          name: formData.name,
          img: uploadedImgUrls, // Send array of image URLs
          userId: user?._id,
          description: formData.description,
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit data", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  console.log("image urls", imgUrls);
  console.log("uploaded image urls", uploadedImgUrls);

  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Post Your Gun</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonInput
            name="name"
            value={formData.name}
            onIonChange={handleInputChange}
            label="Model"
            labelPlacement="floating"
            placeholder="Enter Gun's Name"
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            name="description"
            value={formData.description}
            onIonChange={handleInputChange}
            label="Description"
            labelPlacement="floating"
            placeholder="Talk about your gun"
          />
        </IonItem>
        <IonItem>
          <input type="file" multiple onChange={handleFileChange} />
          <IonButton disabled={isUploadDisabled} onClick={handleUpload}>
            Upload
          </IonButton>
        </IonItem>
      </IonList>
      <IonItem>
        <IonButton onClick={handleSubmit} disabled={isSubmitDisabled}>
          Submit
        </IonButton>
      </IonItem>
      <IonGrid>
        <IonRow>
          {uploadedImgUrls.map((url, index) => (
            <IonCol size="4" size-md="2" key={index} className="image-col">
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

// import React, { useEffect, useState } from "react";
// import { imageDb } from "../firebase/firebaseConfig";
// import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";
// import {
//   IonButton,
//   IonImg,
//   IonInput,
//   IonItem,
//   IonList,
//   IonListHeader,
//   IonLabel,
//   IonTextarea,
//   IonThumbnail,
//   IonGrid,
//   IonRow,
//   IonCol,
// } from "@ionic/react";
// import axios from "axios";

// function AddProduct({ user, setMyProducts }) {
//   const [imgs, setImgs] = useState([]); // State to store multiple images
//   const [imgUrls, setImgUrls] = useState([]);
//   const [uploadedImgUrls, setUploadedImgUrls] = useState([]); // State to store the URLs of the uploaded images
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });

//   const handleUpload = () => {
//     if (imgs.length > 0) {
//       const uploadPromises = imgs.map((img) => {
//         const imgRef = ref(imageDb, `files/${v4()}`);
//         return uploadBytes(imgRef, img).then((value) => {
//           return getDownloadURL(value.ref);
//         });
//       });

//       Promise.all(uploadPromises).then((urls) => {
//         setImgUrls((data) => [...new Set([...data, ...urls])]); // Ensure unique URLs
//         setUploadedImgUrls((data) => [...new Set([...data, ...urls])]); // Store the URLs of the uploaded images
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchImages = async () => {
//       const imgs = await listAll(ref(imageDb, "files/"));
//       const urls = await Promise.all(
//         imgs.items.map((val) => getDownloadURL(val))
//       );
//       setImgUrls([...new Set(urls)]); // Ensure unique URLs
//     };

//     fetchImages();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setImgs(Array.from(e.target.files));
//   };

//   const handleSubmit = async () => {
//     console.log("Form Data:", formData);
//     console.log("Uploaded Image URLs:", uploadedImgUrls);

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/product/addproduct",
//         {
//           name: formData.name,
//           img: uploadedImgUrls, // Send array of image URLs
//           userId: user?._id,
//           description: formData.description,
//         }
//       );
//       console.log(response);

//       // Add the new product to the list of products
//       setMyProducts((prevProducts) => [...prevProducts, response.data]);

//       // Clear the form and uploaded images
//       setFormData({ name: "", description: "" });
//       setImgs([]);
//       setImgUrls([]);
//       setUploadedImgUrls([]);
//     } catch (error) {
//       console.error("Failed to submit data", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//       }
//     }
//   };

//   console.log("image urls", imgUrls);
//   console.log("uploaded image urls", uploadedImgUrls);

//   return (
//     <>
//       <IonList>
//         <IonListHeader>
//           <IonLabel>Post Your Gun</IonLabel>
//         </IonListHeader>
//         <IonItem>
//           <IonInput
//             name="name"
//             value={formData.name}
//             onIonChange={handleInputChange}
//             label="Model"
//             labelPlacement="floating"
//             placeholder="Enter Gun's Name"
//           />
//         </IonItem>
//         <IonItem>
//           <IonTextarea
//             name="description"
//             value={formData.description}
//             onIonChange={handleInputChange}
//             label="Description"
//             labelPlacement="floating"
//             placeholder="Talk about your gun"
//           />
//         </IonItem>
//         <IonItem>
//           <input type="file" multiple onChange={handleFileChange} />
//           <IonButton onClick={handleUpload}>Upload</IonButton>
//         </IonItem>
//       </IonList>
//       <IonItem>
//         <IonButton onClick={handleSubmit}>Submit</IonButton>
//       </IonItem>
//       <IonGrid>
//         <IonRow>
//           {imgUrls.map((url, index) => (
//             <IonCol size="4" size-md="2" key={index} className="image-col">
//               <IonThumbnail>
//                 <IonImg
//                   src={url}
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     borderRadius: "10px",
//                   }}
//                 />
//               </IonThumbnail>
//             </IonCol>
//           ))}
//         </IonRow>
//       </IonGrid>
//     </>
//   );
// }

// export default AddProduct;
