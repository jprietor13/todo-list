import { useProject } from "../../hooks/useProject";

export const FormProject = () => {
  const { refTitle, handleSubmit } = useProject();

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="modal-body">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            ref={refTitle}
          />
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
