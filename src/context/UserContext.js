import React from "react";
import swal from "sweetalert2";
import {
  getUsers,
  getClasses,
  getCourses,
  getBooks,
  getSettings,
  getMe,
} from "../helpers/functions";
const UserContext = React.createContext();

function UserProvider({ children }) {
  const getUserFromSessionStorage = () => {
    return sessionStorage.getItem("ado-user")
      ? JSON.parse(sessionStorage.getItem("ado-user"))
      : { token: null, user: {} };
  };

  //state values
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(getUserFromSessionStorage);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [filteredClasses, setFilteredClasses] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const [settings, setSettings] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchClass, setSearchClass] = React.useState("all");
  const [searchCountry, setSearchCountry] = React.useState("all");
  const [maxNbrOfStudents, setMaxNbrOfStudents] = React.useState(users.length);
  const [nbrOfStudents, setNbrOfStudents] = React.useState(users.length);
  const [classname, setClassname] = React.useState("");
  const [reload, setReload] = React.useState(false);

  //useEffect
  React.useEffect(() => {
    mount();
    setLoading(false);
  }, [reload]);
  async function mount() {
    if (user.token) {
      //fetch users
      let tempUsers = (await getUsers(user.token)) || [];
      setUsers(tempUsers);
      setFilteredUsers(tempUsers);
      setNbrOfStudents(tempUsers.length);
      setMaxNbrOfStudents(tempUsers.length);

      //getting my profile info
      let tempMe = (await getMe(user.token)) || { data: {} };
      const { success, data } = tempMe.data;
      if (success) {
        data.id = data._id;
        setUser({ ...user, user: { ...data } });
      }

      //fetching courses
      let tempCourses = (await getCourses(user.token)) || [];
      setCourses(tempCourses);

      //fetching classes
      let tempClasses = (await getClasses(user.token)) || [];
      setClasses(tempClasses);
      setFilteredClasses(tempClasses);
    }
    let tempBooks = (await getBooks()) || [];
    setBooks(tempBooks);
    let tempSettings = (await getSettings()) || {};
    setSettings(tempSettings);
  }

  const solveResponse = (response, message) => {
    // swal.fire({
    //   title: "Accessing your data. Please wait...",
    // });
    if (!response) {
      swal.fire({
        title: "Error occured.",
        icon: "error",
      });
    } else {
      const { success, error } = response.data;
      swal.close();
      if (success) {
        if (message) {
          window.Toast.fire({
            title: message || "something happened",
          });
        }
        reloadContent();
      } else {
        window.displayError(error);
      }
    }
  };
  const reloadContent = () => {
    setReload(!reload);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const userLogin = (user) => {
    setUser(user);
    sessionStorage.setItem("ado-user", JSON.stringify(user));
    reloadContent();
  };
  const userLogout = () => {
    setUser({ token: null, user: {} });
    sessionStorage.removeItem("ado-user");
  };
  const handleTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleClass = (e) => {
    setSearchClass(e.target.value);
  };
  const handleCountry = (e) => {
    setSearchCountry(e.target.value);
  };
  const handleNbrOfStudents = (e) => {
    setNbrOfStudents(e.target.value);
  };
  const handleClassname = (e) => {
    setClassname(e.target.value);
  };
  const resetCountry = () => {
    setSearchCountry("all");
  };
  const resetClass = () => {
    setSearchClass("all");
  };
  const getUser = (id) => {
    let tempUser = users.find((item) => item._id.toString() === id);
    if (tempUser) {
      tempUser = formatUser(tempUser);
    }
    return tempUser;
  };

  React.useEffect(() => {
    //function to filter classes
    filterClasses();
  }, [classname, nbrOfStudents]);

  React.useEffect(() => {
    //function to change filtered users
    filterUsers();
  }, [searchTerm, searchClass, searchCountry, users]);

  const filterUsers = () => {
    // console.log(searchTerm);
    // console.log(searchClass);
    // console.log(searchCountry);
    let tempUsers = users;
    //filter by class
    if (searchClass !== "all") {
      tempUsers = tempUsers.filter((item) => item.currentClass === searchClass);
    }
    //filter by country
    if (searchCountry !== "all") {
      tempUsers = tempUsers.filter(
        (item) => item.userCountry === searchCountry
      );
    }

    //filter by name
    if (searchTerm.length !== 0) {
      tempUsers = tempUsers.filter((item) => {
        let first = `${item.firstName} ${item.lastName}`.toLocaleLowerCase();
        let second = `${item.lastName} ${item.firstName}`.toLocaleLowerCase();
        let third = `${item.userName}`.toLocaleLowerCase();
        let fourth = `${item.userEmail}`.toLocaleLowerCase();
        let fifth = `${item.userCountry}`.toLocaleLowerCase();
        let sixth = `${item.gender}`.toLocaleLowerCase();
        let seventh = `${item.dateOfBirth}`.toLocaleLowerCase();
        let eighth = `${item.phoneNumber}`.toLocaleLowerCase();
        let slice1 = first.slice(0, searchTerm.length);
        let slice2 = second.slice(0, searchTerm.length);
        let slice3 = third.slice(0, searchTerm.length);
        let slice4 = fourth.slice(0, searchTerm.length);
        let slice5 = fifth.slice(0, searchTerm.length);
        let slice6 = sixth.slice(0, searchTerm.length);
        let slice7 = seventh.slice(0, searchTerm.length);
        let slice8 = eighth.slice(0, searchTerm.length);
        return (
          searchTerm.toLocaleLowerCase() === slice1 ||
          searchTerm.toLocaleLowerCase() === slice2 ||
          searchTerm.toLocaleLowerCase() === slice3 ||
          searchTerm.toLocaleLowerCase() === slice4 ||
          searchTerm.toLocaleLowerCase() === slice5 ||
          searchTerm.toLocaleLowerCase() === slice6 ||
          searchTerm.toLocaleLowerCase() === slice7 ||
          searchTerm.toLocaleLowerCase() === slice8
        );
      });
    }
    setFilteredUsers(tempUsers);
  };

  const filterClasses = () => {
    let tempClasses = classes;
    //filter by number of students
    tempClasses = tempClasses.filter((item) => {
      //number of students in class
      let tempClassStudents = users.filter((record) => {
        if (record.currentClass) {
          return record.currentClass.toString() === item._id.toString();
        }
        return false;
      });

      return tempClassStudents.length <= nbrOfStudents;
    });

    //filter by class name
    if (classname !== "") {
      tempClasses = tempClasses.filter(
        (item) =>
          item.name.slice(0, classname.length).toLowerCase() ===
          classname.toLowerCase()
      );
    }

    setFilteredClasses(tempClasses);
  };

  //loaded data functions

  const formatUser = (user) => {
    let tempClass = classes.find((item) => {
      return item._id === user.currentClass;
    });
    let userClass = tempClass ? tempClass.name : "N/A";
    let classTeacher = tempClass ? getUserNames(tempClass.classTeacher) : "N/A";
    //get parent info
    let mother;
    let father;
    if (user.mother) {
      mother = getNormalUser(user.mother);
    }
    if (user.father) {
      father = getNormalUser(user.father);
    }

    //children info
    let children;
    children = getChildren(user._id);

    let finalUser = {
      ...user,
      currentClass: userClass,
      classTeacher,
      currentSession: settings.currentSession,
      currentTerm: settings.currentTerm,
      mother,
      father,
      rollNumber: user._id,
      children,
    };
    // console.log(finalUser);
    return finalUser;
  };

  const getUserNames = (userId) => {
    let tempUser = users.find((item) => item._id === userId);
    if (!tempUser) return "N/A";
    return `${tempUser.firstName} ${tempUser.lastName}`;
  };

  const getNormalUser = (userId) => {
    let tempUser = users.find((item) => item._id === userId);
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
      id: tempUser._id,
      names: `${tempUser.firstName} ${tempUser.lastName}`,
      email: tempUser.userEmail,
      occupation: tempUser.occupation,
      phoneNumber: tempUser.phoneNumber,
      userName: tempUser.userName,
    };
  };

  const getChildren = (id) => {
    let tempChildren = users.filter(
      (item) => item.father === id || item.mother === id
    );
    if (tempChildren.length === 0) {
      tempChildren = undefined;
    }
    return tempChildren;
  };

  const formatClass = (oldClass) => {
    let classCourses = oldClass.courses.map((item) => {
      let match = courses.find((course) => course._id === item);
      if (match) {
        return match.name;
      }
      return "";
    });
    let classTeacher = getUserNames(oldClass.classTeacher);
    return {
      ...oldClass,
      classTeacher,
      courses: [...classCourses],
    };
  };

  const formatAssignment = (assignment) => {
    let matchClass = classes.find((record) => record._id === assignment.class);
    let className = matchClass ? matchClass.name : "N/A";
    let teacher = getUserNames(assignment.teacher);
    let course = "N/A";
    let matchCourse = courses.find(
      (record) => record._id === assignment.course
    );
    if (matchCourse) course = matchCourse.name;
    return { ...assignment, teacher, course, class: className };
  };

  return (
    <UserContext.Provider
      value={{
        userLogin: userLogin,
        user: user,
        userLogout: userLogout,
        sidebarOpen: sidebarOpen,
        toggleSidebar: toggleSidebar,
        closeSidebar: closeSidebar,
        users,
        classes,
        courses,
        books,
        settings,
        loading,
        filteredUsers,
        filteredClasses,
        searchClass,
        searchTerm,
        searchCountry,
        handleClass,
        handleTerm,
        handleCountry,
        resetCountry,
        resetClass,
        getUser,
        formatUser,
        getUserNames,
        getNormalUser,
        getChildren,
        formatClass,
        formatAssignment,
        maxNbrOfStudents,
        nbrOfStudents,
        classname,
        handleClassname,
        handleNbrOfStudents,
        reloadContent,
        reload,
        solveResponse,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
