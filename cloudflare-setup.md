# Cloudflare Setup for DDoS Protection & Rate Limiting

## Why Cloudflare for GitHub Pages?

GitHub Pages doesn't provide built-in DDoS protection or rate limiting. Cloudflare (free tier) adds:
- DDoS protection
- Rate limiting
- SSL certificate
- CDN caching
- Web Application Firewall (WAF)
- Analytics

## Setup Instructions

### 1. Create Cloudflare Account
1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up for free account
3. Add your domain (if you have custom domain)

### 2. For Custom Domain (e.g., flanneryallen.com)
1. Update nameservers to Cloudflare's
2. Wait for DNS propagation (5-30 minutes)
3. Configure DNS records:
   ```
   Type: CNAME
   Name: @ or www
   Target: flanneryallen.github.io
   Proxy: Enabled (orange cloud)
   ```

### 3. For github.io Domain
Since you can't change GitHub's nameservers, use Cloudflare's free protection:
1. Set up Cloudflare Workers (free tier: 100,000 requests/day)
2. Create a worker that proxies to your GitHub Pages site

### 4. Configure Security Settings

#### SSL/TLS
- Set to "Full" or "Full (strict)"
- Enable "Always Use HTTPS"
- Enable "Automatic HTTPS Rewrites"

#### Security Level
- Set to "Medium" or "High"
- Blocks suspicious visitors

#### Rate Limiting (Free: 1 rule)
Create rule:
```
Path: /*
Threshold: 50 requests per minute
Action: Challenge
```

#### Firewall Rules (Free: 5 rules)
Examples:
```
Rule 1: Block countries (if needed)
Rule 2: Challenge suspicious user agents
Rule 3: Block known bad IPs
Rule 4: Rate limit specific paths
Rule 5: Block SQL injection attempts
```

#### Page Rules (Free: 3 rules)
```
Rule 1: /*
  - Cache Level: Standard
  - Security Level: High
  - Always Use HTTPS: On

Rule 2: /api/*
  - Security Level: High
  - Cache Level: Bypass

Rule 3: *.jpg, *.png, *.css, *.js
  - Cache Level: Aggressive
  - Browser Cache TTL: 1 month
```

### 5. Additional Security Features

#### Challenge Passage
- Set to 30 minutes
- Reduces repeated challenges for legitimate users

#### Browser Integrity Check
- Enable to block bots with invalid headers

#### Hotlink Protection
- Prevents image embedding on other sites

#### Email Address Obfuscation
- Automatically hides emails from bots

## Monitoring & Alerts

1. **Analytics Dashboard**
   - Monitor traffic patterns
   - Identify attack attempts
   - Track blocked threats

2. **Set Up Alerts**
   - DDoS attacks
   - High error rates
   - Traffic spikes

3. **Weekly Review**
   - Check firewall events
   - Review rate limit logs
   - Adjust rules as needed

## Worker Script Example

Create a Cloudflare Worker for advanced protection:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Rate limiting by IP
  const ip = request.headers.get('CF-Connecting-IP')

  // Basic bot protection
  const userAgent = request.headers.get('User-Agent') || ''
  const suspiciousBots = /bot|crawler|spider|scraper/i

  if (suspiciousBots.test(userAgent)) {
    return new Response('Access Denied', { status: 403 })
  }

  // Proxy to GitHub Pages
  const url = new URL(request.url)
  url.hostname = 'flanneryallen.github.io'

  const response = await fetch(url, request)

  // Add security headers
  const newHeaders = new Headers(response.headers)
  newHeaders.set('X-Frame-Options', 'DENY')
  newHeaders.set('X-Content-Type-Options', 'nosniff')
  newHeaders.set('X-XSS-Protection', '1; mode=block')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}
```

## Cost Considerations

**Free Tier Limits:**
- 100,000 Worker requests/day
- 1 rate limiting rule
- 5 firewall rules
- 3 page rules
- Basic DDoS protection
- Basic analytics

**When to Upgrade:**
- More than 100k daily visitors
- Need advanced rate limiting
- Require image optimization
- Want advanced analytics

## Alternative: GitHub Actions + Fail2ban

For a code-only solution, implement rate limiting via GitHub Actions:

```yaml
name: Block Suspicious IPs
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours

jobs:
  analyze-logs:
    runs-on: ubuntu-latest
    steps:
      - name: Analyze traffic
        run: |
          # Parse GitHub Pages logs
          # Identify suspicious patterns
          # Update blocking rules
```

## Recommended Setup for Your Portfolio

1. **Immediate**: Use GitHub Pages as-is (already has basic DDoS protection)
2. **Enhanced**: Add Cloudflare free tier if you get a custom domain
3. **Monitor**: Use GitHub's traffic analytics to watch for issues
4. **React**: If attacked, quickly enable Cloudflare or temporarily make repo private

---

*Remember: For a portfolio site, basic protection is usually sufficient. Cloudflare free tier provides excellent protection without cost.*