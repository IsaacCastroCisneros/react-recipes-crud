import React from 'react'
import { Link } from 'react-router-dom'
import {useMutation} from 'react-query'

export default function Recipe(props) 
{

  const{
     id,
     title,
     time,
     instructions
  }=props


  return (
    <div className='bg-white p-[1.6rem] pt-[.5rem]'>
       <h1 className='block text-title font-bold text-[1.6rem]'>{title}</h1>
       <p className='block text-subtitle mb-[1rem]'>{`${time} minutes to make`} </p>
       <p className='block text-text mb-[1rem]'>{instructions}</p>
       <Link to={`/${id}`} className='capitalize text-text block my-0 mx-auto py-[.5rem] px-[1.2rem] bg-background'>
          cook this 
       </Link>  
    </div>
  )
}
