export const getPersonalInfo = (user) => {
  let personalInfo = [
    {
      id: 1,
      field: "Roll Number",
      value: user.rollNumber,
    },
    {
      id: 2,
      field: "Full names",
      value: user.firstName + " " + user.lastName,
    },
    {
      id: 3,
      field: "Username",
      value: user.userName,
    },
    {
      id: 4,
      field: "Date of birth",
      value: user.dateOfBirth,
    },
    {
      id: 100,
      field: "Gender",
      value: user.gender,
    },
    {
      id: 5,
      field: "Country",
      value: user.userCountry,
    },
    {
      id: 6,
      field: "Email Address",
      value: user.userEmail,
    },
  ];
  if (user.phoneNumber) {
    personalInfo = [
      ...personalInfo,
      {
        id: 11,
        field: "Phone Number",
        value: user.phoneNumber,
      },
    ];
  }
  personalInfo = [
    ...personalInfo,
    {
      id: 8,
      field: "Current Session",
      value: user.currentSession,
    },
    {
      id: 9,
      field: "Current term",
      value: user.currentTerm,
    },
  ];
  if (user.type === "student") {
    personalInfo = [
      ...personalInfo,
      {
        id: 7,
        field: "Current Class",
        value: user.currentClass,
      },
      {
        id: 10,
        field: "Class Teacher",
        value: user.classTeacher,
      },
    ];
  }
  return personalInfo;
};

export const getFatherInfo = (user) => {
  let fatherInfo = [];
  if (user.father) {
    const { father } = user;
    fatherInfo = [
      {
        id: 200,
        field: "Father's names",
        value: father.names,
      },
      {
        id: 210,
        field: "Father's Username",
        value: father.userName,
      },
      {
        id: 220,
        field: "Father's Email",
        value: father.email,
      },
      {
        id: 230,
        field: "Father's Phone",
        value: father.phoneNumber,
      },
      {
        id: 240,
        field: "Father's Occupation",
        value: father.occupation,
      },
    ];
  }
  return fatherInfo;
};

export const getMotherInfo = (user) => {
  let motherInfo = [];
  if (user.mother) {
    const { mother } = user;
    motherInfo = [
      {
        id: 2000,
        field: "Mother's names",
        value: mother.names,
      },
      {
        id: 2100,
        field: "Mother's Username",
        value: mother.userName,
      },
      {
        id: 2200,
        field: "Mother's Email",
        value: mother.email,
      },
      {
        id: 2300,
        field: "Mother's Phone",
        value: mother.phoneNumber,
      },
      {
        id: 2400,
        field: "Mother's Occupation",
        value: mother.occupation,
      },
    ];
  }
  return motherInfo;
};
