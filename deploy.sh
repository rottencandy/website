#!/bin/sh

# If a command fails then the deploy stops
set -e

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

# Build the site
hugo # if using a theme, replace with `hugo -t <YOURTHEME>`

# Go To website dir
cd public

# Add changes to git.
git add .

# Commit changes.
msg="site rebuild: $(date)"
if [ -n "$*" ]; then
	msg="$*"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

printf "\033[0;32mSuccessfully deployed, changes are now live.\033[0m\n"
