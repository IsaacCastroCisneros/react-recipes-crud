import React,{useState} from 'react'
import Recipe from './Recipe'
import{useLocation} from 'react-router-dom'
import {useQuery,useMutation} from 'react-query'

export default function RecipeList() 
{
  const url = `http://localhost:3000/recipes`
  const{data:recipes,status}=useQuery(['recipes',url],fetchRecipes)

  async function fetchRecipes({queryKey})
  { 
     const res = await fetch(queryKey[1])
     return res.json()
  }
  
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[2rem]'>
      {
        recipes?.map(recipe=>
          {
            return(
               <Recipe key={recipe.id} {...recipe} />
            )
          })
      }
    </div>
  )
}
