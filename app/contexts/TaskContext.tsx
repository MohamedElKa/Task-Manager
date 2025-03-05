"use client"

import { createContext, useContext, useEffect } from "react"
import { useState } from "react";
import data from "../data"

const TaskContext = createContext();

const useTask = () => {
    return useContext(TaskContext)
}

export default function TaskProvider({children}){
      const [Data, setData] = useState(undefined)
        useEffect(() => {
            setData(JSON.parse(localStorage.getItem("data")))
        }, [])
    return (
        <TaskContext.Provider value={{Data, setData}}>
            {children}
        </TaskContext.Provider>
    )
}

export {TaskProvider, useTask}