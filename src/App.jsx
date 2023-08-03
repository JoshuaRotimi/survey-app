import "./App.css";
import QuestionForm from "./components/Form.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DisplayForms from "./components/DisplayForms.jsx";
import QuestionnaireForm from "./components/Questionnaire";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuestionForm />,
  },
  {
    path: "/questionnaires",
    element: <DisplayForms />,
  },
  {
    path: `/questionnaires/:id`,
    element: <QuestionnaireForm />,
  },
  {
    path: `/questionnaires/:id/:id`,
    element: <QuestionnaireForm />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
