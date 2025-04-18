import { createContext, useContext, useReducer, useRef, useEffect, useState } from "react";
import { todoReducer } from "../reducers/appReducer";

const ProjectContext = createContext(null);

const initialData = () => {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
};

export const ProjectProvider = ({ children }) => {
  const [projects, dispatch] = useReducer(todoReducer, [], initialData);
  const [edit, setEdit] = useState(0);
  const refTitle = useRef("");

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleSubmit = () => {
    const title = refTitle.current.value.trim();
    if (!title) return;

    const project = {
      id: new Date().getTime(),
      title,
      tasks: [],
    };

    dispatch({ type: "CREATE", payload: project });
    refTitle.current.value = "";
  };

  const handleEdit = (id) => {
    const title = refTitle.current.value;
    dispatch({ type: "EDIT", payload: { id, title } });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <ProjectContext.Provider
      value={{ projects, dispatch, refTitle, handleSubmit, handleEdit, handleDelete, edit, setEdit }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProject must be used within a ProjectProvider");
  return context;
};
