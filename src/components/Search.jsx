import React,{useState} from 'react'
import { useParams,useLocation,useSearchParams } from 'react-router-dom'
import Recipe from './Recipe'
import { useQuery } from 'react-query'

export default function Search() 
{
  const param=useLocation().search

  const queryParams = new URLSearchParams(param)

  const url = `http://localhost:3000/recipes?q=${queryParams.get('q')}`  
  
  const{data:recipes,status}=useQuery(['recipe',url],fetchRecipes,
  {
    keepPreviousData:true
  })

  async function fetchRecipes({queryKey})
  {
     const res = await fetch(queryKey[1])
     return res.json() 
  }

  return (
    <>
      {recipes?.lenght===0 && <strong>Nothing with</strong>} 
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[2rem]">
        {recipes?.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
      </div>
    </>
  );
}
