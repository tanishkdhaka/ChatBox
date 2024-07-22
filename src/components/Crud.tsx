'use client'
import { supabaseComponent } from '@/lib/supabase'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'


function Crud({id,message}:{
  message:string
id:any 
}) {
  const[isUpdate, setUpdate]= useState(false)
  const [value,setValue] = useState(message)
    
    const [isOpen, setOpen] = useState(false)
    const handler =()=>{
        setOpen(!isOpen)
       
    }
    const del  = async()=>{
       const response = await supabaseComponent
        .from('messages')
        .delete()
        .eq('id', id)
        .select()   
    }
    const opr = async()=>{
      event?.preventDefault();
      const response = await supabaseComponent
      .from('messages')
        .upsert({ id: id, mess: value })
        .select()
      
        setUpdate(false)
    }
    
  return (
   <div className='my-auto cursor-pointer'  >

    {
        isOpen&&(
            <div onClick={handler} className='z-1 absolute flex items-center justify-center bg-cover bg-center backdrop-blur-sm w-[100vw] h-[100vh] top-0 left-0 '>
                   <div className='flex flex-col gap-2'>
                    <button className='bg-red-700 rounded-lg px-4 py-2 text-lg'  onClick={del}>Delete</button>
                    <button className='bg-blue-400 rounded-lg px-4 py-2 text-lg'  onClick={(event)=>(setUpdate(true))}>Update</button>
                    
                   </div>
            </div>
        )||( 
          <div onClick={handler} >
            <Image src={'/menu.svg'} alt={'menu'} height={30} width={25} className=' ' />
          </div>
        )
    }
    {isUpdate&&(
      <div className=' absolute flex items-center justify-center bg-cover bg-center backdrop-blur-sm w-[100vw] h-[100vh] top-0 left-0' >
        <div onClick={(event)=>(setUpdate(false))}  className='-z-1 top-0 left-0 absolute h-[100vh] w-[100vw] '></div>
       <form action="" className='z-1 absolute flex flex-col gap-3 '>
        <textarea  className='p-5 rounded-lg content-wrap text-white bg-transparent resize-none border-primary focus:ring-primary focus:border-blue-300 ' cols={30} rows={4} value={value} onChange={(event=>(setValue(event.target.value)))} ></textarea>
        <Button className=" text-white" onClick={opr}>Update</Button>
       </form>
        
      </div>
    )

    }

    
   </div>
  )
}

export default Crud