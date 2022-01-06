import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import PlaceList from "../components/PlaceList"
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/HttpHook'

const UserPlaces = () => {

    var [loadedPlaces, setLoadedPlaces] = useState()
    var { isLoading, isError, sendRequest, clearError } = useHttpClient()
    var userId = useParams().userId

    useEffect(() => {

        async function fetchPlaces() {
            try {
                var responseData = await sendRequest(`http://localhost:5000/api/places/users/${userId}`)
                setLoadedPlaces(responseData.places)
            } catch (error) {

            }
        }

        fetchPlaces()
    }, [sendRequest, userId])

    var placeDeletedHandler = function (deletedPlaceId) {

        setLoadedPlaces(predicate => predicate.filter(
            place => place.id !== deletedPlaceId
        ))
    }

    return (
        <React.Fragment>
            <ErrorModal error={isError} onClear={clearError} />
            {
                isLoading &&
                <div className="center">
                    <LoadingSpinner />
                </div>
            }
            {
                !isLoading &&
                loadedPlaces &&
                <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
            }
        </React.Fragment>
    )

}

export default UserPlaces