import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="bg-gray-100 py-20 h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Build Your Portfolio
          </h2>
          <p className="text-xl text-gray-600">
            Create sections and add cards with the information you want to
            showcase to build your perfect portfolio.
          </p>
        </div>

        <div className="mt-10 text-center">
          This is a school project built using Next.js, Tailwind CSS, and jboss
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
