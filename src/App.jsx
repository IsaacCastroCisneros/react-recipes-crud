import { useState } from 'react'
import NavBar from './components/NavBar'
import {Routes,Route} from 'react-router-dom'

import RecipeList from './components/RecipeList'
import Search from './components/Search'
import NewRecipe from './pages/NewRecipe'
import RecipePage from './pages/RecipePage'
import RecipeEdit from './pages/RecipeEdit'

function App() 
{
  return (
    <>
      <NavBar/>

      <main className="mx-auto my-0 w-[72rem] max-w-[100%] pt-[7rem] pb-[3rem] px-[2rem]">
        <Routes>
          <Route path="/">
            <Route index element={<RecipeList/>}/>
            <Route path=':id' element={<RecipePage/>}/>
            <Route path='search' element={<Search/>}/>
            <Route path='new' element={<NewRecipe/>}/>
            <Route path='edit/:id' element={<RecipeEdit/>}/>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App


  