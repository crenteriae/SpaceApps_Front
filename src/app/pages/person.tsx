"use client"

// import { useState } from "react"

// export default function Person(props: { path: string, name: string, link: string }){

//     return(
//         <div className="flex flex-col text-center mt-3">
//             <img src={props.path} className="flex w-48 h-4/5 object-cover mb-2 rounded-lg" alt={props.name}></img>
//             <p className="font-sans text-xs text-slate-600">{props.name}</p>
//         </div>  
//     )
// }

import { useState } from "react";

export default function Person(props: { path: string; name: string; link: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.location.href = props.link;
  }

  return (
    <div className="relative text-center mt-3" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`w-48 h-4/5 object-cover mb-2 rounded-lg absolute top-0 left-0 right-0 bottom-0 transition-opacity ${isHovered ? "opacity-70" : "opacity-0"} bg-black`}>
        <div className="flex items-center justify-center h-full text-white">
            <a href={props.link} onClick={handleClick} className="flex items-center justify-center">
                <img
                    src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.svg"
                    alt="GitHub" className="w-1/2 mt-2 cursor-pointer"
                />
            </a>
        </div>
      </div>
      <img
        src={props.path}
        className="w-48 h-4/5 object-cover mb-2 rounded-lg"
        alt={props.name}
      />
      <p className="font-sans text-xs text-slate-600">{props.name}</p>
    </div>
  );
}