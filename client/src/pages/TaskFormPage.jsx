import { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';

export function TaskFormPage(){

    const {register, handleSubmit, 
        formState:{errors},
        setValue
} = useForm();

const navigate = useNavigate()
const params = useParams()



    const onSubmit = handleSubmit(async data =>{
        if(params.id){
            updateTask(params.id, data)
            toast.success('Task update successfully',{
                position: "bottom-right",
                style:{
                    background: '#101010',
                    color: '#fff',
                }
            })
        }else{
            await createTask(data);
            toast.success('Task created successfully',{
                position: "bottom-right",
                style:{
                    background: '#101010',
                    color: '#fff',
                }
            })
        }
        navigate('/tasks');
    });

    useEffect(()=> {
        async function loadTask(){
            if (params.id){
                const {data: {title, description, done}} = await getTask(params.id)
                setValue('title', title);
                setValue('description', description);
                setValue('done', done);
        }
    }
    loadTask();
    })

    return (
        <div className='max-2-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="text" placeholder="Title" {...register("title", {required: true})} />
                {errors.title && <span>title is required</span>}

                <textarea className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' rows="3" placeholder="Description" {...register("description", {required: true})}></textarea>
                {errors.description && <span>Description is required</span>}

                <label htmlFor="checkbox">Completed: </label>
                <input type="checkbox" {...register("done")}/>


                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
            </form>


            {params.id && (
                <div className='flex justify-end'>


                    <button className='bg-red-500 p-3 rounded-lg w-48 mt-3' onClick={async ()=>{
                        const aceppted = window.confirm('are you sure?')

                    if(aceppted){
                        await deleteTask(params.id)
                        toast.success('Task deleted successfully',{
                            position: "bottom-right",
                            style:{
                                background: '#101010',
                                color: '#fff',
                            }
                        })
                        navigate("/tasks")
                    }
                }}>Delete</button>

                </div>
                
            )}

        </div>
    )
}