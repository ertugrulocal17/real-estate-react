import React, { createContext, useEffect, useState } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property Type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const allCountries = houses.map(house => house.country);
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);
  useEffect(() => {
    const allProperties = houses.map(house => house.type);
    const uniqueProperties = ["Property Type (any)", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, []);
  const handleClick = () => {
    setLoading(true);
    const isDefault = str => str.split(" ").includes("(any)");

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);
    const filteredHouses = housesData.filter(house => {
      const housePrice = parseInt(house.price);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }
      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property;
      }
      if (isDefault(country) && isDefault(property) && !isDefault(price)) {
        return housePrice >= minPrice && housePrice <= maxPrice;
      }
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        return (
          house.country === country &&
          housePrice >= minPrice &&
          housePrice <= maxPrice
        );
      }
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        return (
          house.type === property &&
          housePrice >= minPrice &&
          housePrice <= maxPrice
        );
      }
    });
    setTimeout(() => {
      return (
        filteredHouses.length < 1 ? setHouses([]) : setHouses(filteredHouses),
        setLoading(false)
      );
    }, 1000);
  };
  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
