import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { ToastContainer, toast } from "react-toastify";
const Video = ({ video, likes }) => {
  const [count, setCount] = useState();
  const [users, setUsers] = useState([]);
  const [likedUsers, setlikedUsers] = useState("");
  // console.log("likes", video.user.name);

  useEffect(() => {
    if (JSON.stringify(video._id) === JSON.stringify(likes[0]?.video[0])) {
      setCount(likes[0]?.count);
    } else {
      return;
    }
  }, [likes]);

  // useEffect(()=>{

  // },[])

  const handleLike = async (e) => {
    e.preventDefault();
    const like = parseInt(count);

    //console.log(count);

    await fetch(`http://localhost:7000/api/v1/like?video._id=${video._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        count: like,
        video: video._id,
        user: video.user[0]?._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
        //toast("Liked ");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    await fetch(`http://localhost:7000/api/v1/like/${video._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        count: like,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success:", data);
        // toast("Liked ");
        setCount(data.data.data.count);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleShowLike = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:7000/api/v1/like/getVideosAllLike?videoid=${video._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        //console.log("data",data)
        // usage example:
        var a = data?.likes[0]?.user;

        let b = [];
        a.map((x) => {
          b.push(x._id);
        });
        //  console.log(a);
        var unique = b.filter(onlyUnique);
        // console.log(unique);
        fetch(`http://localhost:7000/api/users/getLikedUsers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            unique,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log("Success:", data.names);
            setUsers(data.names);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        //setUsers(unique)
      });
  };

  const handleVideoViewCount = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <div className="">
    
        <ReactPlayer url={video.link} width="400px" height="400px" onClick={handleVideoViewCount} />
    
      <p className="mr-10 text-black">posted by: {video.user.name} </p>
      <div className="flex ">
        <button className="mr-10" onClick={handleLike}>
          Like
        </button>

        <p className="mt-3 mr-4">
          {count !== 0 ? <p>Total likes: {count}</p> : ""}
        </p>

        <div>
          <label
            htmlFor="my-modal-3"
            className="btn modal-button"
            onClick={handleShowLike}
          >
            Show Detail
          </label>

         
        </div>

      </div>
      <p> {users.length !== 0 ? <p> Liked by: {users}</p> : ""} </p>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Video;
