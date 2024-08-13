/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GetPlaceDetails } from "@/services/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=2000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function UserTripCardItems({ trip }) {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    if (trip) {
      getPlacePhoto();
    }
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data);
    const photoName = result.data.places[0].photos[3].name;
    const photoURL = PHOTO_REF_URL.replace("{NAME}", photoName);
    setPhotoURL(photoURL);
  };

  return (
    <div>
      <img
        className="object-cover rounded-xl"
        src={photoURL}
        alt="Trip Image"
      />
      <div>
        <h2 className="font-bold text-lg">
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} Days trip with{" "}
          {trip?.userSelection?.budgets} Budget
        </h2>
      </div>
    </div>
  );
}

UserTripCardItems.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default UserTripCardItems;
