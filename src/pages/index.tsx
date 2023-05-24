import Link from "next/link";

const HeroSection = () => {
    return (
  <div className="py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          ePortfolio Generator
        </h2>
        <p className="text-xl text-white">
          Create sections and add cards with the information you want to showcase to build your perfect portfolio.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {/* Section 1 */}
        <div className="bg-gray-900 text-white p-6 shadow-md grid grid-cols-2 gap-16" style={{ backgroundColor: "#0c0c0c" }}>
          <div className="flex items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-2">Design your ePortfolio within a minute - no coding required</h3>
              <p className="text-gray-300 text-sm" >
                Professionally designed templates that make your work truly shine with complete customization and thousands of design variations. Create a unique website with our intuitive design editor —no coding required. 
              </p>
            </div>
          </div>
          <div>
            <img src="https://bucket0.format-assets.com/marketing/m674/homepage/portfolio-award.png" alt="About Me" className="mt-4 mx-auto rounded-lg" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-gray-900 text-white p-6 shadow-md grid grid-cols-2 gap-16" style={{ backgroundColor: "#0c0c0c" }}>
          <div>
            <img src="https://img.freepik.com/vecteurs-libre/illustration-concept-page-web-commerce-electronique_114360-8204.jpg?w=1380&t=st=1684935969~exp=1684936569~hmac=eb9c2cb513c69b4467d82256d8b2683f26458a9172a636c3d68cc36857418591" alt="Education" className="mt-4 mx-auto rounded-lg" />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-2">
                Sell and fulfill globally with ecommerce shops for photographers & artists
              </h3>
              <p className="text-gray-300 text-sm">
                Display your educational background, including degrees, certificates, and courses.
              </p>
            </div>
          </div>

        </div>

        {/* Section 3 */}
        <div className="bg-gray-900 text-white p-6 shadow-md grid grid-cols-2 gap-16" style={{ backgroundColor: "#0c0c0c" }}>
          <div className="flex items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-2">
                Exclusive videos there.
              </h3>
              <p className="text-gray-300 text-sm" >
                Stop depending on Youtube to host your videos. Upload videos directly to ePortFolio Generator and showcase your work the way it's deserved to.
              </p>
            </div>
          </div>
          <div>
            <img src="https://images.prismic.io/themedialab/ecbe1405-8a1d-4632-b1ef-25ab1a88efef_What-is-corporate-video-marketing-and-how-does-it-work.jpeg?auto=compress,format&rect=0,339,2400,1260&w=1200&h=630" alt="Work Experience" className="mt-4 mx-auto rounded-lg" />
          </div>
        </div>

        {/* Add more sections as needed */}
      </div>

      <div className="text-xl text-white text-center">
        This is a school project built using Next.js, Tailwind CSS, and jboss
      </div>
    </div>
  </div>
);
};

export default HeroSection;
