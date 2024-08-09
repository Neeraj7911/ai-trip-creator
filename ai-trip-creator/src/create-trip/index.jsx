/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "./index.css";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { chatSession } from "@/services/AIModal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [showEmoji, setShowEmoji] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowEmoji(false); // Hide the emoji when the button is clicked
  };

  const handleBudgetClick = (index) => {
    setSelectedBudget(selectedBudget === index ? null : index);
  };

  const handleTravelerClick = (index) => {
    setSelectedTraveler(selectedTraveler === index ? null : index);
  };

  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      formData?.noOfDays > 30 ||
      formData?.noOfDays < 1 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please fill al details!!, Check carefully!!", {
        action: {
          label: "X",
          onClick: () => console.log("X"),
        },
      });
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    //console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      setLoading(false);
      return;
    }

    if (!user) {
      console.error("No user data found in localStorage");
      setLoading(false);
      return;
    }

    const docId = Date.now().toString();

    // Log the data to be saved
    console.log("Saving AI Trip with data:", {
      tripData: TripData,
      userSelection: {
        location: formData?.location,
        noOfDays: formData?.noOfDays,
        budget: formData?.budget,
        traveler: formData?.traveler,
      },
      user: user,
      createdAt: new Date(),
    });

    try {
      await setDoc(doc(db, "AITrips", docId), {
        tripData: TripData,
        userSelection: {
          location: formData?.location,
          noOfDays: formData?.noOfDays,
          budget: formData?.budget,
          traveler: formData?.traveler,
        },
        user: user,
        createdAt: new Date(),
      });
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving AI trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp?.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="b1">
      <div className="container mx-auto px-4 mt-10">
        <h2 className="font-bold text-3xl text-center">
          Tell us your travel preferences
        </h2>
        <p className="mt-3 text-gray-500 text-xl text-center">
          Just provide some basic information, and our trip planner will
          generate a <br />
          customized itinerary based on your preferences.
        </p>
        <div className="mt-20">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is the destination of choice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder: "Type a city...",
                onChange: (value) => {
                  handleInputChange("location", value);
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
              placeholder={"Enter less than 30 days"}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium mt-9">
              What is Your Budget?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer relative ${
                    selectedBudget === index ? "border-green-500" : ""
                  }`}
                  onClick={() => {
                    handleBudgetClick(index);
                    handleInputChange("budget", item.title);
                  }}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  {selectedBudget === index && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{
                        fill: "#40C057",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"></path>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium mt-9">
              Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer relative ${
                    selectedTraveler === index ? "border-green-500" : ""
                  }`}
                  onClick={() => {
                    handleTravelerClick(index);
                    handleInputChange("traveler", item.people);
                  }}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  {selectedTraveler === index && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{
                        fill: "#40C057",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"></path>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex float-right mr-40 mb-11 mt-2">
        <Button
          disabled={loading}
          className="button-with-emoji text-center"
          onClick={() => {
            handleClick();
            OnGenerateTrip();
          }}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
          {showEmoji && <span className="emoji">🚀</span>}
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="flex items-center" src="/logo1.svg" alt="" />
              <h2 className="font-bold text-lg mt-6 ">Sign in With Google</h2>
              <p>Sign in to the App with Google autentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex items-center">
                Sign In With{" "}
                <img className="w-8 h-8 ml-1" src="/google.svg" alt="" />
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
