import { useProject } from "../hooks/useProject";

const ProjectList = () => {
  const { projects, handleDelete, handleEdit } = useProject();

  return (
    <>
      <div>Numero de proyectos: {projects && projects.length}</div>
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
                    {project.title}
                  </button>
                  <input type="text" />
                  <button onClick={(e) => handleEdit(e, project.id)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(project.id)}>
                    Eliminar
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${
                    isFirst ? "show" : ""
                  }`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">TODO</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProjectList;
