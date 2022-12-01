import React from "react";
import { useGlobalContext } from "../context/useGlobalContext";
import Photo from "./Photo";
import { TbServerOff } from "react-icons/tb";
function PhotoContainer() {
  const { isLoading, data, error } = useGlobalContext();
  if (error.state) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center dark:text-sky-100 text-sky-800">
        <h1 className="text-5xl text-center">NAiS😷</h1>
        <h2 className="text-2xl text-center flex items-center gap-2">
          {error.msg}
          <TbServerOff className=" text-red-500" />
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-4 px-3">
        {data.map((item, index) => {
          return <Photo item={item} key={index} />;
        })}
      </div>
      {isLoading && (
        <h2 className=" dark:text-sky-100 text-sky-800 text-3xl min-w-full text-center">
          Loading...
        </h2>
      )}
    </>
  );
}

export default PhotoContainer;
