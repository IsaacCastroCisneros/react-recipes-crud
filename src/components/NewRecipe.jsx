import React from 'react'
import { useState,useRef } from 'react'
import {v4 as uuidv4} from 'uuid'
import {useMutation} from 'react-query'
import{useNavigate} from 'react-router-dom'

export default function NewRecipe() 
{
  const[newRecipe,setNewRecipe]=useState({ingredients:[]})
  const[errorMsg,setErrorMsg]=useState(false);
  const navigate=useNavigate()

  const{mutate,status}=useMutation(postRecipes,
    {
      onSuccess:(data)=>
      {
        console.log(data)
      }
    })

  const inputIngredient = useRef();

  function submitForm(e)
  {
     e.preventDefault()
     if(newRecipe.ingredients.length===0)return setErrorMsg(true)
     setErrorMsg(false)
     mutate(newRecipe)
     navigate('/')
  }
  function createRecipe(newProp)
  {
    setNewRecipe(prev=>{return {...prev,...newProp}} )
  }
  function addIngredient(newIngredient)
  {
    inputIngredient.current.value=''
    inputIngredient.current.focus()
    const newIngredients = [...newRecipe.ingredients,newIngredient.trim()]
    createRecipe({ingredients:newIngredients})
  }

  async function postRecipes(recipe)
  {
    const res = await fetch('http://localhost:3000/recipes',
    {
      method:'POST',
      body:JSON.stringify({id:uuidv4(),...recipe}),
      headers:
      {
        'Content-type':'application/json'
      }
    })

    return res.json()
  }

  return (
    <div className="block">
      <h1 className="capitalize font-bold block text-title text-center text-[2.5rem] mb-[1rem]">
        add new recipe
      </h1>
      <form className="flex flex-col gap-[.7rem]" onSubmit={submitForm} action="/new" method="POST">
        <div className="flex flex-col gap-[.5rem]">
          <label htmlFor="title" className="text-text text-[1.5rem]">
            Name:
          </label>
          <input
            className="px-[.5rem] py-[.3rem]"
            required
            type="text"
            name="title"
            onChange={(e) => createRecipe({ title: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-[.5rem]">
          <label htmlFor="ingredients" className='text-text text-[1.5rem]'>Ingredients:</label>
          <div className='flex gap-[1rem]'>
            <input type="text" className='flex-[5] px-[.5rem] py-[.3rem]' name="ingredidents" ref={inputIngredient} />
            <button
              type="button"
              className='flex-[1] bg-primary text-white uppercase'
              onClick={() => addIngredient(inputIngredient.current.value)}
            >
              add
            </button>
          </div>
          {errorMsg && <span className=' text-red'>*ingresa un ingrediente</span>}
        </div>
        <div className='flex flex-col gap-[.5rem]'>
          <label htmlFor="instructions" className='text-text text-[1.5rem]'>Instructions:</label>
          <textarea
            required
            className="resize-none p-[.8rem]"
            name="instructions"
            onChange={(e) => createRecipe({ instructions: e.target.value })}
          ></textarea>
        </div>
        <div className='flex flex-col mb-[2rem] gap-[.5rem]'>
          <label htmlFor="time" className='text-text text-[1.5rem]'>Time:</label>
          <input
            required
            type="text"
            name="time"
            className='px-[.5rem] py-[.3rem]'
            onChange={(e) => createRecipe({ time: e.target.value })}
          />
        </div>
        <button type="submit" className='w-[100%] p-[.6rem] bg-primary text-white uppercase'>submit</button>
      </form>
    </div>
  );
}
