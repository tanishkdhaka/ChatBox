"use client";
import Crud from "@/components/Crud";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Upload from "@/components/Upload";
import { supabaseComponent } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function page() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("search");
  const [info, setInfo] = useState<any>([]);
  const [message, setMessage] = useState('')
  const [size,setSize] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabaseComponent
        .from("messages")
        .select("*")
        .order("id");

      if (data) {
        setInfo(data);
      }
    };
    getData();
  });
  if(size!=info.length){
    setSize(info.length)
  }
  const messageEl = useRef<HTMLDivElement>(null);
  const formRef = useRef<any>(null);
  useEffect(()=>{
    if(messageEl.current){
      messageEl.current.scrollIntoView();
    }
  },[size])
  const handler = async () =>{
    event?.preventDefault();
     if(message){
      const {data, error} = await supabaseComponent
      .from('messages')
      .insert(
        {mess:message,
          user:userName,

        }
      )
     }
     formRef.current.reset();
    }
  return (
    <div className="grid grid-rows-10 w-[100vw] max-h-[100vh]  flex-col items-center gap-2">
      <Card className="w-full md:min-w-[60%]  mx-auto max-w-screen-md row-span-9">
        <CardHeader className="">
          <CardTitle className="mx-auto text-primary text-2xl">
            Chat Box
          </CardTitle>
          <CardDescription className="mx-auto">
            Your User Name :- <span className="text-white">{userName}</span>
          </CardDescription>
        </CardHeader>
        <div className=" w-full h-[2px]  my-2 -mt-2  bg-primary "></div>
        <CardContent>
        <div className=" h-[70vh] overflow-y-scroll overflow-x-hidden  ">
        <div className="flex flex-col gap-2 ">
            {info.map((src: any, index: any) => {
              return userName == src.user &&( 
              <div className="flex flex-row justify-end gap-2">
                 <Crud id={src.id}/>
               <Card className="px-4 py-2">
               
                 <CardDescription className="flex text-xs opacity-80 justify-end">{src.user}</CardDescription>
                 <p>{src.mess}</p>
                 <img src={src.image} alt="" className="w-[200px]" />
               </Card>
              </div>
            )||(
              <div className="flex flex-col items-start  ">
              <Card className="px-4 py-2 bg-primary ">
                <CardDescription className="flex text-xs  text-black ">~{src.user}</CardDescription>
                <p className="text-black">{src.mess}</p>
                <img src={src.image} alt="" className="w-[200px]" />
              </Card>
             </div>
            )
            })}
          </div>

        <div ref={messageEl}/>
        </div>
       
        </CardContent>
      </Card>
      <form ref={formRef} className="grid mx-auto my-auto max-w-screen-md w-full md:min-w-[60%] grid-cols-8 md:grid-cols-10 gap-3 ">
        <Upload user={userName||''} />
        <input type="text" onChange={(event)=>{setMessage(event.target.value)}} className=" rounded-lg outline-none px-4  md:col-span-7 col-span-5 bg-background border-2  " placeholder="Type Message ..."/> 
          <Button className=" col-span-2 md:col-span-2" onClick={handler}>Submit</Button>
            </form>
    </div>
  );
}

export default page;
