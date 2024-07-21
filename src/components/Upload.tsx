"use client";
 
import { supabaseComponent } from "@/lib/supabase";
import { UploadButton } from "@/utils/uploadthing";
import { url } from "inspector";
import { useState } from "react";
 
export default function Home({user}:{
  user?:string
}) {

  const [url,setUrl] = useState('');

  return (
    <main className=" col-span-1 flex items-center justify-center ">
      <UploadButton
      className=" my-auto mx-auto w-[40px] rounded-lg overflow-hidden"
        endpoint="imageUploader"
        onClientUploadComplete={async(res) => {
          // Do something with the response
       
         
            const {data, error} = await supabaseComponent
            .from('messages')
            .insert(
              {image:res.at(0)?.url,
                user:user
              }
            )
           
        
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)

        }}
        appearance={{
          
          allowedContent:'hidden'
        }}
        content={{
          button({ ready }) {
            if (ready) return <div><img src="/gallery.png" alt=""  className="h-[20px] w-[20px]"/></div>;
       
            return "...";
          },
         
        }}
      />
    </main>
  );
}