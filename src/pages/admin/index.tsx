import {
  colBuckets,
  getDownloadURL,
  ref,
  storage,
  uploadBytes,
} from "@/firebase/config"
import { IBucket } from "@/types/IBucket"
import { GeoPoint, addDoc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState } from "react"

export default function Admin() {
  const router = useRouter()

  const [values, setValues] = useState({
    title: "",
    link: "",
    lat: "",
    lng: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [done, setDone] = useState(false)

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // create a reference to 'images/...'
    const imagesRef = ref(storage, `images/${image}`)

    // upload file
    await uploadBytes(imagesRef, image as File)
    // download file url
    const fileUrl = await getDownloadURL(imagesRef)

    const coordinates = new GeoPoint(+values.lat, +values.lng)

    const newBucket: IBucket = {
      done,
      coordinates,
      title: values.title,
      link: values.link,
      imageUrl: fileUrl,
      imagePath: imagesRef.fullPath,
    }

    await addDoc(colBuckets, newBucket)
    router.push("/")
  }

  return (
    <form className="admin" onSubmit={handleSubmit}>
      <div className="container">
        <h2>Ajouter un bucket</h2>
        <input
          type="text"
          placeholder="Titre"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <input type="file" name="imagePath" onChange={handleChangeImage} />

        <label>
          Déja fait !
          <input
            type="checkbox"
            name="done"
            checked={done}
            onChange={e => setDone(e.target.checked)}
          />
        </label>
        <input
          type="text"
          placeholder="Lien infos"
          name="link"
          value={values.link}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Latitude"
          name="lat"
          value={values.lat}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Longitude"
          name="lng"
          value={values.lng}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </div>
      <Link href="/" data-back>
        Back
      </Link>
    </form>
  )
}
