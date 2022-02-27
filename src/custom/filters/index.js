export const getDate = (value) => {
  if (!value) return value

  const [date, time] = value.split(' ')
  return date.split('-').reverse().join('/')
}

export const getTime = (value) => {
  if (!value) return value

  const [date, time] = value.split(' ')
  return time.slice(0, 5)
}

export const formatDate = (value) => {
  if (!value) return value

  const date = new Date(value)

  return date.toLocaleString('es-BO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
