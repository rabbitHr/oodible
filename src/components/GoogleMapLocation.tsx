import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, DirectionsRenderer, Circle } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

const libraries = ["places"] as const;

interface GoogleMapLocationProps {
  apiKey: string;
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    name?: string;
    address?: string;
  }) => void;
  deliveryRadius: number; // in meters
}

const GoogleMapLocation: React.FC<GoogleMapLocationProps> = ({ 
  apiKey, 
  onLocationSelect,
  deliveryRadius
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
    address?: string;
  } | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const defaultCenter = {
    lat: 31.2504,
    lng: 75.7064
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const onSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (!searchBoxRef.current) return;

    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) return;

    const place = places[0];
    if (!place.geometry?.location) return;

    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      name: place.name || '',
      address: place.formatted_address || ''
    };

    setCurrentLocation(location);
    onLocationSelect(location);

    if (mapRef.current) {
      mapRef.current.panTo(location);
      mapRef.current.setZoom(15);
    }

    calculateRoute(location);
  }, [onLocationSelect]);

  const calculateRoute = useCallback((destination: { lat: number; lng: number }) => {
    if (!mapRef.current || !currentLocation) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentLocation,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [currentLocation]);

  const getCurrentLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          if (!mapRef.current) {
            throw new Error('Map not initialized');
          }

          const geocoder = new google.maps.Geocoder();
          const response = await geocoder.geocode({
            location: { lat: latitude, lng: longitude }
          });

          const location = {
            lat: latitude,
            lng: longitude,
            name: 'Current Location',
            address: response.results[0]?.formatted_address || ''
          };
          
          setCurrentLocation(location);
          onLocationSelect(location);
          
          mapRef.current.panTo(location);
          mapRef.current.setZoom(15);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to get location');
          console.error('Location error:', error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setError(getGeolocationErrorMessage(error));
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [onLocationSelect]);

  const getGeolocationErrorMessage = (error: GeolocationPositionError): string => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        return 'Location access denied. Please enable location permissions.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information unavailable. Please try again.';
      case error.TIMEOUT:
        return 'Location request timed out. Please try again.';
      default:
        return 'An unknown error occurred while getting your location.';
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries}
      loadingElement={<div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 animate-spin" /></div>}
    >
      <div className="p-4 space-y-4">
        <div className="relative">
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Search location..."
              className="w-full px-3 py-2 border rounded-md pr-24"
              disabled={isLoading}
            />
          </StandaloneSearchBox>
          
          <button 
            onClick={getCurrentLocation}
            disabled={isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-md text-sm ${
              isLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </span>
            ) : (
              'Current Location'
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {currentLocation && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="font-semibold">{currentLocation.name || 'Selected Location'}</p>
            {currentLocation.address && (
              <p className="text-sm text-gray-600">{currentLocation.address}</p>
            )}
          </div>
        )}

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation || defaultCenter}
          zoom={15}
          onLoad={onMapLoad}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          {currentLocation && (
            <Marker 
              position={currentLocation} 
              title={currentLocation.name || "Selected Location"}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
          {currentLocation && (
            <Circle 
              center={currentLocation} 
              radius={deliveryRadius} 
              options={{
                fillColor: '#FF0000',
                fillOpacity: 0.2,
                strokeColor: '#FF0000',
                strokeOpacity: 0.5,
                strokeWeight: 1,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default React.memo(GoogleMapLocation);
