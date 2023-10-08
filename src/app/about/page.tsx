import Person from "../pages/person"
import Accordion from "./accordion";

const items = [
    {
      title: 'Who we are',
      content: 'FlameFox is an initiative dedicated to educating and raising awareness about wildfires, a significant global issue. \nWildfires pose a substantial danger faced by communities worldwide, causing extensive damage to thousands of acres of land. They are highly unpredictable and can be catastrophic if they occur in unprepared communities. \n FlameFox\'s primary objective is prevention. Through our website, users gain access to a real-time tracker of wildfires globally, using NASA data.\nThis data is then visualized through a three-dimensional representation, providing users with a clear view of active fires around the world.\nMoreover, we have integrated a user location-based system to alert individuals if a fire is detected nearby. Our website also hosts an educational section aimed at informing people about the proper procedures for effectively dealing with wildfires. Additionally, FlameFox offers a reporting function, allowing users to submit fire incidents along with their coordinates and supporting images for real-time alerts.\nThe project aims to streamline communication, aid in reporting fires, educate individuals on appropriate wildfire response procedures, and promote preventative measures to mitigate the occurrence of wildfires.',
    },
    {
      title: 'Technologies used',
      content: 'Our development process involved tools like Visual Studio Code and GitHub for efficient teamwork and version control.\nWe leverage TypeScript, React, and Next.JS 13 for a dynamic front-end, and Tailwind CSS for styling. The highlight is a captivating 3D globe visualization powered by Three and WebGL.\nOn the back-end, we rely on Express.js and Atlas for efficient server-side operations and database management. Azure Cloud Storage is used for image upload and storage, enhancing user experience in reporting wildfires',
    },
  ];

const Page: React.FC = () => {
    return(
        <div className="p-5 font-sans">
            <h1 className="text-2xl font-serif font-bold text-center mb-4">About FlameFox</h1>
            <Accordion items={items} />
            <h1 className="text-2xl font-serif font-bold text-center my-4">Meet the team</h1>
            <div className="flex flex-row flex-wrap h-72 justify-around item-center align-center">
                <Person path="/people/cesar.jpg" name="Cesar Renteria" link="https://github.com/crenteriae"/>
                <Person path="/people/abraham.jpg" name="Abraham Saldivar" link="https://github.com/rugroso"/>
                <Person path="/people/andre.jpg" name="Andre Schiaffino" link="https://github.com/andrenih"/>
                <Person path="/people/diego.jpg" name="Diego Villalobos" link="https://github.com/diegolorenzo12"/>
                <Person path="/people/gigid.jpg" name="Gigid He" link="https://github.com/Gigidhechen"/>
            </div>
        </div>
    )
}

export default Page