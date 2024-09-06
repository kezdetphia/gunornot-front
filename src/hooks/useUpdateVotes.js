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
