import React, { useState } from "react";
import { useQuestionContext } from "../context.jsx";

const RadioSwitch = ({ question, options }) => {
  const { formData, setFormData } = useQuestionContext();

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      {options?.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            name={question}
            checked={formData[question] === option}
            onChange={handleRadioChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioSwitch;
