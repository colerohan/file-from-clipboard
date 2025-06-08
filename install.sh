#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/colerohan/file-from-clipboard.git"
REPO_DIR="file-from-clipboard"

echo "🚀 1. Clone (or update) repository"
if [ -d "$REPO_DIR/.git" ]; then
  echo "   Repo already exists, pulling latest..."
  git -C "$REPO_DIR" pull --ff-only
else
  git clone "$REPO_URL"
fi

cd "$REPO_DIR"

echo "📦 2. Install dev dependencies"
npm install

echo "🏗️ 3. Compile TypeScript → out/"
npm run compile

echo "📦 4. Package the extension"
npm run package    # produces file-from-clipboard-*.vsix

VSIX=$(ls -t file-from-clipboard-*.vsix | head -n 1)

echo "💾 5. Install VSIX into VS Code / Cursor"
code --install-extension "$VSIX"

echo "🔄 6. Reload VS Code / Cursor (⇧⌘P → “Developer: Reload Window”)"
echo "✅ Done! Installed $VSIX"