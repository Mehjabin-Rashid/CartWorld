// Small utility to format numbers as Bangladeshi Taka (BDT)
export function formatBDT(value) {
  if (value == null) return ''
  try {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 2,
    }).format(value)
  } catch (e) {
    return `Tk ${Number(value).toFixed(2)}`
  }
}

export default formatBDT
