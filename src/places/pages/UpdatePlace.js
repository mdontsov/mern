import React, { useEffect, useState, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"

import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import Card from "../../shared/components/UIElements/Card"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/FormHook"
import { useHttpClient } from "../../shared/hooks/HttpHook"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import { AuthContext } from "../../shared/context/AuthContext"

import './PlaceForm.css'

const UpdatePlace = () => {

    var auth = useContext(AuthContext)

    var { isLoading, isError, sendRequest, clearError } = useHttpClient()

    var [loadedPlace, setLoadedPlace] = useState()

    var placeId = useParams().placeId

    var [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    )

    useEffect(() => {
        async function fetchPlace() {
            try {
                var responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
                setLoadedPlace(responseData.place)

                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    },
                    true
                )
            } catch (error) {

            }
        }
        fetchPlace()
    }, [sendRequest, placeId, setFormData])

    var history = useHistory()

    var placeUpdateSubmitHandler = async event => {

        event.preventDefault()

        try {

            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify(
                    {
                        aTitle: formState.inputs.title.value,
                        aDescription: formState.inputs.description.value
                    }
                ),
                {
                    'Content-type': 'application/json'
                }
            )
            history.push(`/${auth.userId}/places`) // redirect the user to a different page

        } catch (error) {

        }
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if (!loadedPlace && !isError) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place</h2>
                </Card>
            </div>
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={isError} onClear={clearError} />
            {
                !isLoading && loadedPlace &&
                <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                    <Input
                        id="title"
                        typeOf="input"
                        type="text"
                        label="Title"
                        validators={
                            [
                                VALIDATOR_REQUIRE()
                            ]
                        }
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        typeOf="textarea"
                        label="Description"
                        validators={
                            [
                                VALIDATOR_MINLENGTH(5)
                            ]
                        }
                        errorText="Please enter a valid description of at least 5 characters"
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>Update place</Button>
                </form>
            }
        </React.Fragment>
    )
}

export default UpdatePlace