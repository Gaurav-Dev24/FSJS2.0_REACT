import React from "react";
import styles from "../styles/modules/button.module.css";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  //   the value should exactly match with the class name in css "primary" or "secondary"
  primary: "primary",
  secondary: "secondary",
};

// here we use a prop called variant for getting the primary variant of button
// here again rest is used to provide multiple props to the button
const Button = ({ children, variant, type, ...rest }) => {
  return (
    // here we are using the "getClasses function for multiple classes" e.g. "style.button" & "style[buttonTypes[variant]]"
    // we are using the above object "buttonType" to declare the variant of the button
    // there are two different types of button in the project which are "submit" and normal "button"
    // for that we have used a prop type in button to change or get the different type
    <button
      type={type === "submit" ? "submit" : "button"}
      {...rest}
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
    >
      {children}
    </button>
  );
};

// here is the select button defined fro multiple status of task "incomplete", "complete" 
// it is almost similar to above button
function SelectButton({ children, ...rest }) {
  return (
    <select
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
}
export {SelectButton};
export default Button;
