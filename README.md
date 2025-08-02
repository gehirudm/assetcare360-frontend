### 📦 Project Structure

```
project-root/
├── build/                          # Compiled output
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css           # Global styles
│   │   │   ├── index.css           # Home page CSS
│   │   │   ├── auth/
│   │   │   │   ├── login/index.css         # Modular CSS (preserves directory structure)
│   │   │   │   ├── sign-up/index.css
│   │   │   │   ├── forgot-password/index.css
│   │   │   │   └── ...
│   │   ├── js/
│   │   │   ├── index.js            # Home page JS
│   │   │   ├── auth/
│   │   │   │   ├── login/index.js         # Modular JS (preserves directory structure)
│   │   │   │   ├── sign-up/index.js
│   │   │   │   ├── forgot-password/index.js
│   │   │   │   └── ...
│   └── auth/
│       ├── login.html              # Final compiled HTML page
│       ├── sign-up.html
│       ├── forgot-password.html
│       └── ...
│
├── src/
│   ├── composables/                # Reusable HTML snippets (e.g., headers, footers)
│   │   ├── header.html
│   │   └── footer.html
│
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── index.html      # Login page HTML
│   │   │   │   ├── index.scss      # Page-specific SASS
│   │   │   │   ├── index.js        # Page-specific JS
│   │   │   ├── sign-up/
│   │   │   │   ├── index.html      # Sign up page
│   │   │   │   ├── index.scss
│   │   │   │   ├── index.js
│   │   │   └── forgot-password/
│   │   │       ├── index.html      # Forgot password page
│   │   │       ├── index.scss
│   │   │       ├── index.js
│   │   └── ...
│
│   ├── services/
│   │   ├── main.js                 # Entry point for shared JS logic
│   │   ├── api.js
│   │   └── validators.js
│
│   └── styles/
│       └── main.scss               # Global styles (used in all pages)
│
├── gulpfile.js                     # Gulp config
└── package.json
```