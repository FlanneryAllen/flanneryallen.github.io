# GitHub Actions Workflows Setup

Since GitHub OAuth doesn't allow workflow creation, here are the steps to add CI/CD manually:

## Quick Setup (Copy & Paste)

1. Go to: https://github.com/FlanneryAllen/flanneryallen.github.io/actions/new
2. Click "set up a workflow yourself"
3. Create these three files:

### File 1: `.github/workflows/ci.yml`
Click "New workflow" and paste the entire contents from the `ci.yml` below.

### File 2: `.github/workflows/deploy.yml`
Click "New workflow" again and paste the `deploy.yml` contents.

### File 3: `.github/workflows/accessibility.yml`
Click "New workflow" once more and paste the `accessibility.yml` contents.

## Alternative: Use GitHub CLI

If you have GitHub CLI installed:

```bash
# Install GitHub CLI if needed
brew install gh

# Authenticate
gh auth login

# Create the workflows
gh workflow enable
```

## Manual Creation via Git

If you want to push directly with proper permissions:

```bash
# Create a Personal Access Token with 'workflow' scope:
# 1. Go to: https://github.com/settings/tokens/new
# 2. Select scope: "workflow"
# 3. Generate token

# Clone with token
git clone https://YOUR_TOKEN@github.com/FlanneryAllen/flanneryallen.github.io.git temp-repo
cd temp-repo

# Copy workflow files
mkdir -p .github/workflows
cp ../.github/workflows/*.yml .github/workflows/

# Push with token auth
git add .github/workflows
git commit -m "Add CI/CD workflows"
git push

# Clean up
cd ..
rm -rf temp-repo
```

## Workflow Files Location

The workflow files are saved in your local `.github/workflows/` directory:
- `ci.yml` - Continuous Integration tests
- `deploy.yml` - GitHub Pages deployment
- `accessibility.yml` - Accessibility testing

Copy these to GitHub via the web interface for immediate activation.