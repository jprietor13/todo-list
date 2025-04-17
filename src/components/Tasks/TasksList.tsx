import { useTask } from "../../hooks/useTask";

const TasksList = () => {
  const { tasks } = useTask();
  console.log("🚀 ~ TasksList ~ tasks:", tasks);

  return (
    <table class="table caption-top">
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
        {tasks &&
          tasks.map((task, index) => (
            <tr>
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
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TasksList;
