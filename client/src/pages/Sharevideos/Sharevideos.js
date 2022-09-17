import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPlayer from "react-player/youtube";
const Sharevideos = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const video = e.target.video.value;
    setValue(video);

    const data = {
      link: video,
    };
    fetch("http://localhost:7000/api/v1/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast("Item Added");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center">
        <input
          type="text"
          name="video"
          placeholder="paste youtube video url here"
          className="input input-bordered w-full max-w-xs"
        />
        <input type="submit" className="btn btn-success" />
      </form>

      <ReactPlayer url={value} />

      <ToastContainer />
    </div>
  );
};

export default Sharevideos;
