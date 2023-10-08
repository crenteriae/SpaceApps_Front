import Person from "../pages/person"
import Accordion from "./accordion";

const items = [
    {
      title: 'Who we are',
      content: 'We are a group of students.',
    },
    {
      title: 'Header 2',
      content: 'Text for Header 2.',
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