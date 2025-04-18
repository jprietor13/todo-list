import { TaskContextType } from "../../typings/global";

const FilterAndOrderTasks: React.FC<TaskContextType> = ({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  sortByDate,
  setSortByDate,
}) => {
  return (
    <div>
      <select
        className="form-select"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">Filtrar por estado</option>
        <option value="pending">Pendiente</option>
        <option value="complete">Completado</option>
      </select>

      <select
        className="form-select"
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="">Filtrar por prioridad</option>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </select>

      <button
        className="btn btn-secondary"
        onClick={() => setSortByDate(!sortByDate)}
      >
        {sortByDate ? "Orden: Fecha ↑" : "Orden: Fecha ↓"}
      </button>
    </div>
  );
};

export default FilterAndOrderTasks;
