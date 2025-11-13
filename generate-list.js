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
const readline = require('readline');

const VIDEOS_DIR = path.join(__dirname, 'videos');
const OUTPUT_FILE = path.join(__dirname, 'videos.json');

/**
 * Parse a .cast file and extract metadata
 */
async function parseAsciicastFile(filePath) {
  const fileName = path.basename(filePath);

  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let header = null;
    let maxTime = 0;
    let lineCount = 0;

    for await (const line of rl) {
      lineCount++;

      // First line is the header
      if (lineCount === 1) {
        try {
          header = JSON.parse(line);
        } catch (e) {
          console.warn(`Warning: Could not parse header for ${fileName}: ${e.message}`);
          return null;
        }
        continue;
      }

      // Subsequent lines are events [time, type, data]
      try {
        const event = JSON.parse(line);
        if (Array.isArray(event) && event.length >= 1) {
          const time = parseFloat(event[0]);
          if (time > maxTime) {
            maxTime = time;
          }
        }
      } catch (e) {
        // Skip invalid lines
      }
    }

    if (!header) {
      console.warn(`Warning: No valid header found in ${fileName}`);
      return null;
    }

    // Get file stats for modification time
    const stats = fs.statSync(filePath);

    // Extract metadata
    const duration = header.duration || maxTime || 0;
    const width = header.width || 80;
    const height = header.height || 24;
    const timestamp = header.timestamp || Math.floor(stats.mtimeMs / 1000);
    const title = header.title || fileName.replace(/\.(cast|rec)$/, '');
    const description = header.description || '';

    // Format date
    const date = new Date(timestamp * 1000).toISOString().split('T')[0];

    return {
      file: fileName,
      title: title,
      description: description,
      duration: parseFloat(duration.toFixed(2)),
      width: width,
      height: height,
      timestamp: timestamp,
      date: date
    };

  } catch (error) {
    console.warn(`Warning: Could not process ${fileName}: ${error.message}`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Scanning videos directory...');

  // Check if videos directory exists
  if (!fs.existsSync(VIDEOS_DIR)) {
    console.error(`Error: videos/ directory not found`);
    process.exit(1);
  }

  // Read directory contents
  const files = fs.readdirSync(VIDEOS_DIR);

  // Filter for .cast and .rec files
  const videoFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.cast' || ext === '.rec';
  });

  if (videoFiles.length === 0) {
    console.warn('Warning: No .cast or .rec files found in videos/');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ videos: [] }, null, 2));
    console.log('Generated empty videos.json');
    return;
  }

  console.log(`Found ${videoFiles.length} video file(s)`);

  // Process each file
  const videos = [];
  for (const file of videoFiles) {
    const filePath = path.join(VIDEOS_DIR, file);
    console.log(`Processing: ${file}...`);

    const metadata = await parseAsciicastFile(filePath);
    if (metadata) {
      videos.push(metadata);
    }
  }

  // Sort by timestamp (newest first)
  videos.sort((a, b) => b.timestamp - a.timestamp);

  // Write to videos.json
  const output = {
    videos: videos
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`\n✓ Generated videos.json with ${videos.length} video(s)`);
  console.log(`Output: ${OUTPUT_FILE}`);
}

// Run the script
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
