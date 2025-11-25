import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import Header from '@/components/Header';
import BookingDialog from '@/components/BookingDialog';
import Sections from '@/components/Sections';
import Footer from '@/components/Footer';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header isBookingOpen={isBookingOpen} setIsBookingOpen={setIsBookingOpen} />
      
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <BookingDialog setIsBookingOpen={setIsBookingOpen} />
      </Dialog>

      <Sections setIsBookingOpen={setIsBookingOpen} />
      
      <Footer />
    </div>
  );
};

export default Index;
