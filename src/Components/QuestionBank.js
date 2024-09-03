import React, { useContext, useEffect, useState } from "react";

import "../Styles/QuestionBank.css";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import QBblock from "./QBblock";
import axios from "axios";
import DropDown from "./DropDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DropDown2 from "./Dropdown2";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function QuestionBank() {
  const { state, setLoading } = useContext(GlobalStateContext);
  const [selection, setSelection] = useState(null);
  const [all, setAll] = useState(true);
  const [published, setPublished] = useState(false);
  const [previous, setPrevious] = useState(false);

  const [cat, setcat] = useState("Category");
  const [catid, setcatid] = useState(null);
  const [filter, setFilter] = useState("all");

  const [unPublished, setunPublished] = useState(false);
  const [QidtoDelte, setQidtoDelte] = useState(false);

  const [QIds, setQids] = useState([]);
  const [searchtxt, setSearchtext] = useState("");
  const [searchtxt2, setSearchtext2] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [popover, setPopover] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(false);
    Qid();
  }, [filter, catid, toggle, all]);
  const Qid = async () => {
    try {
      const Qids = await axios.get(
        `${apiBaseUrl}/api/questions/active/${filter}/${catid}/${searchtxt2}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQids(Qids.data);
      // /${searchtxt}
    } catch (error) {
      console.log(error);
    }
  };
  const deleteQuestion = (i) => {
    setPopover(true);
    setQidtoDelte(i);

    // try {
    //   const response = await axios.delete(`${apiBaseUrl}/api/delete/${i}`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // });
    //   if (response.status === 204) {
    //     console.log("Question deleted successfully");
    //     // Optionally, update your UI here to reflect the deletion
    //     setQids(QIds.filter(QIds => QIds !== i));
    // }
    // }
    // catch (error){
    //   console.log(error);
    // }
  };
  const deleteQuestion2 = async () => {
    setPopover(false);
    try {
      const response = await axios.delete(
        `${apiBaseUrl}/api/delete/${QidtoDelte}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        console.log("Question deleted successfully");
        // Optionally, update your UI here to reflect the deletion
        setQids(QIds.filter((QIds) => QIds !== QidtoDelte));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryChange = (i) => {
    if (i.categoryId == -1) {
      setcatid(null);
    } else {
      setcatid(i.categoryId);
    }
    setcat(i.name);

    setSearchtext2(null);
    setSearchtext("");
  };
  const handleAll = () => {
    setAll(true);
    setPublished(false);
    setunPublished(false);
    setSearchtext2(null);
    setSearchtext("");
    setPrevious(false);

    setFilter("all");
  };
  const handlePublished = () => {
    setAll(false);
    setPublished(true);
    setunPublished(false);
    setFilter("Published");
    setSearchtext2(null);
    setPrevious(false);

    setSearchtext("");
  };
  const handleunPrevious = () => {
    setAll(false);
    setPublished(false);
    setunPublished(false);
    setPrevious(true);
    setFilter("previous");
    setSearchtext2(null);
    setSearchtext("");
  };
  const handleunPublished = () => {
    setAll(false);
    setPublished(false);
    setunPublished(true);
    setFilter("unPublished");
    setSearchtext2(null);
    setSearchtext("");
    setPrevious(false);
  };
  const handleip = (e) => {
    setSearchtext(e.target.value);
    if (e.target.value == "") {
      setSearchtext2(null);
      Qid();
      setAll(true);
    } else {
      setSearchtext2(e.target.value);
      Qid();
      search();
    }
  };
  const search = (e) => {
    if (searchtxt != "") {
      // console.log("sss")
      setAll(false);
      setPublished(false);
      setunPublished(false);
      setPrevious(false);

      setFilter("all");
      setcat("Category");
      setcatid(null);
      setToggle(!toggle);
    }
  };
  const dltsearch = () => {
    if (searchtxt != "") {
      setSearchtext2(null);
      // Qid();
      setSearchtext("");
      setAll(true);
    }
  };

  return (
    <div className="QuestionBank">
      <div className="topQB">
        <div className="QBbtns">
          <button className={all ? "allopt" : "opt"} onClick={handleAll}>
            All
          </button>
          <button
            className={published ? "publishedopt" : "opt"}
            onClick={handlePublished}
          >
            Published
          </button>
          <button
            className={unPublished ? "unPublishedopt" : "opt"}
            onClick={handleunPublished}
          >
            UnPublished
          </button>
          <button
            className={previous ? "previousopt" : "opt"}
            onClick={handleunPrevious}
          >
            Previous
          </button>
        </div>

        <div className="QBsearch">
          <div className="QBCat">
            {/* <p>Category</p> */}
            {/* <DropDown heading={cat}
              options={['All','Fun', 'Tech','Maths']}
              onChange={handleCategoryChange}/> */}
            <DropDown2 heading={cat} onChange={handleCategoryChange} />
          </div>
          <div className="catinner">
            <input
              type="text"
              className="searchip"
              value={searchtxt}
              onChange={handleip}
              placeholder="Enter something..."
            />
            <button className="searchbtn" onClick={dltsearch}>
              {searchtxt != "" ? <CloseIcon className="SearchIcon"/> : <SearchIcon className="SearchIcon"/>}
            </button>
          </div>
        </div>
      </div>
      <div className="bottom">
        {popover && (
          <div className="DeletePopOver">
            <HighlightOffIcon
              sx={{
                fontSize: 68, // Adjust the size
                color: "#ff7d7de0", // Change the color
              }}
            />
            <h3>Are you sure?</h3>
            <p className="DeletePopOver-p">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </p>
            <div className="DeletePopOver-Btns">
              <button
                className="DeletePopOver-Btns-cancel DeletePopOver-Btn"
                onClick={() => {
                  setPopover(false);
                }}
              >
                Cancel
              </button>
              <button
                className="DeletePopOver-Btns-delete DeletePopOver-Btn"
                onClick={deleteQuestion2}
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {/* {(
      Options.map(option => (
        <div key={option.AnswerOptionId}>)))} */}
        {/* {(QIds !=  null) && console.log(QIds)} */}
        {QIds != null &&
          QIds.map((i) => (
            <QBblock
              key={i}
              id={i}
              onchange={deleteQuestion}
              previous={previous}
            />
          ))}
      </div>
    </div>
  );
}

export default QuestionBank;
