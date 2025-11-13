#!/usr/bin/env node

/**
 * Video Discovery Script for Asciinema Browser
 *
 * This script scans the videos/ directory for .cast and .rec files,
 * extracts metadata from each recording, and generates videos.json
 *
 * Usage: node generate-list.js
 */

const fs = require('fs');
const path = require('path');

// TODO: Implement in Unit 02
// 1. Scan videos/ directory for .cast and .rec files
// 2. Read each file and parse the header (first line is JSON metadata)
// 3. Extract: duration, width, height, timestamp
// 4. Get file modification date
// 5. Build video objects array
// 6. Sort by date (newest first)
// 7. Write to videos.json

console.log('Video discovery script - To be implemented in Unit 02');
console.log('This will scan videos/ and generate videos.json automatically');
