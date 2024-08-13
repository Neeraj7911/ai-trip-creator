/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/services/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function Hotel({ trip }) {
  const [photoUrls, setPhotoUrls] = useState([]);

  useEffect(() => {
    if (trip?.tripData?.hotels) {
      fetchHotelPhotos();
    }
  }, [trip]);

  const fetchHotelPhotos = async () => {
    const urls = await Promise.all(
      trip.tripData.hotels.map(async (hotel) => {
        const data = { textQuery: hotel.hotelName };
        const result = await GetPlaceDetails(data);
        const photoName = result.data.places[0].photos[3].name;
        return PHOTO_REF_URL.replace("{NAME}", photoName);
      })
    );
    setPhotoUrls(urls);
  };

  return (
    <div>
      <div>
        <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
        <div className="grid grid-flow-cols-3 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-5">
          {trip?.tripData?.hotels?.map((hotel, index) => (
            <Link
              key={index}
              to={
                "https://www.google.com/maps/search/?api=1&query=" +
                hotel?.hotelName +
                " " +
                hotel?.hotelAddress
              }
              target="_blank"
            >
              <div
                key={index}
                className="mt-3 hover:scale-105 transition-all cursor-pointer"
              >
                <img
                  className="h-[300px] w-full object-cover rounded-xl"
                  src={photoUrls[index] || "/iimg.jpg"} // Use photoUrls[index] if available
                  alt={hotel?.hotelName || "Hotel"} // Use hotel.hotelName if available
                />
                <div className="mt-2 ml-3 flex flex-col gap-1">
                  <h2 className="font-medium text-lg ">{hotel?.hotelName}</h2>
                  <h2 className="font-medium text-xs text-gray-500 ">
                    📍{hotel?.hotelAddress}
                  </h2>
                  <h2 className="text-sm text-black-1000">{hotel?.price}</h2>
                  <h2 className="text-sm text-black-1000">⭐{hotel?.rating}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

Hotel.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      hotels: PropTypes.arrayOf(
        PropTypes.shape({
          hotelName: PropTypes.string,
          hotelAddress: PropTypes.string,
          price: PropTypes.string,
          rating: PropTypes.string,
        })
      ),
    }),
  }),
};

export default Hotel;
