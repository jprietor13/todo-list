export const projectsReducer = (state = [], action: any) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return [...state, action.payload];

    case "DELETE_PROJECT": {
      return state.filter((item) => item.id !== action.payload);
    }

    case "EDIT_PROJECT": {
      const index = state.findIndex(
        (project) => project.id === action.payload.id
      );
      state[index] = action.payload;
      return [...state];
    }

    default:
      return state;
  }
};
