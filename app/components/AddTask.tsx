"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  import { Textarea } from "@/components/ui/textarea"

  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import "../globals.css"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import jsonData from "../data"
import data from "../data"
import { useTask } from "../contexts/TaskContext"
import { Toaster } from "sonner"
import { toast } from "sonner"
import moment, { duration } from "moment";
import { motion } from "motion/react"
import { DataTypes, TaskTypes } from "../types"

export default function AddTask({task, setTask} : {task: boolean, setTask: Function}){
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descRef = useRef<HTMLTextAreaElement | null>(null);
    const [selectValue, setSelectValue] = useState("column-1");
    const {Data, setData}  : any = useTask()
    const d = {...Data}

    const checkInput = (value : any) => {
        if (!value || !value.current)
            return false;
        if (!value.current.validity.valid)
        {
            console.log(value.current.validity.valid)
            value.current.style.border = "1px solid red"
            toast.error("This field can't be empty", {
                description: moment().format("MMMM Do YYYY, h:mm:ss a"),
              })
            return false;
        }
        else{
            value.current.style.border = "1px solid white"

        }
        return true;
    }

    const submit = () => {
        if (!checkInput(titleRef) || !checkInput(descRef))
            return ;
        if (d && titleRef.current && descRef.current){
            const taskId = `task-${++Object.keys(d.tasks).length}`
            const tasks = d.tasks;
            if (titleRef.current.value != "" && descRef.current.value != ""){
                tasks[taskId] = {
                    "id": taskId,
                    "content": descRef.current.value,
                    "title": titleRef.current.value,
                    "time": moment().format("MMMM Do YYYY, h:mm:ss a")
                }
                 
            }
            if (!d.columns || !d.columns[selectValue])
                return ;
            console.log(d)
            d.columns[selectValue].tasks.push(taskId)
            setData(d)
            localStorage.setItem("data", JSON.stringify(d))
            toast.success("a Task has been created", {
                description: moment().format("MMMM Do YYYY, h:mm:ss a"),
              })
            document.body.style.overflow = "auto"
            setTask(!task)
        }
      
    }
    const handleOnChange = (value : string) => {
        setSelectValue(value);
    }

    return (
        <>
        <motion.div
        initial={{scale: 0}}
        animate={{scale:1}}
        transition={{duration: 0.2}}
        onClick={() => {
            setTask(!task)
            document.body.style.overflow = "auto"
        }}
        className="bg-black top-[0] absolute w-[100%] h-[100vh] z-3 opacity-[0.5]">
            </motion.div>
            <motion.div 
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{duration: 0.2}}
            className="absolute top-[0] left-[0] w-[100%] h-[100vh]">

                <Card className="rounded w-[377px] bg-[#2C2C38] border-none absolute z-10 top-[50%] left-[50%] translate-[-50%]">
                <CardHeader>
                    <CardTitle className="text-white">Add New Task</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-[7px]">
                        
                    <Label htmlFor="title" className="text-white">Title</Label>
                    <Input required ref={titleRef} type="text" id="title" placeholder="e.g Take coffee break" className="rounded text-white"></Input>
                </CardContent>
                <CardContent className="flex flex-col gap-[7px]">
                        
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea required ref={descRef}  id="description" placeholder="e.g It's always good to take a break
                    this 15 minutes break will recharge the batteries a little." className="text-white py-1 placeholder:h-[100%] resize-none rounded h-[155px] pt-[7px]"></Textarea >
                </CardContent>
                <CardContent className="flex flex-col gap-[7px]">
                    <Label htmlFor="description" className="text-white">Status</Label>
                        
                <Select onValueChange={handleOnChange} defaultValue="column-1"  >
                <SelectTrigger className="w-[180px] text-white">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="column-1">To Do</SelectItem>
                    <SelectItem value="column-2">On Progress</SelectItem>
                    <SelectItem value="column-3">Done</SelectItem>
                </SelectContent>
                </Select>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => {
                        document.body.style.overflow = "auto"
                        setTask(!task)
                    }} variant="destructive" className="cursor-pointer hover-bg-red transition-[0.5s]">Cancel</Button>
                    <Button 
                    onClick={() => {
                        submit()
                        

                    }}
                    className="bg-[#514E95] hover-bg-[#514E95] cursor-pointer transition-[0.5s]">Add</Button>

                </CardFooter>
                </Card>
            </motion.div>
            </>
    )
}