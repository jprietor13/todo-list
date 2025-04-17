import { useProject } from "../hooks/useProject";

const ProjectList = () => {
  const { projects } = useProject();
  console.log("🚀 ~ ProjectList ~ projects:", projects);

  return <div>ProjectList</div>;
};

export default ProjectList;
