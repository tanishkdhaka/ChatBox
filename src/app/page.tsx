'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { useState } from "react";

export default function Home() {

  const [userName, setUserName] = useState('')
  return (
   <main className="flex h-[100vh] w-[100vw]">
   <div className="mx-auto my-auto">
    <Card>
      <CardHeader className="text-xl">
      <CardTitle>Login page</CardTitle>
        <CardDescription>
         Welcome to chat forum
      </CardDescription>
      </CardHeader>
      

      <CardContent className="gap-3 flex flex-col">
        <h1>Enter your User Name</h1>
        <input type="text" className="bg-background border-2 rounded-lg p-2 outline-none" placeholder="Type user name...." onChange={(event)=>{setUserName(event.target.value)}}/>
      
           <Link href={{
              pathname:"chatroom",
              query:{
                search:userName
              }

            }} className={buttonVariants({ variant: 'default' })}>submit</Link>

        
      </CardContent>
    </Card>
    
   </div>
   </main>
  );
}
