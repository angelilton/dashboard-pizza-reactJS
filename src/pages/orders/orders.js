import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer as MaterialTableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import { useOrders } from 'hooks'
import { singularOrPlural } from 'utils'

function Orders() {
  const { orders, status } = useOrders()
  console.log('orders:', orders)

  const allOrderStatus = useMemo(() => {
    return [
      {
        title: 'Pedidos pendentes',
        type: status.pending
      },

      {
        title: 'Pedidos em produção',
        type: status.inProgress
      },

      {
        title: 'Saiu para entrega',
        type: status.outForDelivery
      },

      {
        title: 'Pedidos finalizados',
        type: status.delivered
      }
    ]
  }, [status])

  //convert bd format data to hours
  const getHour = useCallback((date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric'
    }
    return Intl.DateTimeFormat('pt-BR', options).format(date)
  }, [])

  return allOrderStatus.map((orderStatus) => (
    <TableContainer key={orderStatus.title}>
      <TableTitle>{orderStatus.title}</TableTitle>
      <Table>
        <THead>
          <TableRow>
            <Th>
              <Typography>Informações do pedido</Typography>
            </Th>
          </TableRow>
        </THead>

        <TableBody>
          {orders?.[orderStatus.type].map((order) => {
            const {
              address,
              number,
              complement,
              district,
              code: cep,
              city,
              state
            } = order.address

            return (
              <TableRow key={order.id}>
                <TableCell>
                  <div>
                    <Subtitle>
                      Horário do pedido: {getHour(order.createdAt.toDate())}
                    </Subtitle>
                  </div>

                  <div>
                    <Subtitle>Pedido:</Subtitle>

                    <ul>
                      {order.pizzas.map((pizza, index) => (
                        <li key={index}>
                          <Typography>
                            {` ${
                              pizza.quantity
                            } ${pizza.size.name.toUpperCase()}${singularOrPlural(
                              pizza.quantity,
                              '',
                              'S'
                            )} de `}
                            {pizza.flavours.map(({ name }) => name).join(' | ')}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Subtitle>Endereço de entrega:</Subtitle>

                    <Typography>
                      {` ${address},  ${number && `Nº ${number} `} `}
                      <br />
                      {`${complement && ` ${complement}`}`}
                      {complement && <br />}
                      Bairro: {`${district} - CEP: ${cep}`}
                      <br />
                      {`${city} / ${state}`}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ))
}

const TableContainer = styled(MaterialTableContainer).attrs({
  component: Paper
})`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

const TableTitle = styled(Typography).attrs({
  variant: 'h6'
})`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const Subtitle = styled(Typography).attrs({
  variant: 'button'
})`
  font-weight: bold;
`

const THead = styled(TableHead)`
  background: ${({ theme }) => theme.palette.common.black};
`

const Th = styled(TableCell)`
  color: ${({ theme }) => theme.palette.common.white};
`

export default Orders
