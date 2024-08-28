import { useState } from "react";
import axios from "axios";

const useUpdateVotes = (initialLikes, initialDislikes, id) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  const updateVotes = async (type) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/product/updateVotes",
        { id, type }
      );
      if (response.status === 200) {
        if (type === "like") {
          setLikes(likes + 1);
        } else if (type === "dislike") {
          setDislikes(dislikes + 1);
        }
      }
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  return { likes, dislikes, updateVotes };
};

export default useUpdateVotes;
