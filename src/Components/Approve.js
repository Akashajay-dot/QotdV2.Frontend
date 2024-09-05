import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import "../Styles/PostQuestions.css";
import DropDown from "./DropDown";
import DropDown1 from "./Dropdown1";
import AnswerOptions from "./AnswerOptions";
import axios from "axios";
import "../Styles/PostQuestions.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Approve() {
  const textareaRef = useRef(null);
  const [postQuestion, setPostQuestion] = useState("");
  const [answers, setAnswers] = useState([{ text: "", isCorrect: false }]);
  const [category, setCategory] = useState("Multiple Choice");
  const [selectedCategory, setSelectedCategory] = useState("Multiple Choice");
  const [selectedType, setSelectedType] = useState("Select Type");
  const [selectedTypeId, setSelectedTypeId] = useState();
  const [hasMultipleAns, sethasMultipleAns] = useState();
  const [postable, setPostable] = useState(false);
  const [pop, setPop] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState("Add Points");
  const { state, setLoading, setQId } = useContext(GlobalStateContext);
  const [response1, setresponse] = useState();
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (state.QId == "") {
      navigate("/questions");
    }
    setLoading(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [postQuestion]);

  useEffect(() => {
    if (category === "Multiple Choice") {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        while (newAnswers.length < 1)
          newAnswers.push({ text: "", isCorrect: false });
        return newAnswers.slice(0, 4);
      });
    } else if (category === "True/False") {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        while (newAnswers.length < 1)
          newAnswers.push({ text: "", isCorrect: false });
        return newAnswers.slice(0, 2);
      });
    }
  }, [category]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/FetchQuestion/${state.QId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setresponse(response.data);
        }
      } catch (error) {}
    };
    fetch();
  }, []);

  useEffect(() => {
    if (response1 != null) {
      assign();
    }
  }, [response1]);

  const assign = () => {
    setPostQuestion(response1.question.question);
    setSelectedPoints(response1.question.point);
    setSelectedTypeId(response1.question.categoryId);
    setSelectedType(response1.category[0].name);
    const data = response1.answerOptions;
    const answersArray = [
      {
        text: "",
        isCorrect: false,
      },
    ];
    for (let i = 0; i < response1.answerOptions.length; i++) {
      const option = response1.answerOptions[i].option;
      const id = response1.answerOptions[i].answerOptionId;
      answersArray[i].text = option;

      for (let j = 0; j < response1.answerKeys.length; j++) {
        if (id == response1.answerKeys[j].answerOptionId) {
          answersArray[i].isCorrect = true;
        }
      }
      if (i < response1.answerOptions.length - 1)
        answersArray.push({ text: "", isCorrect: false });
    }
    setAnswers(answersArray);
    if (
      answersArray.length === 2 && 
      answersArray.filter((answer) => answer.isCorrect).length === 1 
    ) {
      setSelectedCategory("True/False");
    }
  };

  const handleQuestion = (e) => {
    setPostQuestion(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  const handleAnswerChange = (index, text, isCorrect) => {
    const newAnswers = [...answers];
    newAnswers[index] = { text, isCorrect };
    setAnswers(newAnswers);
  };

  const handleDeleteAnswer = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
  };

  const addAnswerOption = () => {
    if (category === "Multiple Choice" && answers.length < 4) {
      setAnswers([...answers, { text: "", isCorrect: false }]);
    } else if (category === "True/False" && answers.length < 2) {
      setAnswers([...answers, { text: "", isCorrect: false }]);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setSelectedCategory(selectedCategory);
  };

  const handleTypeChange = (selectedType) => {
    setSelectedType(selectedType.name);
    setSelectedTypeId(selectedType.categoryId);
  };

  const handlePointsChange = (selectedPoints) => {
    setSelectedPoints(selectedPoints);
  };

  const post = async (e) => {
    e.preventDefault();
    if (!postQuestion.trim()) {
      toast.error("Please enter a question.");
      return;
    }
    if (answers.some((answer) => !answer.text.trim())) {
      toast.error("Please enter valid answers.");
      return;
    }
    if (category === "Select Category") {
      toast.error("Please select a category.");
      return;
    }
    if (selectedType === "Select Type") {
      toast.error("Please select a type.");
      return;
    }
    if (selectedPoints === "Add Points") {
      toast.error("Please select the points.");
      return;
    }
    if (category === "Multiple Choice") {
      if (answers.length < 2) {
        toast.error(
          "Please provide at least 2 answers for multiple-choice questions."
        );
        return;
      }
      if (!answers.some((answer) => answer.isCorrect)) {
        toast.error("Please mark at least one answer as correct.");
        return;
      }
    } else if (category === "True/False") {
      if (answers.length !== 2) {
        toast.error(
          "Please provide exactly 2 answers for true/false questions."
        );
        return;
      }
    }

    const correctAnswersCount = answers.filter(
      (answer) => answer.isCorrect
    ).length;

    if (correctAnswersCount > 1) {
      sethasMultipleAns(true);
    } else {
      sethasMultipleAns(false);
    }

    const data = {
      Question: postQuestion,
      Answers: answers.map((ans) => ({
        Text: ans.text,
        IsCorrect: ans.isCorrect,
      })),
      CategoryId: selectedTypeId,
      AuthorId: state.id,
      Point: parseInt(selectedPoints),
      HasMultipleAnswers: hasMultipleAns,
      UpdatedBy: state.UserName,
      IsApproved: false,
      LastUpdatedOn: new Date(),
      LastUpdatedBy: state.UserName,
    };
    await axios.put(`${apiBaseUrl}/api/EditQuestion/${state.QId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate("/questions");
  };

  return (
    <div className="Lmain">
      <div className="postQuestions">
        <div className="approveBody postmain">
          <form className="postForm" onSubmit={post}>
            <textarea
              name="question"
              id="question"
              ref={textareaRef}
              rows="1"
              value={postQuestion}
              onChange={handleQuestion}
              placeholder="Your question here . . . . "
              onKeyDown={handleKeyDown}
            />
            <div className="top">
              <DropDown
                heading={selectedCategory}
                options={["Multiple Choice", "True/False"]}
                onChange={handleCategoryChange}
              />
              <DropDown1 heading={selectedType} onChange={handleTypeChange} />
              <DropDown
                heading={selectedPoints}
                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                onChange={handlePointsChange}
              />
            </div>
            {answers.map((answer, index) => (
              <AnswerOptions
                key={index}
                index={index}
                answer={answer.text}
                isCorrect={answer.isCorrect}
                onChange={(text, isCorrect) =>
                  handleAnswerChange(index, text, isCorrect)
                }
                onDelete={handleDeleteAnswer}
              />
            ))}
            {((category === "Multiple Choice" && answers.length < 4) ||
              (category === "True/False" && answers.length < 2)) && (
              <button
                type="button"
                className="addChoice"
                onClick={addAnswerOption}
              >
                Add Choice
              </button>
            )}
            <div className="buttons">
              <Link className="preview" to={"/questions"}>
                Cancel
              </Link>
              <button className="submit" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Approve;
