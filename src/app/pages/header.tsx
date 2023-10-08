import Image from "next/image"
import Navigator from "./navigator"
import Link from "next/link"

export default function Header(){
    return(
        <div className = 'header p-1 flex justify-between'>
            <div className="flex space-evenly">
                <h1 id = 'title' className = 'text-head text-2xl my-auto mr-20 cursor-pointer'>FlameFox</h1>
                <Navigator text='Home' path='/'/>
                <Navigator text='Education' path='education'/>
                <Navigator text='Report' path='report'/>
                <Navigator text='About' path='about'/>
            </div>
            <Image
                src='/fire.png'
                width={50}
                height={50}
                alt="FlameFox Logo"
            />
        </div>
    )
}