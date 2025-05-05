import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { todoReducer } from "../reducers/appReducer";
import { ProjectContextType, ProjectProviderProps } from "../typings/global";

const ProjectContext = createContext<ProjectContextType | null>(null);

const initialData = () => {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, dispatch] = useReducer(todoReducer, [], initialData);
  const [edit, setEdit] = useState(0);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const project = {
      id: new Date().getTime(),
      title: trimmedTitle,
      tasks: [],
    };

    dispatch({ type: "CREATE", payload: project });
    setTitle("");
  };

  const handleEdit = (id: number) => {
    const project = projects?.find((project) => project.id === id);
    if (!project) return;

    setTitle(project.title);
    dispatch({ type: "EDIT_PROJECT", payload: { id, title } });
    setEdit(id);
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        dispatch,
        title,
        setTitle,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleChange,
        edit,
        setEdit,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("Error en el project context");
  return context;
};
