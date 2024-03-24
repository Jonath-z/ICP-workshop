import { Canister, query, Principal, nat64, nat, ic, Opt, blob } from "azle";

export default Canister({
  // returns the principal of the identity that called this function
  caller: query([], Principal, () => {
    return ic.caller();
  }),
  // returns the amount of cycles available in the canister
  canisterBalance: query([], nat64, () => {
    return ic.canisterBalance();
  }),
  // returns the amount of cycles available in the canister
  canisterBalance128: query([], nat, () => {
    return ic.canisterBalance128();
  }),
  // returns the canister's version number
  canisterVersion: query([], nat64, () => {
    return ic.canisterVersion();
  }),
  // When called from a query call, returns the data certificate
  // authenticating certified data set by this canister. Otherwise returns
  // None.
  dataCertificate: query([], Opt(blob), () => {
    return ic.dataCertificate();
  }),
});
