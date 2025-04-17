import { Container } from "../Container";
import ModalForm from "../ModalForm";
import { FormProject } from "./FormProject";
import ProjectList from "./ProjectList";

export const Projects = () => {
  return (
    <section className="todo-project-container">
      <Container>
        <ModalForm idModal="createProject" title="Nuevo proyecto">
          <FormProject />
        </ModalForm>
        <ProjectList />
      </Container>
    </section>
  );
};
