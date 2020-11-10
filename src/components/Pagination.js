import React from 'react'
import { Button } from 'antd'

export default function Pagination({ goToNextPage, goToPrevPage }) {
    return (
        <div>
            {
                goToPrevPage && <Button type="primary" onClick={goToPrevPage}>Prev</Button>
            }
            &nbsp;
            {
                goToNextPage && <Button type="primary" onClick={goToNextPage}>Next</Button>
            }
        </div>
    )
}
