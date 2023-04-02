import Buckets from "@/components/Buckets"
import Map from "@/components/Map"
import { colBuckets, db, ref, storage } from "@/firebase/config"
import { IBucket } from "@/types/IBucket"
import {
  GeoPoint,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { deleteObject } from "firebase/storage"
import { useState } from "react"

type HomeProps = {
  buckets: IBucket[]
  authIsReady: boolean
}

const positionInitial = new GeoPoint(48.858159, 2.294497)

export default function Home({ buckets, authIsReady }: HomeProps) {
  const [position, setPosition] = useState(positionInitial)
  const [mapType, setMapType] = useState("roadmap")
  const [zoom, setZoom] = useState(3)
  const [isVisit, setIsVisit] = useState(false)

  const [bucketFiltered, setBucketFiltered] = useState(buckets)

  const handleClickOnMarker = (coordinates: GeoPoint) => {
    setPosition(coordinates)
    setMapType("satellite")
    setZoom(15)
  }

  const handleResetMap = () => {
    setPosition(positionInitial)
    setMapType("roadmap")
    setZoom(3)
    setIsVisit(false)
  }

  const handleVisit = (position: GeoPoint) => {
    setPosition(position)
    setIsVisit(true)
  }

  const handleDelete = async (bucket: IBucket) => {
    await deleteDoc(doc(colBuckets, bucket.id as string))
    // Create a reference to the file to delete
    const desertRef = ref(storage, bucket.imagePath)
    await deleteObject(desertRef)

    setBucketFiltered(prev => [...prev.filter(p => p.id !== bucket.id)])
  }

  const handleGo = async (bucket: IBucket) => {
    let bucketUpdated = { ...bucket, done: !bucket.done }
    setBucketFiltered(prev => [
      ...prev.filter(p => p.id !== bucketUpdated.id),
      bucketUpdated,
    ])
    await updateDoc(doc(colBuckets, bucket.id as string), bucketUpdated)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div id="dream-buckets">
          <Buckets
            buckets={bucketFiltered}
            handleVisit={handleVisit}
            handleGo={handleGo}
            authIsReady={authIsReady}
            handleDelete={handleDelete}
          />
        </div>
        <div id="google-map">
          <Map
            buckets={bucketFiltered}
            position={position}
            zoom={zoom}
            mapType={mapType}
            isVisit={isVisit}
            handleClickOnMarker={handleClickOnMarker}
          />
          <button className="reset-map" onClick={handleResetMap}>
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let data: any[] = []
  const documents = await getDocs(colBuckets)
  documents.docs.forEach(d => {
    data.push({ ...d.data(), id: d.id })
  })

  const buckets = JSON.parse(JSON.stringify(data))

  return {
    props: { buckets },
  }
}
