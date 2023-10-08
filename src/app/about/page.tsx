import Person from "../pages/person"

export default function Page(){
    return(
        <div className="p-5">
            <h1 className="text-3xl font-serif font-bold">Who we are</h1>
            <p className="font-sans my-2">We are a group of students.</p>
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