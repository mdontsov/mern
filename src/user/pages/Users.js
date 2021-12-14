import React from "react"

import UsersList from "../components/UsersList"

const Users = () => {

    const USERS = [
        {
            id: 'u1',
            name: 'myName',
            image: 'https://previews.123rf.com/images/ratoca/ratoca1902/ratoca190200003/125283307-funny-small-dog-draw.jpg',
            places: 3
        }
    ]

    console.log(USERS)

    return (
        <UsersList items={USERS} />
    )
}

export default Users