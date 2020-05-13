import axios from "axios";
import { url } from "./url";

export async function getSettings() {
  let response;
  response = await axios
    .get(`${url}/db/settings.json`)
    .catch((err) => console.log(err));
  return response.data;
}
export async function getUsers() {
  let response;
  response = await axios
    .get(`${url}/db/users.json`)
    .catch((err) => console.log(err));
  return response.data;
}

export async function getClasses() {
  let response;
  response = await axios
    .get(`${url}/db/classes.json`)
    .catch((err) => console.log(err));

  return response.data;
}
export async function getCourses() {
  let response;
  response = await axios
    .get(`${url}/db/courses.json`)
    .catch((err) => console.log(err));
  return response.data;
}
export async function getTypes() {
  let response;
  response = await axios
    .get(`${url}/db/types.json`)
    .catch((err) => console.log(err));
  return response.data;
}

export async function getAssignments() {
  let response;
  response = await axios
    .get(`${url}/db/assignments.json`)
    .catch((err) => console.log(err));
  return response.data;
}

export async function getQuestions() {
  let response = await axios
    .get(`${url}/db/questions.json`)
    .catch((err) => console.log(err));
  return response.data;
}

export async function formatUser(user) {
  let classes = await getClasses();
  let tempClass = classes.find((item) => item.id === user.currentClass);
  let userClass = tempClass ? tempClass.name : "N/A";

  let classTeacher = tempClass
    ? await getUserNames(tempClass.classTeacher)
    : "N/A";
  //get school settings
  let settings = await getSettings();
  //get parent info
  let mother;
  let father;
  if (user.mother) {
    mother = await getUser(user.mother);
  }
  if (user.father) {
    father = await getUser(user.father);
  }

  //children info
  let children;
  children = await getChildren(user.id);

  let finalUser = {
    ...user,
    currentClass: userClass,
    classTeacher,
    currentSession: settings.currentSession,
    currentTerm: settings.currentTerm,
    mother,
    father,
    rollNumber: "UPCREW2020__0" + user.id,
    children,
  };
  // console.log(finalUser);
  return finalUser;
}

export async function getUserNames(userId) {
  let users = await getUsers();
  let tempUser = users.find((item) => item.id.toString() === userId.toString());
  if (!tempUser) return "N/A";
  return `${tempUser.firstName} ${tempUser.lastName}`;
}

export async function getUser(userId) {
  let users = await getUsers();
  let tempUser = users.find((item) => item.id === userId);
  if (!tempUser) {
    return {
      id: 0,
      names: `N/A`,
      email: "N/A",
      occupation: "N/A",
      phoneNumber: "N/A",
      userName: "N/A",
    };
  }
  return {
    id: tempUser.id,
    names: `${tempUser.firstName} ${tempUser.lastName}`,
    email: tempUser.userEmail,
    occupation: tempUser.occupation,
    phoneNumber: tempUser.phoneNumber,
    userName: tempUser.userName,
  };
}

export async function getChildren(id) {
  let tempChildren = await getUsers().catch((err) => console.log(err));
  tempChildren = tempChildren.filter(
    (item) => item.father === id || item.mother === id
  );
  if (tempChildren.length === 0) {
    tempChildren = undefined;
  }
  return tempChildren;
}

export async function formatClass(oldClass) {
  let courses = await getCourses();
  let classCourses = oldClass.courses.map((item) => {
    let match = courses.find(
      (course) => course.id.toString() === item.toString()
    );
    if (match) {
      return match.name;
    }
    return "";
  });
  let classTeacher = await getUserNames(oldClass.classTeacher);
  return {
    ...oldClass,
    classTeacher,
    courses: [...classCourses],
  };
}

export async function formatAssignment(assignment) {
  let classes = await getClasses();
  let courses = await getCourses();
  let matchClass = classes.find((record) => record.id === assignment.class);
  let className = matchClass.name;
  let teacher = await getUserNames(assignment.teacher);
  let course;
  let matchCourse = courses.find((record) => record.id === assignment.course);
  course = matchCourse.name;
  return { ...assignment, teacher, course, class: className };
}
