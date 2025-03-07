"use client"

import Image from "next/image";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import Status from "./components/Status.tsx";
import {Badge} from "@heroui/badge";
import AddTask from "./components/AddTask.tsx";
import Details from "./components/Details.tsx";
import { useTask } from "./contexts/TaskContext.tsx";
import data from "./data"

const Task = React.memo(({task, index}) => {
  const [info, setInfo] = useState(false)
  return (
    <>
    <Draggable key={task.id} draggableId={task.id} index={index}>
              {
                (provided) =>{
                  return (
                    <div 
                    onClick={() =>{
                        document.body.style.overflow = "hidden"
                        
                        setInfo(!info)

                    }}
                    className="bg-[#2C2C38] w-[100%] h-[100px] flex flex-col justify-center pl-[15px] pr-[15px] rounded" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <h1 className="text-white text-[23px]  font-bold overflow-hidden">{task.title}</h1>
                    <p className="text-[#697080]">{task.time}</p>
                  </div>

                  )
                }
              }
            </Draggable>
          {info && <Details data={task} info={info} setInfo={setInfo}/>}

    </>
   
  )
})
const Column = React.memo(({column ,data}) => {

      return (
        <Droppable droppableId={column.id}>
        {
          (provided) => {
            return (
              
              <div className=" flex flex-col gap-[25px] p-[7px] w-[305px] flex-wrap"   {...provided.droppableProps}
              ref={provided.innerRef}>
                <div className="flex items-center gap-[7px]">
                  <div  className="w-[15px] h-[15px] rounded bg-[#6663C5]" style={{background: column.color}}/><div></div>
                <h1 className="text-[#697080] font-bold">
                  {column.title} </h1>
    
                </div>
              {
                column.tasks.map((task, index) => {
                  const t = data.tasks[task]
                  if (t){
                    return (
                      
                              <Task task={t} index={index} key={t.id}>
          
                              </Task>
                    )
    
                  }
                })
              }
                        {provided.placeholder}
    
          </div>
            )
    
          }
        }
    
      </Droppable>
    )
})
export default function Home() {
  const {Data, setData} = useTask()
  useEffect(() =>{
    const d = localStorage.getItem("data");
    if (d)
      setData(JSON.parse(d))
    else{
      setData(undefined)
      
    }
    const myJson = JSON.stringify(data)
    if (!d)
      localStorage.setItem("data", myJson)
  }, [])
  const onDragEnd = (result) =>{
    // console.log(result)
    if (!result.destination )
        return ;
      setData(prevData => {

          const {source, destination} = result;
          const newData = {...prevData};
          const columnS = newData.columns[source.droppableId];
          const columnD = newData.columns[destination.droppableId]
      
          if (columnS.id === columnD.id){
              const [movedItem] = columnS.tasks.splice(source.index, 1);
              columnS.tasks.splice(destination.index, 0, movedItem)
      
          }
          else if (columnS.id !== columnD.id){
            const [movedItem] = columnS.tasks.splice(source.index, 1);
            columnD.tasks.splice(destination.index, 0, movedItem)
          }
          localStorage.setItem("data", JSON.stringify(newData));
          return newData;
          // setTimeout(() => {
          //   setData(newData);
          // }, 0);
          
      })
    

  }
  
  useEffect(() => {
    console.log("columns rerender!") 
    console.log("data => ", Data)    
  })
  useEffect(() => {
    if (Data)
    {
        localStorage.setItem("data", JSON.stringify(Data));
    }

  }, [Data])

 
  return (
    <div className="flex pt-[75px] gap-[15px] w-[100%] pl-[15px] justify-center">
     
        <div className="columns flex gap-[25px] flex-wrap justify-center">

          <DragDropContext key={JSON.stringify(Data)} onDragEnd={onDragEnd}>
              {Data &&
                Object.values(Data.columns).map((column, index) => {
                  
                  return(
                            <Column column={column} data={Data} key={index}
                            >
                            </Column>


                  )
                })
              }

          </DragDropContext>
        </div>
    </div>
  );
}
