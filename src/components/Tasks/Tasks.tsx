import { Container } from "../Container";
import ModalForm from "../ModalForm";
import { FormTask } from "./FormTask";
import TasksList from "./TasksList";

export const Tasks = () => {
  return (
    <section className="todo-project-container">
      <Container>
        <ModalForm idModal="createTask" title="Nueva tarea">
          <FormTask />
        </ModalForm>
        <TasksList />
      </Container>
    </section>
  );
};
