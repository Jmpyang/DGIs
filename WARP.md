# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The Digital Innovators (DGI) is a static website showcasing a team of 6 technology professionals specializing in different domains:
- **Joshua Pius**: Web Developer (HTML, CSS, JavaScript)
- **Giddy Ivutha**: Cybersecurity Specialist (CEH, CISSP)
- **Bethwel Kipkirui**: Data Scientist (Python, R, Machine Learning)
- **Benson Kivuva**: AI Expert with Cybersecurity focus
- **Gladys Chebet**: Cloud Solutions Architect (AWS, Azure, Google Cloud)
- **Eunice Kennedy**: Full-Stack Software Engineer (JavaScript, Python, Node.js, React)

## Architecture

This is a multi-page static website built with vanilla HTML, CSS, and JavaScript:

### Core Structure
- **4 Main Pages**: Home (`index.html`), Portfolio (`portfolio.html`), Blog (`blog.html`), Resume (`resume.html`)
- **Shared Styling**: Single `styles.css` with CSS custom properties for theme management
- **Theme System**: JavaScript-powered dark/light mode toggle with localStorage persistence
- **Responsive Design**: Flexbox-based layout that adapts to different screen sizes

### Key Components
- **Member Cards**: Reusable component pattern for displaying team member information
- **Portfolio Items**: Standardized project showcase format with images and descriptions
- **Blog Articles**: Article-based content structure with consistent formatting
- **Resume Downloads**: Direct PDF download links for each team member

### Theme System Architecture
The website implements a sophisticated dual-theme system:
- CSS custom properties (`--background-color`, `--text-color`, etc.) define all colors
- `[data-theme='dark']` attribute on `<html>` element switches between themes  
- JavaScript manages theme state, localStorage persistence, and system preference detection
- Smooth transitions (0.3s) provide polished theme switching experience

## Development Commands

### Local Development
```bash
# Serve the website locally using Python's built-in server
python3 -m http.server 8000

# Alternative with PHP (if available)
php -S localhost:8000

# Using Node.js live-server (if installed globally)
npx live-server
```

### File Operations
```bash
# Validate HTML files
for file in *.html; do echo "Checking $file"; done

# Optimize images (if imagemagick is available)
for img in images/*.jpeg; do convert "$img" -quality 85 "$img"; done

# Check CSS validity (if css-validator is available)
css-validator styles.css
```

### Content Management
```bash
# Add new team member: Create image files in images/ and projects/ directories
# Update all 4 HTML files with new member information

# Add new blog post: Edit blog.html and add new <article> section

# Update resume: Replace PDF in resumes/ directory and update resume.html links
```

## File Organization

### Static Assets
- `images/`: Team member photos (150x150px, circular display)
- `projects/`: Project showcase images  
- `resumes/`: PDF files for download

### Code Structure
- **HTML Pages**: Semantic structure with consistent navigation and footer
- **CSS**: Modular organization with CSS custom properties for maintainability
- **JavaScript**: Single file handling theme management and user preferences

## Key Implementation Details

### Theme Management
The theme system uses a data attribute approach rather than class toggling:
- Themes are stored as `data-theme` attribute on the HTML element
- CSS custom properties are redefined for dark theme using `[data-theme='dark']` selector
- System preference detection via `window.matchMedia('(prefers-color-scheme: dark)')`

### Responsive Behavior
- Flexbox layout switches to column direction on screens < 700px
- Card components maintain consistent spacing and sizing across breakpoints
- Images are fixed-size (150x150px) with circular borders for visual consistency

### Navigation State
- Active page indication through `.active` class on navigation links
- Consistent navigation structure across all pages
- Footer copyright notice on every page

## Content Guidelines

### Adding Team Members
1. Add member photo to `images/` directory (JPEG format)
2. Add project image to `projects/` directory  
3. Add resume PDF to `resumes/` directory
4. Update all 4 HTML files with member information
5. Follow existing formatting patterns for consistency

### Blog Posts
- Use semantic `<article>` tags with `<h3>` headings
- Include author name and date in consistent format
- Use `<u>` tags for emphasis on key terms
- Maintain text-align: justify for readability

### Portfolio Projects
- Follow format: Project title, image, team member name, description with Project/Achievement/Tools sections
- Use consistent `<b><u>` formatting for section headers
- Include relevant technologies and measurable achievements where possible

## Technical Considerations

- **No Build Process**: Pure static files, no bundling or compilation required
- **No Dependencies**: Uses only vanilla HTML, CSS, JavaScript, and Font Awesome CDN
- **Cross-Browser**: Standard web technologies ensure broad browser compatibility  
- **SEO-Friendly**: Semantic HTML structure and proper meta tags
- **Performance**: Minimal JavaScript, optimized for fast loading