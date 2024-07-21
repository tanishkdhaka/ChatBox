'use client'
import { supabaseComponent } from '@/lib/supabase'
import Image from 'next/image'
import React, { useState } from 'react'


function Crud({id}:{
id:any 
}) {
    
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
    
  return (
   <div className='my-auto cursor-pointer' onClick={handler} >

    {
        isOpen&&(
            <div className='z-1 absolute flex items-center justify-center bg-cover bg-center backdrop-blur-sm w-[100vw] h-[100vh] top-0 left-0 '>
                   <div className='flex flex-col gap-2'>
                    <button className='bg-red-700 rounded-lg px-4 py-2 text-lg'  onClick={del}>Delete</button>
                    
                   </div>
            </div>
        )||( 
          <div >
            <Image src={'/menu.svg'} alt={'menu'} height={30} width={25} className=' ' />
          </div>
        )
    }
    
   </div>
  )
}

export default Crud