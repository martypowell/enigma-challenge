/**
 * Get IpAddress as it's number representation
 * @param {*} ipAddress
 */
const GetIpAddressAsNumber = ipAddress => {
  const [part1, part2, part3, part4] = ipAddress
    .split(".")
    .map(part => parseInt(part));
  return (
    part1 * Math.pow(256, 3) + part2 * Math.pow(256, 2) + part3 * 256 + part4
  );
};

/**
 * Get a list (obj full of keys) of distinct ip addresses, with the count of requests for each ip
 * @param {Array} ipAddresses
 */
const GetIpByNumberOfRequests = ipAddresses =>
  ipAddresses.reduce((groupedIpAddresses, ipAddress) => {
    if (!groupedIpAddresses[ipAddress]) {
      groupedIpAddresses[ipAddress] = 0;
    }

    groupedIpAddresses[ipAddress] += 1;

    return groupedIpAddresses;
  }, {});

/**
 * Sort IP Addresses by Number of Requests, then by ip address numerically
 * @param {object} ipAddressByCount
 */
const SortIpByNumberOfRequests = ipAddressByCount =>
  Object.entries(ipAddressByCount)
    .map(([ipAddress, count]) => ({ ipAddress, count }))
    .sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      } else if (a.count < b.count) {
        return 1;
      }

      const aIpAddressAsNumber = GetIpAddressAsNumber(a.ipAddress);
      const bIpAddressAsNumber = GetIpAddressAsNumber(b.ipAddress);

      return aIpAddressAsNumber - bIpAddressAsNumber;
    });

module.exports = {
  GetIpAddressAsNumber,
  GetIpByNumberOfRequests,
  SortIpByNumberOfRequests
};
