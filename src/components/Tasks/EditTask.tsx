import { useTask } from "../../context/TaskContext";

export const EditTask = ({ index, task }) => {
  const { form, handleChange, handleEdit, setEdit } = useTask();

  return (
    <>
      <div>{index + 1}</div>
      <div>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={1}
          className="form-control"
        ></textarea>
      </div>
      <div>
        <input
          type="date"
          name="expDate"
          value={form.expDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div>
        <select
          className="form-select"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pendiente</option>
          <option value="complete">Completado</option>
        </select>
      </div>
      <div>
        <select
          className="form-select"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>
      <div className="d-flex gap-2 flex-wrap">
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            handleEdit(task.id);
            setEdit(0);
          }}
        >
          Guardar
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setEdit(0)}>
          Cancelar
        </button>
      </div>
    </>
  );
};
