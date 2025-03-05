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
import { useTask } from "../contexts/TaskContext"
import { toast } from "sonner"
import moment from "moment"

export default function Details({data, info, setInfo}){
    const {Data, setData} = useTask()
    return (
        <>
        <div
        onClick={() => {
            document.body.style.overflow = "auto"

            setInfo(!info)
        }}
        className="bg-black top-[0] left-[0] absolute w-[100%] h-[100vh] z-3 opacity-[0.5]"
        >
            </div>
            <Card className="rounded w-[377px] bg-[#2C2C38] border-none absolute z-10 top-[50%] left-[50%] translate-[-50%]">
                <CardHeader>
                    <CardTitle className="text-white">{data.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-[7px]">
                    <p className="text-[#697080]">
                        {data.content}


                    </p>
                </CardContent>
               
                {/* <CardContent className="flex flex-col gap-[7px]">
                    <Label htmlFor="description" className="text-white">Status</Label>
                        
                <Select defaultValue={"todo"} className="text-white">
                <SelectTrigger className="w-[180px] text-white">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="onprogress">On Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                </SelectContent>
                </Select>

                </CardContent> */}
                <CardFooter className="flex justify-between">
                    <Button onClick={() => {
                        const newData = JSON.parse(JSON.stringify(Data));
                        // console.log("ccccc => ", newData.columns["columns-1"])
                        delete newData.tasks[data.id]
                        newData.columns["column-1"].tasks = newData.columns["column-1"].tasks.filter((task) => task != data.id)
                        newData.columns["column-2"].tasks = newData.columns["column-2"].tasks.filter((task) => task != data.id)
                        newData.columns["column-3"].tasks = newData.columns["column-3"].tasks.filter((task) => task != data.id)

                        // console.log("newData => ", newData)
                        setInfo(!info)
                        setData(newData)
                        localStorage.setItem("data", JSON.stringify(newData))
                        toast.success("A task has been deleted", {
                            description: moment().format("MMMM Do YYYY, h:mm:ss a")
                        })
                        document.body.style.overflow = "auto"
                    }} variant="destructive" className="cursor-pointer hover-bg-red transition-[0.5s]">Delete</Button>
                    {/* <Button className="bg-[#514E95] hover-bg-[#514E95] cursor-pointer transition-[0.5s]">Save</Button> */}

                </CardFooter>
                </Card>
        </>

    )
}