import { useState } from 'react';
import './Local.css';
import { IoIosCloudDone } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export const Local=()=>{
    const localData=()=>{
       const data= localStorage.getItem('reacttodo');
       if(!data)return [];
       return JSON.parse(data);
    }
    const[data,saveData]=useState({});
    const[save,setSave]=useState(localData);

    const handleinputbar=(value)=>{
        saveData({id:value,content:value,checked:false});
    }

    const handlesubmitData=(event)=>{
        event.preventDefault();
        const{id,content,checked}=data;
        // console.log('lkdf');
        if(!content)return;
    
        const logo=save.find((curelem)=>curelem.content===content);
        if(logo){
            saveData({id:"",content:"",checked:""});
            return;
        }
        setSave((prev)=>[...prev,{id,content,checked}]);

        saveData({id:"",content:"",checked:""});
    }

    const deleteButton=(value)=>{
        const isapproach=save.filter((curelem)=>curelem.content!==value);
        setSave(isapproach);

    }
    
    const clearAll=()=>{
        setSave([]);
    }

    localStorage.setItem("reacttodo",JSON.stringify(save));

    const isTaskDone=(value)=>{
        const taskDone=save.map((curelem)=>{
            if(curelem.content===value){
                return {...curelem,checked:!curelem.checked};
            }
            else{
                return curelem;
            }
        })
        
        setSave(taskDone);
    }
    return(
        <>
            <form className="todo-form" onSubmit={handlesubmitData}>
                <input type="text" className="todo-input" placeholder="Enter your task" value={data.content} onChange={(e)=>handleinputbar(e.target.value)}/>
                <button type="submit" className="todo-button">Add Task</button>
            </form>
            <div className="task-container">
                <ul>
                    {
                        save.map((curelem) => (
                            <li key={curelem.id} className={curelem.checked ? "checkedin":"notcheckedin"}>{curelem.content}<button style={{cursor:"pointer",position:"relative",left:"250px"}} onClick={()=>isTaskDone(curelem.content)}><IoIosCloudDone /></button><button style={{position:"relative",left:"260px"}} onClick={()=>deleteButton(curelem.content)}><MdDelete /></button></li>
                        ))
                    }
                </ul>
            </div>
            <button className='clear' onClick={clearAll}>Clear All</button>
        </>

    )
}