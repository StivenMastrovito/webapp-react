import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import Home from './pages/Home'
import Films from './pages/Films'
import FilmDetails from './pages/FilmDetails'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films /> } />
            <Route path={`/films/:id`} element={<FilmDetails /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
