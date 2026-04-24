# Flannery Allen Portfolio

[![CI Pipeline](https://github.com/FlanneryAllen/flanneryallen.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/FlanneryAllen/flanneryallen.github.io/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/FlanneryAllen/flanneryallen.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/FlanneryAllen/flanneryallen.github.io/actions/workflows/deploy.yml)
[![Accessibility Testing](https://github.com/FlanneryAllen/flanneryallen.github.io/actions/workflows/accessibility.yml/badge.svg)](https://github.com/FlanneryAllen/flanneryallen.github.io/actions/workflows/accessibility.yml)

## 🚀 Live Site

Visit the portfolio at: [https://flanneryallen.github.io](https://flanneryallen.github.io)

## 📁 Project Structure

```
.
├── index.html           # Homepage with interactive timeline
├── strategy.html        # Strategy case studies
├── agency.html          # Agency work portfolio
├── jcpenney.html        # JCPenney project showcase
├── .github/
│   └── workflows/       # CI/CD pipelines
│       ├── ci.yml       # Continuous Integration tests
│       ├── deploy.yml   # GitHub Pages deployment
│       └── accessibility.yml  # Accessibility testing
└── assets/              # Images and media files
```

## 🛠️ CI/CD Pipeline

This portfolio uses GitHub Actions for continuous integration and deployment:

### Continuous Integration (`ci.yml`)
- **HTML Validation**: Validates all HTML files against W3C standards
- **Lighthouse CI**: Performance, accessibility, and SEO audits
- **Link Checker**: Validates all internal and external links
- **Security Scan**: Scans for vulnerabilities
- **Code Quality**: ESLint and Prettier checks
- **Spell Check**: Automated spell checking

### Deployment (`deploy.yml`)
- **Image Optimization**: Automatically optimizes images and creates WebP versions
- **Minification**: Minifies HTML, CSS, and JavaScript
- **Sitemap Generation**: Creates sitemap.xml for SEO
- **GitHub Pages Deployment**: Automated deployment on push to main

### Accessibility (`accessibility.yml`)
- **Pa11y Testing**: WCAG 2.0 AA compliance testing
- **Axe Core**: Comprehensive accessibility audits
- **Color Contrast**: Validates color contrast ratios
- **Screenshot Capture**: Visual documentation of each page

## 🚦 Build Status

All builds and deployments are monitored through GitHub Actions. Click on the badges above to view the latest build status and logs.

## 🔧 Local Development

To run the site locally:

```bash
# Clone the repository
git clone https://github.com/FlanneryAllen/flanneryallen.github.io.git
cd flanneryallen.github.io

# Start a local server (Python 3)
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000

# Visit http://localhost:8000
```

## 🎨 Technologies

- **HTML5** with semantic markup
- **CSS3** with custom properties and modern layouts
- **Vanilla JavaScript** for interactivity
- **GitHub Actions** for CI/CD
- **GitHub Pages** for hosting

## 📊 Performance

The site is optimized for performance with:
- Minified assets
- Optimized images with WebP fallbacks
- Inline critical CSS
- Minimal JavaScript
- WCAG 2.0 AA accessibility compliance

## 🤝 Contributing

This is a personal portfolio project, but feedback is welcome! Please open an issue if you notice any problems.

## 📄 License

© 2026 Flannery Allen. All rights reserved.

---

*Built with care and automated with GitHub Actions* 🤖