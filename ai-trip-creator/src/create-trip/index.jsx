/* eslint-disable no-unused-vars */
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "./index.css";
//import { Input } from "postcss";
import { Input } from "../components/ui/input";
//import Input from "./Input";
import { SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";

function CreateTrip() {
  return (
    <div className="b1">
      <div className="sm:px-10 md:px32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and out trip planner will
          generate a <br />
          customized itinerary based on your preferences.
        </p>
        <div className="mt-20">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is destination of choice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder: "Type a city...",
                onChange: (value) => {
                  console.log(value);
                },
                className: "autocomplete-input", // Add a custom class
              }}
              autocompletionRequest={{
                types: ["(cities)"],
              }}
              className="autocomplete-wrapper" // Add a custom class for the wrapper
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium mt-9">
              How many days are you planning your trip?
            </h2>
            <Input
              className="autocomplete-wrapper"
              placeholder={"Ex. 3"}
              type="number"
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium mt-9">
              What is Your Budget?
            </h2>
            <div className="grid grid-cols-4 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-lg cursor-pointer"
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          <div className="some-class" style={{ width: "999px" }}>
            <h2 className="text-xl my-3 font-medium mt-9">
              Who do you plan on travelling with on your next adventure?
            </h2>
            <div className="grid grid-cols-3 gap-7 mt-5">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-lg cursor-pointer"
                  style={{ width: "325px" }} // Adjust the width as needed
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button className="my-10 float-right flex mr-96">Generate</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
