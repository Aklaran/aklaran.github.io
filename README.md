# Bo Tembunkiart - Portfolio & Blog

A unified personal website combining professional portfolio and adventure blog, built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

- **Portfolio** - Showcase of professional work and projects
- **Blog** - Adventure writing and photography from Nepal and beyond
- **Gallery** - Photo collection with lightbox viewer
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **Responsive Design** - Works beautifully on mobile, tablet, and desktop
- **Fast & Simple** - No framework overhead, pure vanilla web technologies

## 📦 Tech Stack

- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Markdown Processing:** markdown-it + gray-matter
- **Styling:** Pure CSS with CSS Custom Properties
- **Interactivity:** Vanilla JavaScript
- **Deployment:** GitHub Pages via GitHub Actions

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 9+

### Setup

```bash
# Install dependencies
pnpm install

# Start dev server (with hot reload)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Clean generated files
pnpm clean
```

## 📝 Content Management

### Blog Posts

Add markdown files to `content/blog/` with frontmatter:

```markdown
---
date: "2024-01-25"
title: "Post Title"
blurb: "Short description"
image: /images/thumbnail.jpg
---

Your content here...
```

### Projects

Add markdown files to `content/projects/` with frontmatter:

```markdown
---
title: "Project Name"
tags: [React, TypeScript, Node.js]
startDate: 2024-01
endDate: 2024-06
image: /images/project.jpg
summary: "Brief project description"
site: https://project-url.com
repo: https://github.com/username/repo
---

Project details...
```

### Images

Place images in `images/` directory. Reference them in markdown as `/images/filename.jpg`.

## 🚀 Deployment

Site automatically deploys to GitHub Pages when pushing to the `main` or `master` branch via GitHub Actions.

### Manual Deployment

```bash
pnpm build
# Commit and push dist/ contents to gh-pages branch
```

## 📁 Project Structure

```
/
├── index.html              # Home page
├── blog.html               # Blog index
├── projects.html           # Projects index
├── gallery.html            # Photo gallery
├── content/
│   ├── blog/              # Blog markdown files
│   └── projects/          # Project markdown files
├── css/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # Theme colors
│   ├── global.css         # Typography & base styles
│   └── components.css     # UI components
├── js/
│   ├── theme-toggle.js    # Dark/light mode
│   ├── gallery.js         # Image lightbox
│   └── main.js            # General utilities
├── scripts/
│   ├── build.js           # Main build script
│   └── markdown-processor.js  # Markdown utilities
├── templates/
│   ├── blog-post.html     # Blog post template
│   └── project.html       # Project template
├── images/                # All images
├── blog/                  # Generated blog posts (gitignored)
├── projects/              # Generated projects (gitignored)
└── dist/                  # Production build (gitignored)
```

## 🎨 Customization

### Colors

Edit `css/variables.css` to change theme colors:

```css
:root {
  --color-primary: hsl(345deg 80% 35%);
  --color-secondary: hsl(181deg 94% 44%);
  /* ... more colors */
}
```

### Typography

Fonts are defined in `css/global.css`. Default:
- UI/Headings: Cabin (sans-serif)
- Blog Content: Serif font stack for readability

## 📄 License

MIT License - feel free to use this as a template for your own site!

## 🤝 Credits

Built by Bo Tembunkiart
- Website: https://botembunki.art
- GitHub: [@Aklaran](https://github.com/Aklaran)
- LinkedIn: [Bo Tembunkiart](https://www.linkedin.com/in/bo-tembunkiart/)
