import "./App.css";
import { ProjectProvider } from "./context/ProjectContext";
import RouteApp from "./routes/RouteApp";

function App() {
  return (
    <ProjectProvider>
      <main className="layout">
        <RouteApp />
      </main>
    </ProjectProvider>
  );
}

export default App;
