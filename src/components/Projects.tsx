import ModalForm from "./ModalForm";

export const Projects = () => {
  return (
    <section className="todo-project-container">
      <div className="empty-text-container">
        <h1>
          Aun no tiene proyectos en la lista, para crear un proyecto, de clic
          sobre el boton "Nuevo proyecto +"
        </h1>
      </div>
      <div className="new-proyect-container">
        <ModalForm idModal="createProject" />
      </div>
    </section>
  );
};
