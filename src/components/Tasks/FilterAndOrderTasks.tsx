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
    <div className="container-filters">
      <div className="mb-3 mx-1">
        <label htmlFor="filterStatus" className="form-label">
          Estado
        </label>
        <select
          id="filterStatus"
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="pending">Pendiente</option>
          <option value="complete">Completado</option>
        </select>
      </div>

      <div className="mb-3 mx-1">
        <label htmlFor="filterPriority" className="form-label">
          Prioridad
        </label>
        <select
          id="filterPriority"
          className="form-select"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>
      <div className="mb-3 mx-1">
        <button
          className="btn btn-secondary"
          onClick={() => setSortByDate(!sortByDate)}
        >
          {sortByDate ? "Orden: Fecha ↑" : "Orden: Fecha ↓"}
        </button>
      </div>
      <div className="mb-3 mx-1">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setFilterStatus("all");
            setFilterPriority("all");
            setSortByDate(false);
          }}
        >
          Borrar filtros
        </button>
      </div>
    </div>
  );
};

export default FilterAndOrderTasks;
