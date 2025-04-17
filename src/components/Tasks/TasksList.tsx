import { useTask } from "../../hooks/useTask";

const TasksList = () => {
  const {
    tasks,
    edit,
    setEdit,
    refTitle,
    refDescription,
    refExpDate,
    refStatus,
    refPriority,
    handleEdit,
    handleDelete,
  } = useTask();
  console.log("🚀 ~ TasksList ~ tasks:", tasks);

  return (
    <table className="table caption-top">
      <caption>Lista de tareas</caption>
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
          {tasks &&
            tasks.map((task, index) => (
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
                    <td>{task.status}</td>
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
