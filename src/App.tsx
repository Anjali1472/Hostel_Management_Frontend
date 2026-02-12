import { BrowserRouter, Routes, Route } from "react-router-dom";

// PUBLIC PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard";
import AdminHostels from "./pages/AdminHostels";
import AdminRooms from "./pages/AdminRooms";
import AdminRequests from "./pages/AdminRequests";
import AdminMessMenu from "./pages/AdminMessMenu";
import AdminNightOut from "./pages/AdminNightOut";
import AdminAttendance from "./pages/AdminAttendance";
// STUDENT PAGES
import StudentDashboard from "./pages/StudentDashboard";
import HostelList from "./pages/HostelList";
import RoomList from "./pages/RoomList";
import MessMenu from "./pages/MessMenu";
import Attendance from "./pages/Attendance";
import NightOut from "./pages/NightOut";
import Complaints from "./pages/Complaints";
import StudentAttendance from "./pages/StudentAttendance";
// COMPONENTS
import ProtectedRoute from "./components/ProtectedRoute";
import StudentHoliday from "./pages/StudentHoliday";
import AdminHolidayRequests from "./pages/AdminHolidayRequests";
import AdminComplaints from "./pages/AdminComplaints";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hostels"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminHostels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messmenu"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminMessMenu />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/nightout" element={<AdminNightOut />} />
        <Route path="/admin/holidays" element={<AdminHolidayRequests />} />
        <Route path="admin/complaints" element={<AdminComplaints />}/>

        <Route path="/student/attendance" element={<StudentAttendance />} />
<Route path="/admin/attendance" element={<AdminAttendance />} />

        {/* ================= STUDENT ROUTES ================= */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/hostels"
          element={
            <ProtectedRoute role="STUDENT">
              <HostelList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/hostel/:hostelId/rooms"
          element={
            <ProtectedRoute role="STUDENT">
              <RoomList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/messmenu"
          element={
            <ProtectedRoute role="STUDENT">
              <MessMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute role="STUDENT">
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/nightout"
          element={
            <ProtectedRoute role="STUDENT">
              <NightOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/complaints"
          element={
            <ProtectedRoute role="STUDENT">
              <Complaints />
            </ProtectedRoute>
          }
        />
        <Route path="/student/holidays" element={<StudentHoliday />} />

        {/* ================= FALLBACK ROUTE ================= */}
        <Route path="*" element={<h1 className="p-10 text-center">404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
