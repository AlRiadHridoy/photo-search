import React, { createContext, useContext, useEffect, useState } from "react";
import { tempData } from "../components/data";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [temp, setTemp] = useState(false);

  const [isFetching, setisFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ state: false, msg: '' });


  const [singleImg, setSingleImg] = useState({})
  
  // change nav round style
  const [navRound, setnavRound] = useState("rounded-xl");
  //darkMode
  const [theme, setTheme] = useState("dark")

  const api_key = "31720365-4b62856b99eadabab89ac329d";
  const url = `https://pixabay.com/api/?key=${api_key}&image_type=all&page=${page}&per_page=10&q=${
    query.replace(" ", "+") || "hacker"
  }&image_type=photo&min_height=400&min_width=400`;

  const fetchImage = async () => {
    setIsLoading(true);
    setisFetching(false);

    try {
      const response = await fetch(url);
      const fetchData = await response.json();
      if (fetchData.total === 0) {
        setError({ state: true, msg: "দুঃখিত কোন তথ্য পাওয়া যায়নি" });
      }
      if (temp) {
        setData(fetchData.hits);
      } else {
        setData([...data, ...fetchData.hits]);
      }

      setIsLoading(false);
      setTemp(false);
    } catch (error) {
      setIsLoading(false);
      setError({ state: true, msg: "একটু পরে আবার চেষ্টা করুন" });
    }
  };

  useEffect(() => {
    if (temp) {
      setData([])
      fetchImage()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTemp(true);
    setPage(1)
    setError(false);
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
      if(window.scrollY > 46) {
        setnavRound("rounded-br-xl rounded-bl-xl");
      } else {
        setnavRound("rounded-xl");
      }
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
        navRound,
        error,
        data,
        page,
        query,
        theme,
        singleImg,
        setPage,
        setData,
        setTemp,
        setQuery,
        setError,
        fetchImage,
        handleSubmit,
        setTheme,
        setSingleImg,
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
