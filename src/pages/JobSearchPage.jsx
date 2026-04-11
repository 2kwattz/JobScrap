import SearchSection from "../components/SearchSection";

const jobListings = [
  {
    title: "Frontend Developer",
    company: "NovaPixel Studio",
    location: "Bengaluru, India",
    salary: "INR 8-12 LPA",
    description:
      "Build polished interfaces with React, collaborate with product teams, and improve performance across a fast-moving web platform.",
  },
  {
    title: "Product Designer",
    company: "NorthStar Labs",
    location: "Remote",
    salary: "INR 10-14 LPA",
    description:
      "Design user journeys, create high-fidelity prototypes, and shape a design system for a growing SaaS company.",
  },
  {
    title: "Digital Marketing Specialist",
    company: "BrightBridge Media",
    location: "Mumbai, India",
    salary: "INR 6-9 LPA",
    description:
      "Own campaign execution, optimize paid channels, and partner with content teams to increase qualified leads.",
  },
  {
    title: "Backend Engineer",
    company: "CloudSprint",
    location: "Hyderabad, India",
    salary: "INR 12-18 LPA",
    description:
      "Work on scalable APIs, improve service reliability, and contribute to engineering best practices in a cloud-first environment.",
  },
];

function JobSearchPage() {
  return (
    <SearchSection
      title="Search Jobs"
      subtitle="Search by role, location, or company and browse beautifully presented openings."
      placeholder="Search jobs by title, company, location, or skill"
      items={jobListings}
    />
  );
}

export default JobSearchPage;
