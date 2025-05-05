import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Task {
  id?: number;
  title: string;
  description: string;
  expDate: string;
  status: string;
  priority: string;
}

export interface Project {
  id: number;
  title: string;
  tasks: Task[] | undefined;
}

export type ModalFormProps = {
  idModal: string;
  children: React.ReactNode;
  title: string;
};

export type State = Project[];

export type Action =
  | { type: "CREATE"; payload: Project }
  | { type: "DELETE"; payload: number }
  | { type: "EDIT_TASK"; payload: Project }
  | { type: "EDIT_PROJECT"; payload: Project }
  | { type: "EDIT_TASK_PROJECT"; payload: { projectId: number; task: Task } }
  | {
      type: "DELETE_TASK_PROJECT";
      payload: { projectId: number; taskId: number };
    }
  | { type: "MOVE_TASK"; payload: { projectId: number; task: Task } };

/**Typing Contexts */

export interface ProjectContextType {
  projects: Project[];
  dispatch: React.Dispatch<any>;
  title: string;
  setTitle: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  edit: number;
  setEdit: React.Dispatch<React.SetStateAction<number>>;
}

export interface TaskContextType {
  form: Task;
  setForm: Dispatch<SetStateAction<Task>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEdit: (id: number | undefined) => void;
  resetForm: () => void;
  tasks: Task[];
  handleDelete: (id: number | undefined) => void;
  edit: number;
  setEdit: Dispatch<SetStateAction<number | undefined>>;
  filterStatus: string;
  setFilterStatus: Dispatch<SetStateAction<string>>;
  filterPriority: string;
  setFilterPriority: Dispatch<SetStateAction<string>>;
  sortByDate: boolean;
  setSortByDate: Dispatch<SetStateAction<boolean>>;
  getFilteredTasks: (projectTasks: Task[]) => Task[];
  moveTaskToProject: (id: number | undefined, projectId: number) => void;
}

export interface ProjectProviderProps {
  children: ReactNode;
}

export type ContainerProps = {
  children: React.ReactNode;
};
