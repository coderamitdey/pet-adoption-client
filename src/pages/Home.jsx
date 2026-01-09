import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import RecentListings from "./RecentListings";
import ExtraSectionOne from "./ExtraSectionOne";
import ExtraSectionTwo from "./ExtraSectionTwo";

const Home= () => {
  return (
    <div className="container mx-auto px-4">
      <Banner />
      <Categories />
      <RecentListings />
      <ExtraSectionOne />
      <ExtraSectionTwo />
    </div>
  );
};

export default Home;
