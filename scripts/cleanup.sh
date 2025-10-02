#!/bin/bash
# FitTrak-Pro Cleanup Script
# Removes temporary test files and screenshots

echo "🧹 Starting cleanup..."

# Count files before cleanup
before_count=$(find . -maxdepth 1 -type f \( -name "*-test.js" -o -name "test-*.js" -o -name "test-*.json" -o -name "screenshot-*.png" -o -name "test-*.png" \) | wc -l | tr -d ' ')

# Remove temporary test files from root
echo "  📄 Removing temporary test files..."
rm -f browser-test*.js *-test.js test-*.js test-*.json 2>/dev/null

# Remove test screenshots from root (keep generated-icon.png)
echo "  🖼️  Removing test screenshots..."
rm -f screenshot-*.png test-*.png final-*.png snap-*.png network-test-*.png supabase-test-*.png 2>/dev/null

# Clean tmp screenshots
echo "  🗑️  Cleaning /tmp screenshots..."
rm -f /tmp/*.png /tmp/screenshot*.png 2>/dev/null

# Clean test artifacts (keep directories)
echo "  📊 Cleaning test artifacts..."
rm -rf .test-artifacts/* 2>/dev/null
mkdir -p .test-artifacts/reports 2>/dev/null
mkdir -p .test-artifacts/logs 2>/dev/null

# Clean old test screenshots from tests/ (older than 7 days)
echo "  🕰️  Removing old test screenshots (>7 days)..."
find tests/screenshots -type f -name "*.png" -mtime +7 -delete 2>/dev/null

# Count files after cleanup
after_count=$(find . -maxdepth 1 -type f \( -name "*-test.js" -o -name "test-*.js" -o -name "test-*.json" -o -name "screenshot-*.png" -o -name "test-*.png" \) | wc -l | tr -d ' ')

# Calculate cleaned files
cleaned=$((before_count - after_count))

echo ""
echo "✅ Cleanup complete!"
echo "   📊 Removed $cleaned temporary files"
echo "   📁 Test directories ready: tests/e2e, tests/screenshots"
echo ""
