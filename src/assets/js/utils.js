export function formateToCelsius (value, from) {
  const unitsOfMeasurment = {
    k: value => value - 273.15,
    f: value => (value - 32) * 5 / 9
  }

  return unitsOfMeasurment[from](value)
}
