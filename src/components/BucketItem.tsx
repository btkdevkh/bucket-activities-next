import Link from "next/link"
import bucketItemStyles from "@/styles/BucketItem.module.css"
import { IBucket } from "@/types/IBucket"
import { GeoPoint } from "firebase/firestore"

type BucketItemProps = {
  bucket: IBucket
  authIsReady?: boolean
  handleVisit: (position: GeoPoint) => void
  handleGo: (bucket: IBucket) => void
  handleDelete: (bucket: IBucket) => void
}

export default function BucketItem({
  bucket,
  handleVisit,
  handleGo,
  authIsReady,
  handleDelete,
}: BucketItemProps) {
  return (
    <div className={bucketItemStyles.bucket}>
      <h3 className={bucketItemStyles.h3}>{bucket.title}</h3>
      <div className={bucketItemStyles.imgContainer}>
        <img src={bucket.imageUrl} alt={bucket.title} />
      </div>
      <div className={bucketItemStyles.btns}>
        <button
          className={`${bucketItemStyles.start} ${
            bucket.done ? bucketItemStyles.done : ""
          }`}
          onClick={() => handleGo(bucket)}
        >
          {bucket.done ? "Déja été ! Refaire" : "Aller"}
        </button>
        <hr />
        <br />
        <div className={bucketItemStyles.div}>
          <button
            className={bucketItemStyles.visit}
            onClick={() => handleVisit(bucket.coordinates)}
          >
            Visiter
          </button>
          <button className={bucketItemStyles.infos}>
            <Link
              className={bucketItemStyles.a}
              href={bucket.link}
              target="_blank"
            >
              Plus d'infos
            </Link>
          </button>
        </div>
      </div>

      {authIsReady && (
        <button
          className={bucketItemStyles.deleteBtn}
          onClick={() => handleDelete(bucket)}
        >
          Del
        </button>
      )}
    </div>
  )
}
