import { useState } from "react";

const Question = ({ onQuestionChange, stepIndex }) => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text", options: [] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
    onQuestionChange({ id: stepIndex, newQuestions });
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  return (
    <div>
      <button onClick={addQuestion}>Add Question</button>
      <ol style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {questions.map((question, questionIndex) => (
          <li key={questionIndex} style={{ display: "flex", gap: "20px" }}>
            <input
              type="text"
              value={question.text}
              style={{ width: "450px" }}
              onChange={(e) =>
                handleQuestionChange(questionIndex, "text", e.target.value)
              }
              placeholder="Enter your question"
            />

            <select
              value={question.type}
              onChange={(e) =>
                handleQuestionChange(questionIndex, "type", e.target.value)
              }
            >
              <option value="text">Text</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
            </select>

            {(question.type === "checkbox" || question.type === "radio") && (
              <div>
                <button onClick={() => addOption(questionIndex)}>
                  Add Option
                </button>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(
                            questionIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder="Enter option"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Question;
