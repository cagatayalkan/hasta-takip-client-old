import React from 'react';
import {BrowserRouter as Router , Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.component"
import PatientList from "./components/patient-list.component"
import CreatePatient from "./components/create-patient.component"
import UpdatePatient from "./components/edit-patient.component"
import PatientExamination from "./components/patient-examination.component";
import EditExamination from "./components/edit-examination.component";
import Payment from "./components/payment.component";
import PatientProfile from "./components/patient-profile.component";
import Report from "./components/report.component";
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
     <Route path="/" exact component={PatientList} /> 
      <Route path="/createPatient" exact component={CreatePatient} />
      <Route path="/updatePatient" component={UpdatePatient} />
      <Route path="/examination" component={PatientExamination} />
      <Route path="/editExamination" component={EditExamination} />
      <Route path="/payment" component={Payment} />
      <Route path="/profile" component={PatientProfile} />
      <Route path="/report" component={Report} />
      </div>
    </Router>
  );
}

export default App;
