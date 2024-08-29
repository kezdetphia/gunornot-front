// import React, { useEffect, useState } from "react";
// import { imageDb } from "../firebase/firebaseConfig";
// import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";
// import {
//   IonButton,
//   IonImg,
//   IonIonIn,
//   IonItem,
//   IonList,
//   IonListHeader,
//   IonThumbnail,
//   IonLabel,
//   IonTextarea,
//   IonInput,
// } from "@ionic/react";
// import axios from "axios";

// function FirebaseImageUpload({ user }) {
//   const [img, setImg] = useState("");
//   const [imgUrls, setImgUrls] = useState([]);
//   const [uploadedImgUrl, setUploadedImgUrl] = useState(""); // State to store the URL of the uploaded image

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });

//   // const handleUpload = (e) => {
//   //   e.preventDefault();
//   //   if (img !== null) {
//   //     const imgRef = ref(imageDb, `files/${v4()}`);
//   //     uploadBytes(imgRef, img).then((value) => {
//   //       console.log(value);
//   //       getDownloadURL(value.ref).then((url) => {
//   //         setImgUrls((data) => [...data, url]);
//   //         setUploadedImgUrl(url); // Store the URL of the uploaded image
//   //         console.log("uploaded image url in handleUpload", uploadedImgUrl);
//   //       });
//   //     });
//   //   }
//   // };
//   const handleUpload = (e) => {
//     e.preventDefault();
//     if (img !== null) {
//       const imgRef = ref(imageDb, `files/${v4()}`);
//       uploadBytes(imgRef, img).then((value) => {
//         console.log(value);
//         getDownloadURL(value.ref).then((url) => {
//           setImgUrls((data) => [...data, url]);
//           setUploadedImgUrl(url); // Store the URL of the uploaded image
//           console.log("Uploaded image URL:", url);
//         });
//       });
//     }
//   };

//   useEffect(() => {
//     listAll(ref(imageDb, "files/")).then((imgs) => {
//       console.log(imgs);
//       imgs.items.forEach((val) => {
//         getDownloadURL(val).then((url) => {
//           setImgUrls((data) => [...data, url]);
//         });
//       });
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleSubmit = async () => {
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:3001/product/addproduct",
//   //       {
//   //         name: formData.name,
//   //         img: uploadedImgUrl,
//   //         userId: user?._id,
//   //         description: formData.description,
//   //       }
//   //     );
//   //     console.log(response);
//   //   } catch (error) {
//   //     console.error("Failed to submit data", error);
//   //     if (error.response) {
//   //       console.error("Response data:", error.response.data);
//   //       console.error("Response status:", error.response.status);
//   //       console.error("Response headers:", error.response.headers);
//   //     }
//   //   }
//   // };
//   const handleSubmit = async () => {
//     if (!uploadedImgUrl) {
//       console.error("Image not uploaded yet");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/product/addproduct",
//         {
//           name: formData.name,
//           img: uploadedImgUrl,
//           userId: user?._id,
//           description: formData.description,
//         }
//       );
//       console.log(response);
//     } catch (error) {
//       console.error("Failed to submit data", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//       }
//     }
//   };
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
//             onChange={handleInputChange}
//             label="Model"
//             labelPlacement="floating"
//             placeholder="Enter Gun's Name"
//           ></IonInput>
//         </IonItem>
//         <IonItem>
//           <IonTextarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             label="Description"
//             labelPlacement="floating"
//             placeholder="Talk about your gun"
//           ></IonTextarea>
//         </IonItem>
//         <IonItem>
//           <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//           <IonButton onClick={handleUpload}>Upload</IonButton>
//         </IonItem>
//       </IonList>
//       <IonItem>
//         <IonButton onClick={handleSubmit}>Submit</IonButton>
//       </IonItem>
//       <IonList>
//         {imgUrls.map((url, index) => (
//           <IonItem key={index}>
//             <IonThumbnail slot="start">
//               <IonImg src={url} />
//             </IonThumbnail>
//             <a href={url} target="_blank" rel="noopener noreferrer">
//               {url}
//             </a>
//           </IonItem>
//         ))}
//       </IonList>
//     </>

//     // <div>
//     //   <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//     //   <IonButton onClick={handleUpload}>Upload</IonButton>
//     //   {/* <div>
//     //     {imgUrls.map((url) => (
//     //       <img src={url} alt="uploaded" key={url} />
//     //     ))}
//     //   </div> */}
//     // </div>
//   );
// }

// export default FirebaseImageUpload;

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
} from "@ionic/react";
import axios from "axios";

function FirebaseImageUpload({ user }) {
  const [img, setImg] = useState(null);
  const [imgUrls, setImgUrls] = useState([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState(""); // State to store the URL of the uploaded image
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleUpload = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrls((data) => [...new Set([...data, url])]); // Ensure unique URLs
          setUploadedImgUrl(url); // Store the URL of the uploaded image
        });
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

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    console.log("Uploaded Image URL:", uploadedImgUrl);

    try {
      const response = await axios.post(
        "http://localhost:3001/product/addproduct",
        {
          name: formData.name,
          img: uploadedImgUrl,
          userId: user?._id,
          description: formData.description,
        }
      );
      console.log(response);
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
  console.log("uploaded image url", uploadedImgUrl);

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
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          <IonButton onClick={handleUpload}>Upload</IonButton>
        </IonItem>
      </IonList>
      <IonItem>
        <IonButton onClick={handleSubmit}>Submit</IonButton>
      </IonItem>
      <IonList>
        {imgUrls.map((url, index) => (
          <IonItem key={index}>
            <IonThumbnail slot="start">
              <IonImg src={url} />
            </IonThumbnail>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </IonItem>
        ))}
      </IonList>
    </>
  );
}

export default FirebaseImageUpload;
