/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react"; // Import useCallback
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/services/firebaseConfig";
import InfoSection from "./components/InfoSection";
function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const GetTripData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const userSelection = trip?.userSelection;
  const location = userSelection?.location;
  const locationLabel = location?.label;

  console.log("Trip:", trip);
  console.log("User Selection:", userSelection);
  console.log("Location:", location);
  console.log("Location Label:", locationLabel);

  return (
    <div className="p-2 md:px-10 lg:px-10 xl:px-10">
      <InfoSection trip={trip} locationLabel={locationLabel} />
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Viewtrip;
