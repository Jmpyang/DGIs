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

### Local Development Server
```bash
# Serve the website locally using Python's built-in server (recommended)
python3 -m http.server 8000
# Then open: http://localhost:8000

# Alternative with PHP (if available)
php -S localhost:8000

# Using Node.js live-server (auto-reload on changes)
npx live-server --port=8000

# Using Python with different port
python3 -m http.server 3000

# Check if server is running
curl -I http://localhost:8000
```

### File Operations
```bash
# Validate HTML files
for file in *.html; do 
  npx html-validate "$file"
done

# Optimize images (if imagemagick is available)
for img in images/*.jpeg; do 
  convert "$img" -quality 85 -resize "150x150>" "$img"
done

# Check CSS validity (if css-validator is available)
npx css-validator styles.css

# Performance testing
npx lighthouse http://localhost:8000 --view
```

### Deployment Commands
```bash
# Deploy to GitHub Pages
npm install -g gh-pages
gh-pages -d . -b gh-pages

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir .

# Deploy to Surge.sh
npm install -g surge
surge . your-domain.surge.sh
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
- **JavaScript**: Single file handling theme management, animations and resume viewer functionality

## Key Implementation Details

### Theme Management
The theme system uses a data attribute approach rather than class toggling:
- Themes are stored as `data-theme` attribute on the HTML element
- CSS custom properties are redefined for dark theme using `[data-theme='dark']` selector
- System preference detection via `window.matchMedia('(prefers-color-scheme: dark)')`
- Theme changes are persisted using `localStorage`

### JavaScript Architecture
The codebase follows a modular pattern with distinct responsibility areas:
- `initThemeToggle()`: Theme detection and management
- `initScrollAnimations()`: Intersection Observer for scroll-triggered animations 
- `initCardAnimations()`: Interactive card effects with hover states and ripples
- `initImageLazyLoading()`: Performance optimization for images
- `initResumeViewer()`: Interactive modal for detailed resume viewing
- `resumeDatabase`: Data structure for dynamic resume generation

### Responsive Behavior
- Flexbox layout switches to column direction on screens < 700px
- Card components maintain consistent spacing and sizing across breakpoints
- Images are fixed-size (150x150px) with circular borders for visual consistency

### CSS Architecture
- Design tokens in CSS custom properties for consistent theming
- Mobile-first responsive design using media queries
- Component-based organization with clear separation of concerns
- Animation system using keyframes and CSS transitions

### Navigation State
- Active page indication through `.active` class on navigation links
- Consistent navigation structure across all pages
- Footer copyright notice on every page

## Content Guidelines

### Adding Team Members
1. Add member photo to `images/` directory (JPEG format, 150x150px)
2. Add project image to `projects/` directory
3. Add resume PDF to `resumes/` directory
4. Update all HTML files with the new member information
5. Add the member's resume data object in `script.js` resumeDatabase

### Blog Posts
- Use semantic `<article>` tags with `<h3>` headings
- Include author name and date in consistent format
- Use `<u>` tags for emphasis on key terms
- Maintain text-align: justify for readability

### Portfolio Projects
- Follow format: Project title, image, team member name, description with Project/Achievement/Tools sections
- Use consistent `<b><u>` formatting for section headers
- Include relevant technologies and measurable achievements where possible

## Testing and Validation

### HTML Validation
```bash
# Validate individual HTML files
npx html-validate index.html
npx html-validate portfolio.html
npx html-validate blog.html
npx html-validate resume.html
```

### CSS Validation
```bash
# Validate CSS
npx css-validator styles.css
```

### Performance Testing
```bash
# Run Lighthouse audit
npx lighthouse http://localhost:8000 --view

# Test with different devices/viewports
# Use browser dev tools to test responsive design
```

### Browser Testing
The website should be tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Technical Considerations

- **No Build Process**: Pure static files, no bundling or compilation required
- **No Dependencies**: Uses only vanilla HTML, CSS, JavaScript, and Font Awesome CDN
- **Cross-Browser**: Standard web technologies ensure broad browser compatibility  
- **SEO-Friendly**: Semantic HTML structure and proper meta tags
- **Performance**: Minimal JavaScript, optimized for fast loading
