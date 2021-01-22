import React from "react";
import Tag from "./tag";

import classes from './tagList.css';

const TagList = (props) => {
  // Destructure the props object into variables
  const { categoriesListData } = props;

  const { categories } = categoriesListData;

  if(!categories){
      return null;
  }

  // Convert the array of tag strings into a list of Tag components
  const tagList = categories.map((category) => {
    return <Tag key={category.name} value={category} />;
  });

  // Returns the list of Tag components inside a ul container
  return <div className={classes.root}>{tagList}</div>;
};

export default TagList;
