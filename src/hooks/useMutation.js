import { useEffect } from "react";
import { useState } from "react";

const useMutation = (promise) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const excute = async (...payload) => {
    try {
      setLoading(true);
      const res = await promise(...payload);
      setData(res.data?.data || []);
    } catch (error) {
      console.log("erros: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    excute,
    data,
    loading,
    error,
  };
};

export default useMutation;
