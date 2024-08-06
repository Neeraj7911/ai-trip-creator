/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
function Viewtrip() {
  const { tripId } = useParams();

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
      toast("No Trip Found !");
    }
  };
  return <div>Viewtrip: {tripId}</div>;
}

export default Viewtrip;
