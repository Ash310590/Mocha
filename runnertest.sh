#!/bin/bash

export APP_ENV=${1:-dev4}
export API_NAME${2}
./node_modules/mocha/bin/_mocha test/tests/ --reporter mochawesome --reporter-options reportDir=TestReport,reportFilename=TestReport -t 10000 --grep @regression
