# Step-by-Step: Redirect flanneryallen.com to flanneryallen.github.io (Squarespace)

## Prerequisites
- You own flanneryallen.com through Squarespace
- You have access to your Squarespace account
- Your portfolio is hosted at flanneryallen.github.io

## Step-by-Step Instructions

### Step 1: Log into Squarespace
1. Go to https://www.squarespace.com
2. Click "LOG IN" in the top right
3. Enter your email and password
4. You should see your Squarespace dashboard

### Step 2: Access Your Domain Settings
1. In your Squarespace dashboard, click on your profile icon (top right)
2. Select "Account & Billing" from the dropdown
3. In the left sidebar, click on "Domains"
4. Find "flanneryallen.com" in your domains list
5. Click on "flanneryallen.com" to manage it

### Step 3: Set Up Domain Forwarding
Since Squarespace domains support URL forwarding, follow these steps:

1. **In the domain settings**, look for "Domain Settings" or "DNS Settings"
2. Find the section called "Forwarding" or "URL Forwarding"
3. Click "Add Forwarding" or "Set Up Forwarding"

### Step 4: Configure the Redirect
Fill in the forwarding settings:

1. **Host/Subdomain**: Leave blank (or enter "@" if required)
   - This forwards the root domain flanneryallen.com

2. **Forward to**: `https://flanneryallen.github.io`

3. **Redirect Type**: Select "301 (Permanent)"
   - This is important for SEO

4. **Path Forwarding**: Enable/Check this option
   - This ensures flanneryallen.com/strategy goes to flanneryallen.github.io/strategy

5. Click "Save" or "Add"

### Step 5: Set Up WWW Subdomain Forwarding
Repeat the process for www.flanneryallen.com:

1. Click "Add Forwarding" again
2. **Host/Subdomain**: Enter `www`
3. **Forward to**: `https://flanneryallen.github.io`
4. **Redirect Type**: Select "301 (Permanent)"
5. **Path Forwarding**: Enable
6. Click "Save"

### Alternative Method: If Forwarding Isn't Available
If Squarespace doesn't show forwarding options, you'll need to use custom DNS records:

#### Option A: Point to GitHub Pages
1. Go to "Advanced DNS Settings" or "Custom Records"
2. Delete any existing A or CNAME records for @ and www
3. Add these A records for the root domain:
   - Type: A, Host: @, Points to: 185.199.108.153
   - Type: A, Host: @, Points to: 185.199.109.153
   - Type: A, Host: @, Points to: 185.199.110.153
   - Type: A, Host: @, Points to: 185.199.111.153
4. Add CNAME for www:
   - Type: CNAME, Host: www, Points to: flanneryallen.github.io

**THEN** create a file called `CNAME` in your GitHub repository with:
```
flanneryallen.com
```

Note: This method makes GitHub Pages serve your site at flanneryallen.com (not a redirect).

#### Option B: Transfer to Cloudflare (Free)
1. Sign up for a free Cloudflare account
2. Transfer your domain's DNS to Cloudflare
3. Use Cloudflare's Page Rules for redirecting

## Step 6: Wait for DNS Propagation
- Changes typically take 5-30 minutes with Squarespace
- Full global propagation can take up to 24-48 hours
- Your JavaScript fallback will work immediately in the meantime

## Step 7: Test Your Redirect
After waiting 15-30 minutes, test these URLs:

1. **Basic redirect**: http://flanneryallen.com
   - Should redirect to: https://flanneryallen.github.io

2. **HTTPS redirect**: https://flanneryallen.com
   - Should redirect to: https://flanneryallen.github.io

3. **WWW redirect**: http://www.flanneryallen.com
   - Should redirect to: https://flanneryallen.github.io

4. **Path preservation**: http://flanneryallen.com/strategy
   - Should redirect to: https://flanneryallen.github.io/strategy

5. **Deep link**: http://flanneryallen.com/agency.html
   - Should redirect to: https://flanneryallen.github.io/agency.html

## Troubleshooting

### If redirects aren't working after 1 hour:
1. **Clear your browser cache** (Cmd+Shift+R on Mac)
2. **Try incognito/private mode**
3. **Check DNS propagation**: Visit https://www.whatsmydns.net and enter "flanneryallen.com"
4. **Verify settings** in Squarespace are saved

### If Squarespace doesn't offer forwarding:
- Contact Squarespace support (they offer 24/7 chat)
- Ask them to set up URL forwarding for your domain
- Reference: You want a "301 permanent redirect from flanneryallen.com to https://flanneryallen.github.io with path forwarding"

### Common Issues:
- **"This domain is connected to a website"**: You need to disconnect it from any Squarespace site first
- **DNS changes not showing**: Wait the full 48 hours before troubleshooting further
- **Redirect loops**: Make sure you're not redirecting github.io back to flanneryallen.com

## Need Help?

### Squarespace Support:
- **Live Chat**: Available 24/7 in your account dashboard
- **Email**: customercare@squarespace.com
- **Help Center**: https://support.squarespace.com/hc/en-us/articles/360002101888-URL-forwarding

### What to tell Squarespace Support:
"I own the domain flanneryallen.com through Squarespace, and I need to set up a 301 permanent redirect to forward all traffic to https://flanneryallen.github.io. I need path forwarding enabled so that subpages redirect correctly (for example, flanneryallen.com/strategy should redirect to flanneryallen.github.io/strategy). Can you help me set this up?"

## Current Status
✅ JavaScript redirect is already working as a fallback
⏳ Waiting for you to configure DNS forwarding in Squarespace
📝 This document provides all necessary steps

---
Last Updated: April 2026