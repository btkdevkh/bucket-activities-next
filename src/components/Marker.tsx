import markerStyles from "@/styles/Marker.module.css"
import { IBucket } from "@/types/IBucket"
import { GeoPoint } from "firebase/firestore"

type MarkerProps = {
  lat?: number
  lng?: number
  bucket?: IBucket
  handleClickOnMarker: (coordinates: GeoPoint) => void
}

const Marker = ({ bucket, handleClickOnMarker }: MarkerProps) => {
  return (
    <div
      className={markerStyles.marker}
      style={{
        background: `${
          bucket?.done ? "url(marker.png)" : "url(marker_done.png)"
        } center center / cover`,
      }}
      onClick={() => handleClickOnMarker(bucket?.coordinates as GeoPoint)}
    ></div>
  )
}

export default Marker
