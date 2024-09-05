import React, { useContext, useEffect } from "react";
import image from "../Assets/404error.png";
import { GlobalStateContext } from "../Context/GlobalStateContext";
function NotFoundComponent() {
  const { setLoading } = useContext(GlobalStateContext);
  useEffect(() => {
    setLoading(false);
  });
  return (
    <div className="errMain">
      <img
        className="eroor"
        src={image}
        alt="error loading
        "
      />
    </div>
  );
}

export default NotFoundComponent;
