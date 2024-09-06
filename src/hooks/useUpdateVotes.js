// import { useState } from "react";
// import api from "../services/authApiRequest"; // Import the api utility

// const useUpdateVotes = (initialLikes, initialDislikes) => {
//   const [likes, setLikes] = useState(initialLikes);
//   const [dislikes, setDislikes] = useState(initialDislikes);

//   const updateVotes = async (type, id) => {
//     try {
//       const response = await api.post("/product/updatevotes", { id, type });

//       if (response.status === 200) {
//         const updatedProduct = response.data;
//         setLikes(updatedProduct.totalLikes);
//         setDislikes(updatedProduct.totalDislikes);
//         return updatedProduct;
//       }
//     } catch (error) {
//       console.error(
//         "Error updating votes:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   return { likes, dislikes, updateVotes };
// };

// export default useUpdateVotes;

import { useState } from "react";
import api from "../services/authApiRequest";

const useUpdateVotes = (productId) => {
  const [rating, setRating] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  const updateVotes = async (newVote) => {
    try {
      const response = await api.post(`/product/updatevotes`, {
        id: productId,
        vote: newVote,
      });
      const { averageRating } = response.data;
      setRating(averageRating);
      setTotalVotes(totalVotes);
      return response.data.product;
    } catch (err) {
      console.error("Failed to update votes", err);
    }
  };

  return { rating, updateVotes };
};

export default useUpdateVotes;
