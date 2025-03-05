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

export default function AddTask({task, setTask}){
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const [selectValue, setSelectValue] = useState("todo");
    const {Data, setData} = useTask()
    const data = localStorage.getItem("data")
    const d = JSON.parse(data)

    const submit = () => {
        if (data){
            // console.log(Object.keys(d.tasks).length)
            const taskId = `task-${++Object.keys(d.tasks).length}`
            // console.log("d => ", d)
            const tasks = d.tasks;
            if (titleRef.current.value != "" && descRef.current.value != ""){
                tasks[taskId] = {
                    "id": taskId,
                    "content": descRef.current.value,
                    "title": titleRef.current.value
                }
                 
            }
            d.columns[selectValue].tasks.push(taskId)
            // console.log("select-value => ", selectValue)
            // d.columns.array.map((column) => {
            //     if (column.id == selectValue){
            //         column.tasks.push(taskId)
            //     }
            // })
            setData(d)
            localStorage.setItem("data", JSON.stringify(d))
            toast.success("a Task has been created", {
                description: moment().format("MMMM Do YYYY, h:mm:ss a"),
                action: {
                  onClick: () => console.log("Undo"),
                },
              })
        }
        // console.log("titleref => ", titleRef.current.value)
        // console.log("titleref => ", descRef.current.value)
        // console.log("titleref => ", selectValue)
    }
    const handleOnChange = (value) => {
        // console.log(value)
        setSelectValue(value);
    }
    // useEffect(() => {
    //     d.columns[value].task.push()
    //     setData()
    // }, [selectValue])
    
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
                    <Input ref={titleRef} type="text" id="title" placeholder="e.g Take coffee break" className="rounded text-white"></Input>
                </CardContent>
                <CardContent className="flex flex-col gap-[7px]">
                        
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea ref={descRef} type="text" id="description" placeholder="e.g It's always good to take a break
                    this 15 minutes break will recharge the batteries a little." className="text-white py-1 placeholder:h-[100%] resize-none rounded h-[155px] pt-[7px]"></Textarea >
                </CardContent>
                <CardContent className="flex flex-col gap-[7px]">
                    <Label htmlFor="description" className="text-white">Status</Label>
                        
                <Select onValueChange={handleOnChange} defaultValue="todo" className="text-white" >
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
                        document.body.style.overflow = "auto"
                        setTask(!task)

                    }}
                    className="bg-[#514E95] hover-bg-[#514E95] cursor-pointer transition-[0.5s]">Add</Button>

                </CardFooter>
                </Card>
            </motion.div>
            </>
    )
}