export const weiToEth = (value: bigint, unitOrDecimals: bigint): number => {
  const decimalsNumber = unitOrDecimals <= 32 ? Number(unitOrDecimals) : unitOrDecimals.toString().length - 1
  if (decimalsNumber <= 0) {
    return Number(value)
  }
  const valueString = value.toString()
  const zeroPaddedValue = valueString.padStart(decimalsNumber, '0')

  const integer = zeroPaddedValue.slice(0, -decimalsNumber)
  const fraction = zeroPaddedValue.slice(-decimalsNumber)

  if (integer === '') {
    return Number(`0.${fraction}`)
  }

  if (fraction === '') {
    return Number(integer)
  }

  return Number(`${integer}.${fraction}`)
}

export const ethToWei = (value: number, decimals: number): bigint => {
  const valueString = value.toString()
  const [integer, fraction] = valueString.split('.')
  if (fraction === undefined) {
    if (integer === '0') {
      return BigInt(0)
    }
    return BigInt(`${integer}${'0'.repeat(decimals)}`)
  }

  const fractionString = fraction.padEnd(decimals, '0')
  return BigInt(`${integer}${fractionString}`)
}
