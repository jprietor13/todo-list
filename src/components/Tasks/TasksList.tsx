import { useTask } from "../../hooks/useTask";
import { useProject } from "../../context/ProjectContext";
import FilterAndOrderTasks from "./FilterAndOrderTasks";

type Task = {
  id: number;
  title: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  expDate: string;
};

interface TasksListProps {
  tasks?: Task[]; // opcional
}

const TasksList = ({ tasks }: TasksListProps) => {
  const {
    refTitle,
    refDescription,
    refExpDate,
    refStatus,
    refPriority,
    handleEdit,
    handleDelete,
    edit,
    setEdit,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortByDate,
    setSortByDate,
    getFilteredTasks,
    moveTaskToProject,
  } = useTask();

  const { projects } = useProject();
  const filteredTasks = getFilteredTasks(tasks);

  return (
    <table className="table caption-top">
      <caption>
        <h2>Lista de tareas</h2>
        <FilterAndOrderTasks
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          sortByDate={sortByDate}
          setSortByDate={setSortByDate}
        />
      </caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Título</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha de vencimiento</th>
          <th scope="col">Estado</th>
          <th scope="col">Prioridad</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <>
          {filteredTasks.map((task, index) => (
            <tr>
              {edit === task.id ? (
                <>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input
                      type="text"
                      defaultValue={task.title}
                      ref={refTitle}
                    />
                  </td>
                  <td>
                    <textarea
                      defaultValue={task.description}
                      ref={refDescription}
                      rows={3}
                    ></textarea>
                  </td>
                  <td>
                    <input
                      type="date"
                      defaultValue={task.expDate}
                      ref={refExpDate}
                    />
                  </td>
                  <td>
                    <select
                      className="form-select"
                      defaultValue={task.status}
                      aria-label="status"
                      ref={refStatus}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="complete">Completado</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      defaultValue={task.priority}
                      aria-label="Default select example"
                      ref={refPriority}
                    >
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(task.id);
                        setEdit(0);
                      }}
                    >
                      Guardar
                    </button>
                    <button onClick={() => setEdit(0)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.expDate}</td>
                  <td>
                    {task.status === "complete" ? "Completado" : "Pendiente"}
                  </td>
                  <td>
                    {task.priority === "high"
                      ? "Alto"
                      : task.priority === "medium"
                      ? "Medio"
                      : task.priority === "low"
                      ? "Bajo"
                      : ""}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setEdit(task.id);
                      }}
                    >
                      Editar
                    </button>
                    <button onClick={() => handleDelete(task.id)}>
                      Eliminar
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Mover a
                      </button>
                      <ul className="dropdown-menu">
                        {projects?.map((project) => (
                          <li key={project.id}>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                moveTaskToProject(task.id, project.id)
                              }
                            >
                              {project.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};

export default TasksList;
