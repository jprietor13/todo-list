import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Proyects/Projects";
import { Task } from "../components/Task";
import { Footer } from "../components/Footer";

const RouteApp = () => {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route index path="/" element={<Projects />} />
        <Route index path="/tasks" element={<Task />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default RouteApp;
