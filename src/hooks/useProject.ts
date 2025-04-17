import { useEffect, useReducer, useRef, useState } from "react";
import { projectsReducer } from "../reducers/appReducer";

const initialData = () => {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
};

export const useProject = () => {
  const [projects, dispatch] = useReducer(projectsReducer, [], initialData);
  const [edit, setEdit] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);
  console.log("🚀 ~ useProject ~ projects:", projects);

  const refTitle = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const project = {
      id: new Date().getTime(),
      title: refTitle.current.value,
    };

    const action = {
      type: "CREATE_PROJECT",
      payload: project,
    };

    dispatch(action);
  };

  const handleEdit = (id) => {
    const value = refTitle.current.value;

    const editProject = {
      id,
      title: value,
    };

    const action = {
      type: "EDIT_PROJECT",
      payload: editProject,
    };

    dispatch(action);
  };

  const handleDelete = (id) => {
    const action = {
      type: "DELETE_PROJECT",
      payload: id,
    };

    dispatch(action);
  };

  return {
    refTitle,
    handleSubmit,
    projects,
    handleEdit,
    handleDelete,
    edit,
    setEdit,
  };
};
