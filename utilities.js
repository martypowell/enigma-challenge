const GetIpAddressAsNumber = ipAddress => {
  const ipAddressParts = ipAddress.split(".").map(part => parseInt(part));
  return ipAddressParts.reduce(
    (ipAddressNumberValue, ipAddressPart, index, parts) => {
      console.log(ipAddressPart, 256, parts.length, index);
      ipAddressNumberValue += ipAddressPart * 256 * (parts.length - index);
      return ipAddressNumberValue;
    },
    0
  );
};

export { GetIpAddressAsNumber };
