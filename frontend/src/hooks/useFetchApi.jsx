import { useState, useEffect } from "react";
import axiosBooks from "../helpers/api/axiosBooks.js";

const useFetchApi = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axiosBooks.get(url);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, setData, loading, setLoading };
};

export default useFetchApi;
