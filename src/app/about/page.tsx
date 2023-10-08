import Person from "../pages/person"
import Accordion from "./accordion";

const items = [
    {
      title: 'Who we are',
      content: 'FlameFox is an initiative dedicated to educating and raising awareness about wildfires, a significant global issue. Wildfires pose a substantial challenge faced by communities worldwide, causing extensive destruction to thousands of acres of ecosystems. These fires are highly unpredictable and potentially hazardous when unprepared. FlameFox\'s primary objective is prevention. Through our website, users gain access to a real-time tracker of wildfires globally, utilizing NASA data. This data is then visualized on a global sphere, providing users with a clear representation of active fires around the world. Moreover, we have integrated a user location-based system to alert individuals if a fire is detected nearby. Our website also hosts an educational section aimed at informing people about the proper procedures for effectively dealing with wildfires. Additionally, FlameFox offers a reporting function, allowing users to submit fire incidents along with their coordinates and supporting images for real-time alerts. The project aims to streamline communication, aid in reporting fires, educate individuals on appropriate wildfire response procedures, and promote preventative measures to mitigate the occurrence of wildfires.',
    },
    {
      title: 'Technology we used',
      content: 'Our development process involves utilizing tools like Visual Studio Code and GitHub for efficient teamwork and version control. We leverage TypeScript, React, and Next.JS for a dynamic front-end, and Tailwind CSS for styling. The highlight is a captivating 3D globe visualization powered by Three and WebGL. On the back-end, we rely on Express.js and Atlas for efficient server-side operations and database management. Azure Cloud Storage is used for image upload and storage, enhancing user experience in reporting wildfires',
    },
  ];

const Page: React.FC = () => {
    return(
        <div className="p-5 font-sans">
            <h1 className="text-2xl font-bold mb-4">About FlameFox</h1>
            <Accordion items={items} />
            <div className="flex flex-row h-72 justify-between">
                <Person path="/people/cesar.jpg" name="Cesar Renteria"/>
                <Person path="/people/abraham.jpg" name="Abraham Saldivar"/>
                <Person path="/people/andre.jpg" name="Andre Schiaffino"/>
                <Person path="/people/diego.jpg" name="Diego Villalobos"/>
                <Person path="/people/gigid.jpg" name="Gigid He"/>
            </div>
        </div>
    )
}

export default Page