import React from "react";
import { getAssignments, getCourses, getQuestions } from "../helpers/functions";
const AssignmentsContext = React.createContext();

function AssignmentsProvider({ children }) {
  const [assignments, setAssignments] = React.useState([]);
  const [filteredAssignments, setFilteredAssignments] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [questions, setQuestions] = React.useState([]);
  const [filteredQuestions, setFilteredQuestions] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [course, setCourse] = React.useState("all");
  const [duration, setDuration] = React.useState(0);
  const [maxDuration, setMaxDuration] = React.useState(0);


  React.useEffect(() => {
    mount();
  }, []);

  React.useEffect(() => {
    sortAssignments();
  }, [course, duration, title]);

  async function mount() {
    let tempAssignments = await getAssignments();
    let tempCourses = await getCourses();
    let tempQuestions = await getQuestions();
    setQuestions(tempQuestions)
    setFilteredQuestions(tempQuestions)
    setCourses(tempCourses);
    setAssignments(tempAssignments);
    setFilteredAssignments(tempAssignments);
    let maxMin = Math.max(...tempAssignments.map((record) => record.duration));
    setMaxDuration(maxMin);
    setDuration(maxMin);
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
        (record) => record.course === parseInt(course)
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
    let tempQuestions = questions.filter(record => {
      return record.quiz_id.toString() === quizId.toString()
    })
    setFilteredQuestions(tempQuestions)
  }

  function submitAssignment(answers,assignment_id) {
    console.log(answers)
    console.log(assignment_id)
  }
  return (
    <AssignmentsContext.Provider
      value={{
        assignments,
        filteredAssignments,
        filteredQuestions,
        sortQuestions,
        submitAssignment,
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
