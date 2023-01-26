import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <header>
        <Header
          title="Meals"
          withSearchIcon
        />
      </header>
      <Footer />
    </div>
  );
}

export default Meals;
