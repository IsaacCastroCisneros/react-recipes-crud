import React from 'react'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import {useMutation,useQuery} from 'react-query'
import{useNavigate,useLocation} from 'react-router-dom'

export default function RecipeEdit() 
{
  const location = useLocation()
  const url =`http://localhost:3000/recipes/${location.pathname.split('/').pop()}` 

  const navigate = useNavigate()

  const[recipe,setRecipe]=useState(undefined)

  const{data,status:recipeStatus}=useQuery(['recipe',url],fetchRecipe,
  {
    onSuccess:(recipe)=>
    {
       setRecipe(recipe)
    }
  })

  const{mutate,status:mutateStatus}=useMutation(updateRecipe,
  {
    onSuccess:(update)=>
    {
      navigate(`/${recipe.id}`)
      console.log(update)
      console.log(`recipe ${recipe.id} was successfully updated`)
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

  async function updateRecipe(recipe)
  {
     await fetch(url,
      {
        method:'PUT',
        body:JSON.stringify(recipe),
        headers:
        {
          'Content-type':'application/json'
        },
      })
    
    return recipe
  }

  function updatingRecipe(change)
  {
    setRecipe({...recipe,...change})
  }

  function updateIngredient(ingredient,newIng=undefined)
  {
    const newIngredients = [...recipe.ingredients]
    
    if(newIng)
    {
      return updatingRecipe({ingredients:[...newIngredients,newIng]})
    }

    const index = newIngredients.findIndex(ing=>ing.id===ingredient.id)
    newIngredients[index]=ingredient
    updatingRecipe({ingredients:newIngredients})
  }

  function deletIngredient(id)
  {
    const newIngredients = recipe.ingredients.filter(ing=>ing.id!==id)
    updatingRecipe({ingredients:newIngredients})
  }

  function filteringEmptyInputs()
  {
    const filterIngredients= recipe.ingredients.filter(ing=>ing.ingredient!=='')
    updatingRecipe({ingredients:filterIngredients})
  }

  function submitForm(e)
  {
     e.preventDefault()
     filteringEmptyInputs()
     mutate(recipe)
     console.log(recipe)   
  }
  
  return (
    <>
      {recipe && (
        <div className="block">
          <h1 className="capitalize font-bold block text-title text-center text-[2.5rem] mb-[1rem]">
            update recipe
          </h1>
          <form
            className="flex flex-col gap-[.7rem]"
            onSubmit={submitForm}
          >
            <div className="flex flex-col gap-[.5rem]">
              <label htmlFor="title" className="text-text text-[1.5rem]">
                Name:
              </label>
              <input
                className="px-[.5rem] py-[.3rem]"
                value={recipe.title}
                type="text"
                name="title"
                onChange={e=>updatingRecipe({title:e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-[.5rem]">
              <label htmlFor="ingredients" className="text-text text-[1.5rem]">
                Ingredients:
              </label>
              <ul className='ml-[3rem] flex flex-col gap-[.8rem] mb-[1rem]'>
                {recipe.ingredients.map((ing) => {
                  return (
                    <li key={ing.id} className="list-disc">
                      <div className='flex gap-[1rem] items-center'>
                        <input
                          className='px-[.5rem] py-[.3rem]'
                          type="text"
                          value={ing.ingredient}
                          onChange={(e) =>
                            updateIngredient({
                              id: ing.id,
                              ingredient: e.target.value,
                            })
                          }
                        />
                        <button
                          type="button"
                          className='text-white bg-primary px-[.5rem] py-[.3rem]'
                          onClick={() => deletIngredient(ing.id)}
                        >
                          x
                        </button>
                      </div>
                    </li>
                  ); 
                })}
              </ul>
              <button type='button'
               className='w-[100%] p-[.6rem] bg-primary text-white uppercase'  
               onClick={()=>updateIngredient(null,{id:uuidv4(),ingredient:''})}>Add</button>
            </div>
            <div className="flex flex-col gap-[.5rem]">
              <label htmlFor="instructions" className="text-text text-[1.5rem]">
                Instructions:
              </label>
              <textarea
                required
                value={recipe.instructions}
                className="resize-none p-[.8rem]"
                name="instructions"
                onChange={e=> updatingRecipe({instructions:e.target.value})}
              ></textarea>
            </div>
            <div className="flex flex-col mb-[2rem] gap-[.5rem]">
              <label htmlFor="time" className="text-text text-[1.5rem]">
                Time:
              </label>
              <input
                className="px-[.5rem] py-[.3rem]"
                required
                value={recipe.time}
                type="text"
                name="time"
                onChange={e=> updatingRecipe({time:e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-[100%] p-[.6rem] bg-primary text-white uppercase"
            >
              update
            </button>
          </form>
        </div>
      )}
    </>
  );
}
