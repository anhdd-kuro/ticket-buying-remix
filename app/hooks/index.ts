import { useMemo } from 'react'

export type ListReferences = {
  nodes:
    | {
        handle: string
        id: string
        title: string
        fields?: {
          key: string
          value: string | number | null
        }[]
      }[]
    | null
}

export type Reference = {
  image: {
    url: string
    altText: string
  } | null
} | null

export type MetaobjectResult = {
  metaobjects: {
    nodes: {
      handle: string
      id: string
      fields: [
        {
          key: string
          value: string | number | null
          references: ListReferences | null
          reference: Reference
        },
      ]
    }[]
  }
}

export const useMetaobjectParser = <
  T extends Record<string, string | number | ListReferences | Reference> & {
    handle: string
    id: string
  },
>({
  data,
  referenceKeys,
  listReferencesKeys,
}: {
  data?: MetaobjectResult | null
  referenceKeys?: string[]
  listReferencesKeys?: string[]
}) => {
  const parsedData = useMemo(() => {
    const _parsedData = data?.metaobjects?.nodes?.map((node) => {
      const fields = node.fields.reduce((acc, field) => {
        if (listReferencesKeys?.includes(field.key)) {
          acc[field.key as keyof T] = field.references as T[keyof T]
          return acc
        }
        if (referenceKeys?.includes(field.key)) {
          acc[field.key as keyof T] = field.reference as T[keyof T]
          return acc
        }

        acc[field.key as keyof T] = field.value as T[keyof T]
        return acc
      }, {} as T)

      return { ...fields, handle: node.handle, id: node.id }
    })

    return _parsedData
  }, [data, referenceKeys, listReferencesKeys])

  return {
    parsedData,
  }
}
