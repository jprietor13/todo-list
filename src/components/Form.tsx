export const Form = () => {
  return (
    <>
      <div className="modal-body">
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Nombre" />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows={3}
            placeholder="Descripción"
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
        <button type="button" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </>
  );
};
