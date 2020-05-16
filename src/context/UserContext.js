import React from "react";
import {
  getUsers,
  getClasses,
  getTypes,
  getCourses,
  formatUser,
} from "../helpers/functions";
const UserContext = React.createContext();

function UserProvider({ children }) {
  const getUserFromSessionStorage = () => {
    return sessionStorage.getItem("ado-user")
      ? JSON.parse(sessionStorage.getItem("ado-user"))
      : { username: null, token: null, user: null };
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
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchClass, setSearchClass] = React.useState("all");
  const [searchCountry, setSearchCountry] = React.useState("all");

  //useEffect
  React.useEffect(() => {
    mount();
    setLoading(false);
  }, []);
  async function mount() {
    let tempUsers = await getUsers();
    setUsers(tempUsers);
    setFilteredUsers(tempUsers);
    let tempClasses = await getClasses();
    setClasses(tempClasses);
    let tempTypes = await getTypes();
    setTypes(tempTypes);
    let tempCourses = await getCourses();
    setCourses(tempCourses);
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
  };
  const userLogout = () => {
    setUser({ username: null, token: null, user: null });
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
  const getUser = async (id) => {
    let tempUser = users.find((item) => item.id.toString() === id);
    if (tempUser) {
      tempUser = await formatUser(tempUser);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
