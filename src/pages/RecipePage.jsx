import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation,useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function RecipePage() 
{
  const navigate = useNavigate()  
  const param = useParams()

  const url = `http://localhost:3000/recipes/${param.id}`
  const{data:recipe,status:recipeStatus}=useQuery(['recipes',url],fetchRecipe)

  const{mutate,status}=useMutation(deleteRecipe,
    {
        onSuccess:(data)=>
        {
           console.log(`recipe ${data} was successfully delete`)
           navigate('/')
        },
        onError:(err)=>
        {
            console.log(err)
        }

    })

  async function fetchRecipe({queryKey})
  {
      const res = await fetch(queryKey[1])
      return res.json()
  }

  async function deleteRecipe(param)
  {
    await fetch(`http://localhost:3000/recipes/${param}`,
    {
        method:'DELETE',
        headers:
        {
            "Content-type":"application/json"
        }
    })
    
    return param
  }

  return (
    <>
      {recipeStatus === "loading" && <h1>loading</h1>}
      {recipe && (
        <div className="bg-white p-[2rem] text-text text-[1.3rem]">
          <h1 className="text-title text-[3rem] font-bold block text-center mb-[2rem]">
            {recipe.title}
          </h1>
          <strong className="text-[1.5rem]">
            Time:
            <span className="font-normal text-subtitle"> {recipe.time}</span>
          </strong>
          <section className='mb-[1.5rem]'>
            <h3 className="font-bold text-[1.5rem]">Ingredients:</h3>
            <ul className="ml-[3rem]">
              {recipe.ingredients.map(ing => {
                return (
                  <li key={ing.id} className="list-disc">
                    <span className="text-subtitle">{ing.ingredient}</span>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h3 className="text-[1.5rem] font-bold">Instructions:</h3>
            <p>{recipe.instructions}</p>
          </section>
          <div className='flex gap-[1rem] w-[100%] justify-center'>
            <Link className='py-[.5rem] px-[.8rem] bg-primary text-white capitalize'
             to={`/edit/${param.id}`}
            >edit</Link>
            <button className='py-[.5rem] px-[.8rem] bg-background text-text capitalize' onClick={() => mutate(param.id)}>delete recipe</button>
          </div>
        </div>
      )}
    </>
  );
}
