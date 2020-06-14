import React from "react";
import {
  getAssignments,
  getQuestions,
  getResults,
  addAssignment,
  editAssignment,
  deleteQuiz,
  deleteQuestions,
  editQuestion,
  addQuestion,
  submitQuiz,
} from "../helpers/functions";
import { UserContext } from "./UserContext";
const AssignmentsContext = React.createContext();

function AssignmentsProvider({ children }) {
  const [assignments, setAssignments] = React.useState([]);
  const [filteredAssignments, setFilteredAssignments] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [questions, setQuestions] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [course, setCourse] = React.useState("all");
  const [duration, setDuration] = React.useState(0);
  const [maxDuration, setMaxDuration] = React.useState(0);
  const { reload, user, courses, solveResponse } = React.useContext(
    UserContext
  );

  React.useEffect(() => {
    mount();
  }, [reload]);

  React.useEffect(() => {
    sortAssignments();
  }, [course, duration, title]);

  async function mount() {
    if (user.token) {
      //load assignments
      let tempAssignments = await getAssignments(user.token);
      setAssignments(tempAssignments);
      setFilteredAssignments(tempAssignments);
      let maxMin = Math.max(
        ...tempAssignments.map((record) => record.duration)
      );
      setMaxDuration(maxMin);
      setDuration(maxMin);

      //load questions
      let tempQuestions = await getQuestions(user.token);
      setQuestions(tempQuestions);

      //load results
      let tempResults = await getResults(user.token);
      setResults(tempResults);
    }
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDuration(e) {
    setDuration(e.target.value);
  }

  function handleCourse(e) {
    setCourse(e.target.value);
  }

  function sortAssignments() {
    let tempAssignments = assignments;
    //filter by course
    if (course !== "all") {
      tempAssignments = tempAssignments.filter(
        (record) => record.course === course
      );
    }

    //filter by duration
    if (duration < maxDuration) {
      tempAssignments = tempAssignments.filter(
        (record) => record.duration <= duration
      );
    }

    //filter by title
    if (title.length !== 0) {
      tempAssignments = tempAssignments.filter(
        (record) =>
          title.toLocaleLowerCase() ===
          record.title.slice(0, title.length).toLocaleLowerCase()
      );
    }
    setFilteredAssignments(tempAssignments);
  }

  function sortQuestions(quizId) {
    let tempQuestions = questions.filter((record) => {
      return record.quiz_id === quizId;
    });
    return tempQuestions;
  }

  async function submitAssignment(answers, assignment_id) {
    // console.log(answers);
    // console.log(assignment_id);
    let response = await submitQuiz(answers, user.token);
    solveResponse(response, "quiz successifully submited");
  }

  async function EditQuestion(finalQuestion) {
    let response = await editQuestion(
      finalQuestion,
      finalQuestion._id,
      user.token
    );
    solveResponse(response, "question successifully updated");
  }

  async function deleteQuestion(questionId) {
    let response = await deleteQuestions(questionId, user.token);
    solveResponse(response, "question successifully deleted");
  }

  async function deleteAssignment(assignmentId) {
    let response = await deleteQuiz(assignmentId, user.token);
    solveResponse(response, "Assignment successifully deleted");
  }

  async function updateAssignment(finalQuiz) {
    let response = await editAssignment(finalQuiz, finalQuiz._id, user.token);
    solveResponse(response, "Assignment successifully updated");
  }

  async function AddQuestion(finalQuestion, quizId) {
    finalQuestion.quiz_id = quizId;
    let response = await addQuestion(finalQuestion, user.token);
    solveResponse(response, "question successifully added");
  }

  const AddAssignment = async function AddAssignment(newAssignment) {
    let response = await addAssignment(newAssignment, user.token);
    solveResponse(response, "Assignment successifully added");
  };
  return (
    <AssignmentsContext.Provider
      value={{
        assignments,
        filteredAssignments,
        results,
        sortQuestions,
        questions,
        submitAssignment,
        AddQuestion,
        EditQuestion,
        deleteQuestion,
        AddAssignment,
        updateAssignment,
        deleteAssignment,
        title,
        courses,
        course,
        duration,
        maxDuration,
        handleTitle,
        handleDuration,
        handleCourse,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
}

export { AssignmentsContext, AssignmentsProvider };
