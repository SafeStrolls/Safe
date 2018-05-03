import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const MapTiles = ({ tile }) => {
    const { origin, destination, apikey, strokeWidth, strokeColor } = tile;

    return (
        <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={apikey}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            mode='walking'
        />
    );
};

export default MapTiles;
