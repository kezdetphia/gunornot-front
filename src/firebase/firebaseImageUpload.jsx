import React, { useEffect, useState } from "react";
import { imageDb } from "./firebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() {
  const [img, setImg] = useState("");
  const [imgUrls, setImgUrls] = useState([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState(""); // State to store the URL of the uploaded image

  const handleUpload = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrls((data) => [...data, url]);
          setUploadedImgUrl(url); // Store the URL of the uploaded image
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "files/")).then((imgs) => {
      console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrls((data) => [...data, url]);
        });
      });
    });
  }, []);

  console.log("image urls", imgUrls);
  console.log("uploaded image url", uploadedImgUrl);

  return (
    <div>
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {/* <div>
        {imgUrls.map((url) => (
          <img src={url} alt="uploaded" key={url} />
        ))}
      </div> */}
    </div>
  );
}

export default FirebaseImageUpload;
