# Domain Redirect Setup: flanneryallen.com → flanneryallen.github.io

## Overview
This document explains how to ensure that visitors to `flanneryallen.com` are automatically redirected to `flanneryallen.github.io`.

## Important Note
Since this site is hosted on GitHub Pages at `flanneryallen.github.io`, we cannot use a CNAME file (which would make GitHub Pages serve the site at flanneryallen.com directly). Instead, we need to set up the redirect at the DNS level and use JavaScript as a fallback.

## Setup Instructions

### Option 1: DNS-Level Redirect (RECOMMENDED)
This is the most reliable method and works before the page even loads:

1. **Log into your domain registrar** (where you purchased flanneryallen.com)
2. **Set up domain forwarding/redirect**:
   - Source: `flanneryallen.com` (and `www.flanneryallen.com`)
   - Destination: `https://flanneryallen.github.io`
   - Type: 301 Permanent Redirect
   - Path forwarding: Yes (preserve path)

#### Popular Registrars Instructions:
- **GoDaddy**: Domain Settings → Forwarding → Add Forwarding
- **Namecheap**: Domain List → Manage → Advanced DNS → URL Redirect Record
- **Google Domains**: DNS → Website → Add a forwarding address
- **Cloudflare**: Page Rules → Create Page Rule → Forwarding URL (301)

### Option 2: DNS A Records + GitHub Pages (Alternative)
If you want GitHub Pages to handle both domains:

1. **Create a CNAME file** in this repository with content:
   ```
   flanneryallen.com
   ```

2. **Configure DNS records**:
   - A Records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - CNAME record for www:
     - www → flanneryallen.github.io

Note: This option makes GitHub Pages serve your site at flanneryallen.com, not redirect to github.io.

### Option 3: Cloudflare (If using Cloudflare DNS)
1. **Add Page Rule**:
   - URL: `*flanneryallen.com/*`
   - Setting: Forwarding URL (301)
   - Destination: `https://flanneryallen.github.io/$2`

## JavaScript Fallback (Already Implemented)
As a safety net, all main HTML pages include a JavaScript redirect that runs immediately:

```javascript
// Only redirect if we're on flanneryallen.com (not github.io)
if (window.location.hostname === 'flanneryallen.com' ||
    window.location.hostname === 'www.flanneryallen.com') {
  // Preserve the full path, query string, and hash
  window.location.replace('https://flanneryallen.github.io' +
    window.location.pathname +
    window.location.search +
    window.location.hash);
}
```

This script is in:
- index.html
- strategy.html
- agency.html
- jcpenney.html

## Testing the Redirect

After setting up the DNS redirect, test these URLs:
1. `http://flanneryallen.com` → Should redirect to `https://flanneryallen.github.io`
2. `https://flanneryallen.com` → Should redirect to `https://flanneryallen.github.io`
3. `http://www.flanneryallen.com` → Should redirect to `https://flanneryallen.github.io`
4. `https://www.flanneryallen.com` → Should redirect to `https://flanneryallen.github.io`
5. `http://flanneryallen.com/strategy` → Should redirect to `https://flanneryallen.github.io/strategy`

## DNS Propagation
Note: DNS changes can take 24-48 hours to propagate fully. You can check the status using:
- https://www.whatsmydns.net/
- https://dnschecker.org/

## Current Status
✅ JavaScript redirect implemented in main HTML files
⏳ DNS-level redirect needs to be configured at your domain registrar

## Questions?
If you need help with the DNS configuration, check with your domain registrar's support documentation or contact their support team.