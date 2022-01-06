import React, { useState, useContext } from "react"

import Card from "../../shared/components/UIElements/Card"
import Button from "../../shared/components/FormElements/Button"
import Modal from "../../shared/components/UIElements/Modal"
import Map from "../../shared/components/UIElements/Map"
import { AuthContext } from "../../shared/context/AuthContext"
import { useHttpClient } from "../../shared/hooks/HttpHook"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import './PlaceItem.css'

const PlaceItem = params => {

    var { isLoading, isError, sendRequest, clearError } = useHttpClient()

    var auth = useContext(AuthContext)

    var [showMap, setShowMap] = useState(false)

    var [showDeletionModal, setShowDeletionModal] = useState(false)

    var openMapHandler = () => setShowMap(true)

    var closeMapHandler = () => setShowMap(false)

    var showDeletionWarning = () => {
        setShowDeletionModal(true)
    }

    var cancelDeletionHandel = () => {
        setShowDeletionModal(false)
    }

    var confirmationDeletionHandler = async () => {

        setShowDeletionModal(false)

        try {

            await sendRequest(
                `http://localhost:5000/api/places/${params.id}`,    // id is mapped through PlaceItem params in PlaceItem
                'DELETE'
            )
            params.onDelete(params.id)
            
        } catch (error) {

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={isError} onClear={clearError} />
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={params.address}
                contentClass="place-item-modal-content"
                footerClass="place-item-modal-actions"
                footer={<Button onClick={closeMapHandler}>Close</Button>}
            >
                <div className="map-container">
                    <Map center={params.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showDeletionModal}
                onCancel={cancelDeletionHandel}
                header="Warning"
                footerClass="place-item-modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeletionHandel}>Cancel</Button>
                        <Button danger onClick={confirmationDeletionHandler}>Delete</Button>
                    </React.Fragment>
                }>
                <h2>
                    Are you really sure about deleting this place? You cannot revert it later
                </h2>
            </Modal>
            <li className="place-item">
                <Card className="place-item-content">
                    {
                        isLoading && <LoadingSpinner asOverlay />
                    }
                    <div className="place-item-image">
                        <img src={params.image} alt={params.title}></img>
                    </div>
                    <div className="place-item-info">
                        <h2>{params.title}</h2>
                        <h3>{params.address}</h3>
                        <p>{params.description}</p>
                    </div>
                    <div className="place-item-actions">
                        <Button inverse onClick={openMapHandler}>View on map</ Button>
                        {
                            auth.userId === params.creatorId &&
                            <Button to={`/places/${params.id}`}>Edit place</ Button>
                        }
                        {
                            auth.userId === params.creatorId &&
                            <Button danger onClick={showDeletionWarning}>Delete place</ Button>
                        }

                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem