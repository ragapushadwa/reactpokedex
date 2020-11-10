import React, { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList'
import axios from 'axios'
import Pagination from '../components/Pagination'
import { BackTop, Skeleton, Switch, List, Avatar, Icon, Row, Col, Slider } from 'antd'

 import { useLocalState } from '../useLocalState'
// export const WplContext = React.createContext()

const urlx = 'https://pokeapi.co/api/v2/pokemon'

function WildPokemonList() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(urlx)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  // const [pokemon, setPokemon] = useState(['bulbasaur', 'charmender'])

  useEffect(() => {
    setLoading(true)
    axios.get(urlx)

    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        // console.log(res);
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p))
        // setPokemon(res.data.results.map(p => p.name))
      })
    return () => cancel()
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  // if (loading) return 'loading...'

  //console.log(pokemon)
  // console.log(pokemon[1].name)
  return (
    // <WplContext>

      <div className="app-wrapper" >
        <header>
          <h1 className="title">My Pokemon List</h1>
        </header>

        <Row type="flex" justify="space-around" align="middle">
          <Pagination
            goToNextPage={nextPageUrl ? goToNextPage : null}
            goToPrevPage={prevPageUrl ? goToPrevPage : null}
          />
        </Row><br />
        {
          // loading ? (
          //   <Skeleton loading={loading} avatar={'circle'} paragraph={false} />
          // ) : (
          <Row type="flex" justify="space-around" align="middle">
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
          <Pagination
            goToNextPage={nextPageUrl ? goToNextPage : null}
            goToPrevPage={prevPageUrl ? goToPrevPage : null}
          />
        </Row>

        <div>
          <BackTop />
        </div>

      </div>
    // </WplContext>
  );
}

export default WildPokemonList;
