import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { todoReducer } from "../reducers/appReducer";
import { useProject } from "./ProjectContext";

const TaskContext = createContext(null);

const initialData = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(todoReducer, [], initialData);
  const [edit, setEdit] = useState<number>(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortByDate, setSortByDate] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    expDate: "",
    status: "",
    priority: "",
  });

  const { dispatchProjects } = useProject();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      expDate: "",
      status: "",
      priority: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      id: new Date().getTime(),
      ...form,
    };

    dispatch({ type: "CREATE", payload: task });
    resetForm();
  };

  const handleEdit = (id) => {
    const updatedTask = {
      id,
      ...form,
    };

    dispatch({ type: "EDIT", payload: updatedTask });
    resetForm();
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const getFilteredTasks = (projectTasks?) => {
    let filtered = [...(projectTasks ?? tasks)];

    if (filterStatus !== "all") {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    if (filterPriority !== "all") {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }

    if (sortByDate) {
      filtered.sort(
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

  return (
    <TaskContext.Provider
      value={{
        form,
        setForm,
        handleChange,
        handleSubmit,
        handleEdit,
        resetForm,
        tasks,
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
