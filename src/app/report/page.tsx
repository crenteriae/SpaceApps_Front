    "use client"

    import { useEffect, useState } from "react"

    export default function Page(){

        const [lat, setLat] = useState<number | null>(null)
        const [long, setLong] = useState<number | null>(null)
        const [geolocationError, setGeolocationError] = useState<string | null>(null)

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
            if(geolocationError){
                alert("Geolocation is not available. Please enable location services.")
                return;
            }
            else{

            }
        }

        const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]; // Get the first selected file
            if (file) {
                const imageUrl = URL.createObjectURL(file)
                console.log(imageUrl)
            }
        };
        

        return(
            <div className="p-5 w-full flex flex-col justify-center items-center font-sans text-sm">
                <div className="w-1/3">
                    <p>Latitude: {lat}</p>
                    <p>Longitude: {long}</p>
                    {geolocationError && <p>{geolocationError}</p>}
                </div>
                <div className="text-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePictureUpload}
                        className="mt-4"
                    />
                    <button
                        onClick={handleButtonClick}
                        className="bg-head text-black font-sans px-4 py-2 rounded mt-4"
                    >
                        Upload Report
                    </button>
                </div>
            </div>
        )
    }