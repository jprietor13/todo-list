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
    setTitle,
    handleChange,
  } = useProject();

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
                    <div className="container-btn-accordion">
                      <span
                        onClick={() => {
                          setEdit(project.id);
                          setTitle(project.title);
                        }}
                        className="btn btn-primary me-1"
                      >
                        Editar
                      </span>
                      <span
                        onClick={() => handleDelete(project.id)}
                        className="btn btn-secondary"
                      >
                        Eliminar
                      </span>
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
                          <span
                            onClick={() => {
                              handleEdit(project.id);
                              setEdit(0);
                            }}
                            className="btn btn-primary me-1"
                          >
                            Guardar
                          </span>
                        </div>
                        <span
                          onClick={() => setEdit(0)}
                          className="btn btn-secondary"
                        >
                          Cancelar
                        </span>
                      </div>
                    )}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${
                    isFirst ? "show" : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {project.tasks?.length ? (
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
