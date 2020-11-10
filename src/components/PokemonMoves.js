import React from 'react'
import { List, Typography } from 'antd'
import { Link } from 'react-router-dom'

export default function PokemonMoves({ moves }) {
    return (
        <List
            size="small"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={moves}
            renderItem={item => <List.Item>{item.move.name}</List.Item>}
        />
    )
}
