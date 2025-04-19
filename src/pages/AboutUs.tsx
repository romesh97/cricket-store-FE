import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Lakjeewa Wijebandara",
    studentId: "20054325",
    image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
  },
  {
    name: "Romesh Perera",
    studentId: "20049890",
    image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
  },
  {
    name: "Sandusha Marasinghe",
    studentId: "20049887",
    image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
  },
  {
    name: "Dilusha Fernando",
    studentId: "20050882",
    image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
  },
];

const AboutUs = () => {
  return (
    <PageLayout>
      {/* Banner Section */}
      <div className="relative w-full h-80 bg-[#0A1E38] overflow-hidden mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About Us
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We are a team of passionate students creating the ultimate
                cricket equipment shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-cricket-navy mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600">
            At Cricketer's Choice , we're dedicated to providing cricket
            enthusiasts with high-quality equipment that enhances their game.
            Our platform brings together a curated selection of premium cricket
            gear, making it easy for players to find exactly what they need.
          </p>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-cricket-navy mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.studentId}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-cricket-navy mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">
                    Student ID: {member.studentId}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutUs;
