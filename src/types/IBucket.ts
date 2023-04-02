import { GeoPoint } from "firebase/firestore"

export interface IBucket {
  id?: number | string
  title: string
  imagePath: string
  imageUrl?: string
  done: boolean
  link: string
  coordinates: GeoPoint
}
