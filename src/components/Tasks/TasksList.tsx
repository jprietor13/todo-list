import { useTask } from "../../context/TaskContext";
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
  tasks?: Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  const {
    form,
    setForm,
    handleChange,
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
    <>
      <h3>Lista de tareas</h3>
      <FilterAndOrderTasks
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        sortByDate={sortByDate}
        setSortByDate={setSortByDate}
      />
      <div className="tasks-container">
        {/* Header */}
        <div className="task-grid task-header fw-bold border-bottom py-2">
          <div>#</div>
          <div>Título</div>
          <div>Descripción</div>
          <div>Fecha de vencimiento</div>
          <div>Estado</div>
          <div>Prioridad</div>
          <div>Opciones</div>
        </div>

        {/* Rows */}
        {filteredTasks.map((task, index) => (
          <div key={task.id} className="task-grid border-bottom py-2">
            {edit === task.id ? (
              <>
                <div>{index + 1}</div>
                <div>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={1}
                    className="form-control"
                  ></textarea>
                </div>
                <div>
                  <input
                    type="date"
                    name="expDate"
                    value={form.expDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <select
                    className="form-select"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="complete">Completado</option>
                  </select>
                </div>
                <div>
                  <select
                    className="form-select"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="high">Alta</option>
                    <option value="medium">Media</option>
                    <option value="low">Baja</option>
                  </select>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      handleEdit(task.id);
                      setEdit(0);
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEdit(0)}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>{index + 1}</div>
                <div>{task.title}</div>
                <div>{task.description}</div>
                <div>{task.expDate}</div>
                <div>
                  {task.status === "complete" ? "Completado" : "Pendiente"}
                </div>
                <div>
                  {task.priority === "high"
                    ? "Alta"
                    : task.priority === "medium"
                    ? "Media"
                    : "Baja"}
                </div>
                <div className="d-flex gap-2 flex-column flex-wrap">
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
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task.id)}
                    >
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
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TasksList;
