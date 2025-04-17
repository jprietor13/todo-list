import { useEffect, useReducer, useRef, useState } from "react";
import { todoReducer } from "../reducers/appReducer";

const initialData = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const useTask = () => {
  const [tasks, dispatch] = useReducer(todoReducer, [], initialData);
  const [edit, setEdit] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const refTitle = useRef("");
  const refDescription = useRef("");
  const refExpDate = useRef("");
  const refStatus = useRef("");
  const refPriority = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const project = {
      id: new Date().getTime(),
      title: refTitle.current.value,
      description: refDescription.current.value,
      expDate: refExpDate.current.value,
      status: refStatus.current.value,
      priority: refPriority.current.value,
    };

    const action = {
      type: "CREATE",
      payload: project,
    };

    dispatch(action);
  };

  const handleEdit = (id) => {
    const title = refTitle.current.value;
    const description = refDescription.current.value;
    const expDate = refExpDate.current.value;
    const status = refStatus.current.value;
    const priority = refPriority.current.value;

    const editProject = {
      id,
      title: title,
      description: description,
      expDate: expDate,
      status: status,
      priority: priority,
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
    refDescription,
    refExpDate,
    refStatus,
    refPriority,
    handleSubmit,
    tasks,
    handleEdit,
    handleDelete,
    edit,
    setEdit,
  };
};
