import { useState, useEffect, useMemo } from 'react'
import { db } from 'services/firebase'

function useOrders() {
  const [orders, setOrders] = useState(null)

  const status = useMemo(
    () => ({
      pending: 'pending',
      inProgress: 'inProgress',
      outForDelivery: 'outForDelivery',
      delivered: 'delivered'
    }),
    []
  )

  useEffect(() => {
    const initialStatus = Object.keys(status).reduce((acc, status) => {
      return {
        ...acc,
        [status]: []
      }
    }, {})

    db.collection('orders')
      .get()
      .then((querySnapshot) => {
        const docs = []

        querySnapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            ...doc.data()
          })
        })

        setOrders(
          docs.reduce(
            (acc, doc) => ({
              ...acc,
              pending: acc.pending.concat(doc)
            }),
            initialStatus
          )
        )
      })
  }, [status])

  return { orders, status }
}

export default useOrders
