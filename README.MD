# Network Log Parser

Network log parser designed to manipulate and filter network logs. The first iteration (v1.0.0) reads a network log, filters those logs, and writes a files with ip addresses with the number of requests per ip. These requests are sorted by number of requests, then by the numeric representation of the ip addresses.

## Installation

1. Install [nodejs](https://nodejs.org/en/) if you don't already have it
2. Run `npm install` in the root of the project

## Usage

### Default Usage

In order to run the application for the specific use cases in version 1.0.0, you can run one of the following:

- npm start - Runs program based on the provided network log. Will include only addresses that are:
  - Port 80
  - GET Http Action for Request
  - Exclude Request Ip Starts with "207.114"
- `npm run sample` - Runs program based on a very small network log to increase speed for debugging and development. Uses the same criteria as `npm start`.

#### Customization

You can run this application in your favorite terminal by running `node index.js` in the root of this project.

The following command line arguments are available to configure the application.

- **--filePath** - path to the network log - required
- **--ports** - command separated request ports you wish to include as a filter - required
- **--actions** - command separated request http actions to include as a filter - required

### Example

Command Line Argument to Run the Sample Version of the App:

```bash
node index.js --filePath=./data/sample-access.log --ports=80 --actions=GET
```

## Testing

If you find some piece of logic isn't working, add a test to support that claim. We are using [jest](https://jestjs.io/) as our testing framework. If a test file does not exist, please use the following format: `{FileName.test.js}`.

To run tests, run `npm test`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
