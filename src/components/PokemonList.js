import React from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Card, Result, Button } from 'antd';

const { Meta } = Card;

export default function PokemonList({pokemon, caughtPokemon}) {
    console.log(pokemon)
    let imgPath = 'https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/'
const loading = false
    return (
        // <div>{
        pokemon ?
            pokemon.map(p => {
                let urlx = p.url.split('/')

                if (loading) {
                    return (
                        <Skeleton loading={loading} avatar={'circle'} paragraph={true} />
                    )
                } else {
                    return (
                        <Link key={p.name} to={`/rtp/wild-pokemon-detail/${urlx[6]}`}>
                            <Card

                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={imgPath + urlx[6] + '.png'} />}
                            >
                                <Meta title={p.name} description={''} />
                            </Card>
                        </Link>
                    )
                }
            }) : (
                <Result
                    status="warning"
                    title="You don't have any pokemon"
                    extra={
                        <Link to="/rtp/wild-pokemon-list">
                            <Button type="primary" key="console">
                                find pokemon
                            </Button>
                        </Link>
                    }
                />)
        // }</div>

        // <Card
        //     hoverable
        //     style={{ width: 240 }}
        //     cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        // >
        //     <Meta title="Europe Street beat" description="www.instagram.com" />
        // </Card> 

        // <div>{
        //     pokemon.map(p => {
        //         let urlx = p.url.split('/')

        //         return (
        //             <Link to={`/wild-pokemon-detail/${urlx[6]}`}>
        //                 <div key={p.id}>
        //                     <img src={imgPath + urlx[6] + '.png'} /><br />
        //                     {p.name}
        //                 </div>
        //             </Link>
        //         )
        //     })
        // }</div >
    )
}
