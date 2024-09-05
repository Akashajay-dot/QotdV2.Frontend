import React, { forwardRef, useContext, useEffect, useState } from "react";
import "../Styles/LeaderBoard.css";
import axios from "axios";
import { GlobalStateContext } from "../Context/GlobalStateContext";

const UserList = forwardRef(({ id, index }, ref) => {
  const [name, setname] = useState("");
  const [points, setPoints] = useState("");
  const [badge, setBadge] = useState("");
  const [isUser, setIsuser] = useState(false);
  const { state } = useContext(GlobalStateContext);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      const fetchUserdetails = async () => {
        const response = await axios.get(`${apiBaseUrl}/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setname(response.data.user.name);
        setPoints(response.data.user.points);
        setBadge(response.data.reputationName);

      };
      fetchUserdetails();
      if (id == state.id) {
        setIsuser(true);
      }
    } catch {
      console.log("error");
    }
  }, []);

  return (
    <div
      className={isUser ? "active-class  UserList" : "UserList"}
      id={id}
      ref={ref}
    >
      <div className="userListleft ">
        <p className="userRank">{index + 1}</p>
        <p>{name}</p>
      </div>
      <div className="rankTittle">
        <p className="userBadge">{badge}</p>
      </div>
      <h5>{points}</h5>
    </div>
  );
});

export default UserList;
