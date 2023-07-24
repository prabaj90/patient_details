"use client";

import { useEffect, useState } from "react";
import axios from "axios";

//Creating Custom Hook for API calls
const useApi = (url:any) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchApi = () => {
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data };
};

export default useApi;
