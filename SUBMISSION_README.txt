LEE / DIGITAL ARTBOOK — SUBMISSION-READY CODE REVIEW

WHAT WAS CHANGED (without redesigning pages)
- Extracted all internal <style> blocks into assets/<page>.css.
- Extracted inline JavaScript into assets/*.js.
- Added GLightbox 3.3.1 (external third-party lightbox plugin) to Illustrations and Photographs.
  When online, clicking an image opens GLightbox. If the CDN is blocked, the existing native dialog works as a fallback.
- Changed root-absolute favicon and manifest URLs to relative URLs for GitHub Pages project hosting.
- Kept the existing artwork paths, navigation, colors, layout and content.

VERIFICATION COMPLETED
- 7 HTML pages present.
- All HTML inline <style> and inline <script> blocks removed.
- All local HTML href/src/data-full references checked against ZIP contents.
- All extracted JS files passed node --check.

STILL TO TEST IN YOUR BROWSER
1. Open index.html via VS Code Live Server.
2. Click each navigation link and every artwork thumbnail; confirm lightbox works.
3. In Chrome F12 > Console, confirm no red errors.
4. In Chrome F12 > device toolbar, test 375px and 768px widths.
5. Once published, check that the GLightbox CDN loads (requires internet).

DEPLOYMENT: GITHUB PAGES
1. Upload the CONTENTS of portfolio-restored/ (index.html, assets/, images/, etc.) to a new public GitHub repository.
2. Repository > Settings > Pages > Deploy from a branch > main / (root) > Save.
3. Wait for deployment and test https://USERNAME.github.io/REPOSITORY/
4. Submit the working public URL to your instructor.

NOTE: GLightbox is loaded from jsDelivr; it is a third-party JavaScript plug-in. If your instructor requires all dependencies to be locally hosted, download and vendor the official GLightbox distribution before submitting.
