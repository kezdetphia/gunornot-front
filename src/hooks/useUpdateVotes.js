import { useState } from "react";
import api from "../services/authApiRequest";

// Custom hook for updating votes on a product
const useUpdateVotes = (productId) => {
  // State for storing the current rating and total votes
  const [rating, setRating] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  // Function to update votes
  const updateVotes = async (newVote) => {
    try {
      // Send POST request to update votes
      const response = await api.post(`/product/updatevotes`, {
        id: productId,
        vote: newVote,
      });

      // Extract average rating from response
      const { averageRating } = response.data;

      // Update local state
      setRating(averageRating);
      setTotalVotes(totalVotes);

      // Return updated product data
      return response.data.product;
    } catch (err) {
      // Log error if update fails
      console.error("Failed to update votes", err);
    }
  };

  // Return rating and updateVotes function
  return { rating, updateVotes };
};

export default useUpdateVotes;
