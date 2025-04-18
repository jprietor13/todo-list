export const todoReducer = (state = [], action: any) => {
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
