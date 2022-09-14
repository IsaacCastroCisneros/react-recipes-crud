import { useState } from 'react'
import NavBar from './components/NavBar'
import {Routes,Route} from 'react-router-dom'

import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'
import NewRecipe from './components/NewRecipe'

function App() 
{

  return (
    <>
      <NavBar />

      <main className="mx-auto my-0 w-[72rem] max-w-[100%] pt-[7rem] pb-[3rem] px-[2rem]">
        <Routes>
          <Route path="/">
            <Route index element={<RecipeList/>}/>
            <Route path=':id' element={<Recipe/>}/>
            <Route path='search' element={<h1>fdfd</h1>}/>
            <Route path='new' element={<NewRecipe/>}/>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App


  