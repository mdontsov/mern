import React, { useState, useContext } from "react"

import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import Card from "../../shared/components/UIElements/Card"
import { useForm } from "../../shared/hooks/FormHook"
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL
} from "../../shared/util/validators"
import { AuthContext } from "../../shared/context/AuthContext"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/HttpHook"

import '../../places/pages/PlaceForm.css'
import './Auth.css'

const Auth = () => {

    var auth = useContext(AuthContext)

    var [isLoginMode, setIsLoginMode] = useState(true)

    var { isLoading, isError, sendRequest, clearError } = useHttpClient()

    var [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }
    )

    var signupHandler = () => {

        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                }, formState.inputs.email.isValid && formState.inputs.password.isValid
            )
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: '',
                    isValid: false
                }, false
            )
        }
        setIsLoginMode(formerState => !formerState)
    }

    var authSubmitHandler = async event => {

        event.preventDefault();

        if (isLoginMode) {

            try {

                var responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify(
                        {
                            aEmail: formState.inputs.email.value,
                            aPassword: formState.inputs.password.value
                        }
                    ),
                    {
                        'Content-Type': 'application/json'
                    }
                )

                auth.login(responseData.user.id)

            } catch (error) {
                // custom useHttpClient hook will do the things so empty catch here
            }
        } else {
            try {

                responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify(
                        {
                            aUserName: formState.inputs.name.value,
                            aEmail: formState.inputs.email.value,
                            aPassword: formState.inputs.password.value
                        }
                    ),
                    {
                        'Content-Type': 'application/json'
                    }
                )

                auth.login(responseData.user.id)

            } catch (error) {
                // custom useHttpClient hook will do the things so empty catch here
            }
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={isError} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Please authenticate</h2>
                <hr />
                <form className="place-form" onSubmit={authSubmitHandler}>
                    {
                        !isLoginMode &&
                        <Input
                            typeOf="input"
                            id="name"
                            type="text"
                            label="Your name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name"
                            onInput={inputHandler}
                        />
                    }
                    <Input
                        id="email"
                        typeOf="input"
                        type="email"
                        label="Email"
                        validators={
                            [
                                VALIDATOR_EMAIL
                            ]
                        }
                        errorText="Please enter an email"
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        typeOf="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a password"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Authenticate' : 'Signup'}</Button>
                </form>
                <Button inverse onClick={signupHandler}>Switch to {isLoginMode ? 'Signup' : 'Authenticate'}</Button>
            </Card>
        </React.Fragment>
    )
}

export default Auth