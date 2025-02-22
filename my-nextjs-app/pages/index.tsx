import React from 'react';
import PricingSelector from './components/PricingSelector';
import Footer from './components/Footer';


const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="h-[93vh] container mx-auto ">
      <PricingSelector />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
