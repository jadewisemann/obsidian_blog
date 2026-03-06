#!/bin/bash
# script: scripts/link-obsidian.sh
# description: Link your Obsidian vault folder as a Git Submodule securely onto the Next.js static renderer.

REPO_URL=$1
if [ -z "$REPO_URL" ]; then
  echo "Usage: ./scripts/link-obsidian.sh <git-repo-url>"
  echo "Example: ./scripts/link-obsidian.sh git@github.com:jade/obsidian-blog-content.git"
  exit 1
fi

echo "Removing the dummy local content directory..."
rm -rf ./content

echo "Adding Obsidian repository as submodule at /content..."
git submodule add $REPO_URL content

echo "Done! The Next.js SSG engine will now build from your Obsidian repo."
