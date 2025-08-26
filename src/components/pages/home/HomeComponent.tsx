import React from "react";
import Banner from "./Banner/Banner";
// import LoginWithGoogle from "@/components/LoginWithGoogle";
// import Example from "./Example/Example";

import HowItWorks from "./HowItWorks/HowItWorks";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";
import FindDreamRace from "./FindDreamRace/FindDreamRace";
// import JoinRaceExpo from "./JoinRaceExpo/JoinRaceExpo";
import CommunitySays from "./CommunitySays/CommunitySays";

const HomeComponent = () => {
  return (
    <>
      <Banner />
      <HowItWorks />
      <UpcomingEvents />
      <FindDreamRace />
      {/* <JoinRaceExpo /> */}
      <CommunitySays />
    </>
  );
};

export default HomeComponent;
