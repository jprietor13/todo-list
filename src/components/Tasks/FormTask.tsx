import { useTask } from "../../context/TaskContext";

export const FormTask = () => {
  const { form, handleChange, handleSubmit } = useTask();

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="modal-body">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows={3}
            placeholder="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            name="expDate"
            value={form.expDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option selected>Estado</option>
            <option value="pending">Pendiente</option>
            <option value="complete">Completado</option>
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option selected>Prioridad</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          data-bs-dismiss="modal"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
