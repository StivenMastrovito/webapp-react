import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import Home from './pages/Home'
import Films from './pages/Films'
import FilmDetails from './pages/FilmDetails'
import Search from './pages/Search'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films /> } />
            <Route path={`/films/:slug`} element={<FilmDetails /> } />
            <Route path={`/search`} element={<Search /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
