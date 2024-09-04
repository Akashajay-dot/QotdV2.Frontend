import React, { useContext, useEffect, useState } from "react";
import "../Styles/QBblock.css";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import axios from "axios";
import circle from "../Assets/circle.png";
import tick from "../Assets/tick.png";
import edit from "../Assets/edit.png";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment";
import CancelIcon from "@mui/icons-material/Cancel";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function QBblock({ id, onchange, previous }) {
  const { state, setLoading, setQId, setDates } =
    useContext(GlobalStateContext);
  const navigate = useNavigate();
  const [Question, setQuestion] = useState("");
  const [QuestionDate, setQuestionDate] = useState(null);
  const [created, setCreated] = useState("");
  const [value, setValue] = React.useState(null);
  const [IsApproved, setIsApproved] = useState("");
  const [isActive, setIsactive] = useState();
  const [toggle, setToggle] = useState(false);
  const [isToday, setIsToday] = useState();
  const minDate = dayjs();
  // .add(1, 'day')
  // const [dates, setDates] = useState([]);
  const today = dayjs();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  const approve = () => {
    setQId(id);

    navigate("/approveQuestions");
  };
  useEffect(() => {
    fetchDates();
  }, []);
  const fetchDates = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/questions/dates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      setDates(response.data.map((date) => dayjs(date).format("YYYY-MM-DD")));
    } catch (error) {
      console.error("Error fetching question dates:", error);
    }
  };
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/FetchQuestion/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        if (response.status === 200) {
          //console.log(response.data.question);
          setQuestion(response.data.question.question);
          setIsactive(response.data.question.isActive);
          setIsApproved(response.data.question.isApproved);
          setCreated(response.data.question.createdBy);
          if (response.data.question.questionDate != null) {
            const dateTimeString = response.data.question.questionDate;

            const dateOnly = moment(dateTimeString).format("YYYY-MM-DD");
            setQuestionDate(dateOnly);
            const date = response.data.question.questionDate;
            // console.log(dayjs(date));

            setIsToday(dayjs(date).isSame(today, "day"));
            if (dayjs(date).isBefore(today, "day")) {
              setIsToday(true);
            }
            // setIsToday( (dayjs(date).isBefore(today, 'day')));

            //  console.log( ""+(dayjs(date).isSame(minDate, 'day')));
          }
          // setValue(QuestionDate);
        } else {
          console.log("No question available for today.");
        }
      } catch (error) {
        console.log("An error occurred while fetching the question.");
        console.error("Error fetching daily question:", error);
      }
    };

    fetchQuestion();
    // setIsToday( (dayjs(QuestionDate).isSame(today, 'day')));
  }, [id]);
  useEffect(() => {
    if (previous) {
      setIsToday(true);
    }
  }, [previous]);
  // const deleteQuestion=async ()=>{
  //   try {
  //     const response = await axios.delete(`http://localhost:57101/api/delete/${id}`);
  //     if (response.status === 204) {
  //       console.log("Question deleted successfully");
  //       // Optionally, update your UI here to reflect the deletion

  //   }
  //   }
  //   catch (error){
  //     console.log(error);
  //   }
  // }
  const changeDate = async () => {
    try {
      // Send PUT request to the backend API
      
      const formattedDate = dayjs(value).format("YYYY-MM-DD");
      const dateToSend = value ? formattedDate : null;

      const response = await axios.put(
        `${apiBaseUrl}/api/questions/update`,
        {
          QuestionId: id,
          Date: dateToSend,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Log the updated question
      console.log("Updated Question:", response.data);
    } catch (error) {
      // Handle error
      console.error("Error updating question date:", error);
    }
    fetchDates();
  };
  useEffect(() => {
    if (value != null) {
      changeDate();
    }
  }, [value]);

  const dateChange = (newValue) => {
    const localDate = dayjs(newValue).local();
    setValue(localDate.format());
    // setValue((newValue.toISOString()));
    setQuestionDate(localDate.format());
    setIsApproved(true);
    // if(value==(newValue.toISOString())){
    // changeDate();
    // }
    // console.log();
    setToggle(false);
  };
  const dltDate = () => {
    // e.stopPropagation();
    // console.log("haiii");
    setQuestionDate(null);
    setValue(null);
    setIsApproved(false);
    setToggle(true);
    changeDate();
    fetchDates();
  };

  useEffect(() => {
    if (toggle == true) {
      changeDate();
    }
  }, [toggle]);
  return (
    <div>
      <div className="QBblock">
        <button className="QBblock1" onClick={approve} disabled={isToday}>
          <div className="QBleft">
            {IsApproved ? (
              <img src={tick} className="approveIndicator" />
            ) : (
              <img src={circle} className="approveIndicator" />
            )}
            <div className="QbQuestion">
              <p className="QuestionQB">{Question}</p>
              <p className="QBdate">Created By:{created}</p>
            </div>
          </div>
        </button>

        <div className="QBright">
          {/* {(QuestionDate != null || value != null) && isActive && !isToday && (
            <button className="cancelBtn" onClick={dltDate}>
              {" "}
              <CancelIcon className="cancelicon" />
            </button>
          )} */}

            <button className="cancelBtn" onClick={dltDate}  disabled={!(QuestionDate != null || value != null) || isToday}>
              {" "}
              <CancelIcon className="cancelicon"  />
            </button>

          {/* {  isActive &&( */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={QuestionDate != null ? dayjs(QuestionDate) : value}
                onChange={(newValue) => {
                  const dateOnly = newValue.startOf('day');
                  dateChange(dateOnly);
                }}
                minDate={minDate}
                readOnly={isToday}
                sx={{
                  "& .MuiStack-root": {
                    paddingTop: "0px", // Remove top padding
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent", // Disable the border color
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent", // Disable border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent", // Disable border color when focused
                    },
                    "&.Mui-error fieldset": {
                      borderColor: "transparent", // Remove the red border on error
                    },
                    width: "75%",
                  },
                  "& .MuiInputBase-input": {
                    color: "white", // Change text color to white
                    // Adjust right padding
                  },
                  "& .MuiIconButton-root": {
                    marginRight: "0", // Remove margin around the icon button
                  },
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: "white", // Change the calendar icon color
                  },
                  "& .MuiPickersDay-day": {
                    color: "white", // Change color of the days
                  },
                  "& .MuiInputBase-root": {
                    backgroundColor: "transparent", // Ensure background is transparent if needed
                  },
                  "& .css-sx5hge": {
                    paddingTop: "0px", // Remove top padding
                  },
                  "& .css-10o2lyd-MuiStack-root": {
                    paddingTop: "0px", // Remove the padding-top
                  },
                }}
                shouldDisableDate={(date) =>
                  state.dates.includes(dayjs(date).format("YYYY-MM-DD"))
                }
                InputProps={{
                  readOnly: true, // Prevent typing in the DatePicker
                }}
              />
              {/* defaultValue={dayjs(QuestionDate)} */}
              {/* (newValue) => setValue(newValue) */}
            </DemoContainer>
          </LocalizationProvider>
          {/* )} */}
          {/* {!isActive && <p className='dateInactive'>{QuestionDate}</p>} */}

          <button
            type="button"
            className="bin-button"
            onClick={() => onchange(id)}
            disabled={isToday}
          >
            <svg
              className="bin-top"
              viewBox="0 0 39 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4"></line>
              <line
                x1="12"
                y1="1.5"
                x2="26.0357"
                y2="1.5"
                stroke="white"
                strokeWidth="3"
              ></line>
            </svg>
            <svg
              className="bin-bottom"
              viewBox="0 0 33 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_8_19" fill="white">
                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
              </mask>
              <path
                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                fill="white"
                mask="url(#path-1-inside-1_8_19)"
              ></path>
              <path d="M12 6L12 29" stroke="white" strokeWidth="4"></path>
              <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QBblock;
