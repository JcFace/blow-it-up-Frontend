import React, { useState } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
// import Blowers from '../Containers/Blowers'
// import UserCard from '../Containers/UserCard'

const Map = ({selected}) => {
    const [selectedPlace, setSelectedPlace] = useState(null)
    console.log(selected)
    return (
        <GoogleMap 
        defaultZoom={10} 
        defaultCenter={{lat: selected.lat, lng: selected.lng}}>
            <Marker 
                position={{
                    lat: selected.lat,
                    lng: selected.lng}}
                onClick={() => setSelectedPlace(selected)} />
                
                {selectedPlace && (
                 <InfoWindow 
                    position={{
                        lat: selectedPlace.lat,
                        lng: selectedPlace.lng
                             }}
                    onCloseClick={() => {
                        setSelectedPlace(null)
                    }}>
                       <div>
                            <h4>{selected.full_name}</h4>
                        </div> 
                </InfoWindow>
                        )}
        </GoogleMap>
    )
}

const Mapper = withScriptjs(withGoogleMap(Map))

export default function App({selected}) {
    return (
        <div style={{width: '50vw', height: '75vh'}}>
            <Mapper 
            selected={selected}
            googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCNNvq0aDPhzroRJJTGLg_cMbPAEnJxKGA'} 
            loadingElement={<div style={{height: '100%'}}/>}
            containerElement={<div style={{height: '100%'}}/>}
            mapElement={<div style={{height: '100%'}}/>} />
        </div>
    )
}

