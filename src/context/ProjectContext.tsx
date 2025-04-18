import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useState,
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
  const refTitle = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!refTitle?.current) return;

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

  const handleEdit = (id: number) => {
    if (!refTitle?.current) return;

    const title = refTitle?.current?.value;

    const project = projects?.find((project) => project.id === id);

    if (!project) return;

    dispatch({ type: "EDIT", payload: { id, title, tasks: project.tasks } });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        dispatch,
        refTitle,
        handleSubmit,
        handleEdit,
        handleDelete,
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
