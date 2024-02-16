import React, { useEffect, useRef, useState } from "react";
import ButtonWrapper from "./ButtonWrapper";
import Pill from "./Pill";
import { useDispatch } from "react-redux";
import { storeTeamDetails } from "../store/storedData";
import { incrementStep } from "../store/stepSlice";
import SliderButton from "./SliderButton";

const StepSixth = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  let [teamList, setTeamList] = useState([]);

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = () => {
      setActiveSuggestion(0);
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error(err);
        });
    };

    fetchUsers();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.users.length
    ) {
      handleSelectUser(suggestions.users[activeSuggestion]);
    }
  };

  const onAddHandler = () => {
    setTeamList([...teamList, ...selectedUsers]);
    setSelectedUsers([]);
  };

  // Delete List Item
  const onDeleteListHandler = (e) => {
    let deleteItem = e.currentTarget.value;

    teamList = teamList.filter((item) => {
      return item.id !== Number(deleteItem);
    });
    setTeamList(teamList);
  };

  // On submitting the form
  const onSubmitHandler = () => {
    dispatch(incrementStep());
    dispatch(storeTeamDetails(teamList));
  };

  return (
    <>
      <div className="team-screen">
        <div className="form-heading-wrapper">
          <h2>Teams</h2>
          <p>Invite or Add a person</p>
        </div>
        <div className="user-search-container">
          <div className="user-search-input">
            {/* Pills */}
            <div className="searched-values">
              {selectedUsers.map((user) => {
                return (
                  <Pill
                    key={user.email}
                    image={user.image}
                    text={`${user.firstName} ${user.lastName}`}
                    onClick={() => handleRemoveUser(user)}
                  />
                );
              })}
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            {/* input feild with search suggestions */}

            <div className="search">
              <div className="team-form">
                <button type="button" onClick={onAddHandler}>
                  Add
                </button>
              </div>
            </div>
            {/* Search Suggestions */}
            <ul
              className={
                searchTerm === "" ? "suggestions-list" : "suggestions-list show"
              }
            >
              {suggestions?.users?.map((user, index) => {
                return !selectedUserSet.has(user.email) ? (
                  <li
                    className={index === activeSuggestion ? "active" : ""}
                    key={user.email}
                    onClick={() => handleSelectUser(user)}
                  >
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                ) : (
                  <></>
                );
              })}
            </ul>
          </div>
        </div>
        <ul className="teamList">
          {teamList.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.firstName}</span>
                <button
                  className="img_wrapper"
                  value={item.id}
                  onClick={onDeleteListHandler}
                >
                  <img src={window.location.origin + "/delete-icon.png"} />
                </button>
              </li>
            );
          })}
        </ul>
        {teamList.length === 0 && (
          <p className="teamlist-empty">Please add some team members.....</p>
        )}
      </div>
      <ButtonWrapper onSubmitHandler={onSubmitHandler} />
      <SliderButton />
    </>
  );
};

export default StepSixth;
