import { useState, useCallback, useEffect } from "react";
import { imageDb } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import heic2any from "heic2any";

const useImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allImagesUploaded, setAllImagesUploaded] = useState(false);

  const handleFileChange = async (e) => {
    setLoading(true); // Start loader as soon as file selection begins

    const files = Array.from(e.target.files);
    const totalFiles = selectedImages.length + files.length;

    if (totalFiles > 5) {
      setError("You can only upload a maximum of 5 images.");
      setLoading(false);
      return;
    }

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
    setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
    setAllImagesUploaded(false); // Reset flag until images are uploaded

    setLoading(false); // Hide loader after file processing is done
  };

  const handleUpload = useCallback(() => {
    setLoading(true); // Show loading indicator

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
          setLoading(false); // Hide loading indicator after upload completes
        })
        .catch((error) => {
          console.error("Failed to upload images", error);
          setLoading(false); // Hide loading indicator on error
        });
    }
  }, [selectedImages, uploadedImageUrls]);

  useEffect(() => {
    if (selectedImages.length > 0 && !allImagesUploaded) {
      handleUpload();
    }
  }, [selectedImages, allImagesUploaded, handleUpload]);

  return {
    selectedImages,
    uploadedImageUrls,
    loading,
    error,
    handleFileChange,
    allImagesUploaded,
    setUploadedImageUrls, // Return the state setter
    setSelectedImages, // Return the state setter
    setAllImagesUploaded, // Return the state setter
  };
};

export default useImageUpload;
