import BucketItem from "./BucketItem"
import bucketsStyles from "@/styles/Buckets.module.css"
import { IBucket } from "@/types/IBucket"
import { GeoPoint } from "firebase/firestore"

type BucketsProps = {
  buckets: IBucket[]
  authIsReady: boolean
  handleVisit: (position: GeoPoint) => void
  handleGo: (bucket: IBucket) => void
  handleDelete: (bucket: IBucket) => void
}

export default function Buckets({
  buckets,
  handleVisit,
  handleGo,
  authIsReady,
  handleDelete,
}: BucketsProps) {
  return (
    <div className={bucketsStyles.buckets}>
      {buckets &&
        buckets.map(bucket => (
          <BucketItem
            key={bucket.id}
            bucket={bucket}
            handleVisit={handleVisit}
            handleGo={handleGo}
            authIsReady={authIsReady}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  )
}
