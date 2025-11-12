import React from "react";
import Hero from "../Components/Hero";
import Products from "../Components/Products";
import TransportationModes from "../Components/TransportationModes ";
import ContactUS from "../Components/ContactUS";

const productsPromise = fetch("http://localhost:5000/products").then((res) =>
  res.json()
);

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Products productsPromise={productsPromise} />
      <TransportationModes />
      <ContactUS />
    </div>
  );
};

export default HomePage;
