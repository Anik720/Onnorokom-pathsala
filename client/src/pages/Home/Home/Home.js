import React, { useEffect, useState } from "react";
import Videos from "../Videos/Videos";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/v1/share")
      .then((res) => res.json())
      .then((data) => {
       
        //console.log(data.share);
        setVideos(data.share)
      });
  });

  return <div>
    <Videos videos={videos}></Videos>
  </div>;
};

export default Home;
