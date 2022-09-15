import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { ToastContainer, toast } from "react-toastify";
const Video = ({ video, likes }) => {
  const [count, setCount] = useState();
  const [users, setUsers] = useState([]);
  const [likedUsers, setlikedUsers] = useState("");
 // console.log("likes",video)

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

        // usage example:
        var a = data?.likes[1]?.user;

        let b = [];
        a.map((x) => {
          b.push(x._id);
        });
        var unique = b.filter(onlyUnique);
        console.log(unique);
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
            console.log("Success:", data.names);
            setUsers(data.names);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        //setUsers(unique)
        return (
          <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">Liked by:</h3>
                <p className="py-4">
                  You've been selected for a chance to get one year of
                  subscription to use Wikipedia for free!
                </p>
              </div>
            </div>
          </>
        );
      });
  };
  return (
    <div className="">
      <ReactPlayer url={video.link} width="400px" height="400px" />
      <p className="mr-10">posted by: {video.user[0]?.name} </p>
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

          <p> {users.length !== 0 ? <p> Liked by: {users}</p> : ""} </p>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Video;
