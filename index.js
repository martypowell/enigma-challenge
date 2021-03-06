const { WriteResults } = require("./Utilities");
const {
  GetIpByNumberOfRequests,
  SortIpByNumberOfRequests
} = require("./IPAddressUtilities");
const { GetLogs, FilterLogs } = require("./LogUtilities");
const { LogDataIndexes } = require("./Constants");

const args = require("yargs").argv;

// Read a Log File
const logFilePath = args.filePath;
const resultsFilePath = args.resultPath || "./results.csv";

GetLogs(logFilePath, logs => {
  const filteredLogs = FilterLogs(logs, args);
  // Get IPS Addresses as a list
  const ipAddresses = filteredLogs.map(
    log => log[LogDataIndexes.RequestIpAddress]
  );
  // Group IPAddresses by Number of Requests Made per IP Address
  const ipAddressByCount = GetIpByNumberOfRequests(ipAddresses);

  // Sort the Grouped IP Addresses, by Number of Requests (most first), then by IP octets of greater values listed first
  const sortedIpAddressesByCount = SortIpByNumberOfRequests(ipAddressByCount); // sort by number of requests with the most being first

  // Save the Grouped IP Addresses to a results.csv file, format = number of requests, ip address
  WriteResults(resultsFilePath, sortedIpAddressesByCount);
});
