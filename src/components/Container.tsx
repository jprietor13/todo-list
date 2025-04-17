type ContainerPropd = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerPropd) => {
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
