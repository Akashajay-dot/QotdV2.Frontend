import React, { useContext, useEffect, useState } from "react";

import "../Styles/LandingPage.css";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Popover from "./Popover";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

function LandingPage() {
  const { state, setLogedin, setisAnswered, setLoading } =
    useContext(GlobalStateContext);
  const [Question, setQuestion] = useState("");
  const [QuestionId, setQuestionId] = useState("");
  const [Options, setOptions] = useState([]);
  const [point, setPoint] = useState("");
  const [Answer, SetAnswer] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [hasMultipleAnswers, sethasMultipleAnswers] = useState(false);
  const [isCorrect, setisCorrect] = useState();
  const [justAnswered, setjustAnswered] = useState(false);
  const [popover, setPopover] = useState(false);
  const [pAns, setpAns] = useState(false);
  const [noQuestion, setnoQuestion] = useState(false);
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  let currentChar = "A";
  let i = 0;

  function incrementChar() {
    currentChar = String.fromCharCode(currentChar.charCodeAt(0) + i);
    i = 1;
    return currentChar;
  }

  useEffect(() => {
    if (justAnswered) {
      Post();
    }
  }, [isCorrect]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const userId = state.id;
        const response = await axios.get(
          `${apiBaseUrl}/api/question/get-daily-question/${userId}`,
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
          setQuestionId(response.data.question.questionId);
          const data = response.data.answerOptions;
          const answersArray = [];
          for (let i = 0; i < response.data.answerKeys.length; i++) {
            const option = response.data.answerKeys[i];
            const opt = option.answerOption.answerOptionId;
            answersArray[i] = opt;
          }
          console.log(answersArray);
          SetAnswer(answersArray);
          const optionsArray = [];
          for (let i = 0; i < data.length; i++) {
            const option = data[i];
            optionsArray.push({
              answerOptionId: option.answerOptionId,
              option: option.option,
            });
          }
          setOptions(optionsArray);
        } else {
          console.log("No question available for today.");
          setnoQuestion(true);
        }
      } catch (error) {
        console.log("An error occurred while fetching the question.");
        console.error("Error fetching daily question:", error);
        setnoQuestion(true);
      }
      setLoading(false);
    };

    fetchQuestion();
  }, []);

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

  const submit = () => {
    setpAns(true);
    setisAnswered(true);
    setjustAnswered(true);
    const resp = arraysEqual(selectedAnswers, Answer);
    setisCorrect(resp);

    setTimeout(() => {
      setPopover(true);
    }, 1000);
  };
  const Post = () => {
    const data = {
      QuestionId: QuestionId,
      UserId: state.id,
      AnswerOptionId: selectedAnswers,
      isCorrect: isCorrect,
      Points: point,
    };
    console.log(data);
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  return (
    <div className="Lmain">
      {(noQuestion || state.isAnswered) && !pAns && (
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
            <Link to="prevQuestions">
              {" "}
              <button className="prvQstnBtn">Prev Question</button>{" "}
            </Link>
          </div>
        </div>
      )}
      {(!state.isAnswered || pAns) && !noQuestion && (
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
                <div key={option.answerOptionId}>
                  <div className="option">
                    <div className="optionInner">
                      <button type="button" className="ansSelect">
                        {incrementChar()}
                      </button>
                      <h4>{option.option}</h4>
                    </div>
                    <label className="custom-checkbox-label">
                      <input
                        className="custom-checkbox"
                        type={hasMultipleAnswers ? "checkbox" : "radio"}
                        name="option"
                        value={option.answerOptionId}
                        onChange={() =>
                          handleSelectionChange(option.answerOptionId)
                        }
                        disabled={state.isAnswered}
                      />
                      <span className="custom-checkbox-custom"></span>
                    </label>
                  </div>
                </div>
              ))}
            {justAnswered &&
              Options.map((option) => (
                <div key={option.answerOptionId}>
                  <div
                    className={
                      Answer.includes(option.answerOptionId)
                        ? "option sucess"
                        : "option wrong"
                    }
                  >
                    <h4>{option.option}</h4>
                  </div>
                </div>
              ))}

            <div className="footer">
              <button
                className="submitbtn"
                onClick={submit}
                disabled={selectedAnswers[0] == null}
              >
                Submit
              </button>
            </div>
          </div>
          <ToastContainer />
          {popover && (
            <Popover popover={popover} iscorrect={isCorrect} point={point} />
          )}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
