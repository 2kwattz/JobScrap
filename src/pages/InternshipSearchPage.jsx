import SearchSection from "../components/SearchSection";

const internshipListings = [
  {
    title: "UI/UX Design Intern",
    company: "Studio Harbor",
    location: "Remote",
    salary: "Stipend: INR 20,000/month",
    description:
      "Support product designers with wireframes, moodboards, design QA, and user research for mobile-first experiences.",
  },
  {
    title: "Software Engineering Intern",
    company: "CodePeak",
    location: "Pune, India",
    salary: "Stipend: INR 30,000/month",
    description:
      "Contribute to frontend and backend features, write maintainable code, and learn from a collaborative engineering team.",
  },
  {
    title: "Content Writing Intern",
    company: "GrowthDesk",
    location: "Delhi, India",
    salary: "Stipend: INR 15,000/month",
    description:
      "Create blog drafts, landing page content, and social copy that helps brands speak clearly and convert readers.",
  },
  {
    title: "Data Analyst Intern",
    company: "InsightGrid",
    location: "Chennai, India",
    salary: "Stipend: INR 25,000/month",
    description:
      "Prepare dashboards, clean datasets, and help the analytics team uncover meaningful trends from product usage data.",
  },
];

function InternshipSearchPage() {
  return (
    <SearchSection
      title="Search Internships"
      subtitle="Find internship opportunities that help you build real-world experience."
      placeholder="Search internships by title, company, location, or field"
      items={internshipListings}
    />
  );
}

export default InternshipSearchPage;
