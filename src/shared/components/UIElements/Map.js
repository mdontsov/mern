import React, { useRef, useEffect } from "react"

import './Map.css'

const Map = params => {

    const mapRef = useRef()

    const { center, zoom } = params

    useEffect(() => {
        const myMap = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        })

        new window.google.maps.Marker({
            position: center,
            map: myMap
        })
    }, [center, zoom])

    return (
        <div ref={mapRef} className={`map ${params.className}`} style={params.style}>

        </div>
    )
}

export default Map