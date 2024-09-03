import React, { useContext, useEffect, useRef, useState } from "react";
import "../Styles/PostQuestions.css";
import DropDown from "./DropDown";
import AnswerOptions from "./AnswerOptions";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { toast, ToastContainer } from "react-toastify";
import DropDown1 from "./Dropdown1";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Popover2 from "./Popover2";

function PostQuestions() {
  const [postQuestion, setPostQuestion] = useState("");
  const [postSnapShot, setPostSnapShot] = useState("");
  const [answers, setAnswers] = useState([{ text: "", isCorrect: false }]);
  const [category, setCategory] = useState("Multiple Choice"); // default category
  const [selectedCategory, setSelectedCategory] = useState("Multiple Choice");
  const [selectedType, setSelectedType] = useState("Select Type");
  const [selectedTypeId, setSelectedTypeId] = useState();
  const [hasMultipleAns, sethasMultipleAns] = useState();
  const [postable, setPostable] = useState(false);
  const [pop, setPop] = useState(false);

  const [selectedPoints, setSelectedPoints] = useState("Add Points");
  const { state, setLoading } = useContext(GlobalStateContext);
  const toastRef = useRef(null);
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  const textareaRef = useRef(null);
  useEffect(() => {
    setLoading(false);

    setPostQuestion("");
    setPostSnapShot("");
    setAnswers([{ text: "", isCorrect: false }]);
    setCategory("Multiple Choice");
    setSelectedCategory("Multiple Choice");
    setSelectedType("Select Type");
    setSelectedTypeId();
    sethasMultipleAns();
    setPostable(false);
    setPop(false);
    setSelectedPoints("Add Points");
  }, [state.toggle]);

  useEffect(() => {
    // Adjust the width of the textarea based on the scroll width
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto to get the correct scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [postQuestion, postSnapShot]);
  useEffect(() => {
    if (postable) {
      posting();
    }
  }, [postable]);

  useEffect(() => {
    // Adjust the number of answer options based on the selected category
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

  const handleQuestion = (e) => {
    setPostQuestion(e.target.value);
  };

  const handleSnapshot = (e) => {
    setPostSnapShot(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  // const handleAnswerChange = (index, text, isCorrect) => {
  //   const newAnswers = [...answers];
  //   newAnswers[index] = { text, isCorrect };
  //   setAnswers(newAnswers);
  // };

  const handleAnswerChange = (index, text, isCorrect) => {
    if (category === "True/False" && isCorrect) {
      // Ensure only one answer can be correct
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer, i) =>
          i === index ? { text, isCorrect: true } : { ...answer, isCorrect: false }
        )
      );
    } else {
      const newAnswers = [...answers];
      newAnswers[index] = { text, isCorrect };
      setAnswers(newAnswers);
    }
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
    // if(SelectedType == )
  };

  const handlePointsChange = (selectedPoints) => {
    setSelectedPoints(selectedPoints);
  };

  // const handleBack =()=>{
  //   navigate("/");
  // }
  // const post = (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!postQuestion.trim()) {
  //       toast.error("Please enter a question.", {
  //         autoClose: 5000,
  //         onClose: () => (toastRef.current = null),
  //       });
  //       return;
  //     }
  //     if (category === "True/False" && !answers.some((answer) => answer.isCorrect)) {
  //       toast.error("Please mark exactly one answer as correct for true/false questions.", { autoClose: 500 });
  //       return;
  //     }

  //     if (!postSnapShot.trim()) {
  //       toast.error("Please enter a snapshot.", { autoClose: 500 });

  //       return;
  //     }

  //     if (answers.some((answer) => !answer.text.trim())) {
  //       toast.error("Please enter valid answers.", { autoClose: 500 });

  //       return;
  //     }
  //     if (category === "Select Category") {
  //       toast.error("Please select a category.", { autoClose: 500 });

  //       return;
  //     }

  //     if (selectedType === "Select Type") {
  //       toast.error("Please select a type.", { autoClose: 500 });

  //       return;
  //     }

  //     if (selectedPoints === "Add Points") {
  //       toast.error("Please select the points.", { autoClose: 500 });

  //       return;
  //     }

  //     if (category === "Multiple Choice") {
  //       if (answers.length < 2) {
  //         toast.error(
  //           "Please provide at least 2 answers for multiple-choice questions.",
  //           { autoClose: 500 }
  //         );

  //         return;
  //       }
  //       if (!answers.some((answer) => answer.isCorrect)) {
  //         toast.error("Please mark at least one answer as correct.", {
  //           autoClose: 500,
  //         });

  //         return;
  //       }
  //     } else if (category === "True/False") {
  //       if (answers.length !== 2) {
  //         toast.error(
  //           "Please provide exactly 2 answers for true/false questions.",
  //           { autoClose: 500 }
  //         );

  //         return;
  //       }
  //     }
  //     const correctAnswersCount = answers.filter(
  //       (answer) => answer.isCorrect
  //     ).length;
  //     if (correctAnswersCount > 1) {
  //       sethasMultipleAns(true);
  //     } else {
  //       sethasMultipleAns(false);
  //     }
  //     setPostable(true);
  //   } catch (error) {
  //     console.error("Error during post validation:", error);
  //   }
  // };
  const post = (e) => {
    e.preventDefault();
    try {
      if (!postQuestion.trim()) {
        if (toastRef.current) {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = toast.error("Please enter a question.", {
          autoClose: 5000,
        });
        return;
      }

      if (category === "True/False" && !answers.some((answer) => answer.isCorrect)) {
        if (toastRef.current) {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = toast.error("Please mark exactly one answer as correct for true/false questions.", { autoClose: 500 });
        return;
      }

      if (!postSnapShot.trim()) {
        if (toastRef.current) {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = toast.error("Please enter a snapshot.", { autoClose: 500 });
        return;
      }

      if (answers.some((answer) => !answer.text.trim())) {
        if (toastRef.current) {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = toast.error("Please enter valid answers.", { autoClose: 500 });
        return;
      }

      if (category === "Select Category") {
        if (toastRef.current) {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = toast.error("Please select a category.", { autoClose: 500 });
        return;
      }

      if (selectedType === "Select Type") {
        if (toastRef.current) {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = toast.error("Please select a type.", { autoClose: 500 });
        return;
      }

      if (selectedPoints === "Add Points") {
        if (toastRef.current) {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = toast.error("Please select the points.", { autoClose: 500 });
        return;
      }

      if (category === "Multiple Choice") {
        if (answers.length < 2) {
          if (toastRef.current) {
            toast.dismiss(toastRef.current);
          }
          toastRef.current = toast.error("Please provide at least 2 answers for multiple-choice questions.", { autoClose: 500 });
          return;
        }
        if (!answers.some((answer) => answer.isCorrect)) {
          if (toastRef.current) {
            toast.dismiss(toastRef.current);
          }
          toastRef.current = toast.error("Please mark at least one answer as correct.", { autoClose: 500 });
          return;
        }
      } else if (category === "True/False") {
        if (answers.length !== 2) {
          if (toastRef.current) {
            toast.dismiss(toastRef.current);
          }
          toastRef.current = toast.error("Please provide exactly 2 answers for true/false questions.", { autoClose: 500 });
          return;
        }
      }

      const correctAnswersCount = answers.filter((answer) => answer.isCorrect).length;
      if (correctAnswersCount > 1) {
        sethasMultipleAns(true);
      } else {
        sethasMultipleAns(false);
      }
      setPostable(true);
    } catch (error) {
      console.error("Error during post validation:", error);
    }
  };
  const posting = () => {
    const data = {
      Question: postQuestion,
      SnapShot: postSnapShot,
      Answers: answers.map((ans) => ({
        Text: ans.text,
        IsCorrect: ans.isCorrect,
      })),
      CategoryId: selectedTypeId,
      AuthorId: state.id,
      CorrectMessage: "Correct!",
      WrongMessage: "Wrong!",
      Point: parseInt(selectedPoints),
      HasMultipleAnswers: hasMultipleAns,
      CreatedBy: state.UserName,
      UpdatedBy: state.UserName,
      IsApproved: false,
      QuestionDate: new Date(),
      LastUpdatedOn: new Date(),
      LastUpdatedBy: state.UserName,
    };

    console.log("Submitted Data:", data);
    fetch(`${apiBaseUrl}/api/PostQuestions`, {
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
    setPop(true);
  };

  return (
    <div className="Lmain">
      <div className="postQuestions">
        <div className="postmain">
          <form onSubmit={post} className="postForm">
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
            <textarea
              name="snapShot"
              id="snapShot"
              rows="1"
              value={postSnapShot}
              onChange={handleSnapshot}
              placeholder="Your Snapshot Here....."
              onKeyDown={handleKeyDown}
            />
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
              <Link className="preview" to={"/"}>
                Cancel
              </Link>
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>

      {pop && <Popover2 popover={pop} />}
    </div>
  );
}

export default PostQuestions;
