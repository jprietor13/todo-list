import { ContainerProps } from "../typings/global";

export const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <article className="empty-text-container">
        <h1>
          Aun no tiene proyectos en la lista, para crear un proyecto, de clic
          sobre el boton "Nuevo proyecto +"
        </h1>
      </article>
      {children}
    </>
  );
};
