import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { todoReducer } from "../reducers/appReducer";
import { useProject } from "./ProjectContext";
import { ProjectProviderProps, Task, TaskContextType } from "../typings/global";

const TaskContext = createContext<TaskContextType | null>(null);

const initialData = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const TaskProvider = ({ children }: ProjectProviderProps) => {
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

  const { dispatch: dispatchProjects, projects } = useProject();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const task = {
      id: new Date().getTime(),
      ...form,
    };

    dispatch({ type: "CREATE", payload: task });
    resetForm();
  };

  const handleEdit = (id: number) => {
    const updatedTask = {
      id,
      ...form,
    };
    console.log(form);
    const project = findProjectByTask(id);

    if (project) {
      dispatchProjects({
        type: "EDIT_TASK_PROJECT",
        payload: { projectId: project.id, task: updatedTask },
      });
    } else {
      dispatch({ type: "EDIT", payload: updatedTask });
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    const project = findProjectByTask(id);

    if (project) {
      dispatchProjects({
        type: "DELETE_TASK_PROJECT",
        payload: { projectId: project.id, taskId: id },
      });
    } else {
      dispatch({ type: "DELETE", payload: id });
    }
  };

  const getFilteredTasks = (projectTasks: Task[]) => {
    const noFilters =
      filterStatus === "all" &&
      filterPriority === "all" &&
      sortByDate === false;

    if (noFilters) return [...(projectTasks ?? tasks)];

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
    let taskToMove: Task | undefined = tasks?.find((task) => task.id === id);

    if (taskToMove) {
      handleDelete(id);
    } else {
      const currentProject = projects?.find((project) =>
        project.tasks?.some((task) => task.id === id)
      );

      if (!currentProject?.tasks) return;

      taskToMove = currentProject?.tasks.find((task) => task.id === id) as Task;

      if (!taskToMove) return;

      dispatchProjects({
        type: "DELETE_TASK_PROJECT",
        payload: {
          projectId: currentProject.id,
          taskId: id,
        },
      });
    }

    dispatchProjects({
      type: "MOVE_TASK",
      payload: {
        projectId: projectId,
        task: taskToMove,
      },
    });
  };

  const findProjectByTask = (id) => {
    const search = projects?.find((project) => {
      return project.tasks?.some((task) => task.id === id);
    });
    return search;
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

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("Error en el task context");
  }

  return context;
};
