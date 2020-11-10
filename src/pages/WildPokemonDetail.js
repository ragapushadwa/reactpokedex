import React, { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList'
import axios from 'axios'
import Pagination from '../components/Pagination'
import PokemonMoves from '../components/PokemonMoves';
import PokemonTypes from '../components/PokemonTypes';
import { StickyContainer, Sticky } from 'react-sticky';
// import { useHistory } from "react-router-dom";
import {
  Row, Col,
  Card,
  Descriptions,
  Avatar,
  Spin,
  Carousel,
  Alert,
  Modal,
  Tabs,
  Button,
  Form,
  Icon,
  Input,
  Checkbox
} from 'antd'

import { useLocalState } from '../useLocalState'
// export const WplContext = React.createContext()

function WildPokemonDetail({ match }) {
  const [pokemon, setPokemon] = useState([])
  const [hasCaught, setHasCaught] = useState(false)
  const [pokemonDex, setPokemonDex] = useState([])
  const [pokemonTypes, setPokemonTypes] = useState([])
  const [pokemonMoves, setPokemonMoves] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(false)
  const [name, setName] = useState()
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [caughtPokemon, setCaughtPokemon] = useLocalState('caughtPokemon')
  console.log('caughtPokemon', caughtPokemon)

  useEffect(() => {
    fetchItem()
  }, [currentPageUrl])

  const fetchItem = () => {
    setLoading(true)
    setLoading2(true)
    let cancel
    axios.get(`https://pokeapi.co/api/v2/pokemon/${match.params.id}`, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        console.log(res);
        setLoading(false)
        setLoading2(false)
        setPokemon(res.data)
        setPokemon({name:res.data.name, url:`https://pokeapi.co/api/v2/pokemon/${match.params.id}/`}
        )
        setPokemonMoves(res.data.moves)
        setPokemonTypes(res.data.types)
      })
    return () => cancel()
  }

  if (loading) return 'loading...'
  let imgPath = 'https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/'

  const catchPokemon = (pokemon) => {
    setLoading2(true)

    setTimeout(function () {
      let prob = Math.random()
      console.log('masuk itung')
      if (prob < 0.5) {
        setPokemonDex(state => {
          console.log('before', state)
          const monExists = (state.filter(p => pokemon.id == p.id).length > 0)

          if (!monExists) {
            state = [pokemon,...state]
            state.sort(function (a, b) {
              return a.id - b.id
            })
          }
          console.log('after', state)
          return state
        })
        successPokemonModal()
      } else {
        failedPokemonModal()
        setLoading2(false)
      }
    }, 1000)
  }

  const setPokemonName = () => {
    let name = prompt('you got it ^_^, \ngive your pokemon a name ', '')
    if (name) setHasCaught(true)
    console.log(name)
  }

  const successPokemonModal = () => {
    setVisible(true)
  };

  const failedPokemonModal = () => {
    Modal.error({
      title: 'Failed ',
      content: 'Sorry failed to catch pokemon, try again',
    });
  }

  const handleOk = () => {
    setConfirmLoading(true)

    setTimeout(() => {
      setName(pokemon.name)
      let data = []
      if(caughtPokemon){

        if(JSON.parse(caughtPokemon)){
          data=[pokemon,...JSON.parse(caughtPokemon)]
        }
      }else{
        data=[pokemon]
      }
      setCaughtPokemon(JSON.stringify(data))
      setLoading2(false)
      setVisible(false)
      setConfirmLoading(false)
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setLoading2(false)
    setVisible(false)
  };

  const { TabPane } = Tabs;

  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {/* <> */}
      {({ style }) => (
        <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
      )}
      {/* </> */}
    </Sticky>
  );

  const { Meta } = Card;
  // let history = useHistory();
  let sp = pokemon.sprites

  return (
    // <WplContext.Provider value={[caughtPokemon, setCaughtPokemon]}>
    <div className="app-wrapper" >
      <Spin
        spinning={loading2}
      // delay={500}
      >
        <header>
          <h1 className="title">Wild Pokemon Detail</h1>
          {/* <p>{caughtPokemon}</p> */}
          {/* <button onClick={() => history.goBack()}>Back</button> */}
        </header>

        <section>
          {/* <section className="wild-pokemon"> */}
          <Row type="flex" justify="space-around" align="top">

            <Col xs={24} sm={4} md={6} lg={8} xl={4}>
              <Carousel autoplay>
                <div>
                  <Card
                    cover={
                      <img
                        alt="example"
                        src={imgPath + match.params.id + '.png'}></img>
                    }
                  >
                    <Meta
                      title=""
                      description="Front Side"
                    />
                  </Card>
                </div>

                <div>
                  <Card
                    cover={
                      <img
                        alt="example"
                        src={imgPath + 'back/' + match.params.id + '.png'}></img>
                    }
                  >
                    <Meta
                      title=""
                      description="Back Side"
                    />
                  </Card>
                </div>
              </Carousel>
            </Col>

            <Col style={{ flex: 1 / 2 }} xs={24} sm={4} md={12} lg={8} xl={10}>
              <Descriptions title="Profile">
                <Descriptions.Item label="name">{pokemon.name}</Descriptions.Item>
                <Descriptions.Item label="height">{pokemon.height}</Descriptions.Item>
                <Descriptions.Item label="weigth">{pokemon.weight}</Descriptions.Item>
              </Descriptions>
            </Col>

            <Col style={{ flex: 1 / 2 }} xs={24} sm={16} md={6} lg={8} xl={10}>
              {/* bla bla */}
            </Col>
          </Row>
        </section>

        <section>
          <div>
            {
              !hasCaught && <Button type="primary" onClick={() => catchPokemon(pokemon)}>
                catch
              </Button>
            }
            <Modal
              title="Gotcha"
              visible={visible}
              confirmLoading={confirmLoading}
              onOk={() => handleOk()}
              onCancel={() => handleCancel()}
            >
              <Alert message="Congratulation, you got a new pokemon" type="success" showIcon />
              <br></br>

              <label>rename (alias name)</label>
              <Form onSubmit={() => alert('haha')} className="login-form">
                <Form.Item>
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="name"
                  />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </section>

        <section className="detail-info">
          <StickyContainer>
            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
              <TabPane tab="Moves" key="1" style={{ /* height: 200 */ }}>
                <PokemonMoves moves={pokemonMoves} />
              </TabPane>
              <TabPane tab="Types" key="2">
                <PokemonTypes types={pokemonTypes} />
              </TabPane>
            </Tabs>
          </StickyContainer>
        </section>
      </Spin>
    </div>
    // </WplContext.Provider>
  );
}

export default WildPokemonDetail;
