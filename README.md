# Rico's Traveler Map 🌏

A free static GitHub Pages website with an interactive Leaflet world map and guest-photo gallery.

## Publish with GitHub Pages
1. Create a GitHub account at https://github.com.
2. Create a **Public** repository named `YOUR_USERNAME.github.io` (replace YOUR_USERNAME with your GitHub username).
3. Upload `index.html`, `style.css`, `script.js`, `guests.js`, and the `photos/` folder to the **root** of that repository (use **Add file → Upload files → Commit changes**).
4. Open **Settings → Pages → Build and deployment**.
5. Choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
6. Wait a few minutes, then visit `https://YOUR_USERNAME.github.io/`.

For a differently named repository such as `traveler-map`, the URL is `https://YOUR_USERNAME.github.io/traveler-map/`.

## Add a new guest
1. Obtain explicit permission to publish their photo, chosen display name, country/city, and story.
2. Rename the photo to a simple name, e.g. `guest-003.jpg`; resize/compress to around 1200px wide and ideally under 500 KB.
3. Upload it to `photos/`.
4. Edit `guests.js`: copy one guest object and update `id` (unique), `nickname`, `country`, `city`, `lat`, `lng`, `date`, `story`, `photo: "photos/guest-003.jpg"`, `consent: true`.
5. Commit changes. GitHub Pages updates automatically.

Use city-center coordinates, not precise residential addresses. Guests without consent should not be included (set `consent: false` or remove the entry). Demo guests are fictional; remove them before publishing real guest content.

## Notes
- No database, login, or paid hosting required.
- Leaflet and OpenStreetMap tiles require internet access.
- Repository and published files are publicly accessible; do not upload sensitive information or private photos.
- Do not use this as a private guest-photo archive; use a private photo-sharing service if access control is needed.
- All HTML text is inserted safely by DOM textContent (not raw guest HTML).
- Map tiles © OpenStreetMap contributors.
