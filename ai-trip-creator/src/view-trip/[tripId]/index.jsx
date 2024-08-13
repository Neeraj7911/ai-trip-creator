/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/services/firebaseConfig";
import InfoSection from "./components/InfoSection";
import Hotel from "./components/Hotel";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingHotel, setLoadingHotel] = useState(true);
  const [loadingPlaces, setLoadingPlaces] = useState(true);

  useEffect(() => {
    const GetTripData = async () => {
      try {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setTrip(docSnap.data());
        } else {
          console.log("No such document!");
          toast("No Trip Found !");
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
        toast(
          "Error fetching trip data. Please check your internet connection."
        );
      }
    };

    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  useEffect(() => {
    if (trip) {
      // Simulate loading InfoSection
      setTimeout(() => {
        setLoadingInfo(false);
      }, 200);

      // Simulate loading Hotel after InfoSection
      setTimeout(() => {
        setLoadingHotel(false);
      }, 1000);

      // Simulate loading PlacesToVisit after Hotel
      setTimeout(() => {
        setLoadingPlaces(false);
      }, 1500);
    }
  }, [trip]);

  const userSelection = trip?.userSelection;
  const location = userSelection?.location;
  const locationLabel = location?.label;

  console.log("Trip:", trip);
  console.log("User Selection:", userSelection);
  console.log("Location:", location);
  console.log("Location Label:", locationLabel);

  return (
    <div className="p-2 md:px-10 lg:px-10 xl:px-10">
      {loadingInfo ? (
        <p>Loading Info...</p>
      ) : (
        <>
          <InfoSection trip={trip} locationLabel={locationLabel} />
          {loadingHotel ? (
            <p>Loading Hotel...</p>
          ) : (
            <>
              <Hotel trip={trip} />
              {loadingPlaces ? (
                <p>Loading Places to Visit...</p>
              ) : (
                <PlacesToVisit trip={trip} />
              )}
            </>
          )}
        </>
      )}
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
