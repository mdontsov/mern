import React, { useContext } from "react"
import { useHistory } from "react-router-dom"

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"

import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useForm } from "../../shared/hooks/FormHook"
import { useHttpClient } from "../../shared/hooks/HttpHook"
import { AuthContext } from "../../shared/context/AuthContext"

import './PlaceForm.css'

const NewPlace = () => {

    var auth = useContext(AuthContext)
    var { isLoading, isError, sendRequest, clearError } = useHttpClient()
    var [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        }
    )

    var history = useHistory()

    var placeSubmitHandler = async event => {

        event.preventDefault();

        try {

            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                JSON.stringify(
                    {
                        aTitle: formState.inputs.title.value,
                        aDescription: formState.inputs.description.value,
                        aAddress: formState.inputs.address.value,
                        aCreator: auth.userId
                    }
                ),
                {
                    'Content-type': 'application/json'
                }
            )
            history.push('/') // redirect the user to a different page

        } catch (error) {

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={isError} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="title"
                    typeOf="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    typeOf="textarea"
                    type="text"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description of at least 5 charactes long"
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    typeOf="input"
                    type="text"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>Add place</Button>
            </form>
        </React.Fragment>
    )
}

export default NewPlace