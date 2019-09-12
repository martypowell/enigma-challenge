const fs = require("fs");
const args = require("yargs").argv;

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
        callback(logRowsWithColumns);
      }
    } else {
      console.log(`Error Reading File: ${err}`);
      return exitCodes.fileReadError;
    }
  });

const filterLogs = logs => {
  console.log("filtering logs", logs);
};

// Read a Log File
const logFilePath = args.filePath;
const filteredLogs = getLogs(logFilePath, filterLogs);

// Filter Logs by HTTP_ACTION = GET over standard port 80, should exclude requests beginning with "207.114"

// Get IPS Addresses as a list

// Group IPAddresses by Number of Requests Made per IP Address

// Sort the Grouped IP Addresses, by Number of Requests (most first), then by IP octets of greater values listed first

// Save the Grouped IP Addresses to a results.csv file, format = number of requests, ip address
