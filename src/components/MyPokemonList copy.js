import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
import axios from 'axios';

function MyPokemonList() {

    const [pokedex, setPokedex] = useState([])
    const [wildPokemon, setWildPokemon] = useState({})

    useEffect(() => {
        encounterWildPokemon()
    }, [])

    const pokeId = () => {
        const min = Math.ceil(1)
        const max = Math.floor(151)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const catchPokemon = (pokemon) => {
        setPokedex(state => {
            const monExists = (state.filter(p => pokemon.id == p.id).length > 0)

            if (!monExists) {
                state = [...state, pokemon]
                state.sort(function (a, b) {
                    return a.id - b.id
                })
            }
            return state
        })
        encounterWildPokemon()
    }

    const encounterWildPokemon = () => {
        const urlx = 'https://pokeapi.co/api/v2/pokemon/' + pokeId()
        axios.get(urlx)
            .then(res => {
                console.log(res.data)
                setWildPokemon(res.data)
            })
    }

    const removePokemon = (id) => {
        setPokedex(state => state.filter(p => p.id != id))
    }

    let imgPath = 'https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/'
    // let imgPath = 'https://pokeapi.co/api/v2/pokemon/132/encounters'
    return (
        <div className="app-wrapper" >
            <header>
                <h1 className="title">My Pokemon List</h1>
                {/* <h3 className="subTitle">pokemon kocheng app</h3> */}
            </header>

            <section className="wild-pokemon">
                <h2>wild encounter</h2>
                <img src={imgPath + wildPokemon.id + '.png'} className="sprite"></img>
                <h3>{wildPokemon.name}</h3>
                <button onClick={() => catchPokemon(wildPokemon)} className="catch-btn">catch</button>
            </section>

            <section className="pokedex">
                <h2>pokedex</h2>
                <div className="pokedex-list">
                    {
                        pokedex.map(pokemon => (
                            <div className="pokemon" key={pokemon.id}>
                                <img src={imgPath + pokemon.id + '.png'} className="sprite" />
                                <h3 className="pokemon-name">{pokemon.name}</h3>
                                <button onClick={() => removePokemon(pokemon.id)} className="remove">x</button>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default MyPokemonList
// ReactDOM.render(<App />, document.getElementById('root'));