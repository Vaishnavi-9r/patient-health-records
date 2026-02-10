import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import PatientLogin from "./pages/PatientLogin";
import StaffLogin from "./pages/StaffLogin";

import Dashboard from "./pages/Dashboard";
import UploadRecord from "./pages/UploadRecord";
import Appointments from "./pages/Appointments";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import HospitalRecords from "./pages/HospitalRecords";

import AppLayout from "./components/AppLayout";

function App() {
  return (
    <div className="min-h-screen bg-lightbg dark:bg-darkbg transition-colors duration-300"> 
    
    <Routes>
      {/* LOGIN PAGES — NO NAVBAR */}
      <Route path="/" element={<Login />} />
      <Route path="/login/patient" element={<PatientLogin />} />
      <Route path="/login/staff" element={<StaffLogin />} />

      {/* APP PAGES — WITH NAVBAR */}
      <Route element={<AppLayout />}></Route>
      <Route
        path="/dashboard"
        element={
          <AppLayout>
          
            <Dashboard />
            </AppLayout>
          
        }
      />

      <Route
        path="/upload"
        element={
          <AppLayout>
            <UploadRecord />
          </AppLayout>
        }
      />

      <Route
        path="/appointments"
        element={
          <AppLayout>
            <Appointments />
          </AppLayout>
        }
      />

      <Route
        path="/appointments/new"
        element={
          <AppLayout>
            <ScheduleAppointment />
          </AppLayout>
        }
      />

      <Route
        path="/hospital-records"
        element={
          <AppLayout>
            <HospitalRecords />
          </AppLayout>
        }
      />
    </Routes>
    
    </div>
  );
}

export default App;
