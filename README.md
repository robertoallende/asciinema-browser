# Asciinema Browser

A beautiful, standalone HTML gallery for browsing and playing asciinema terminal recordings.

## Features

- 📁 Automatic discovery of `.cast` files from the `videos/` directory
- 🎨 Beautiful, responsive grid layout with Pico CSS
- 🌓 Auto dark/light mode support
- 🎬 Modal video player with asciinema-player
- 🚀 Zero backend required - fully static HTML/CSS/JS
- 📦 All dependencies via CDN - no npm install needed for runtime

## Quick Start

1. **Add your recordings** to the `videos/` folder
2. **Generate the video list**:
   ```bash
   node generate-list.js
   ```
3. **Open** `index.html` in your browser

That's it!

## Project Structure

```
asciinema-browser/
├── README.md
├── dev_log/              # MMDD development documentation
├── generate-list.js      # Video discovery script
├── videos.json           # Generated video metadata
├── index.html            # Main gallery page
├── videos/               # Your .cast recordings go here
└── assets/               # Optional custom styles
```

## Development

This project follows the **MMDD (Micromanaged Driven Development)** methodology. See `dev_log/00_mmdd.md` for details.

### Development Log

- See `dev_log/00_main.md` for project overview and unit breakdown
- Each unit is documented in its own markdown file

## Technical Stack

- **HTML5** - Semantic markup
- **Pico CSS** - Classless, responsive styling
- **Vanilla JavaScript** - No frameworks needed
- **asciinema-player** - Terminal recording playback
- **Node.js** - Build-time video discovery script only

## License

MIT (or your preferred license)
