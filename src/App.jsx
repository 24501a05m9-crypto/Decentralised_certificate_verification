import React, { useState } from "react";
import "./App.css";
import CollegePage from "./components/CollegePage";
import CompanyPage from "./components/CompanyPage";
import StudentPage from "./components/StudentPage";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      {page === "home" && (
        <div className="container">
          <div className="box" onClick={() => setPage("college")}>College</div>
          <div className="box" onClick={() => setPage("company")}>Company</div>
          <div className="box" onClick={() => setPage("student")}>Student</div>
        </div>
      )}
      {page === "college" && <CollegePage onBack={() => setPage("home")} />}
      {page === "company" && <CompanyPage onBack={() => setPage("home")} />}
      {page === "student" && <StudentPage onBack={() => setPage("home")} />}
    </div>
  );
}
