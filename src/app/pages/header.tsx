import Image from "next/image"
import Navigator from "./navigator"
import Link from "next/link"

export default function Header(){
    return(
        <div>
            <div className = 'header flex justify-between'>
                <div className="flex space-evenly ml-5">
                    <Link
                    className="my-auto"
                    href="/">
                        <h1 id = 'title' className = 'text-head text-2xl my-auto cursor-pointer'>FlameFox</h1>
                    </Link>
                </div>
                <Image
                    src='/fire.png'
                    width={50}
                    height={50}
                    alt="FlameFox Logo"
                />
            </div>
            <div className="bg-head flex flex-row justify-evenly w-full">
                <Navigator text='Home' path='/'/>
                <Navigator text='Education' path='education'/>
                <Navigator text='Report' path='report'/>
                <Navigator text='About' path='about'/>
            </div>
        </div>
    )
}