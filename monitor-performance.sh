#!/bin/bash

# Performance Monitoring Script for Portfolio
# Runs various checks to ensure optimal performance

echo "📊 Performance Monitoring for flanneryallen.github.io"
echo "======================================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

URL="https://flanneryallen.github.io"

# Function to format file size
format_size() {
    local size=$1
    if [ $size -lt 1024 ]; then
        echo "${size}B"
    elif [ $size -lt 1048576 ]; then
        echo "$((size / 1024))KB"
    else
        echo "$((size / 1048576))MB"
    fi
}

echo "1. Page Load Performance"
echo "------------------------"

# Measure page load time
echo -n "Testing homepage load time... "
start_time=$(date +%s%N)
curl -s -o /dev/null -w "%{http_code}" "$URL" > /dev/null
end_time=$(date +%s%N)
load_time=$(( ($end_time - $start_time) / 1000000 ))

if [ $load_time -lt 1000 ]; then
    echo -e "${GREEN}${load_time}ms ✓${NC}"
elif [ $load_time -lt 3000 ]; then
    echo -e "${YELLOW}${load_time}ms ⚠${NC}"
else
    echo -e "${RED}${load_time}ms ✗${NC}"
fi

# Check total page size
echo -n "Checking page size... "
page_size=$(curl -s "$URL" | wc -c)
formatted_size=$(format_size $page_size)

if [ $page_size -lt 500000 ]; then
    echo -e "${GREEN}$formatted_size ✓${NC}"
elif [ $page_size -lt 2000000 ]; then
    echo -e "${YELLOW}$formatted_size ⚠${NC}"
else
    echo -e "${RED}$formatted_size ✗${NC}"
fi

echo ""
echo "2. Resource Loading"
echo "-------------------"

# Count external resources
echo -n "External scripts: "
scripts=$(curl -s "$URL" | grep -o '<script.*src=' | wc -l)
echo "$scripts"

echo -n "External stylesheets: "
styles=$(curl -s "$URL" | grep -o '<link.*stylesheet' | wc -l)
echo "$styles"

echo -n "Images: "
images=$(curl -s "$URL" | grep -o '<img' | wc -l)
echo "$images"

echo -n "Iframes: "
iframes=$(curl -s "$URL" | grep -o '<iframe' | wc -l)
echo "$iframes"

echo ""
echo "3. SEO Optimization"
echo "-------------------"

# Check for meta tags
echo -n "Title tag: "
if curl -s "$URL" | grep -q '<title>'; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "Meta description: "
if curl -s "$URL" | grep -q 'name="description"'; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Missing${NC}"
fi

echo -n "Open Graph tags: "
if curl -s "$URL" | grep -q 'property="og:'; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Missing${NC}"
fi

echo -n "Sitemap: "
if curl -s "$URL/sitemap.xml" | grep -q '<urlset'; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "Robots.txt: "
if curl -s "$URL/robots.txt" | grep -q 'User-agent'; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo ""
echo "4. Accessibility Checks"
echo "----------------------"

# Check for alt texts
echo -n "Images with alt text: "
total_images=$(curl -s "$URL" | grep -o '<img' | wc -l)
alt_images=$(curl -s "$URL" | grep -o '<img[^>]*alt=' | wc -l)
echo "$alt_images/$total_images"

# Check for ARIA labels
echo -n "ARIA labels: "
aria_count=$(curl -s "$URL" | grep -o 'aria-' | wc -l)
if [ $aria_count -gt 0 ]; then
    echo -e "${GREEN}$aria_count found${NC}"
else
    echo -e "${YELLOW}None found${NC}"
fi

# Check heading hierarchy
echo -n "H1 tags: "
h1_count=$(curl -s "$URL" | grep -o '<h1' | wc -l)
echo "$h1_count"

echo ""
echo "5. Network Performance"
echo "---------------------"

# DNS lookup time
echo -n "DNS lookup: "
dns_time=$(curl -o /dev/null -s -w "%{time_namelookup}\n" "$URL")
dns_ms=$(echo "$dns_time * 1000" | bc | cut -d'.' -f1)
echo "${dns_ms}ms"

# Time to first byte
echo -n "Time to first byte: "
ttfb=$(curl -o /dev/null -s -w "%{time_starttransfer}\n" "$URL")
ttfb_ms=$(echo "$ttfb * 1000" | bc | cut -d'.' -f1)
if [ $ttfb_ms -lt 600 ]; then
    echo -e "${GREEN}${ttfb_ms}ms ✓${NC}"
elif [ $ttfb_ms -lt 1000 ]; then
    echo -e "${YELLOW}${ttfb_ms}ms ⚠${NC}"
else
    echo -e "${RED}${ttfb_ms}ms ✗${NC}"
fi

# Total time
echo -n "Total load time: "
total_time=$(curl -o /dev/null -s -w "%{time_total}\n" "$URL")
total_ms=$(echo "$total_time * 1000" | bc | cut -d'.' -f1)
echo "${total_ms}ms"

echo ""
echo "6. Compression"
echo "--------------"

# Check if gzip is enabled
echo -n "Gzip compression: "
if curl -s -H "Accept-Encoding: gzip" -I "$URL" | grep -q "content-encoding: gzip"; then
    echo -e "${GREEN}✓ Enabled${NC}"
else
    echo -e "${YELLOW}⚠ Not detected${NC}"
fi

echo ""
echo "======================================================"
echo "Performance Summary"
echo ""

# Calculate score
score=0
[ $load_time -lt 1000 ] && score=$((score + 20))
[ $page_size -lt 500000 ] && score=$((score + 20))
[ $ttfb_ms -lt 600 ] && score=$((score + 20))
[ $scripts -lt 5 ] && score=$((score + 20))
[ $alt_images -eq $total_images ] && score=$((score + 20))

echo -n "Overall Score: "
if [ $score -ge 80 ]; then
    echo -e "${GREEN}$score/100 - Excellent!${NC}"
elif [ $score -ge 60 ]; then
    echo -e "${YELLOW}$score/100 - Good${NC}"
else
    echo -e "${RED}$score/100 - Needs Improvement${NC}"
fi

echo ""
echo "Recommendations:"
if [ $page_size -gt 500000 ]; then
    echo "• Consider optimizing images and minifying code"
fi
if [ $scripts -gt 5 ]; then
    echo "• Consider combining or reducing external scripts"
fi
if [ $alt_images -lt $total_images ]; then
    echo "• Add alt text to all images for accessibility"
fi
if [ $ttfb_ms -gt 600 ]; then
    echo "• Consider using a CDN to improve server response time"
fi

echo ""
echo "Run 'lighthouse $URL' for detailed performance metrics"

# Make script executable
chmod +x "$0" 2>/dev/null