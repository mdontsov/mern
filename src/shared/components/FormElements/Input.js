import React, { useReducer, useEffect } from "react"

import { validate } from "../../util/validators"

import './Input.css'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}

const Input = params => {

    var [inputState, dispatch] = useReducer(
        inputReducer,
        {
            value: params.initialValue || '',
            isValid: params.initialValid,
            isTouched: params.isValid || false
        }
    )

    var { id, onInput } = params
    var { value, isValid } = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    var changeHandler = event => {
        dispatch(
            {
                type: 'CHANGE',
                val: event.target.value,
                validators: params.validators
            }
        )
    }

    var touchHandler = () => {
        dispatch(
            {
                type: 'TOUCH'
            }
        )
    }

    var element = params.typeOf === "input" ?
        <input
            id={params.id}
            type={params.type}
            placeholder={params.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />
        :
        <textarea
            id={params.id}
            rows={params.rows || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />

    return (
        <div className={`form-control ${!inputState.isValid
            && inputState.isTouched
            && 'form-control--invalid'}`}>
            <label htmlFor={params.id}>{params.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{params.errorText}</p>}
        </div>
    )
}

export default Input