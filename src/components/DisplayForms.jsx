import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DisplayForms = () => {
  const [storedData, setStoredData] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("questions");
    if (data) {
      setStoredData(JSON.parse(data));
    }
  }, []);

  return (
    <div>
      <h2>List of Saved Questionnaires</h2>
      {Object.entries(storedData).map(([date, list], index) => {
        return (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "5px",
              margin: "10px",
            }}
          >
            <ul>
              <Link to={`/questionnaires/${index}`}>
                <li>
                  <h3>Questionnaire {date}</h3>
                  <p>This questionnaire has {list.questions[0].length} steps</p>
                </li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayForms;
