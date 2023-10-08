"use client"

import { useEffect, useState } from "react"

export default function Page(){

    const [lat, setLat] = useState<number | null>(null)
    const [long, setLong] = useState<number | null>(null)

    useEffect(() => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const {latitude, longitude} = position.coords;
                setLat(latitude);
                setLong(longitude);
            },
            function(error) {
                console.error("Error getting geolocation: ", error);
            }
        );
        } else {
            console.error("Geolocation not available in this browser.")
        }
    }, []);

    return(
        <div className="p-5">
            <p>Latitude: {lat}</p>
            <p>Longitude: {long}</p>
        </div>
    )
}