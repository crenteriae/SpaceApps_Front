"use client";
import { useEffect, useState } from "react";
import { Button, Card } from "@nextui-org/react";
import sendReport from "./sendReport";

export default function Page() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [geolocationError, setGeolocationError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileText, setFileText] = useState(
    "Drag 'n' drop some files here, or click to select files"
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLong(longitude);
        },
        function (error) {
          console.error("Error getting geolocation: ", error);
          setGeolocationError("Error getting geolocation: " + error.message);
        }
      );
    } else {
      console.error("Geolocation not available in this browser.");
      setGeolocationError("Geolocation is not available in this browser.");
    }
  }, []);

  const handleButtonClick = async () => {
    setLoading(true);
    if (geolocationError) {
      alert("Geolocation is not available. Please enable location services.");
      setLoading(false);
      return;
    } else {
      if (file) {
        if (await sendReport(long, lat, file)) {
          alert("Report succesful.");
        } else {
          alert("Report failed.");
        }
        setLoading(false);
      } else {
        alert("No file.");
        setLoading(false);
      }
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const acceptedFileTypes = ["image/jpeg", "image/png"];

    if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileText(selectedFile.name);
    } else {
      setFileText("Invalid file type. Please select a JPEG or PNG file.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-5 flex flex-col justify-center items-center font-sans text-sm m-5 rounded-lg self-center w-full">
        <Card className="p-8 bg-slate-100 shadow-lg m-8 min-w-fit w-1/5">
          <div className="flex justify-between">
            <h1 className="font-bold">Latitude:</h1>
            <p>{lat}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-bold">Longitude:</h1>
            <p>{long}</p>
          </div>
          {geolocationError && <p>{geolocationError}</p>}
        </Card>
        <div className="w-full"></div>
        <input accept="image/*" type="file" onChange={handleFileChange} />
        <p>{fileText}</p>
        <Button
          onClick={handleButtonClick}
          className="bg-head text-black font-sans p-5 m-8 rounded mt-4 hover:bg-reseda-green hover:text-white"
          isLoading={loading}
        >
          Upload Report
        </Button>
      </div>
    </div>
  );
}
