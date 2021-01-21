function ToEuro(value) {
  return Number(value).toLocaleString('en-IE', {
    style: 'currency',
    currency: 'EUR'
  })
}

export default ToEuro
