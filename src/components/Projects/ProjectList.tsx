import { useProject } from "../../context/ProjectContext";
import TasksList from "../Tasks/TasksList";

const ProjectList = () => {
  const { projects, handleDelete, handleEdit, edit, setEdit, refTitle } =
    useProject();
  console.log("🚀 ~ ProjectList ~ projects:", projects);

  return (
    <>
      <div>Numero de proyectos: {projects && projects.length}</div>
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
                  {edit === project.id && (
                    <div>
                      <input
                        type="text"
                        defaultValue={project.title}
                        ref={refTitle}
                      />
                      <button
                        onClick={() => {
                          handleEdit(project.id);
                          setEdit(0);
                        }}
                      >
                        Guardar
                      </button>
                      <button onClick={() => setEdit(0)}>Cancelar</button>
                    </div>
                  )}
                  <button onClick={() => setEdit(project.id)}>Editar</button>
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
                  <div className="accordion-body">
                    {hasTasks !== 0 && <TasksList tasks={project.tasks} />}
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
