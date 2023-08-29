import '@shopify/shopify-app-remix/adapters/node'
import prisma from './db.server'
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
} from '@shopify/shopify-app-remix'
import { PrismaSessionStorage } from '@shopify/shopify-app-session-storage-prisma'
import { restResources } from '@shopify/shopify-api/rest/admin/2023-07'
import { createStorefrontClient } from '@shopify/hydrogen-react'

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

const storefrontClient = createStorefrontClient({
  privateStorefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN || '',
  storeDomain: `https://${process.env.SHOPIFY_SHOP_NAME}.com`,
  storefrontApiVersion: LATEST_API_VERSION,
  publicStorefrontToken: process.env.SHOPIFY_PUBLIC_STOREFRONT_TOKEN || '',
})

export const getStorefrontApiUrl = storefrontClient.getStorefrontApiUrl
export const getPrivateTokenHeaders = storefrontClient.getPrivateTokenHeaders
