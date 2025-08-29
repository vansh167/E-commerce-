import React from 'react';
import './Offers.css';

const Offers = () => {
  return (
    <div className="offers">
      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>Crazy Deals</h4>
          <h2>Buy 1 Get 1 Free</h2>
          <span>The best classic dress is on sale at A to Z.</span>
          <button>Learn More</button>
        </div>

        <div className="banner-box2">
          <h4>Spring/Summer</h4>
          <h2>Upcoming Season</h2>
          <span>The best classic dress is on sale at A to Z.</span>
          <button>Collection</button>
        </div>
      </section>
    </div>
  );
};

export default Offers;
