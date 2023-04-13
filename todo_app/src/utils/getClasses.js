// this is the getClasses function which is utilities for using multiple classes in the form of array
// in this function we filter the empty items if it is empty or else it will not filter
// then we join the classes with space
// atlast we will remove empty spaces if existed with trim

export const getClasses = (classes) => {
  return classes
    .filter((item) => item !== "")
    .join(" ")
    .trim();
};
