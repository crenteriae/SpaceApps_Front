import Person from "../pages/person"
import Accordion from "./accordion";

const items = [
    {
      title: 'Who we are',
      content: 'FlameFox is an initiative dedicated to educating and raising awareness about wildfires, a significant global issue. \nWildfires pose a substantial danger faced by communities worldwide, causing extensive damage to thousands of acres of land. They are highly unpredictable and can be catastrophic if they occur in unprepared communities. \n FlameFox\'s primary objective is prevention. Through our website, users gain access to a real-time tracker of wildfires globally, using NASA data.\nThis data is then visualized through a three-dimensional representation, providing users with a clear view of active fires around the world.\nMoreover, we have integrated a user location-based system to alert individuals if a fire is detected nearby. Our website also hosts an educational section aimed at informing people about the proper procedures for effectively dealing with wildfires. Additionally, FlameFox offers a reporting function, allowing users to submit fire incidents along with their coordinates and supporting images for real-time alerts.\nThe project aims to streamline communication, aid in reporting fires, educate individuals on appropriate wildfire response procedures, and promote preventative measures to mitigate the occurrence of wildfires.',
    },
    {
      title: 'Proposal',
      content: 'FlameFox is an initiative dedicated to educating and raising awareness about wildfires, a significant global issue. Wildfires pose a substantial challenge faced by communities worldwide, causing extensive destruction to thousands of acres of ecosystems. These fires are highly unpredictable and potentially hazardous when unprepared. FlameFox\'s primary objective is prevention. Our website also hosts an educational section aimed at informing people about the proper procedures for effectively dealing with wildfires.\n The project aims to streamline communication, aid in reporting fires, educate individuals on appropriate wildfire response procedures, and promote preventative measures to mitigate the occurrence of wildfires. \n We strongly advocate for efficient information flow as a key strategy in combating wildfires. Enabling rapid fire reporting, with global visibility, empowers communities to prepare and respond swiftly. Moreover, our platform includes an education section to proactively educate individuals on essential safety measures, aiming to prevent fire incidents. ',
    },
    {
      title: 'Solution',
      content: 'Our team developed a comprehensive web platform that seamlessly aligns with our goals. At the heart of our platform lies an interactive globe showcasing recent wildfires across the globe. This immersive 3D globe not only provides a visual experience but also offers detailed information, including precise fire locations, confidence levels regarding fire presence, and estimates on the rate of fire spread. Users can easily navigate and explore this globe, gaining valuable insights into the global wildfire scenario in real-time. \n  Our website features a user-friendly fire reporting function. Users can swiftly report fires by uploading pictures and sharing their location. Upon validation of the reported fire, a new data point is added to the globe, enhancing the visualization. This data point not only displays the fire location but also showcases the user-uploaded images, providing valuable insights to other users. \n As previously mentioned, our platform features a dedicated education section. We provide comprehensive guidance on how to prepare for and prevent wildfires. This encompasses procedures for responding to nearby fires, safeguarding one\'s home, and safely returning home once the threat subsides. Additionally, we emphasize best practices to mitigate the risk of starting a wildfire.',
    },
    {
      title: 'Implementation',
      content: 'To implement the globe visualization, we utilize a library called Three.js, which is built on WebGL. This library enables us to create a three-dimensional sphere. We incorporate a texture representing Earth to form the planet\'s surface. Three.js also allows us to incorporate zooming in and out, panning to navigate around the globe, and rendering stars around Earth for added realism. \n  After creating the sphere, we leverage the FIRMS API to extract longitude and latitude data of the most recent fires. Using these coordinates, we accurately plot and display the fire locations on the globe \n To depict the rate of fire spread, we developed an API that receives latitude and longitude as inputs and returns the rate of spread. To accomplish this, we downloaded the vegetation dataset from the MODIS Aqua satellite, providing essential vegetation data. With the vegetation index in hand, we aim to determine the amount of burnable material. By incorporating Azure Maps to calculate wind speed, we can accurately calculate the rate of spread. \n In our reporting system, we utilize the location of the devices accessing the web page as the reporting location. When a user submits an image, we employ an API to upload it to Azure Blob Storage. Subsequently, we use another API, known as the Inference API, to process the image and determine if it depicts a real fire or not. Based on the result obtained, we adjust the confidence level of the reported fire accordingly. Depending on the level of confidence, we then add a new data point to the globe, visually indicating the presence of a new fire.',
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