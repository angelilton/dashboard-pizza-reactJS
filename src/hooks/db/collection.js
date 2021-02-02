import { useMounted } from 'hooks'
import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { db } from 'services/firebase'

function useCollection(collection) {
  const [data, setData] = useState(null)
  const mounted = useMounted()

  //sempre que o pathname (rota) mudar o useEffect abaixo vai re-renderizar
  //e atualizar a table de pizzaSize
  const { pathname } = useLocation()

  const fetchCollectionData = useCallback(() => {
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

        if (mounted.current) {
          setData(docs)
        }
      })
  }, [collection, mounted])

  const add = useCallback(
    (data) => {
      console.log('add-size:', data)
      return db.collection(collection).add(data)
    },
    [collection]
  )

  const remove = useCallback(
    async (id) => {
      await db.collection(collection).doc(id).delete()
      fetchCollectionData()
    },
    [collection, fetchCollectionData]
  )

  useEffect(() => {
    fetchCollectionData()
  }, [fetchCollectionData, pathname])

  return { data, add, remove }
}

export default useCollection
