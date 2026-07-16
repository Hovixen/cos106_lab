# Student Portfolio & Academic Management Website

A 5-page responsive site built with plain HTML, CSS, and JavaScript (no frameworks), styled as an Data Science student's drafting-table blueprint. Currently filled with **placeholder content** for now as project submission
## Pages
- `index.html` — homepage: name, photo (line-art SVG), welcome, bio, featured projects
- `about.html` — education table, aspirations, skills, hobbies, audio embed
- `projects.html` — 3 project cards + a video embed
- `planner.html` — interactive academic planner (add / complete / delete tasks, saved via `localStorage`)
- `contact.html` — validated contact form (empty-field, email format, digits-only phone)



## To run locally
No build step needed — just open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## To host (GitHub Pages)
1. Push this folder to a GitHub repository.
2. Repo Settings → Pages → set source to the `main` branch, root folder.
3. Your live link will be `https://<username>.github.io/<repo-name>/`.


