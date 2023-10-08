export default function Person(props: { path: string, name: string }){
    return(
        <div className="flex flex-col text-center mt-3">
            <img src={props.path} className="flex w-48 h-4/5 object-cover mb-2 rounded-lg" ></img>
            <p className="font-sans text-xs text-slate-600">{props.name}</p>
        </div>  
    )
}