import { z } from 'zod'
import * as dates from 'date-arithmetic'

export const range = (start: number, end: number, step = 1) =>
  Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step)

export const toggleCSSclasses = (el, ...cls: string[]) =>
  cls.map((cl) => el.classList.toggle(cl))

export const numberOrStringToJpy = (num?: number | string) => {
  return (num || '0').toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  })
}

export type Literal = z.infer<typeof literalSchema>
export type Json = Literal | { [key: string]: Json } | Json[]
export const literalSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
])
export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)

export function htmlDecode(input: string) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  }
  return input.replace(
    /&amp;|&lt;|&gt;|&quot;|&#039;/g,
    (match) => entities[match]
  )
}

// gid://shopify/DraftOrder/1126591037714 to id
export const gidToId = (gid: string) => gid.split('/').pop()

export const MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
}

const MONTHS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export function monthsInYear(year: number): Date[] {
  const date = new Date(year, 0, 1)

  return MONTHS.map((i) => dates.month(date, i))
}

export function today() {
  return dates.startOf(new Date(), 'day')
}

export function yesterday() {
  return dates.add(dates.startOf(new Date(), 'day'), -1, 'day')
}

export function tomorrow() {
  return dates.add(dates.startOf(new Date(), 'day'), 1, 'day')
}
