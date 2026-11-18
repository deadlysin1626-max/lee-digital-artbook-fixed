

    /* =====================================
       THE SHAPE OF LIGHT · TEN ARTWORKS
       ===================================== */

    const tourArtworks = [
      {
        "title": "HELD CLOSE",
        "image": "images/tour-01-main.webp",
        "preview": "images/tour-01-preview.webp",
        "description": "Two figures fold into one another, where tenderness becomes a refuge from the surrounding dark.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "THE WEIGHT OF QUIET",
        "image": "images/tour-02-main.webp",
        "preview": "images/tour-02-preview.webp",
        "description": "A body curls inward, its luminous edges tracing the boundary between protection and retreat.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "FRACTURE",
        "image": "images/tour-03-main.webp",
        "preview": "images/tour-03-preview.webp",
        "description": "Restless marks and red interruptions break through a figure suspended between resistance and release.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "INSIDE OUT AND IN AGAIN",
        "image": "images/tour-04-main.webp",
        "preview": "images/tour-04-preview.webp",
        "description": "The figure twists through a field of red, turning private unrest into visible motion.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "RUNNY EYES",
        "image": "images/tour-05-main.webp",
        "preview": "images/tour-05-preview.webp",
        "description": "A reclining form meets a burst of white, as emotion overwhelms the boundaries of the body.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "BETWEEN THE SHEETS",
        "image": "images/tour-06-main.webp",
        "preview": "images/tour-06-preview.webp",
        "description": "In the half-light, a solitary figure seems to disappear into the folds of its surroundings.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "REACHING INWARD",
        "image": "images/tour-07-main.webp",
        "preview": "images/tour-07-preview.webp",
        "description": "An outstretched silhouette holds still between exposure and concealment.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "THE DISTANCE BETWEEN",
        "image": "images/tour-08-main.webp",
        "preview": "images/tour-08-preview.webp",
        "description": "Bodies reach across a dark expanse, making closeness and separation part of the same gesture.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "A PLACE TO FOLD",
        "image": "images/tour-09-main.webp",
        "preview": "images/tour-09-preview.webp",
        "description": "A bowed figure gathers itself into shadow, held together by a narrow line of light.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      },
      {
        "title": "UNSPOKEN",
        "image": "images/tour-10-main.webp",
        "preview": "images/tour-10-preview.webp",
        "description": "A seated figure rests at the edge of the frame, leaving silence room to speak.",
        "medium": "DIGITAL ART · EXPRESSIONIST FIGURE STUDY"
      }
    ];


    /* =====================================
       SLIDESHOW SETTINGS
       ===================================== */

    const SLIDE_DURATION = 6000;
    const FADE_DURATION = 1800;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let currentTourIndex = 0;
    let isTransitioning = false;
    let autoplayTimer = null;


    /* =====================================
       ELEMENT REFERENCES
       ===================================== */

    const mainImage =
      document.getElementById("tour-image");

    const nextImage =
      document.getElementById("tour-image-next");

    const previewImage =
      document.getElementById("tour-preview-image");

    const description =
      document.getElementById("tour-description");

    const artworkTitle = document.getElementById("tour-artwork-title");

    const medium =
      document.getElementById("tour-medium");

    const counter =
      document.getElementById("tour-counter");

    const lightbox =
      document.getElementById("tour-lightbox");

    const lightboxImage =
      document.getElementById("tour-lightbox-image");

    const enlargeButton =
      document.getElementById("tour-enlarge");

    const closeButton =
      document.getElementById("tour-close");


    /* =====================================
       UPDATE DESCRIPTION AND PREVIEW
       ===================================== */

    function renderTourDetails() {

      const artwork = tourArtworks[currentTourIndex];

      const nextIndex =
        (currentTourIndex + 1) % tourArtworks.length;

      const nextArtwork = tourArtworks[nextIndex];

      previewImage.src = nextArtwork.preview;
      previewImage.alt =
        "Next artwork: " + nextArtwork.title;

      artworkTitle.textContent = artwork.title;
      description.textContent = artwork.description;
      medium.textContent = artwork.medium;

      const currentNumber =
        String(currentTourIndex + 1).padStart(2, "0");

      const totalNumber =
        String(tourArtworks.length).padStart(2, "0");

      counter.textContent =
        currentNumber + " / " + totalNumber;

    }


    /* =====================================
       PRELOAD IMAGE
       ===================================== */

    function loadArtwork(src) {

      return new Promise((resolve, reject) => {

        const image = new Image();

        image.onload = () => resolve();
        image.onerror = () => reject(
          new Error("Unable to load: " + src)
        );

        image.src = src;

        if (image.complete && image.naturalWidth > 0) {
          resolve();
        }

      });

    }


    /* =====================================
       SMOOTH IMAGE CROSSFADE
       ===================================== */

    async function changeArtwork(direction) {

      if (isTransitioning) return;

      isTransitioning = true;

      const nextIndex =
        (
          currentTourIndex +
          direction +
          tourArtworks.length
        ) % tourArtworks.length;

      const artwork = tourArtworks[nextIndex];

      try {

        // Load image before transition
        await loadArtwork(artwork.image);

        nextImage.src = artwork.image;
        nextImage.alt = artwork.title + " digital artwork";

        // Place incoming image above current image
        nextImage.style.zIndex = "2";
        mainImage.style.zIndex = "1";

        nextImage.classList.remove("tour-slide-active");

        // Allow browser to paint starting opacity
        await new Promise(resolve => {
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
          });
        });

        // Fade incoming image over outgoing image
        nextImage.classList.add("tour-slide-active");

        // Update text during the transition
        currentTourIndex = nextIndex;
        renderTourDetails();

        // Wait for the dissolve to finish
        await new Promise(resolve => {
          setTimeout(
            resolve,
            reducedMotion.matches ? 0 : FADE_DURATION
          );
        });

        // Swap image behind the scenes
        mainImage.src = artwork.image;
        mainImage.alt = nextImage.alt;

        mainImage.classList.add("tour-slide-active");

        // Reset incoming layer instantly
        nextImage.style.transition = "none";
        nextImage.classList.remove("tour-slide-active");

        // Force browser to apply reset
        void nextImage.offsetWidth;

        nextImage.style.transition = "";
        nextImage.style.zIndex = "";
        mainImage.style.zIndex = "";

        // Preload following artwork
        const followingIndex =
          (currentTourIndex + 1) % tourArtworks.length;

        loadArtwork(
          tourArtworks[followingIndex].image
        ).catch(() => {});

      } catch (error) {

        console.error(error);

      } finally {

        isTransitioning = false;

      }

    }


    /* =====================================
       AUTOPLAY
       ===================================== */

    function stopAutoplay() {

      if (autoplayTimer !== null) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }

    }

    function startAutoplay() {

      stopAutoplay();

      autoplayTimer = setInterval(() => {

        if (
          lightbox.hidden &&
          !document.hidden &&
          !isTransitioning &&
          !reducedMotion.matches
        ) {
          changeArtwork(1);
        }

      }, SLIDE_DURATION);

    }

    function resetAutoplay() {
      startAutoplay();
    }


    /* =====================================
       MANUAL ARROW NAVIGATION
       ===================================== */

    document
      .getElementById("tour-previous")
      .addEventListener("click", () => {

        changeArtwork(-1);
        resetAutoplay();

      });

    document
      .getElementById("tour-next")
      .addEventListener("click", () => {

        changeArtwork(1);
        resetAutoplay();

      });


    /* =====================================
       NEXT ARTWORK PREVIEW
       ===================================== */

    document
      .getElementById("tour-next-preview")
      .addEventListener("click", () => {

        changeArtwork(1);
        resetAutoplay();

      });


    /* =====================================
       FULLSCREEN VIEWER
       ===================================== */

    function openArtwork() {

      lightboxImage.src =
        tourArtworks[currentTourIndex].image;

      lightboxImage.alt =
        tourArtworks[currentTourIndex].title;

      lightbox.hidden = false;
      document.body.style.overflow = "hidden";

      stopAutoplay();
      closeButton.focus();

    }

    function closeArtwork() {

      lightbox.hidden = true;
      document.body.style.overflow = "";

      enlargeButton.focus();
      startAutoplay();

    }

    enlargeButton.addEventListener(
      "click",
      openArtwork
    );

    closeButton.addEventListener(
      "click",
      closeArtwork
    );

    lightbox.addEventListener("click", event => {

      if (event.target === lightbox) {
        closeArtwork();
      }

    });


    /* =====================================
       KEYBOARD CONTROLS
       ===================================== */

    document.addEventListener("keydown", event => {

      if (event.key === "Escape" && !lightbox.hidden) {
        closeArtwork();
        return;
      }

      if (!lightbox.hidden) return;

      if (event.key === "ArrowRight") {

        event.preventDefault();
        changeArtwork(1);
        resetAutoplay();

      }

      if (event.key === "ArrowLeft") {

        event.preventDefault();
        changeArtwork(-1);
        resetAutoplay();

      }

    });


    /* =====================================
       PAGE VISIBILITY
       ===================================== */

    document.addEventListener("visibilitychange", () => {

      if (document.hidden) {
        stopAutoplay();
      } else if (lightbox.hidden) {
        startAutoplay();
      }

    });


    /* =====================================
       INITIALIZE TOUR
       ===================================== */

    renderTourDetails();

    // Preload second artwork for smooth first transition
    loadArtwork(tourArtworks[1].image).catch(() => {});

    // Begin automatic slideshow
    startAutoplay();

  
