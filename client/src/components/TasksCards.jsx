import { useNavigate } from "react-router-dom"

export function TaskCard({task}){

    const navigate = useNavigate()
    const completed = task.done


    return(

        <div className={completed == false ? "bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer" : "bg-lime-800 p-3 hover:bg-lime-600 hover:cursor-pointer"}
        
        onClick={()=>{
            navigate(`/tasks/${task.id}`)
        }}>
        <h1 className="font-bold uppercase">{task.title}</h1>
        <p className="text-slate-400">{task.description}</p>
        <hr />
    </div>
    )
}