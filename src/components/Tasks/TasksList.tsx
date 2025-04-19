import { useTask } from "../../context/TaskContext";
import FilterAndOrderTasks from "./FilterAndOrderTasks";
import { EditTask } from "./EditTask";
import { DetailsTask } from "./DetailsTask";

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
    edit,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortByDate,
    setSortByDate,
    getFilteredTasks,
  } = useTask();

  const filteredTasks = getFilteredTasks(tasks);
  return (
    <>
      <div className="d-block d-lg-flex justify-content-between w-100 align-items-center">
        <h3>
          Tareas: <strong>{filteredTasks.length}</strong>
        </h3>
        <FilterAndOrderTasks
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          sortByDate={sortByDate}
          setSortByDate={setSortByDate}
        />
      </div>
      {filteredTasks.length !== 0 ? (
        <>
          <div className="tasks-container">
            <div className="task-grid task-header fw-bold border-bottom py-2 d-none d-md-grid text-center">
              <div className="d-none d-lg-block">#</div>
              <div className="d-none d-lg-block">Título</div>
              <div className="d-none d-lg-block">Descripción</div>
              <div className="d-none d-lg-block">Fecha de vencimiento</div>
              <div className="d-none d-lg-block">Estado</div>
              <div className="d-none d-lg-block">Prioridad</div>
              <div className="d-none d-lg-block">Opciones</div>
            </div>
            {filteredTasks.map((task, index: number) => (
              <div
                key={task.id}
                className="task-grid border-bottom py-2 text-lg-center"
              >
                {edit === task.id ? (
                  <EditTask index={index} task={task} />
                ) : (
                  <DetailsTask index={index} task={task} />
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="border border-secondary text-center rounded px-3 py-2 mt-4">
            No hay tareas creadas
          </h3>
        </>
      )}
    </>
  );
};

export default TasksList;
