import React from "react";
import { useQuestionContext } from "../context.jsx";

const CheckboxList = ({ names }) => {
  const { formData, setFormData, state } = useQuestionContext();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  return (
    <div>
      {names.map((name, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              name={name}
              checked={formData[name] || false}
              onChange={handleCheckboxChange}
            />
            {name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
