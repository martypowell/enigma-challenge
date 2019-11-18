const fs = require("fs");
const { ExitCodes, LogDataIndexes } = require("./Constants");

const ipPatternToFilter = "207.114"; //TODO: This should not be embedded here.

/**
 * Read a file based on a relative file path
 * @param {string} filePath relative file path
 * @param {*} callback callback function that returns the log data
 */
const GetLogs = (filePath, callback) =>
  fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
    if (!err) {
      if (callback && typeof callback === "function") {
        const logRows = data.split("\n");
        const logRowsWithColumns = logRows.map(log => log.split(" "));
        return callback(logRowsWithColumns);
      }
    } else {
      console.log(`Error Reading File: ${err}`);
      return ExitCodes.fileReadError;
    }
  });

// Filter Logs by HTTP_ACTION = GET over standard port 80, should exclude requests beginning with
const FilterLogs = (logs, args) => {
  const { ports = "", actions = "" } = args;
  const desiredPorts =
    typeof ports === "string" ? ports.split(",") : ports ? [ports] : [];
  const desiredHttpActions = actions.split(",");

  return logs.filter(log => {
    const logPort = parseInt(log[LogDataIndexes.HttpPort]);
    const hasValidPort = !desiredPorts || desiredPorts.includes(logPort);
    const hasValidHttpActions =
      !desiredHttpActions ||
      desiredHttpActions.some(
        action =>
          action.toLowerCase() === log[LogDataIndexes.HttpAction].toLowerCase()
      );
    const hasValidRequestIpAddress = !log[
      LogDataIndexes.RequestIpAddress
    ].startsWith(ipPatternToFilter);

    return hasValidPort && hasValidHttpActions && hasValidRequestIpAddress;
  });
};

module.exports = { GetLogs, FilterLogs };
