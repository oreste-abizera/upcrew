import React from "react";
import swal from "sweetalert2";
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
  const [status, setStatus] = React.useState("all");
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
  }, [course, duration, title, status]);

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

  function handleStatus(e) {
    setStatus(e.target.value);
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

    //filter by status
    if (status !== "all") {
      tempAssignments = tempAssignments.filter(
        (item) => item.status === status
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
    swal.fire({
      title: "Accessing your data. Please wait...",
    });
    let response = await submitQuiz(answers, user.token);
    solveResponse(response, "quiz successifully submited");
  }

  async function EditQuestion(finalQuestion) {
    swal.fire({
      title: "Accessing your data. Please wait...",
    });
    let response = await editQuestion(
      finalQuestion,
      finalQuestion._id,
      user.token
    );
    solveResponse(response, "question successifully updated");
  }

  async function deleteQuestion(questionId) {
    swal.fire({
      title: "Accessing your data. Please wait...",
    });
    let response = await deleteQuestions(questionId, user.token);
    solveResponse(response, "question successifully deleted");
  }

  async function deleteAssignment(assignmentId) {
    swal.fire({
      title: "Accessing your data. Please wait...",
    });
    let response = await deleteQuiz(assignmentId, user.token);
    solveResponse(response, "Assignment successifully deleted");
  }

  async function updateAssignment(finalQuiz) {
    swal.fire({
      title: "Accessing your data. Please wait...",
    });
    let response = await editAssignment(finalQuiz, finalQuiz._id, user.token);
    solveResponse(response, "Assignment successifully updated");
  }

  async function AddQuestion(finalQuestion, quizId) {
    swal.fire({
      title: "Accessing your data. Please wait...",
    });
    finalQuestion.quiz_id = quizId;
    let response = await addQuestion(finalQuestion, user.token);
    solveResponse(response, "question successifully added");
  }

  const AddAssignment = async function AddAssignment(newAssignment) {
    swal.fire({
      title: "Accessing your data. Please wait...",
    });
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
        status,
        duration,
        maxDuration,
        handleTitle,
        handleDuration,
        handleCourse,
        handleStatus,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
}

export { AssignmentsContext, AssignmentsProvider };
