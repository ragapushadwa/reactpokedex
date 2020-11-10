import React, { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList'
import axios from 'axios'
import Pagination from '../components/Pagination'
import { BackTop, Skeleton, Switch, List, Avatar, Icon, Row, Col, Slider } from 'antd'
import { useLocalState } from '../useLocalState'

// import { useLocalState } from '../useLocalState'
// export const WplContext = React.createContext()

const urlx = 'https://pokeapi.co/api/v2/pokemon'

function MyPokemonList() {
  const [caughtPokemon, setCaughtPokemon] = useLocalState('caughtPokemon')

  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(urlx)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  console.log(pokemon)
  // const [pokemon, setPokemon] = useState(['bulbasaur', 'charmender'])
  console.log(pokemon);
  useEffect(() => {
    setPokemon(JSON.parse(caughtPokemon))
    setLoading(true)
   
  }, [])

  return (
    // <WplContext>

    <div className="app-wrapper" >
      <header>
        <h1 className="title">Pokemon List</h1>
      </header>

      <Row type="flex" justify="space-around" align="middle">
        {/* <Pagination
          goToNextPage={nextPageUrl ? goToNextPage : null}
          goToPrevPage={prevPageUrl ? goToPrevPage : null}
        /> */}
      </Row><br />
      {
        // loading ? (
        //   <Skeleton loading={loading} avatar={'circle'} paragraph={false} />
        // ) : (
        <Row className='koontol'type="flex" justify="space-around" align="middle">
          {
            <PokemonList
              loading={loading}
              pokemon={pokemon}
            />
          }
        </Row>
        // )
      }
      <br />
      <Row type="flex" justify="space-around" align="middle">
        {/* <Pagination
          goToNextPage={nextPageUrl ? goToNextPage : null}
          goToPrevPage={prevPageUrl ? goToPrevPage : null}
        /> */}
      </Row>

      <div>
        <BackTop />
      </div>

    </div>
    // </WplContext>
  );
}

export default MyPokemonList;
