import { useEffect, useState } from "react";

const localCache = {};

const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoading = () => {
    setState({
      data: null,
      loading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {
    if (localCache[url]) {
      setState({
        data: localCache[url],
        loading: false,
        hasError: false,
        error: null,
      });

      return;
    }

    setLoading();

    try {
      const res = await fetch(url);
      const data = await res.json();

      setState({
        data: data,
        loading: false,
        hasError: false,
        error: null,
      });

      localCache[url] = state.data;

      // Manejo del cache
    } catch (error) {
      setState({
        data: null,
        loading: false,
        hasError: true,
        error: error,
      });
    }
  };

  return {
    ...state,
  };
};

export default useFetch;
