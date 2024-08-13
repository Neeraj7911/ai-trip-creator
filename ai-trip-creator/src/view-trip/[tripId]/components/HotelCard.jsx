/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
function HotelCard({ hotel }) {
  return (
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
          src={hotel.imageUrl || "/iimg.jpg"} // Use item.imageUrl if available
          alt={hotel.name || "Hotel"} // Use item.name if available
        />
        <div className="mt-2 ml-3 flex flex-col gap-1">
          {" "}
          <h2 className="font-medium text-lg ">{hotel?.hotelName}</h2>
          <h2 className="font-medium text-xs text-gray-500 ">
            📍{hotel?.hotelAddress}
          </h2>
          <h2 className="text-sm text-black-1000">{hotel?.price}</h2>
          <h2 className="text-sm text-black-1000">⭐{hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
