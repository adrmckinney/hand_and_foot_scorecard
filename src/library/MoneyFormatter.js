// @flow

class MoneyFormatter {
  toDollars(money, noCents = false) {
    const dollars = money !== null ? this.cleanMoney(money) / 100 : 0

    const isNegative = Math.sign(money) === -1 ?? false

    return (
      `${isNegative ? '-' : ''}` +
      Math.abs(dollars).toLocaleString(undefined, {
        minimumFractionDigits: noCents ? 0 : 2,
        maximumFractionDigits: noCents ? 0 : 2,
      })
    )
  }

  toPennies(money) {
    return Math.round(100 * this.cleanMoney(money))
  }

  cleanMoney(money) {
    return parseFloat(typeof money === 'string' ? money.replace(/[$,]/g, '') : money)
  }

  convertMoneyStringToPennies(value) {
    const valueNoPeriods = value?.toString().replace(/[.]/g, '')
    return this.cleanMoney(valueNoPeriods !== '' ? valueNoPeriods : 0)
  }

  negativableMoneyToPennies(value: string | number) {
    let pennies = this.convertMoneyStringToPennies(value?.replace(/[-$,]/g, ''))
    return value?.toString()?.indexOf('-') > -1 ? `-${pennies}` : pennies
  }

  forceDecimals(money) {
    const dollars = money !== null ? this.cleanMoney(money) : 0

    return dollars.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
}

export default new MoneyFormatter()
