"use client"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';
import { useState, useEffect } from "react";
import AddTask from "./AddTask";

export default function Header(){
      const [task, setTask] = useState(false)
      
    return (
        <>
            <header className="bg-[#ECEDEE] w-[100%] h-[55px] flex items-center pr-[15px] pl-[15px] justify-between">
                <h1 className="text-[21px] font-bold text-white">TaskFlow</h1>
                <Button onClick={() => {
                    setTask(!task)
                    document.body.style.overflow = "hidden"
                }} className="bg-[#514E95] cursor-pointer hover:bg-[#514E95] hover:opacity-[0.8] transition-[0.5s]">    <Plus />
                Add Task</Button>
                {/* < */}
            </header>
            { task && <AddTask task={task} setTask={setTask}/>
            }
        </>
    )
}