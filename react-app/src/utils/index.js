// -- Time Format for dynamic Review dates -- //
export const timeFormatter = (date) => {
  let now = new Date()
  let then = new Date(date)
  let timeElapsed = now - then
  let oneDay = (1000 * 3600 * 24)
  let daysSince = (timeElapsed / oneDay)
  daysSince = Math.round(daysSince)
  if (daysSince < 1) {
    return `less than 1 day ago...`
  } else if (daysSince === 1) {
    return `Just 1 day ago...`
  } else if (daysSince > 14) {
    return `more than 2 weeks ago...`
  } else if (daysSince > 31) {
    return `over a month ago...`
  } else if (daysSince > 365) {
    return `over a year ago...`
  } else {
    return `About ${daysSince} days ago...`
  }
}


// -- Create Average Rating for Item by ID from All Reviews -- //
export const avgRating = (arr) => {
  const avg = arr?.reduce((a, c) => {
    return a + c.rating
  }, 0) / arr.length

  return avg.toFixed(1)
  // note: was 2
}


 // -- Create Cart Total for User's Cart -- //
 export const cartTotal = (cartItems) => {
  const prices = cartItems.map(item => [item.item.price, item.quantity])
  const total = prices.reduce((a, c) => a += (c[0] *= c[1]), 0)

  return total.toFixed(2)
}


// -- Dynamic String Input Check with Reducer -- //
export const inputHandler = (str, n) => {
  const reduced = str.replace(/\s+/g, " ").trim()
  if (reduced.split(' ').filter(char => char !== '').length >= n) return reduced;
  else return [`Input must be at least ${n} characters (excluding spaces / no excess spaces)`]
}
// -- NOTE: use "Array.isArray(inputHandler()) ? (setErrors([res])) : pass along res to next step of form"
// -- to confirm if error message is return to "setErrors" slice in component - ternary false
