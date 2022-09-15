import React, { useState } from "react";
import Video from "../Video/Video";

const Videos = ({ videos }) => {


  //const [videos, setVideos] = useState([]);
  //const [likes, setLikes] = useState([]);
  //console.log(video.like);
  // useEffect(() => {
  //   fetch("http://localhost:7000/api/v1/share")
  //     .then((res) => res.json())
  //     .then((data) => {
       
  //       console.log(data.share);
  //       setVideos(data.share)
  //     });
  // }, []);

  //console.log(videos)
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-5 container">
      {videos.map((video) => (
        <Video likes={video.likes} video={video}></Video>
      ))}
    </div>
  );
};

export default Videos;
