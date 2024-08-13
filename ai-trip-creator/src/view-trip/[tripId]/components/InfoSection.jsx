/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/services/GlobalApi";
import React, { useEffect, useState } from "react";
import { BsSendArrowDown } from "react-icons/bs";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=2000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [PhotoURL, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const PhotoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoURL);
    });
  };
  return (
    <div>
      <img
        className="h-[300px] w-full object-cover rounded-xl mt-3 "
        src={PhotoURL}
        alt="img"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-xs md:text-lg">
              📅{trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-xs md:text-lg">
              💲 Budget: {trip?.userSelection?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-xs md:text-lg">
              🥂No. Of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <BsSendArrowDown />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
