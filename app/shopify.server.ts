import '@shopify/shopify-app-remix/adapters/node'
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
} from '@shopify/shopify-app-remix'
import { PrismaSessionStorage } from '@shopify/shopify-app-session-storage-prisma'
import { restResources } from '@shopify/shopify-api/rest/admin/2023-07'
import { shopifyApi } from '@shopify/shopify-api'

import prisma from './db.server'

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(','),
  appUrl: process.env.SHOPIFY_APP_URL || '',
  authPathPrefix: '/auth',
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: '/webhooks',
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session })
    },
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
})

export default shopify
export const apiVersion = LATEST_API_VERSION
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders
export const authenticate = shopify.authenticate
export const login = shopify.login
export const registerWebhooks = shopify.registerWebhooks
export const sessionStorage = shopify.sessionStorage

// export const shopifyFront = shopifyApi({
//   apiKey: '2c3992ce70ba6baadcb61cbf05774bb6',
//   apiSecretKey: '8b1c72026a8ee3c85db551bd3e795576',
//   apiVersion: LATEST_API_VERSION,
//   isEmbeddedApp: false,
//   hostName: 'https://towns-installations-lounge-compliant.trycloudflare.com',
//   adminApiAccessToken: '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',
//   scopes: [
//     'read_analytics',
//     'write_metaobjects',
//     'read_metaobjects',
//     'write_draft_orders',
//     'read_draft_orders',
//     'write_discounts',
//     'read_discounts',
//     'write_products',
//     'read_products',
//   ],
//   restResources,
// })
