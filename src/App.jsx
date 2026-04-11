import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import InternshipSearchPage from "./pages/InternshipSearchPage";
import JobSearchPage from "./pages/JobSearchPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobSearchPage />} />
        <Route path="internships" element={<InternshipSearchPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
