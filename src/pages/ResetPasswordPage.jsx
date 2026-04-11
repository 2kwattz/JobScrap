import AuthCard from "../components/AuthCard";

const resetFields = [
  {
    label: "Email Address",
    name: "emailAddress",
    type: "email",
    placeholder: "Enter the email linked to your account",
  },
];

function ResetPasswordPage() {
  return (
    <AuthCard
      eyebrow="Account Support"
      title="Reset your password securely."
      description="Enter your email address and we will help you get back into your account."
      fields={resetFields}
      buttonLabel="Send Reset Link"
      footerText="Remembered your password?"
      footerLinkLabel="Back to login"
      footerLinkTo="/login"
    />
  );
}

export default ResetPasswordPage;
