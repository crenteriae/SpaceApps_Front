import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";
import Link from "next/link";

export default function Navigator(props: { text: string, path: string }){
    return(
        <div className="my-auto">
            <Link href={props.path}>
                <p className="text-reseda-green hover:text-white self-auto text-sm cursor-pointer" id='nav'>{props.text}</p>
            </Link>
        </div>
    )
}