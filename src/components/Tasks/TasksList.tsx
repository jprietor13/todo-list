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
  console.log("🚀 ~ TasksList ~ filteredTasks:", filteredTasks);

  return (
    <>
      {filteredTasks.length !== 0 ? (
        <>
          <div className="d-flex justify-content-between w-100 align-items-center">
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
            {filteredTasks.map((task, index: number) => (
              <div key={task.id} className="task-grid border-bottom py-2">
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
        <h3 className="border border-secondary text-center rounded px-3 py-2 mt-4">
          No hay tareas creadas
        </h3>
      )}
    </>
  );
};

export default TasksList;
