import AuthCard from "../components/AuthCard";

const loginFields = [
  { label: "Email Address", type: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", placeholder: "Enter your password" },
];

function LoginPage() {
  return (
    <AuthCard
      eyebrow="Welcome Back"
      title="Login to continue your career search."
      description="Access saved jobs, internship applications, and your personal profile dashboard."
      fields={loginFields}
      buttonLabel="Login"
      secondaryLinkLabel="Forgot password?"
      secondaryLinkTo="/reset-password"
      footerText="New here?"
      footerLinkLabel="Create an account"
      footerLinkTo="/register"
    />
  );
}

export default LoginPage;
