"use client"

import {Card, CardHeader, CardBody} from "@heroui/card";
import Image from "next/image";
import { InfoTypes } from "../types";
// import InfoTypes from "../types"

export default function Status({info} : {info: InfoTypes}){
  return (
    <Card className="py-4 bg-[#2C2C38] w-[255px] flex flex-col justify- pl-[18px] rounded">
      <CardBody className="overflow-visible py-2">
        <Image
          alt={info.title}
          className="object-contain w-[50px] h-[50px] rounded-xl"
          src={info.image}
          width={50}
          height={50}
        />
      </CardBody>
      <CardHeader className="pb-0 pt-2  flex-col items-start">
        <small className="text-default-500 text-[15px] text-[#697080] font-bold">{info.title}</small>
        <h4 className="font-bold text-[25px] text-white">{info.value}</h4>
      </CardHeader>
    </Card>
  );

}