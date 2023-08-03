import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DisplayForms = () => {
  const [storedData, setStoredData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("questions");
    if (data) {
      setStoredData(JSON.parse(data));
    }
  }, []);

  return (
    <div>
      {Object.values(storedData).length > 0 ? (
        <>
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
                      <p>
                        This questionnaire has {list.questions[0].length} steps
                      </p>
                    </li>
                  </Link>
                </ul>
              </div>
            );
          })}
          <button onClick={() => navigate("/")}>Go Back</button>
        </>
      ) : (
        <>
          <h2>You have not created any questionnaires</h2>
          <button onClick={() => navigate("/")}>Create Questionnaire</button>
        </>
      )}
    </div>
  );
};

export default DisplayForms;
