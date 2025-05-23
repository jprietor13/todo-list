import { useProject } from "../../context/ProjectContext";
import { useValidateForms } from "../../hooks/useValidateForms";

export const FormProject = () => {
  const { title, handleSubmit, handleChange } = useProject();
  const { error, setError, onSubmit } = useValidateForms(handleSubmit, title);

  return (
    <form onSubmit={onSubmit}>
      <div className="modal-body">
        <div className="mb-3">
          <strong>
            <label htmlFor="title" className="form-label">
              Titulo
            </label>
          </strong>
          <input
            type="text"
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={title}
            onChange={handleChange}
          />
          {error && (
            <div className="invalid-feedback">El título es obligatorio</div>
          )}
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
          data-bs-dismiss={title && "modal"}
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
