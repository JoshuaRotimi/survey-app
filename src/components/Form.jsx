import React, { useState } from "react";
import Question from "./Question.jsx";
import { useQuestionContext } from "../context.jsx";
import { Link, useNavigate } from "react-router-dom";

const QuestionForm = () => {
  const { dispatch } = useQuestionContext();
  const [numSteps, setNumSteps] = useState(1);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const handleNumStepsChange = (event) => {
    const newNumSteps = parseInt(event.target.value);
    setNumSteps(newNumSteps);
    //setQuestions([]);
  };

  const handleQuestionChange = (newQuestion) => {
    let decideQuestion;

    decideQuestion = questions.filter(
      (element) => element.id !== newQuestion.id
    );
    decideQuestion.push(newQuestion);
    setQuestions(decideQuestion);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_QUESTIONS", payload: questions });
    setNumSteps(1);
    setQuestions([]);
    navigate("/questionnaires");
  };

  return (
    <div>
      <Link to={"/questionnaires"}>
        <button>View All Questionnaires</button>
      </Link>
      <div>
        <h2>Build a Multi-step Questionnaire</h2>
        <label>
          Number of Steps:
          <input
            type="number"
            value={numSteps}
            onChange={handleNumStepsChange}
            min="1"
          />
        </label>

        {Array.from({ length: numSteps }, (_, stepIndex) => (
          <div key={stepIndex}>
            <h3>Step {stepIndex + 1}</h3>
            <Question
              stepIndex={stepIndex}
              onQuestionChange={handleQuestionChange}
            />
          </div>
        ))}

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
