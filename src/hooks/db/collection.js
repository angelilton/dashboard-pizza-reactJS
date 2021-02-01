import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { db } from 'services/firebase'

function useCollection(collection) {
  const [data, setData] = useState(null)

  //sempre que o pathname (rota) mudar o useEffect abaixo vai re-renderizar
  //e atualizar a table de pizzaSize
  const { pathname } = useLocation()

  const add = useCallback(
    (data) => {
      console.log('add-size:', data)
      return db.collection(collection).add(data)
    },
    [collection]
  )

  useEffect(() => {
    let mounted = true

    db.collection(collection)
      .get()
      .then((querySnapshot) => {
        let docs = []

        querySnapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            ...doc.data()
          })
        })

        if (mounted) {
          setData(docs)
        }
      })

    return () => {
      mounted = false
    }
  }, [collection, pathname])

  return { data, add }
}

export default useCollection
