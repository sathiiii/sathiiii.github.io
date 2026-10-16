# Sathira Silva · Research website

A responsive academic profile hosted on GitHub Pages. The website uses plain HTML and CSS, with no client-side JavaScript or external font dependencies.

## Content

- `index.html`: biography, publications, current research, experience, education, and contact.
- `assets/css/academic.css`: layout, mobile styles, and print styles.
- `assets/docs/Sathira_Silva_CV_latest.pdf`: downloadable CV.
- `about/`, `projects/`, and `contact/`: redirects for existing URLs.

Publication details and links were transcribed from the updated October 2026 CV. Edit the publication entries in `index.html` when adding work.

## Preview

Run `python3 -m http.server 8000` from the repository root, then open `http://localhost:8000`. No build is needed for a local preview.

## Deployment

GitHub Actions validates the Jekyll build on pull requests. Pushes to `main` publish the generated site to the existing `gh-pages` branch. In GitHub Pages settings, keep the publishing source set to that branch. Blog pages and their generation script have been removed.
