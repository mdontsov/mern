import React from "react"

import Avatar from "../../shared/components/UIElements/Avatar"
import Card from "../../shared/components/UIElements/Card"
import { Link } from 'react-router-dom'

import './UserItem.css'

const UserItem = params => {
    return (
        <li className="user-item">
            <Card className="user-item-content">
                <Link to={`/${params.id}/places`}>
                    <div className="user-item-image">
                        <Avatar className="user-item-context" image={params.image} alt={params.name} />
                    </div>
                    <div className="user-item-info">
                        <h2>{params.name}</h2>
                        <h3>
                            {params.placeCount} {params.placeCount === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    )
}

export default UserItem