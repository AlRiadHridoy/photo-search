import { createClient } from "pexels";
import React, { createContext, useContext, useEffect, useState } from "react";
import { tempData } from "../components/data";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState(tempData.photos);
  const [query, setQuery] = useState("computer");

  const [isFetching, setisFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const client = createClient(
    "563492ad6f91700001000001abee5164c2bf403ca70dc32d634c176e"
  );

  const fetchImage = async () => {
    console.log("working");
    setIsLoading(true);
    setisFetching(false);
    client.photos
      .search({ query, per_page: 20, page: page })
      .then((data) => {
        setPhotos([...photos, ...data.photos]);
        console.log(data.photos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error, "nice");
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  useEffect(() => {
    if (isFetching) {
      setPage((oldVal) => oldVal + 1);
    }
  }, [isFetching]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !isFetching &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setisFetching(true);
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, [isFetching]);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        tempData,
        photos,
        error,
        page,
        query,
        setPage,
        setQuery,
        setError,
        setPhotos,
        fetchImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
