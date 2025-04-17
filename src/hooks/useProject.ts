import { useEffect, useReducer, useRef, useState } from "react";
import { todoReducer } from "../reducers/appReducer";

const initialData = () => {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
};

export const useProject = () => {
  const [projects, dispatch] = useReducer(todoReducer, [], initialData);
  const [edit, setEdit] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const refTitle = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const project = {
      id: new Date().getTime(),
      title: refTitle.current.value,
    };

    const action = {
      type: "CREATE",
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
      type: "EDIT",
      payload: editProject,
    };

    dispatch(action);
  };

  const handleDelete = (id) => {
    const action = {
      type: "DELETE",
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
