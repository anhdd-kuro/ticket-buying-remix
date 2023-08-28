import { authenticate } from '~/shopify.server'
import { json, type LoaderArgs } from '@remix-run/node'

export async function loader({ request }: LoaderArgs) {
  try {
    const { admin } = await authenticate.admin(request)

    // console.log("Request Body",req.body)
    const query = new URL(request.url).searchParams.get('query')
    console.log('Query', query)

    const response = await admin.graphql(GET_TRAILER_SET, {
      variables: {
        query,
      },
    })

    const data = await response.json()

    return json({
      data: data.data,
    })
  } catch (e) {
    return json({
      error: e instanceof Error ? e.message : 'Unknown error',
    })
  }
}

const GET_TRAILER_SET = `
query getTrailerSet($query: String!) {
  metaobjects(first: 20, type: "trailer_set",sortKey: "display_name",query: $query) {
    nodes {
      handle
      fields {
        key
        value
        type
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
              	handle,
                fields {
                  key
                  value
                }
              }
            }
          }
        }
        reference {
          ... on Metaobject {
            handle,
            fields {
              key
              value
            }
          }
        }
      }
    }
  }
}
`
