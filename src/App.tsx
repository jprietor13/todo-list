import "./App.css";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import RouteApp from "./routes/RouteApp";

function App() {
  return (
    <ProjectProvider>
      <TaskProvider>
        <main className="layout">
          <RouteApp />
        </main>
      </TaskProvider>
    </ProjectProvider>
  );
}

export default App;
