const WriteResults = (fileName, groupResults = []) => {
  const linesAsString = groupResults
    .map(({ ipAddress, count }) => [ipAddress, count].join(","))
    .join("\n");
  fs.writeFile(fileName, linesAsString, err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("Results File Saved!");
  });
};

module.exports = { WriteResults };
