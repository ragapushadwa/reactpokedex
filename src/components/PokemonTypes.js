import React from 'react'
import { List, Typography } from 'antd'
import { Link } from 'react-router-dom'

export default function PokemonTypes({ types }) {
    // console.log(types)
    return (
        // <div className="pokemon-type">{
        //     types.map(p => (
        //         <div key={p.type.name}>
        //             {p.type.name}
        //         </div>
        //     ))
        // }</div >
        <List
            size="small"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={types}
            renderItem={item => <List.Item>{item.type.name}</List.Item>}
        />

    )
}
