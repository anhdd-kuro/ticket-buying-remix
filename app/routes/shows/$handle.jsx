import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { shopifyApp } from "@shopify/shopify-app-remix";
import { authenticate, sessionStorage, shopifyFront } from "~/shopify.server";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-07";

export async function loader({ request, response }) {
  const url = new URL(request.url);

  const session = await sessionStorage.findSessionsByShop(
    "krb-kuro.myshopify.com"
  );
  console.log(session);

  if (!session) return {};

  const client = new shopifyFront.clients.Rest({
    session: session[0],
  });

  // const { session, admin } = await authenticate.admin(request);
  const getResponse = await client.get({
    path: "products",
  });
  console.log(getResponse.headers, getResponse.body);

  return json({
    data: getResponse.body,
  });
}

export default function App() {
  //https://github.com/Shopify/shopify-api-js/blob/main/docs/reference/clients/Rest.md
  const { data } = useLoaderData();
  // console.log(data.products);

  return (
    <div className="index">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <a href={`/shows/${product.handle}`}></a>
            <img
              src={product.image ? product.image.src : ""}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-gray-600">
              <h2 className="text-lg font-medium mb-2">{product.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
