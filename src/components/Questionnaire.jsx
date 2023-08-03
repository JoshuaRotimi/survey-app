import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuestionContext } from "../context.jsx";
import CheckBox from "./CheckBox.jsx";
import RadioSwitch from "./Radio.jsx";

const QuestionnaireForm = () => {
  const { state, dispatch, formData, setFormData } = useQuestionContext();
  const { currentPage } = state;

  const navigate = useNavigate();

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const defaultPage = location.pathname.split("/")[3];

  const data = state.allQuestions;

  const allQuestions = data[id].questions[0];
  console.log(allQuestions);

  const currentData =
    allQuestions[defaultPage < allQuestions.length ? defaultPage : currentPage];

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (currentPage < allQuestions.length - 1) {
      dispatch({ type: "SET_PAGE", payload: nextPage });
      navigate(`/questionnaires/${id}/${nextPage}`);
    }
  };

  const handlePrevious = () => {
    const previousPage = currentPage - 1;
    if (currentPage > 0) {
      dispatch({ type: "SET_PAGE", payload: previousPage });
      navigate(`/questionnaires/${id}/${previousPage}`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log(formData);

  return (
    <div>
      <h2>Questionnaire Form</h2>
      <p>This Questionnaire has {allQuestions.length} step (s)</p>
      <p>Step {currentPage}</p>
      <form>
        {currentData.newQuestions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`${question.text}-${currentPage}`}>
              Question: {question.text}
            </label>

            {question.type === "checkbox" ? (
              <CheckBox names={question.options} />
            ) : question.type === "radio" ? (
              <RadioSwitch
                question={question.text}
                options={question.options}
              />
            ) : (
              <input
                onChange={handleInputChange}
                id={`${question.text}-${currentPage}`}
                name={`${question.text}-${currentPage}`}
                type={question.type}
                value={formData[`${question.text}-${currentPage}`] || ""}
              />
            )}
          </div>
        ))}
      </form>
      {currentPage > 0 && (
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
      )}

      {currentPage < allQuestions.length - 1 && (
        <button
          onClick={handleNext}
          disabled={currentPage === allQuestions.length - 1}
        >
          Next
        </button>
      )}

      {currentPage === allQuestions.length - 1 && (
        <button
          onClick={() => {
            alert("Thank you for your submission.");
            setFormData({});
            dispatch({ type: "SET_PAGE", payload: 0 });
            navigate("/questionnaires");
          }}
        >
          Submit Form
        </button>
      )}
    </div>
  );
};

export default QuestionnaireForm;
