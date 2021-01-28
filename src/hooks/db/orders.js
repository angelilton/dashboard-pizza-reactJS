import { useState, useEffect, useMemo, useCallback } from 'react'
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

  const getOrders = useCallback(() => {
    const initialStatus = Object.keys(status).reduce((acc, status) => {
      return {
        ...acc,
        [status]: []
      }
    }, {})

    db.collection('orders')
      .orderBy('createdAt', 'asc')
      .get()
      .then((querySnapshot) => {
        const docs = []

        querySnapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            ...doc.data()
          })
        })
        // return a new devolve object filtered by status type
        setOrders(
          docs.reduce((acc, doc) => {
            const maisStatus = doc.status || status.pending
            return {
              ...acc,
              [maisStatus]: acc[maisStatus].concat(doc)
            }
          }, initialStatus)
        )
      })
  }, [status])

  const updateOrder = useCallback(
    async ({ orderId, status }) => {
      await db
        .collection('orders')
        .doc(orderId)
        .set({ status }, { merge: true })
      getOrders()
    },
    [getOrders]
  )

  useEffect(() => {
    getOrders()
  }, [getOrders])

  return { orders, status, updateOrder }
}

export default useOrders
