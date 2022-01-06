import React from "react"

import UserItem from "./UserItem"
import Card from "../../shared/components/UIElements/Card"

import './UsersList.css'

const UsersList = params => {

    if (params.items.length === 0) {
        return (
            <div>
                <Card>
                    <h2>No users found</h2>
                </Card>
            </div>
        )
    }

    return (
        <ul>
            {
                params.items.map(
                    userItem => (
                        <UserItem
                            key={userItem.id}
                            id={userItem.id}
                            image={userItem.image}
                            name={userItem.name}
                            placeCount={userItem.places.length}
                        />
                    )
                )
            }
        </ul>
    )
}

export default UsersList