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
  );
};

export default TasksList;
