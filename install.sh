#!/usr/bin/env bash
set -euo pipefail
npm install
npm run compile
VSIX=$(npm run -s package | grep -o 'file-from-clipboard-.*\.vsix')
code --install-extension "$VSIX"
echo "Installed $VSIX — reload VS Code/Cursor."