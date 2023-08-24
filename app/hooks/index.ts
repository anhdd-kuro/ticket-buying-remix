import html2canvas from 'html2canvas'
import { useEffect, useMemo, useRef } from 'react'
export * from './useAppMutation'
export * from './useAppQuery'

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

export const useCanvas = (id?: string) => {
  const elmRef = useRef(null)

  const canvasId = id || 'canvas'

  useEffect(() => {
    if (!elmRef?.current) return

    html2canvas(elmRef?.current, {
      backgroundColor: '#fff',
      useCORS: true,
    }).then((canvas) => {
      canvas.setAttribute('id', canvasId)
      canvas.style.display = 'none'
      console.log(canvas.style)

      const existingCanvas = document.getElementById(canvasId)
      if (!existingCanvas) {
        document.body.appendChild(canvas)
      } else {
        document.body.replaceChild(canvas, existingCanvas)
      }
    })
  }, [canvasId])

  return {
    elmRef,
    elmId: canvasId,
  }
}
