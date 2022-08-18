interface NavElement {
  name: string
  path: string
  title: string
}

interface ValuteDeserialized {
  ID: string
  CharCode: string
  Name: string
  Nominal: number
  NumCode: string
  Previous: number
  Value: number
}

class Valute {
  id: string = ''
  charCode: string = ''
  name: string = ''
  nominal: number = 0
  numCode: string = ''
  previous: number = 0
  value: number = 0

  constructor (item?: ValuteDeserialized) {
    if (!item) return

    this.id = item.ID
    this.charCode = item.CharCode
    this.name = item.Name
    this.nominal = item.Nominal
    this.numCode = item.NumCode
    this.previous = item.Previous
    this.value = item.Value
  }
}

const defaultValute = new Valute({
  ID: 'R01010BRUBVALUTE',
  CharCode: 'RUB',
  Name: 'Российский рубль',
  Nominal: 1,
  NumCode: '012124',
  Previous: 1,
  Value: 1
})

export {
  NavElement,
  Valute,
  ValuteDeserialized,
  defaultValute
}
