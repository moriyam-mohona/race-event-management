import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import img1 from "@/assets/images/home/discover-event.png";
import img2 from "@/assets/images/home/find-people.png";
import img3 from "@/assets/images/home/share-load.png";
import img4 from "@/assets/images/home/gear-up.png";
import Image, { StaticImageData } from "next/image";
import { Container } from "@/components/ui-library/container";
interface FeatureStep {
  icon: StaticImageData;
  title: string;
  description: string;
}

const features: FeatureStep[] = [
  {
    icon: img1,
    title: "Discover Your Event",
    description:
      "Explore worldwide events central to your next adventure through our pick list or interactive map.",
  },
  {
    icon: img2,
    title: "Find Your People",
    description:
      "Connect with others chasing global adventures or heading to the same event—you're not alone.",
  },
  {
    icon: img3,
    title: "Share the Load",
    description:
      "Swap stays, share rides, grab bibs, or lend a hand — from airport pickups to local tips, everyone helps you connect and travel better, together.",
  },
  {
    icon: img4,
    title: "Gear Up · Plan On · Go",
    description:
      "Book, pack, prep—your event, travel, and stay in one place, so you can focus on racing, roaming, and relaxing.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <Container>
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="How it Works"
            description="Dusttrainers connects you with travel services, race info, virtual expos and personalised recommendations. Offering community driven support and seamless experiences, it help you discover and book events, join race communities, share travel and stays, and plan itineraries. With integrated booking options and the power of group savings and local support through the community, Dusttrainers helps you save money and stay fully prepared and connected for your next adventure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-8 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center md:p-6 rounded-lg transition-all duration-300"
              >
                <div className="w-24 h-24">
                  <Image src={feature.icon} alt="Feature Icon" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mt-6 md:mt-16 mb-5">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HowItWorks;
