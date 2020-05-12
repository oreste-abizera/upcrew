import React from "react";
import styled from "styled-components";
import { UserContext } from "../../../../context/UserContext";

export default function UsersFilters({ children, userClass }) {
  const {
    searchClass,
    searchTerm,
    searchCountry,
    handleClass,
    handleTerm,
    handleCountry,
    classes,
    users,
  } = React.useContext(UserContext);
  let tempCountries = new Set();
  for (let country = 0; country < users.length; country++) {
    const element = users[country].userCountry;
    tempCountries.add(element);
  }
  tempCountries = [...tempCountries];
  return (
    <UsersFiltersWrapper>
      <div className="container-fluid mt-3">
        <div className="d-md-flex">
          {/* single input */}
          <div className="form-group col-md-4">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              className="form-control"
              id="search"
              value={searchTerm}
              onChange={handleTerm}
            ></input>
          </div>
          {/* end of single input */}
          {/* single input */}
          {userClass ? (
            <div className="form-group col-md-4">
              <label htmlFor="class">Select Class</label>
              <select
                className="form-control"
                id="class"
                value={searchClass}
                onChange={handleClass}
              >
                <option value="all">All</option>
                {classes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="form-group col-md-4">
              <label htmlFor="country">Select Country</label>
              <select
                className="form-control"
                id="country"
                value={searchCountry}
                onChange={handleCountry}
              >
                <option value="all">All</option>
                {tempCountries.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* end of single input */}
          {/* children */}
          <div className="col-md-4 mt-md-4">{children}</div>
          {/* end of children */}
        </div>
      </div>
    </UsersFiltersWrapper>
  );
}

const UsersFiltersWrapper = styled.div``;

UsersFilters.defaultProps = {
  userClass: false,
};
