import React, { useContext, useEffect, useState } from "react";
import "../Styles/DropDown.css";
import { GlobalStateContext } from "../Context/GlobalStateContext";

function DropDown2({ heading, onChange }) {
  const { state } = useContext(GlobalStateContext);
  const [categories, setCategories] = useState({
    categoryId: -1,
    name: "All",
  });
  const [updatedCategory, setupdatedCategory] = useState([]);

  useEffect(() => {
    const updated = [...state.categories, categories];
    setupdatedCategory(updated);
  }, []);

  const handleOptionClick = (category) => {
    onChange(category);
  };

  return (
    <div className="menu">
      <div className="item">
        <div className="drop">
          <a href="#" className="link">
            <span>{heading}</span>
            <svg viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
              <g id="SVGRepo_iconCarrier">
                <path
                  id="XMLID_225_"
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 
                    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 
                    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                ></path>
              </g>
            </svg>
          </a>
        </div>

        <div className="submenu">
          {updatedCategory.map((category) => (
            <div key={category.categoryId} className="submenu-item">
              <div
                className="submenu-link"
                onClick={() => handleOptionClick(category)}
              >
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DropDown2;
