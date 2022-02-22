export const getDate = (value) => {
  if(!value) return value

  const [date, time] = value.split(' ')
  return date.split('-').reverse().join('/')
}

export const getTime = (value) => {
  if(!value) return value

  const [date, time] = value.split(' ')
  return time.slice(0, 5)
}
