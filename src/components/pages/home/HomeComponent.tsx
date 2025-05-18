import React from "react";
import Banner from "./Banner/Banner";
// import LoginWithGoogle from "@/components/LoginWithGoogle";
// import Example from "./Example/Example";
import { Container } from "@/components/ui-library/container";
import HowItWorks from "./HowItWorks/HowItWorks";

const HomeComponent = () => {
  return (
    <>
      <Banner />
      <Container>
        <HowItWorks />
        {/* <Example />
        <LoginWithGoogle /> */}
      </Container>
    </>
  );
};

export default HomeComponent;
