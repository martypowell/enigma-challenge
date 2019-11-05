import { GetIpAddressAsNumber } from "./utilities";
const fs = require("fs");
const args = require("yargs").argv;

const logDataIndexes = {
  HttpAction: 8,
  HttpPort: 7,
  RequestIpAddress: 2
};

const exitCodes = {
  success: 0,
  fileReadError: 1
};

/**
 * Read a file based on a relative file path
 * @param {string} filePath relative file path
 * @param {*} callback callback function that returns the log data
 */
const getLogs = (filePath, callback) =>
  fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
    if (!err) {
      if (callback && typeof callback === "function") {
        const logRows = data.split("\n");
        const logRowsWithColumns = logRows.map(log => log.split(" "));
        return callback(logRowsWithColumns);
      }
    } else {
      console.log(`Error Reading File: ${err}`);
      return exitCodes.fileReadError;
    }
  });

// Filter Logs by HTTP_ACTION = GET over standard port 80, should exclude requests beginning with
const filterLogs = logs => {
  const { ports = "", actions = "" } = args;
  const desiredPorts =
    typeof ports === "string" ? ports.split(",") : ports ? [ports] : [];
  const desiredHttpActions = actions.split(",");

  return logs.filter(log => {
    const logPort = parseInt(log[logDataIndexes.HttpPort]);
    const hasValidPort = !desiredPorts || desiredPorts.includes(logPort);
    const hasValidHttpActions =
      !desiredHttpActions ||
      desiredHttpActions.some(
        action =>
          action.toLowerCase() === log[logDataIndexes.HttpAction].toLowerCase()
      );
    const hasValidRequestIpAddress = !log[
      logDataIndexes.RequestIpAddress
    ].startsWith("207.114");

    return hasValidPort && hasValidHttpActions && hasValidRequestIpAddress;
  });
};

// Read a Log File
const logFilePath = args.filePath;
getLogs(logFilePath, logs => {
  const filteredLogs = filterLogs(logs);
  // Get IPS Addresses as a list
  const ipAddresses = filteredLogs.map(
    log => log[logDataIndexes.RequestIpAddress]
  );
  // Group IPAddresses by Number of Requests Made per IP Address
  const ipAddressByCount = ipAddresses.reduce(
    (groupedIpAddresses, ipAddress) => {
      if (!groupedIpAddresses[ipAddress]) {
        groupedIpAddresses[ipAddress] = 0;
      }

      groupedIpAddresses[ipAddress] += 1;

      return groupedIpAddresses;
    },
    {}
  );

  // Sort the Grouped IP Addresses, by Number of Requests (most first), then by IP octets of greater values listed first
  const sortedIpAddressesByCount = Object.entries(ipAddressByCount)
    .map(([ipAddress, count]) => ({ ipAddress, count }))
    .sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      } else if (a.count < b.count) {
        return 1;
      }

      const aIpAddressAsNumber = GetIpAddressAsNumber(a.ipAddress);
      const bIpAddressAsNumber = GetIpAddressAsNumber(b.ipAddress);
      console.log("test", aIpAddressAsNumber);
    }); // sort by number of requests with the most being first

  console.log("filtered", sortedIpAddressesByCount);
});

// Save the Grouped IP Addresses to a results.csv file, format = number of requests, ip address
