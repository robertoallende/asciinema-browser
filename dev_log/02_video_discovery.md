# Unit 02: Video Discovery Script

## Objective

Build a Node.js script that automatically scans the `videos/` directory for `.cast` and `.rec` files, extracts metadata from each recording, and generates `videos.json` with complete video information.

## Implementation

### Script Functionality

The `generate-list.js` script will:

1. **Scan directory** - Read all files from `videos/` directory
2. **Filter files** - Include only `.cast` and `.rec` extensions
3. **Parse metadata** - For each file:
   - Read first line (JSON header with metadata)
   - Extract: duration, width, height, timestamp, title (if present)
   - Get file modification time as fallback
4. **Build video objects** - Create structured data for each video
5. **Sort videos** - Order by date (newest first)
6. **Write JSON** - Save to `videos.json` with pretty formatting

### JSON Structure

Each video object will contain:
```javascript
{
  "file": "001.cast",           // Filename
  "title": "Demo 1",            // From .cast header or filename
  "description": "",            // Optional, from .cast header if present
  "duration": 123.45,           // Total duration in seconds
  "width": 80,                  // Terminal width
  "height": 24,                 // Terminal height
  "timestamp": 1692661740,      // Unix timestamp
  "date": "2024-08-21"          // Formatted date for display
}
```

### Technical Details

- Use Node.js built-in modules (fs, path) - no external dependencies
- Handle errors gracefully (skip invalid files, log warnings)
- Support both asciicast v1 and v2 formats
- Calculate duration by reading through the entire file if not in header

## AI Interactions

Claude Code was used to:
1. Implement the complete script with async/await for file streaming
2. Add robust error handling for malformed files
3. Calculate duration from events when not in header
4. Test successfully on 6 existing video files (4 .cast + 2 .rec)

The script uses Node.js built-in modules only (fs, path, readline) with no external dependencies.

## Implementation Details

Key features implemented:
- **Streaming parser** - Uses readline to handle large files efficiently
- **Duration calculation** - Reads all events to find max timestamp if duration not in header
- **Fallback timestamps** - Uses file modification time if not in .cast header
- **Error resilience** - Skips invalid files with warnings, continues processing
- **Format support** - Both asciicast v1 and v2 formats, .cast and .rec extensions

## Test Results

Successfully processed all 6 videos:
- mmdd-weather-02.rec (4h 0m)
- mmdd-weather-01.rec (4h 0m)
- 004.cast (29h 20m)
- 003.cast (34m 17s)
- 002.cast (10h 1m)
- 001.cast (2h 45m)

All metadata extracted correctly with proper sorting (newest first).

## Files Modified

**Modified:**
- `generate-list.js` - Full implementation (160 lines)

**Generated:**
- `videos.json` - Populated with 6 videos and complete metadata

**Updated:**
- `dev_log/02_video_discovery.md` - This file
- `dev_log/00_main.md` - Updated project status to 50%

## Status: Complete

Video discovery script fully implemented and tested. Successfully generates videos.json from existing .cast and .rec files. Ready to proceed to Unit 03: Video Listing Page.
