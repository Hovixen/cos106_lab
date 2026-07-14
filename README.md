# Student Portfolio & Academic Management Website

A 5-page responsive site built with plain HTML, CSS, and JavaScript (no frameworks), styled as an architecture student's drafting-table blueprint. Currently filled with **placeholder content** for a fictional student, "Amara Chukwu" — swap in your own details before submitting.

## Pages
- `index.html` — homepage: name, photo (line-art SVG), welcome, bio, featured projects
- `about.html` — education table, aspirations, skills, hobbies, audio embed
- `projects.html` — 3 project cards + a video embed
- `planner.html` — interactive academic planner (add / complete / delete tasks, saved via `localStorage`)
- `contact.html` — validated contact form (empty-field, email format, digits-only phone)

## To personalize
1. Replace "Amara Chukwu" and the bio text throughout each HTML file with your own name and story.
2. Swap the SVG line-art portrait in `index.html` for a real photo if you'd like (add an `<img>` inside `.portrait-frame`).
3. Update the education table in `about.html` with your real courses.
4. Replace the three project cards in `projects.html` with your own work (swap SVG thumbnails for real screenshots in an `images/` folder).
5. Update contact details in `contact.html`.
6. The audio/video sources are public demo files — replace with your own media if you have it.

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

Submit both the GitHub repo link and the live Pages link as required by the brief.
