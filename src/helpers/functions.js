import axios from "axios";
import { url } from "./url";

export async function getSettings() {
  let response;
  response = await axios
    .get(`${url}/db/settings.json`)
    .catch((err) => console.log(err));
  response = response ? response : {};
  return response.data || {};
}
export async function getUsers(token) {
  if (!token) {
    return [];
  }
  let response;
  response = await axios
    .get(`${url}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  const { success, data, error } = response.data;
  if (success) {
    data.map((item) => {
      item.id = item._id;
      return item;
    });
    return data;
  }
  console.log(error);
  return [];
}

export async function getClasses(token) {
  if (!token) {
    return [];
  }
  let response;
  response = await axios
    .get(`${url}/api/v1/classes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  if (response) {
    return response.data.data;
  } else {
    return [];
  }
}
export async function getCourses(token) {
  if (!token) {
    return [];
  }
  let response;
  response = await axios
    .get(`${url}/api/v1/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  if (response) {
    return response.data.data;
  } else {
    return [];
  }
}

export async function getAssignments(token) {
  if (!token) {
    return [];
  }
  let response;
  response = await axios
    .get(`${url}/api/v1/assignments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  if (response) {
    return response.data.data;
  } else {
    return [];
  }
}

export async function getQuestions(token) {
  if (!token) {
    return [];
  }
  let response;
  response = await axios
    .get(`${url}/api/v1/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  if (response) {
    return response.data.data;
  } else {
    return [];
  }
}

export async function getResults(token) {
  if (!token) {
    return [];
  }
  let response;
  response = await axios
    .get(`${url}/api/v1/results`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  if (response) {
    return response.data.data;
  } else {
    return [];
  }
}

export async function getMessages(token) {
  if (!token) {
    return [];
  }
  let response;
  response = await axios
    .get(`${url}/api/v1/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  if (response) {
    return response.data.data;
  } else {
    return [];
  }
}

export async function getBooks() {
  let response;
  response = await axios
    .get(`${url}/db/books.json`)
    .catch((err) => console.log(err));
  // console.log(response);
  response = response ? response : {};
  return response.data || [];
}

export async function getMe(token) {
  let errorResponse;
  let response = await axios
    .get(`${url}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (errorResponse = err.response));
  if (response) {
    return response;
  } else {
    return errorResponse;
  }
}

export async function addUser(user) {
  let response = await axios
    .post(`${url}/api/v1/auth/register`, {
      ...user,
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function updateUser(user, id, token) {
  let response = await axios
    .put(
      `${url}/api/v1/users/${id}`,
      {
        ...user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function deleteUser(id, token) {
  let response = await axios
    .delete(`${url}/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function UpdateMyDetails(updates, token) {
  let response = await axios
    .put(
      `${url}/api/v1/auth/updateProfile`,
      {
        ...updates,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function UpdateMyPassword(passwords, token) {
  let response = await axios
    .put(
      `${url}/api/v1/auth/updatePassword`,
      {
        ...passwords,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function UpdateProfilePicture(image, userId, token) {
  console.log(image);
  let response = await axios
    .put(
      `${url}/api/v1/users/${userId}/photoupload`,
      {
        file: image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  console.log(response);
  return response;
}

export async function editCourse(data, courseId, token) {
  const { name, image } = data;
  let response = await axios
    .put(
      `${url}/api/v1/courses/${courseId}`,
      {
        name,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function createCourse(data, token) {
  const { name, image } = data;
  console.log(data);
  let response = await axios
    .post(
      `${url}/api/v1/courses`,
      {
        name,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function deleteCourse(id, token) {
  let response = await axios
    .delete(`${url}/api/v1/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function createClass(data, token) {
  let response = await axios
    .post(
      `${url}/api/v1/classes`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function updateClass(updates, id, token) {
  let response = await axios
    .put(
      `${url}/api/v1/classes/${id}`,
      {
        ...updates,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function deleteClass(id, token) {
  let response = await axios
    .delete(`${url}/api/v1/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function addAssignment(assignment, token) {
  let response = await axios
    .post(
      `${url}/api/v1/assignments`,
      {
        ...assignment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function editAssignment(data, assignmentId, token) {
  let response = await axios
    .put(
      `${url}/api/v1/assignments/${assignmentId}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function deleteQuiz(id, token) {
  let response = await axios
    .delete(`${url}/api/v1/assignments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function addQuestion(question, token) {
  let response = await axios
    .post(
      `${url}/api/v1/questions`,
      {
        ...question,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function editQuestion(data, questionId, token) {
  let response = await axios
    .put(
      `${url}/api/v1/questions/${questionId}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function deleteQuestions(id, token) {
  let response = await axios
    .delete(`${url}/api/v1/questions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function addResult(result, token) {
  let response = await axios
    .post(
      `${url}/api/v1/results`,
      {
        ...result,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function editResult(data, resultId, token) {
  let response = await axios
    .put(
      `${url}/api/v1/results/${resultId}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function deleteResult(id, token) {
  let response = await axios
    .delete(`${url}/api/v1/results/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function submitQuiz(data, token) {
  let response = await axios
    .post(`${url}/api/v1/results/submitQuiz`, [...data], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (response = err.response));
  return response;
}

export async function addMessage(message, token) {
  let response = await axios
    .post(
      `${url}/api/v1/messages`,
      {
        ...message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

export async function editMessage(data, messageId, token) {
  let response = await axios
    .put(
      `${url}/api/v1/messages/${messageId}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => (response = err.response));
  return response;
}

// export async function formatUser(user) {
//   let classes = await getClasses();
//   let tempClass = classes.find((item) => item.id === user.currentClass);
//   let userClass = tempClass ? tempClass.name : "N/A";

//   let classTeacher = tempClass
//     ? await getUserNames(tempClass.classTeacher)
//     : "N/A";
//   let settings = await getSettings();

//   let mother;
//   let father;
//   if (user.mother) {
//     mother = await getUser(user.mother);
//   }
//   if (user.father) {
//     father = await getUser(user.father);
//   }

//   let children;
//   children = await getChildren(user.id);

//   let finalUser = {
//     ...user,
//     currentClass: userClass,
//     classTeacher,
//     currentSession: settings.currentSession,
//     currentTerm: settings.currentTerm,
//     mother,
//     father,
//     rollNumber: "UPCREW2020__0" + user.id,
//     children,
//   };
//   // console.log(finalUser);
//   return finalUser;
// }

// export async function getUserNames(userId) {
//   let users = await getUsers();
//   let tempUser = users.find((item) => item.id.toString() === userId.toString());
//   if (!tempUser) return "N/A";
//   return `${tempUser.firstName} ${tempUser.lastName}`;
// }

// export async function getUser(userId) {
//   let users = await getUsers();
//   let tempUser = users.find((item) => item.id === userId);
//   if (!tempUser) {
//     return {
//       id: 0,
//       names: `N/A`,
//       email: "N/A",
//       occupation: "N/A",
//       phoneNumber: "N/A",
//       userName: "N/A",
//     };
//   }
//   return {
//     id: tempUser.id,
//     names: `${tempUser.firstName} ${tempUser.lastName}`,
//     email: tempUser.userEmail,
//     occupation: tempUser.occupation,
//     phoneNumber: tempUser.phoneNumber,
//     userName: tempUser.userName,
//   };
// }

// export async function getChildren(id) {
//   let tempChildren = await getUsers().catch((err) => console.log(err));
//   tempChildren = tempChildren.filter(
//     (item) => item.father === id || item.mother === id
//   );
//   if (tempChildren.length === 0) {
//     tempChildren = undefined;
//   }
//   return tempChildren;
// }

// export async function formatClass(oldClass) {
//   let courses = await getCourses();
//   let classCourses = oldClass.courses.map((item) => {
//     let match = courses.find(
//       (course) => course.id.toString() === item.toString()
//     );
//     if (match) {
//       return match.name;
//     }
//     return "";
//   });
//   let classTeacher = await getUserNames(oldClass.classTeacher);
//   return {
//     ...oldClass,
//     classTeacher,
//     courses: [...classCourses],
//   };
// }

// export async function formatAssignment(assignment) {
//   let classes = await getClasses();
//   let courses = await getCourses();
//   let matchClass = classes.find((record) => record.id === assignment.class);
//   let className = matchClass.name;
//   let teacher = await getUserNames(assignment.teacher);
//   let course;
//   let matchCourse = courses.find((record) => record.id === assignment.course);
//   course = matchCourse.name;
//   return { ...assignment, teacher, course, class: className };
// }
