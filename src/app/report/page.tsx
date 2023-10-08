"use client"
import { useEffect, useState } from "react"
import { Button, Card } from "@nextui-org/react"
import { useDropzone } from 'react-dropzone';


export default function Page(){

    const [lat, setLat] = useState<number | null>(null)
    const [long, setLong] = useState<number | null>(null)
    const [geolocationError, setGeolocationError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [fileText, setFileText] = useState('Drag \'n\' drop some files here, or click to select files');



    useEffect(() => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const {latitude, longitude} = position.coords;
                setLat(latitude);
                setLong(longitude);
            },
            function(error) {
                console.error("Error getting geolocation: ", error);
                setGeolocationError("Error getting geolocation: " + error.message)
            }
        );
        } else {
            console.error("Geolocation not available in this browser.");
            setGeolocationError("Geolocation is not available in this browser.");
        }
    }, []);

    const handleButtonClick = () => {
        setLoading(true)
        if(geolocationError){
            alert("Geolocation is not available. Please enable location services.")
            return;
        }
        else{

        }
        //setLoading(false ) when correct handle
    }
    
    const handleFileChange = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      const acceptedFileTypes = ['image/jpeg', 'image/png'];

      if (acceptedFileTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setFileText(selectedFile.name); 
      } else {
        setFileText('Invalid file type. Please select a JPEG or PNG file.');
      }
    }
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles),
    accept: ['image/jpeg', 'image/png'],
  });

    return(
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
                <div className="w-full">
                </div>
                <div
                    className="m-6 border-dashed border-2 border-gray-300 p-8 text-center cursor-pointer hover:border-gray-500 active:border-gray-700"
                    {...getRootProps()}
                >
                    <input {...getInputProps() } accept="image/*"/>
                    <p>{fileText}</p>
                </div>
                <Button
                    onClick={handleButtonClick}
                    className="bg-head text-black font-sans p-5 m-8 rounded mt-4 hover:bg-reseda-green hover:text-white"
                    isLoading={loading}
                    >
                    Upload Report
                </Button>
            </div>
        </div>
    )
}