export const projectsReducer = (state = [], action: any) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return [...state, action.payload];
  }
};
