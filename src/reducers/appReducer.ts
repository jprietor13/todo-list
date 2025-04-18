import { Action, State } from "../typings/global";

export const todoReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case "CREATE":
      return [...state, action.payload];

    case "DELETE": {
      return state.filter((item) => item.id !== action.payload);
    }

    case "EDIT": {
      const index = state.findIndex(
        (project) => project.id === action.payload.id
      );
      state[index] = action.payload;
      return [...state];
    }

    case "EDIT_TASK_PROJECT": {
      const { projectId, task } = action.payload;
      return state.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((t) => (t.id === task.id ? task : t)),
            }
          : project
      );
    }

    case "DELETE_TASK_PROJECT": {
      const { projectId, taskId } = action.payload;
      return state.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project?.tasks.filter((t) => t.id !== taskId),
            }
          : project
      );
    }

    case "MOVE_TASK": {
      const { projectId, task } = action.payload;
      return state.map((project) =>
        project.id === projectId
          ? { ...project, tasks: [...(project.tasks || []), task] }
          : project
      );
    }

    default:
      return state;
  }
};
