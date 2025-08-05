import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import OfficerList from "./pages/Officers/OfficerList";
import Officer from "./pages/Officers/OfficerDetail";
import Relatives from "./pages/Officers/Relatives";
import Organization from "./pages/Organization";
import Profile from "./pages/Profile";
import DashboardLayout from "./lib/layout";
import LogIn from "./pages/LogIn";
import UserList from "./pages/Users/UserList";
import SentDocumentList from "./pages/SentDocuments/SentDocumentList";
import ReceivedDocumentList from "./pages/ReceivedDocuments/ReceivedDocumentList";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/documents"
          element={
            <DashboardLayout>
              <Documents />
            </DashboardLayout>
          }
        />
        <Route
          path="/officers"
          element={
            <DashboardLayout>
              <OfficerList />
            </DashboardLayout>
          }
        />
        <Route
          path="/officers/:id"
          element={
            <DashboardLayout>
              <Officer />
            </DashboardLayout>
          }
        />
        <Route
          path="/officers/:id/relatives"
          element={
            <DashboardLayout>
              <Relatives />
            </DashboardLayout>
          }
        />
        <Route
          path="/organization"
          element={
            <DashboardLayout>
              <Organization />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
        <Route
          path="/users"
          element={
            <DashboardLayout>
              <UserList />
            </DashboardLayout>
          }
        />
        <Route
          path="/users/:id"
          element={
            <DashboardLayout>
              <UserList />
            </DashboardLayout>
          }
        />
        <Route
          path="/sent-documents"
          element={
            <DashboardLayout>
              <SentDocumentList />
            </DashboardLayout>
          }
        />
        <Route
          path="/sent-documents/:id"
          element={
            <DashboardLayout>
              <SentDocumentList />
            </DashboardLayout>
          }
        />
        <Route
          path="/received-documents"
          element={
            <DashboardLayout>
              <ReceivedDocumentList />
            </DashboardLayout>
          }
        />
        <Route
          path="/received-documents/:id"
          element={
            <DashboardLayout>
              <ReceivedDocumentList />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
