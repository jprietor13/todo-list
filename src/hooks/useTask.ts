import { useEffect, useReducer, useRef, useState } from "react";
import { todoReducer } from "../reducers/appReducer";
import { useProject } from "./useProject";

const initialData = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const useTask = () => {
  const [tasks, dispatch] = useReducer(todoReducer, [], initialData);
  const [edit, setEdit] = useState<number>(0);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortByDate, setSortByDate] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const refTitle = useRef("");
  const refDescription = useRef("");
  const refExpDate = useRef("");
  const refStatus = useRef("");
  const refPriority = useRef("");

  const { dispatchProjects } = useProject();

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

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (filterStatus) {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    if (filterPriority) {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }

    if (sortByDate) {
      filtered = filtered.sort(
        (a, b) => new Date(a.expDate).getTime() - new Date(b.expDate).getTime()
      );
    }

    return filtered;
  };

  const moveTaskToProject = (id: number, projectId: number) => {
    const taskToMove = tasks?.find((task) => task.id === id);

    if (!taskToMove) return;

    handleDelete(id);

    dispatchProjects({
      type: "MOVE_TASK",
      payload: {
        projectId,
        task: taskToMove,
      },
    });
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
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortByDate,
    setSortByDate,
    getFilteredTasks,
    moveTaskToProject,
  };
};
