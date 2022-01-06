import React, { useEffect, useState } from "react"

import UsersList from "../components/UsersList"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/HttpHook"

const Users = () => {

    var { isLoading, isError, sendRequest, clearError } = useHttpClient()

    var [loadedUsers, setLoadedUsers] = useState()

    useEffect(() => {

        async function fetchUsers() {

            try {
                var responseData = await sendRequest('http://localhost:5000/api/users')

                setLoadedUsers(responseData.users)  // router.get('/', usersController.getUsers) response

            } catch (error) {

            }
        }
        fetchUsers()

    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={isError} onClear={clearError} />
            {
                isLoading &&
                <div className="center">
                    <LoadingSpinner />
                </div>
            }
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    )
}

export default Users