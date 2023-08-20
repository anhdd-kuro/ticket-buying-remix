import { json } from '@remix-run/node'

export const action = async ({ request }) => {
  return json({ success: true }, 200)
}
