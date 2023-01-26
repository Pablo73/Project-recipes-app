import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <header>
        <Header
          title="Drinks"
          withSearchIcon
        />
      </header>
      <Footer />
    </div>
  );
}

export default Drinks;
