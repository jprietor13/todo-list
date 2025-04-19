import { useProject } from "../../context/ProjectContext";
import TasksList from "../Tasks/TasksList";

const ProjectList = () => {
  const {
    projects,
    handleDelete,
    handleEdit,
    edit,
    setEdit,
    title,
    handleChange,
  } = useProject();
  console.log("🚀 ~ ProjectList ~ title:", title);
  return (
    <>
      <div className="task-header">
        <h3 className="mt-3 mb-3">Lista de proyectos</h3>
        <h3>
          Proyectos: <strong>{projects && projects.length}</strong>
        </h3>
      </div>
      <div className="accordion" id="accordionExample">
        {projects &&
          projects.map((project, index) => {
            const isFirst = index === 0;
            const collapseId = `collapse-${project.id}`;
            const headingId = `heading-${project.id}`;
            const hasTasks = project.tasks?.length;

            return (
              <div className="accordion-item" key={project.id}>
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className={`accordion-button ${
                      !isFirst ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={isFirst ? "true" : "false"}
                    aria-controls={collapseId}
                  >
                    {edit !== project.id && project.title}
                  </button>
                  <div className="container-btn-accordion">
                    <button
                      onClick={() => setEdit(project.id)}
                      className="btn btn-primary me-1"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-secondary"
                    >
                      Eliminar
                    </button>
                  </div>
                  {edit === project.id && (
                    <div className="container-opt-project">
                      <div className="container-input">
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          value={title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="container-options">
                        <button
                          onClick={() => {
                            handleEdit(project.id);
                            setEdit(0);
                          }}
                          className="btn btn-primary me-1"
                        >
                          Guardar
                        </button>
                      </div>
                      <button
                        onClick={() => setEdit(0)}
                        className="btn btn-secondary"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${
                    isFirst ? "show" : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {hasTasks !== 0 ? (
                      <TasksList tasks={project.tasks} />
                    ) : (
                      <h3 className="text-center">Sin tareas</h3>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProjectList;
