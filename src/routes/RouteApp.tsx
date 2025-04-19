import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Projects/Projects";
import { Tasks } from "../components/Tasks/Tasks";

const RouteApp = () => {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route index path="/" element={<Projects />} />
        <Route index path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteApp;
