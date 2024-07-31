"use client";

export default function Dashboard() {
  const logoUrl = "https://images-gr8.s3.us-east-2.amazonaws.com/Logo_gr8-removebg.png"; // URL pública de tu logo

  return (
    <img src={logoUrl} alt="Company Logo" className="object-contain h-1/2 w-1/2 mx-auto mt-20" />
  );
}
