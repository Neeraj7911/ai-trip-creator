/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        className="h-[300px] w-full object-cover rounded-xl mt-3 "
        src="/iimg.jpg"
        alt="img"
      />
      <div>
        <h2>{trip?.userSelection?.location?.label}</h2>
      </div>
    </div>
  );
}

export default InfoSection;
