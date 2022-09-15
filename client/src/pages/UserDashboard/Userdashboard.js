import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Userdashboard = () => {
  const [share, setShare] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/v1/share/getAllShareByLoggedinUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.share);
        setShare(data.share);
      });
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Serial</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {share.map((x, index) => (
              <tr>
                <th></th>
                <td>{index + 1}</td>
                <td>
                  <a href={x.link} className="text-green-500">
                    Video link
                  </a>{" "}
                  {x.link}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center mt-10">
          <Link to="/share">
            <button className="btn btn-success">Share videos</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
