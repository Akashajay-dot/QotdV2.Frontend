import React, { useContext, useEffect, useState } from "react";

import "../Styles/LandingPage.css";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import Popover from "./Popover";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

function PreviousQuestion() {
  const {
    state,
    setLogedin,
    setisAnswered,
    setLoading,
    setToggle,
    setprevQid,
  } = useContext(GlobalStateContext);
  const [unanswered, setunanswered] = useState("");
  const [QuestionId, setQuestionId] = useState();

  const [Question, setQuestion] = useState("");
  const [point, setPoint] = useState("");
  const [hasMultipleAnswers, sethasMultipleAnswers] = useState(false);
  const [Answer, SetAnswer] = useState([]);
  const [Options, setOptions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isCorrect, setisCorrect] = useState();
  const [justAnswered, setjustAnswered] = useState(false);
  const [popover, setPopover] = useState(false);
  const [noQuestion, setNoquestion] = useState(false);
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  const handleSelectionChange = (answerId) => {
    if (hasMultipleAnswers) {
      setSelectedAnswers((prevSelected) =>
        prevSelected.includes(answerId)
          ? prevSelected.filter((id) => id !== answerId)
          : [...prevSelected, answerId]
      );
    } else {
      setSelectedAnswers([answerId]);
    }
  };

  useEffect(() => {
    setLoading(false);
    if (state.prevQid == "") {
      navigate("/prevQuestions");
    }
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/FetchQuestion/${state.prevQid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setQuestion(response.data.question.question);
          setPoint(response.data.question.point);
          sethasMultipleAnswers(response.data.question.hasMultipleAnswers);
          const data = response.data.answerOptions;
          const answersArray = [];
          for (let i = 0; i < response.data.answerKeys.length; i++) {
            const option = response.data.answerKeys[i];
            const opt = option.answerOption.answerOptionId;
            answersArray[i] = opt;
          }
          SetAnswer(answersArray);
          const optionsArray = [];
          for (let i = 0; i < data.length; i++) {
            const option = data[i];
            optionsArray.push({
              AnswerOptionId: option.answerOptionId,
              Option: option.option,
            });
          }
          setOptions(optionsArray);
        } else {
          console.log("No question available for today.");
        }
      } catch (error) {
        console.log("An error occurred while fetching the question.");
        console.error("Error fetching daily question:", error);
      }
    };

    fetchQuestion();
  }, [QuestionId]);

  function arraysEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    for (let i = 0; i < sortedA.length; i++) {
      if (sortedA[i] !== sortedB[i]) {
        return false;
      }
    }
    return true;
  }

  const submit = () => {
    // setisAnswered(true);
    setjustAnswered(true);

    const resp = arraysEqual(selectedAnswers, Answer);
    setisCorrect(resp);
    setTimeout(() => {
      setPopover(true);
    }, 1000);
  };

  useEffect(() => {
    if (justAnswered) {
      Post();
    }
  }, [isCorrect]);

  const Post = () => {
    const data = {
      QuestionId: state.prevQid,
      UserId: state.id,
      AnswerOptionId: selectedAnswers,
      isCorrect: isCorrect,
      Points: point,
    };
    fetch(`${apiBaseUrl}/api/PostResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setprevQid("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="Lmain">
      {noQuestion && (
        <div className="noQuestion">
          <h2>
            Quiz done! More brain jazz tomorrow! 🚀🎉
            <br />
            Ready to create a question? 🌟✏️
          </h2>
          <div className="popBtns">
            <Link to={"/postQuestions"}>
              {" "}
              <button className="addQstnBtn">Add Questions</button>
            </Link>
          </div>
        </div>
      )}
      {!noQuestion && (
        <div className="landingPage">
          <div className="questionsct">
            <div className="question">
              <h2
                className="qestioninner"
                dangerouslySetInnerHTML={{ __html: Question }}
              ></h2>
            </div>
            {!justAnswered &&
              Options.map((option) => (
                <div key={option.AnswerOptionId}>
                  <div className="option">
                    <h4>{option.Option}</h4>
                    <label className="custom-checkbox-label">
                      <input
                        className="custom-checkbox"
                        type={hasMultipleAnswers ? "checkbox" : "radio"}
                        name="option"
                        value={option.AnswerOptionId}
                        onChange={() =>
                          handleSelectionChange(option.AnswerOptionId)
                        }
                        disabled={justAnswered}
                      />
                      <span className="custom-checkbox-custom"></span>
                    </label>
                  </div>
                </div>
              ))}
            {justAnswered &&
              Options.map((option) => (
                <div key={option.AnswerOptionId}>
                  <div
                    className={
                      Answer.includes(option.AnswerOptionId)
                        ? "option sucess"
                        : "option wrong"
                    }
                  >
                    <h4>{option.Option}</h4>
                  </div>
                </div>
              ))}

            <div className="footer">
              <Link className="preview" to={"/prevQuestions"}>
                Cancel
              </Link>
              <button
                className="submitbtn"
                onClick={submit}
                disabled={selectedAnswers[0] == null}
              >
                Submit
              </button>
            </div>
          </div>
          {popover && (
            <Popover popover={popover} iscorrect={isCorrect} point={point} />
          )}
        </div>
      )}
    </div>
  );
}

export default PreviousQuestion;
