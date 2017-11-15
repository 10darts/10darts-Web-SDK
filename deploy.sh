#!/usr/bin/env bash

# Variables
# ------------------------------------------------------------------------------
readonly PACKAGE_VERSION="v$(node -p -e "require('./package.json').release")"
readonly AWS_S3_BUCKET="sdk.10darts.com"
readonly CLOUDFRONT_DISTRIBUTION_ID="EJQDLWYC89E1C"
# Buld and upload
# ------------------------------------------------------------------------------
npm run build
aws --profile 10darts s3 cp dist/10dartsSDK.js s3://${AWS_S3_BUCKET}/${PACKAGE_VERSION}/ --acl public-read
aws --profile 10darts s3 cp dist/10dartsServiceWorker.js s3://${AWS_S3_BUCKET}/${PACKAGE_VERSION}/ --acl public-read
aws --profile 10darts cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths /${PACKAGE_VERSION}/*
