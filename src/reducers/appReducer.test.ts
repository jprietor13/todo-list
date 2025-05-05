import { todoReducer } from "./appReducer";
import { Action, State, Task } from "../typings/global";

describe("todoReducer unit tests", () => {
  let initialState: State;

  beforeEach(() => {
    initialState = [
      {
        id: 1,
        title: "Project 1",
        tasks: [
          {
            id: 1,
            title: "Task 1",
            description: "Description",
            expDate: "2025-01-01",
            status: "Pending",
            priority: "High",
          },
        ],
      },
      {
        id: 2,
        title: "Project 2",
        tasks: [
          {
            id: 2,
            title: "Task 2",
            description: "Description",
            expDate: "2025-01-02",
            status: "Completed",
            priority: "Low",
          },
        ],
      },
    ];
  });

  it("should create a new project", () => {
    const action: Action = {
      type: "CREATE",
      payload: { id: 3, title: "Project 3", tasks: [] },
    };

    const result = todoReducer(initialState, action);

    expect(result).toHaveLength(3);
    expect(result[2].title).toBe("Project 3");
  });

  it("should delete a project", () => {
    const action: Action = {
      type: "DELETE",
      payload: 1,
    };

    const result = todoReducer(initialState, action);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("should edit a project", () => {
    const action: Action = {
      type: "EDIT_TASK",
      payload: { id: 1, title: "Updated Project 1", tasks: [] },
    };

    const result = todoReducer(initialState, action);

    expect(result[0].title).toBe("Updated Project 1");
  });

  it("should edit a task within a project", () => {
    const action: Action = {
      type: "EDIT_TASK_PROJECT",
      payload: {
        projectId: 1,
        task: {
          id: 1,
          title: "Updated Task 1",
          description: "Updated description",
          expDate: "2025-01-03",
          status: "In Progress",
          priority: "Medium",
        },
      },
    };

    const result = todoReducer(initialState, action);

    expect(result[0]?.tasks[0].title).toBe("Updated Task 1");
    expect(result[0]?.tasks[0].status).toBe("In Progress");
  });

  it("should delete a task from a project", () => {
    const action: Action = {
      type: "DELETE_TASK_PROJECT",
      payload: {
        projectId: 1,
        taskId: 1,
      },
    };

    const result = todoReducer(initialState, action);

    expect(result[0].tasks).toHaveLength(0);
  });

  it("should move a task to another project", () => {
    const newTask: Task = {
      id: 3,
      title: "New Task",
      description: "Description",
      expDate: "2025-01-04",
      status: "Pending",
      priority: "High",
    };

    const action: Action = {
      type: "MOVE_TASK",
      payload: {
        projectId: 2,
        task: newTask,
      },
    };

    const result = todoReducer(initialState, action);

    expect(result[1]?.tasks).toHaveLength(2);
    expect(result[1]?.tasks[1].title).toBe("New Task");
  });
});
