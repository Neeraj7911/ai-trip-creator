/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-5 ml-3">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div className="ml-3">
            <h2 className="font-medium text-lg">Day: {item.day}</h2>
            <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-5">
              {item.schedule?.map((place, index) => (
                <div>
                  <h2 className="font-medium text-sm mt-2 text-orange-600">
                    {place?.time}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

PlacesToVisit.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default PlacesToVisit;
