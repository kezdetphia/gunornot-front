import { useState } from "react";
import axios from "axios";

const useUpdateVotes = (initialLikes, initialDislikes) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  const updateVotes = async (type, id) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/product/updatevotes",
        { id, type }
      );

      if (response.status === 200) {
        if (type === "like") {
          setLikes((prevLikes) => prevLikes + 1);
        } else if (type === "dislike") {
          setDislikes((prevDislikes) => prevDislikes + 1);
        }
      }
    } catch (error) {
      console.error(
        "Error updating votes:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { likes, dislikes, updateVotes };
};

export default useUpdateVotes;
