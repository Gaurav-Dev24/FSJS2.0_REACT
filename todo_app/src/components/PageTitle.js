import React from "react";
import style from "../styles/modules/title.module.css";

const PageTitle = ({ children, ...rest }) => {
  // This the title of the Page
  // we use ...rest for passing multiple props to "p" tag below

  return (
    <p className={style.title} {...rest}>
      {children}
    </p>
  );
};

export default PageTitle;
