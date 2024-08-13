/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/services/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=2000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function PlaceCardItem({ place }) {
  const [photoURL, setPhotoURL] = useState("/iimg.jpg");

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      if (resp.data.places[0]?.photos[3]?.name) {
        const photoURL = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhotoURL(photoURL);
      }
    });
  };

  return (
    <div className="border rounded-xl p-1 flex mt-2 hover:shadow-md">
      <img
        src={photoURL}
        alt={place?.placeName}
        className="w-[130px] h-[130px] rounded-xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/iimg.jpg"; // Fallback image
        }}
      />
      <div>
        <h2 className="font-bold text-lg ml-4">{place?.placeName}</h2>
        <p className="font-semibold text-sm ml-6">{place?.placeDetails}</p>
        <h2 className="font-thin text-sm ml-4 mt-2 flex gap-1">
          <MdOutlineTimer />
          <span title="Time">{place?.timeTravel}</span>
        </h2>
        <h2 className="font-bold text-sm ml-4 mt-1">
          Ticket Price: {place?.ticketPricing}
        </h2>
        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" +
            place?.placeName
          }
          target="_blank"
          title="Navigate"
        >
          <div className="ml-4 mt-2">
            <FaMapMarkedAlt />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCardItem;
