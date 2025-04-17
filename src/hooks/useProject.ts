import { useEffect, useReducer, useRef, useState } from "react";
import { projectsReducer } from "../reducers/appReducer";

const initialData = () => {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
};

export const useProject = () => {
  const [projects, dispatch] = useReducer(projectsReducer, [], initialData);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const refTitle = useRef("");
  const refDescription = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const project = {
      id: new Date().getTime(),
      title: refTitle.current.value,
      description: refDescription.current.value,
    };

    const action = {
      type: "CREATE_PROJECT",
      payload: project,
    };

    dispatch(action);
  };

  return { refTitle, refDescription, handleSubmit, projects };
};
