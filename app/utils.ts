import { z } from 'zod'

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
