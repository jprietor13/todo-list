import { useProject } from "../../context/ProjectContext";
import { useTask } from "../../context/TaskContext";

export const DetailsTask = ({ index, task }) => {
  const { setEdit, setForm, handleDelete, moveTaskToProject } = useTask();

  const { projects } = useProject();

  return (
    <>
      <div>{index + 1}</div>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.expDate}</div>
      <div
        className={`px-2 py-1 rounded text-white ${
          task.status === "complete" ? "bg-success" : "bg-danger"
        }`}
      >
        {task.status === "complete" ? "Completado" : "Pendiente"}
      </div>
      <div
        className={`px-2 py-1 rounded text-white w-50 ${
          task.priority === "high"
            ? "bg-danger"
            : task.priority === "medium"
            ? "bg-warning text-dark"
            : "bg-info"
        }`}
      >
        {task.priority === "high"
          ? "Alta"
          : task.priority === "medium"
          ? "Media"
          : "Baja"}
      </div>
      <div className="d-flex gap-2 flex-row flex-wrap">
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setEdit(task.id);
              setForm({
                title: task.title,
                description: task.description,
                expDate: task.expDate,
                status: task.status,
                priority: task.priority,
              });
            }}
          >
            <i
              className="bi bi-pencil-square"
              style={{ paddingRight: "2px" }}
            ></i>{" "}
            Editar
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(task.id)}
          >
            <i class="bi bi-trash3-fill" style={{ paddingRight: "2px" }}></i>
            Eliminar
          </button>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Mover a
          </button>
          <ul className="dropdown-menu">
            {projects
              ?.filter((p) => !p.tasks?.some((t) => t.id === task.id))
              .map((project) => (
                <li key={project.id}>
                  <button
                    className="dropdown-item"
                    onClick={() => moveTaskToProject(task.id, project.id)}
                  >
                    {project.title}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
