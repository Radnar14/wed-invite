#!/bin/bash

# Configuration
UPSTREAM_REPO="Radnar14/wed-invite"
HEAD_BRANCH="SimplyLouie:master"
BASE_BRANCH="master"

# Get commit message from argument or use default
COMMIT_MSG="${1:-"update: synchronization with upstream"}"

echo "🚀 Starting synchronization to $UPSTREAM_REPO..."

# 1. Stage and commit changes
echo "📝 Committing changes..."
git add .
git commit -m "$COMMIT_MSG" || echo "⚠️ No changes to commit"

# 2. Push to personal repo
echo "⬆️ Pushing to origin/master..."
git push origin master

# 3. Check if PR already exists
echo "🔍 Checking for existing Pull Request from SimplyLouie..."
EXISTING_PR=$(gh pr list --repo "$UPSTREAM_REPO" --json number,headRefName,headRepositoryOwner --jq '.[] | select(.headRefName=="master" and .headRepositoryOwner.login=="SimplyLouie") | .number')

if [ -n "$EXISTING_PR" ]; then
    echo "✅ Pull Request #$EXISTING_PR already exists and has been updated with your latest changes."
else
    # 4. Create Pull Request
    echo "🆕 Creating new Pull Request to $UPSTREAM_REPO..."
    gh pr create \
        --repo "$UPSTREAM_REPO" \
        --base "$BASE_BRANCH" \
        --head "$HEAD_BRANCH" \
        --title "$COMMIT_MSG" \
        --body "Automated update from SimplyLouie's master branch."
fi

echo "✨ Done!"
