import { useProject } from "../hooks/useProject";

export const Form = () => {
  const { refTitle, refDescription, handleSubmit } = useProject();

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
        <div className="mb-3">
          <textarea
            className="form-control"
            rows={3}
            placeholder="Descripción"
            ref={refDescription}
          ></textarea>
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
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};
