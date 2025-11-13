# Asciinema Browser - Project Plan and Dev Log

A beautiful, standalone HTML gallery for browsing and playing asciinema terminal recordings with automated video discovery.

## Structure

Development is organized into units following the MMDD (Micromanaged Driven Development) methodology. Each unit represents a major development phase and is documented in a markdown file within `dev_log/`.

Files follow the naming convention: `<sequence>_<unitname>[_subunit<number|name>].md`

## About the Project

### What This Is

A single-page web application that:
- Automatically discovers `.cast` files from a `videos/` directory
- Displays them in a beautiful, responsive grid layout
- Plays recordings in a modal overlay using the asciinema player
- Requires no backend server at runtime (fully standalone HTML/CSS/JS)

### Architecture

**Build-time Layer:**
- Node.js script scans `videos/` directory
- Extracts metadata from `.cast` file headers (duration, dimensions, timestamps)
- Generates `videos.json` with video listing

**Runtime Layer:**
- Static HTML page loads `videos.json` via fetch
- JavaScript renders video cards in responsive grid
- Modal dialog with embedded asciinema player for playback
- All assets loaded via CDN (zero build step for frontend)

### Technical Stack

**Frontend:**
- Plain HTML5 with semantic markup
- Pico CSS (via CDN) - classless, responsive, dark/light mode
- Vanilla JavaScript (ES6+) for interactivity
- asciinema-player (via CDN) for video playback

**Build Tool:**
- Node.js script for video discovery
- No runtime dependencies (script only runs when adding videos)

**Configuration Decisions:**
- Metadata: filename, modification date, duration, terminal dimensions
- Sorting: newest first (by modification date)
- Player theme: auto-detect (matches page light/dark mode)
- Player controls: auto-hide on mouse leave
- All external dependencies via CDN

### File Structure

```
asciinema-browser/
├── README.md
├── dev_log/
│   ├── 00_mmdd.md
│   ├── 00_main.md (this file)
│   ├── 01_project_setup.md
│   ├── 02_video_discovery.md
│   ├── 03_listing_page.md
│   └── 04_player_modal.md
├── generate-list.js      # Video discovery script
├── videos.json           # Generated video metadata
├── index.html            # Main gallery page
├── videos/               # .cast recordings
│   └── (*.cast files)
└── assets/               # Optional custom styles/scripts
```

## Project Status

### Overall Completion
100% - 🎉 Project Complete!

### Completed Features
- Project structure and directory organization
- Git repository with GitHub integration
- MMDD documentation framework
- HTML/CSS/JS scaffold files ready for development
- **Video discovery script** - Automatically scans videos/ directory and generates videos.json
- **Metadata extraction** - Parses .cast/.rec files for duration, dimensions, timestamps
- **Video listing page** - Responsive grid gallery with beautiful cards
- **Card metadata display** - Duration, date, terminal size formatted and displayed
- **Player modal** - Beautiful modal dialog with asciinema player integration
- **Video playback** - Full asciinema player with controls, auto-play, and responsive sizing
- **Multiple close options** - Close button, Escape key, backdrop click
- **Player lifecycle** - Proper initialization and cleanup to prevent memory leaks
- **Accessibility** - Keyboard navigation, ARIA labels, semantic HTML throughout

## Units Implemented

### Completed Units
* **01**: Project Setup & MMDD Foundation - Created directory structure, scaffold files (index.html, generate-list.js, videos.json), established MMDD documentation, initialized git repository
* **02**: Video Discovery Script - Implemented Node.js script with streaming parser, error handling, supports both .cast and .rec formats, successfully tested on 6 videos
* **03**: Video Listing Page - Implemented responsive gallery with CSS Grid, video cards with formatted metadata, hover effects, loading/error states, accessibility features
* **04**: Player Modal & Integration - Implemented modal dialog with asciinema player, auto-play, controls, multiple close mechanisms, proper player lifecycle management

### Units In Progress

None - All units complete!

## Usage

1. **Add videos** - Place `.cast` or `.rec` files in `videos/` directory
2. **Generate list** - Run `node generate-list.js` to scan and generate `videos.json`
3. **Serve** - Start a local server: `python3 -m http.server 8000`
4. **Browse** - Visit `http://localhost:8000` and click any video to play!

## Project Summary

Asciinema Browser is a beautiful, standalone web application for browsing and playing terminal recordings. Built with vanilla JavaScript, Pico CSS, and the asciinema player, it provides a modern, responsive interface for viewing `.cast` files. The application requires no backend server and can be deployed as static files to any web host.
