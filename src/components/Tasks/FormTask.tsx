import { useTask } from "../../context/TaskContext";
import { useValidateForms } from "../../hooks/useValidateForms";

export const FormTask = () => {
  const { form, handleChange, handleSubmit } = useTask();
  const { error, setError, onSubmit } = useValidateForms(
    handleSubmit,
    form.title
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="modal-body">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>
              Título <span style={{ color: "red" }}>*</span>
            </strong>
          </label>
          <input
            type="text"
            className={`form-control ${error ? "is-invalid" : ""}`}
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          {error && (
            <div className="invalid-feedback">El nombre es obligatorio</div>
          )}
        </div>
        <div className="mb-3">
          <strong>
            <label htmlFor="title" className="form-label">
              Descripción
            </label>
          </strong>
          <textarea
            className="form-control"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <strong>
            <label htmlFor="title" className="form-label">
              Fecha de vencimiento
            </label>
          </strong>
          <input
            type="date"
            className="form-control"
            name="expDate"
            value={form.expDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <strong>
            <label htmlFor="title" className="form-label">
              Estado
            </label>
          </strong>
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending" selected>
              Pendiente
            </option>
            <option value="complete">Completado</option>
          </select>
        </div>
        <div className="mb-3">
          <strong>
            <label htmlFor="title" className="form-label">
              Prioridad
            </label>
          </strong>
          <select
            className="form-select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="high" selected>
              Alta
            </option>
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
          onClick={() => setError(false)}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          data-bs-dismiss={form.title && "modal"}
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
