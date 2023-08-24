import { addDocumentResponseHeaders } from './shopify.server'
import { renderToPipeableStream } from 'react-dom/server'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import isbot from 'isbot'
import { PassThrough } from 'stream'

const ABORT_DELAY = 5_000

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  _loadContext
) {
  addDocumentResponseHeaders(request, responseHeaders)

  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady'

  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        [callbackName]: () => {
          const body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')
          // responseHeaders.set('WWW-Authenticate', 'basic')
          // Basic認証のヘッダを全レスポンスで返す

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          )

          pipe(body)
        },
        onShellError(error) {
          reject(error)
        },
        onError(error) {
          responseStatusCode = 500
          console.error(error)
        },
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
