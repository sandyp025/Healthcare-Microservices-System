#!/bin/bash
set -e # Stops the script if any command fails

# Delete stack (ignore error if it doesn't exist)
aws --endpoint-url=http://localhost:4566 cloudformation delete-stack \
    --stack-name patient-management || true

# Wait for deletion to complete
sleep 10

aws --endpoint-url=http://localhost:4566 cloudformation deploy \
    --stack-name patient-management \
    --template-file "./cdk.out/localstack.template.json" \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

aws --endpoint-url=http://localhost:4566 elbv2 describe-load-balancers \
    --query "LoadBalancers[0].DNSName" --output text