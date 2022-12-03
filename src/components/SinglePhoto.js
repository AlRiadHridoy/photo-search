import React, { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";

function SinglePhoto() {
  const {id} = useParams()
  const [photo, setPhoto] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  let url = `https://pixabay.com/api/?key=31720365-4b62856b99eadabab89ac329d&id=${id}`;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhoto(...data.hits);
    setIsLoading(false);
    } catch (error) {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const {
    webformatURL: img,
    user,
    type,
    userImageURL: userImg,
    likes,
    comments,
    views,
    downloads,
    tags,
    largeImageURL,
  } = photo;


  //Download images

  const downloadImg = () => {
    fetch(largeImageURL)
      .then((response) => response.blob())
      .then((blob) => {
      console.log(blob)
      let blobUrl = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.download = `troxTele-${user}.${blob.type.replace("image/", "")}`;
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      a.remove();
      });
  };




  if (isLoading) {
        return <h2 className=" dark:text-sky-100 text-sky-800 text-3xl min-w-full text-center">
          Loading...
        </h2>
  }

  return (
    <div className="container z-100 flex flex-col justify-center items-center text-slate-700 dark:text-slate-900">
      <div className="img_content flex flex-col md:flex-row gap-2 rounded-lg bg-slate-400/50 backdrop-blur-xl p-4">
        <div className="img">
          <img
            className="rounded-md max-h-[20rem] max-w-[35rem] w-full"
            src={img}
            alt={type}
          />
        </div>

        <div className="info p-5 font-medium text-xl">
          <div className="user_img mb-3">
            <img
              className=" w-14 rounded-xl md:w-20 mb-2"
              src={userImg}
              alt={type}
            />
            <span>Name: {user}</span>
          </div>
          <div className="content flex flex-col text-lg">
            <span>
              Likes: <span className="font-semibold"> {likes}</span>
            </span>
            <span>
              Comments: <span className="font-semibold"> {comments}</span>
            </span>
            <span>
              Views: <span className="font-semibold"> {views}</span>
            </span>
            <span>
              Downloads: <span className="font-semibold"> {downloads}</span>
            </span>
            <span>
              Tags: <span className="font-semibold"> {tags}</span>
            </span>
          </div>

          <div className="download mt-8">
            <button onClick={downloadImg}
              className=" bg-pink-700 px-4 py-2 rounded-md text-slate-100">
              Download
            </button>
          </div>
        </div>
      </div>

      <button className="back_btn font-semibold text-slate-100 mt-5 px-4 py-2 rounded-md bg-teal-500 dark:bg-teal-500">
        <Link to="/">Back Home</Link>
      </button>
    </div>
  );
}

//pixabay.com/photos/desk-laptop-notebook-pen-workspace-593327/

export default SinglePhoto;
