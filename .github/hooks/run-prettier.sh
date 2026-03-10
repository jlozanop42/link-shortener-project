#!/bin/bash

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')

if [[ "$TOOL_NAME" == "create" || "$TOOL_NAME" == "edit" ]]; then
  npx prettier --write .
fi
