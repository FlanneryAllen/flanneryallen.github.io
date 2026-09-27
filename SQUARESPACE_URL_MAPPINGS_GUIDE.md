# How to Set Up Redirect Using Squarespace URL Mappings

Based on your screenshots, here's exactly how to set up the redirect from flanneryallen.com to flanneryallen.github.io:

## Step 1: Navigate to URL Mappings
You're already close! From your current location:

1. In the left sidebar, click **"Developer Tools"** (you can see it in your screenshot)
2. Click on **"URL Mappings"** (visible in your first screenshot)
   - It says "Create internal and external URL redirects" underneath

## Step 2: Create the Redirect in URL Mappings
Once you're in URL Mappings, you'll need to add redirect rules. The format should be:

```
/flanneryallen.com -> https://flanneryallen.github.io 301
/www.flanneryallen.com -> https://flanneryallen.github.io 301
/* -> https://flanneryallen.github.io/$1 301
```

OR if they have a different format, you might see fields like:
- **From URL**: `/` (the root)
- **To URL**: `https://flanneryallen.github.io`
- **Redirect Type**: `301 (Permanent)`

## Step 3: Add Wildcard Redirect for All Pages
Add another mapping to handle all subpages:
- **From URL**: `/*`
- **To URL**: `https://flanneryallen.github.io/$1`
- **Redirect Type**: `301 (Permanent)`

This ensures flanneryallen.com/strategy goes to flanneryallen.github.io/strategy

## IMPORTANT: First Check Domain Connection

Before the URL Mappings will work, you need to make sure flanneryallen.com is actually connected to this Squarespace site:

1. Go to **"Domains & Email"** (where you are in the third screenshot)
2. Click on **"Domains"**
3. Check if flanneryallen.com is listed there
   - If it's NOT connected to any site, that's good!
   - If it IS connected to a site, you may need to disconnect it first

## Alternative Option: Domain Forwarding

If URL Mappings doesn't work for external redirects, check in the Domains section:

1. Stay in **"Domains & Email"** → **"Domains"**
2. Find flanneryallen.com
3. Look for options like:
   - "Forward Domain"
   - "Domain Forwarding"
   - "Redirect"
   - Three dots menu (...) next to the domain

## What You're Looking For

In the URL Mappings or Domain settings, you want to create a rule that:
- **Source**: flanneryallen.com (and www.flanneryallen.com)
- **Destination**: https://flanneryallen.github.io
- **Type**: 301 Permanent Redirect
- **Path Forwarding**: Enabled (preserves /strategy, /agency, etc.)

## If URL Mappings Doesn't Allow External URLs

Some Squarespace sites only allow internal redirects in URL Mappings. If you get an error saying you can't redirect to external URLs:

1. Go back to **"Domains & Email"** → **"Domains"**
2. Click on flanneryallen.com
3. Look for **"Advanced Settings"** or **"DNS Settings"**
4. Find **"Forwarding"** or **"Redirects"** there

## Quick Test After Setup

Once you save the redirect, test immediately:
1. Open an incognito/private browser window
2. Type: flanneryallen.com
3. You should be redirected to flanneryallen.github.io

## Still Can't Find It?

Contact Squarespace support (there's usually a help button in the bottom corner) and say:
> "I own flanneryallen.com and need to set up a 301 redirect to an external URL (https://flanneryallen.github.io). Where can I configure domain forwarding or external redirects?"

---

Note: Your JavaScript redirect is already working as a backup, so visitors are being redirected even now. The URL Mappings/Domain forwarding will just make it faster and better for SEO.