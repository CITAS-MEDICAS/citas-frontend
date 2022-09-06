const timeToInt = time => Number(time.split(':').join(''))

const toTime = n => {
  let hh = Math.floor(n / 100)
  let mm = n % 100
  return [hh, mm]
}

const addTime = (a, b) => {
  const t1 = toTime(a)
  const t2 = toTime(b)
  let hh = t1[0] + t2[0]
  let mm = t1[1] + t2[1]
  if (mm >= 60) {
    hh += 1
    mm = mm % 60
  }
  return hh * 100 + mm
}

const generateTimeInterval = options => {
  const start = timeToInt(options.start)
  const end = timeToInt(options.end)
  const step = timeToInt(options.step)

  let current = start
  const result = []

  while (current <= end) {
    const [hh, mm] = toTime(current)
    result.push([`0${hh}`.slice(-2), `0${mm}`.slice(-2)].join(':'))
    current = addTime(current, step)
  }
  return result
}

export const useTimeSelect = () => {
  return {
    generateTimeInterval,
    timeToInt,
  }
}
