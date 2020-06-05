import React from "react";
import {
  getUsers,
  getClasses,
  getTypes,
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
  const [types, setTypes] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [books, setBooks] = React.useState([])
  const [settings, setSettings] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchClass, setSearchClass] = React.useState("all");
  const [searchCountry, setSearchCountry] = React.useState("all");
  const [reload, setReload] = React.useState(false)

  //useEffect
  React.useEffect(() => {
    mount();
    setLoading(false);
  }, [reload]);
  async function mount() {
    if (user.token) {
      let tempUsers = await getUsers(user.token);
      setUsers(tempUsers);
      setFilteredUsers(tempUsers);

      let tempMe = await getMe(user.token)
      const { success, data } = tempMe.data
      if (success) {
        data.id = data._id
        setUser({ ...user, user: { ...data } })
      }
    }
    let tempClasses = await getClasses();
    setClasses(tempClasses);
    let tempTypes = await getTypes();
    setTypes(tempTypes);
    let tempCourses = await getCourses();
    setCourses(tempCourses);
    let tempBooks = await getBooks();
    setBooks(tempBooks)
    let tempSettings = await getSettings();
    setSettings(tempSettings)
  }

  const reloadContent = () => {
    setReload(!reload)
  }
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const userLogin = (user) => {
    setUser(user);
    sessionStorage.setItem("ado-user", JSON.stringify(user));
    reloadContent()
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
  const resetCountry = () => {
    setSearchCountry("all");
  };
  const resetClass = () => {
    setSearchClass("all");
  };
  const getUser = (id) => {
    let tempUser = users.find((item) => item.id.toString() === id);
    if (tempUser) {
      tempUser = formatUser(tempUser);
    }
    return tempUser;
  };

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
      tempUsers = tempUsers.filter(
        (item) => item.currentClass === parseInt(searchClass)
      );
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





  //loaded data functions

  const formatUser = (user) => {
    let tempClass = classes.find((item) => item.id === user.currentClass);
    let userClass = tempClass ? tempClass.name : "N/A";

    let classTeacher = tempClass
      ? getUserNames(tempClass.classTeacher)
      : "N/A";
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
    children = getChildren(user.id);

    let finalUser = {
      ...user,
      currentClass: userClass,
      classTeacher,
      currentSession: settings.currentSession,
      currentTerm: settings.currentTerm,
      mother,
      father,
      rollNumber: user.id,
      children,
    };
    // console.log(finalUser);
    return finalUser;
  }

  const getUserNames = (userId) => {
    let tempUser = users.find((item) => item.id.toString() === userId.toString());
    if (!tempUser) return "N/A";
    return `${tempUser.firstName} ${tempUser.lastName}`;
  }

  const getNormalUser = (userId) => {
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

  const getChildren = (id) => {
    let tempChildren = users.filter(
      (item) => item.father === id || item.mother === id
    );
    if (tempChildren.length === 0) {
      tempChildren = undefined;
    }
    return tempChildren;
  }

  const formatClass = (oldClass) => {
    let classCourses = oldClass.courses.map((item) => {
      let match = courses.find(
        (course) => course.id.toString() === item.toString()
      );
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
  }

  const formatAssignment = (assignment) => {
    let matchClass = classes.find((record) => record.id === assignment.class);
    let className = matchClass.name;
    let teacher = getUserNames(assignment.teacher);
    let course;
    let matchCourse = courses.find((record) => record.id === assignment.course);
    if (matchCourse) course = matchCourse.name;
    return { ...assignment, teacher, course, class: className };
  }



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
        types,
        courses,
        books,
        settings,
        loading,
        filteredUsers,
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
        reloadContent,
        reload
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
