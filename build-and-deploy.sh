#!/bin/sh
# Set Node version
# export NVM_DIR=$HOME/.nvm;
# source $NVM_DIR/nvm.sh;
# nvm use --lts # Use latest Node.js version

# Data pipeline updates
# node inputs/fec/fetch.js
# node inputs/coverage/fetch.js

# node process/legislative-candidates.js
# node process/main.js

# Build
node ./inputs/processData.js

npm run build

# Deploy
aws s3 sync build s3://projects.wyofile.com/election-guide-2024 --profile wyofile --delete
aws cloudfront create-invalidation --profile wyofile --distribution-id E2OCFGKHABB1MF --paths "/election-guide-2024/*"