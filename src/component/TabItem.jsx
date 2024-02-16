import React from "react";

const TabItem = ({ tab, setTabActive, tabActive, index }) => {
  const onTabClickHandler = (e) => {
    setTabActive(index);
  };

  return (
    <li
      className={index === tabActive ? "tab open" : "tab"}
      value={tab.value}
      onClick={onTabClickHandler}
    >
      {tab.name}
    </li>
  );
};

export default TabItem;
