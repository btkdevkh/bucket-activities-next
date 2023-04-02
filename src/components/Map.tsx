import {
  LoadScript,
  GoogleMap,
  StreetViewPanorama,
} from "@react-google-maps/api"
import mapStyles from "@/styles/Map.module.css"
import { GeoPoint } from "firebase/firestore"
import { IBucket } from "@/types/IBucket"
import { Marker } from "@react-google-maps/api"

type MapProps = {
  buckets: IBucket[]
  position: GeoPoint
  zoom: number
  mapType: string
  isVisit: boolean
  handleClickOnMarker: (coordinates: GeoPoint) => void
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const Map = ({
  buckets,
  position,
  zoom,
  mapType,
  handleClickOnMarker,
  isVisit,
}: MapProps) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_KEY as string}>
      <div className={mapStyles.map}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: position.latitude, lng: position.longitude }}
          zoom={zoom}
          options={{
            mapTypeId: mapType,
          }}
        >
          {buckets &&
            buckets.map((bucket: IBucket) => (
              <Marker
                key={bucket.id}
                position={{
                  lat: bucket.coordinates.latitude,
                  lng: bucket.coordinates.longitude,
                }}
                icon={bucket.done ? "/marker_done.png" : "/marker.png"}
                onClick={() => handleClickOnMarker(bucket.coordinates)}
              />
            ))}

          <StreetViewPanorama
            options={{
              position: { lat: position.latitude, lng: position.longitude },
              pov: {
                heading: 34,
                pitch: 10,
              },
              visible: isVisit,
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  )
}

export default Map
