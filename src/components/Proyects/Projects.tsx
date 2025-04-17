import ModalForm from "../ModalForm";
import ProjectList from "./ProjectList";

export const Projects = () => {
  return (
    <section className="todo-project-container">
      <article className="empty-text-container">
        <h1>
          Aun no tiene proyectos en la lista, para crear un proyecto, de clic
          sobre el boton "Nuevo proyecto +"
        </h1>
      </article>
      <article className="new-proyect-container">
        <ModalForm idModal="createProject" />
        <ProjectList />
      </article>
    </section>
  );
};
