import { useTask } from "../../hooks/useTask";

export const FormTask = () => {
  const {
    refTitle,
    refDescription,
    refExpDate,
    refStatus,
    refPriority,
    handleSubmit,
  } = useTask();

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
        <div className="mb-3">
          <input
            type="date"
            name=""
            id=""
            className="form-control"
            ref={refExpDate}
          />
        </div>
        <div className="mb-3">
          <select className="form-select" aria-label="status" ref={refStatus}>
            <option selected>Estado</option>
            <option value="pending">Pendiente</option>
            <option value="complete">Completado</option>
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            ref={refPriority}
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
