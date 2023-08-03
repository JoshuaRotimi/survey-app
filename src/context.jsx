// QuestionContext.js
import React, { createContext, useContext, useReducer, useState } from "react";

const QuestionContext = createContext();

const savedData = JSON.parse(localStorage.getItem("questions")) || [];

const initialState = {
  allQuestions: savedData,
  currentPage: 0,
  questions: [],
  formData: {},
};

const questionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_QUESTIONS":
      const newState = {
        ...state,
        questions: [...state.questions, action.payload],
      };
      localStorage.setItem(
        "questions",
        JSON.stringify([...savedData, newState])
      );
      return newState;
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const QuestionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const [formData, setFormData] = useState({});

  return (
    <QuestionContext.Provider
      value={{ state, dispatch, formData, setFormData }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export { QuestionProvider, useQuestionContext };
