import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import DropdownList from "./DropDownList";
import { Menu } from "@material-ui/icons";
import classes from "../styles/Dropdown.module.css";

function DropdownLink() {
  const [showDropdown, setShowDropdown] = useState(false);

  DropdownLink.handleClickOutside = () => {
    setShowDropdown(false);
  };

  return (
    <div className={classes.dropdown}>
      <Menu
        className={classes.menuIcon}
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown ? <DropdownList /> : null}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => DropdownLink.handleClickOutside,
};

export default onClickOutside(DropdownLink, clickOutsideConfig);
