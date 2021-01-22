import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'

function Map() {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{lat: 37.804363, lng: -122.271111}}>

        </GoogleMap>
    )
}
const Mapper = withScriptjs(withGoogleMap(Map))

export default function App() {
    return (
        <div style={{width: '50vw', height: '50vh'}}>
            <Mapper 
            googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'} 
            loadingElement={<div style={{height: '100%'}}/>}
            containerElement={<div style={{height: '100%'}}/>}
            mapElement={<div style={{height: '100%'}}/>} />
        </div>
    )
}