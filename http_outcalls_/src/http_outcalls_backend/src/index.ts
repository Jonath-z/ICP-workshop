import { Canister, ic, None, Principal, query, Some, text, update } from "azle";
import {
  HttpResponse,
  HttpTransformArgs,
  managementCanister,
} from "azle/canisters/management";

export default Canister({
  get_ICP_Price: update([], text, async () => {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ICP&convert=USD";

    console.log(process.env);

    const httpResponse = await ic.call(managementCanister.http_request, {
      args: [
        {
          url,
          max_response_bytes: None,
          method: {
            get: null,
          },
          headers: [
            {
              name: "X-CMC_PRO_API_KEY",
              value: "-----------------------------------",
            },
          ],
          body: None,
          transform: Some({
            function: [ic.id(), "get_ICP_Price_Transform"] as [
              Principal,
              string
            ],
            context: Uint8Array.from([]),
          }),
        },
      ],
      cycles: 1_603_125_600n,
    });

    const price = JSON.parse(
      Buffer.from(httpResponse.body.buffer).toString("utf-8")
    ).data.ICP.quote.USD.price;

    return `${price} USD`;
  }),
  get_ICP_Price_Transform: query([HttpTransformArgs], HttpResponse, (args) => {
    return {
      ...args.response,
    };
  }),
});
