import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import PromotionsReviewsSection from './sections/PromotionsReviewsSection';
import ContactsSection from './sections/ContactsSection';

interface SectionsProps {
  setIsBookingOpen: (open: boolean) => void;
}

const Sections = ({ setIsBookingOpen }: SectionsProps) => {
  return (
    <>
      <HeroSection setIsBookingOpen={setIsBookingOpen} />
      <ServicesSection setIsBookingOpen={setIsBookingOpen} />
      <PromotionsReviewsSection setIsBookingOpen={setIsBookingOpen} />
      <ContactsSection />
    </>
  );
};

export default Sections;
