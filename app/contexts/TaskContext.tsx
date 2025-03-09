"use client"

import { createContext, useContext, useEffect } from "react"
import { useState } from "react";
import data from "../data"

import {ReactNode} from "react"
import { DataTypes } from "../types";

const TaskContext = createContext<{
    Data: DataTypes;
    setData: React.Dispatch<React.SetStateAction<DataTypes>>;
} | null>(null);

const useTask = () : { Data: DataTypes; setData: React.Dispatch<React.SetStateAction<DataTypes>> } | null => {
    const context = useContext(TaskContext)
    return context;
}

export default function TaskProvider({children} :{children: ReactNode}){
      const [Data, setData] : any = useState(null)
        useEffect(() => {
            const d = localStorage.getItem("data");
            if (d)
                setData(JSON.parse(d))
        }, [])
    return (
        <TaskContext.Provider value={{Data, setData}}>
            {children}
        </TaskContext.Provider>
    )
}

export {TaskProvider, useTask}