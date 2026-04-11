import AuthCard from "../components/AuthCard";

const registerFields = [
  { label: "Full Name", type: "text", placeholder: "Enter your full name" },
  { label: "Email Address", type: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", placeholder: "Create a password" },
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
  },
];

function RegisterPage() {
  return (
    <AuthCard
      eyebrow="Join JobScrap"
      title="Create your account and unlock better opportunities."
      description="Sign up to save roles, build your profile, and stay organized throughout your job hunt."
      fields={registerFields}
      buttonLabel="Register"
      footerText="Already have an account?"
      footerLinkLabel="Login here"
      footerLinkTo="/login"
    />
  );
}

export default RegisterPage;
