import React,{useState} from 'react'
import Recipe from './Recipe'
import {useQuery,useMutation} from 'react-query'

export default function RecipeList() 
{
  const [url,setUrl] = useState('http://localhost:3000/recipes')
  const{data:recipes,status}=useQuery(['recipes'],fetchRecipes)
  const{mutate,status:postStatus}=useMutation(postRecipes,
    {
      onSuccess:(data)=>
      {
        console.log(data)
      } 
    })

  async function fetchRecipes({queryKey})
  { 
     const res = await fetch(url)
     return res.json()
  }
  async function postRecipes(recipe)
  {
    const res = await fetch(url,
      {
        method:'POST',
        body:JSON.stringify(
          {
            id:recipe.id,
            title:recipe.title,
            time:recipe.time,
            instructions:recipe.instructions
          }
        ),
        headers:
        {
          'Content-type':'application/json'
        }
      })
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
