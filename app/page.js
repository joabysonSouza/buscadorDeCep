"use client"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import "./globals.css"
import Api from "./Services/Api"

export default function Home() {
  const [input, setInput] = useState('')
  const [data, setData] = useState({})

  const removeEspacosETraços = (str) => {

    return str.replace(/[\s-]/g, '');
  }

  const buscadorcep = async () => {
    const Cep = removeEspacosETraços(input);
    setInput("")

    if (Cep.length === 8) { 
      const response = await Api.get(`${Cep}/json`)
      setData(response.data)
    } else {
      alert('Digite um CEP válido com 8 dígitos.');
    }
  }

  return (
    <div className="container">
      <h1>Buscador de CEP</h1>

      <main className="card">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={8}
        
          
        />
        <FaSearch className="searchIcon" onClick={buscadorcep} size={30}/>

        <section>
          <p>Cep: {data.cep}</p>
          <p>Logradouro: {data.logradouro}</p>
          <p>Complemento: {data.complemento}</p>
          <p>Bairro: {data.bairro}</p>
          <p>UF: {data.uf}</p>
          <p>DDD: {data.ddd}</p>
        </section>
      </main>
    </div>
  )
}
