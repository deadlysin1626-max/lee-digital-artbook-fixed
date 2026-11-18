

    /* =========================
       ARTWORK COLLECTION
       ========================= */

    const artworks = [
      { file: "myself-in-you", title: "Myself In You", description: "Digital artwork from the portfolio collection." },
      { file: "cowboy-fullbody", title: "Cowboy Fullbody", description: "Digital artwork from the portfolio collection." },
      { file: "demon-headshot", title: "Demon Headshot", description: "Digital artwork from the portfolio collection." },
      { file: "nomad-sketches", title: "Nomad Sketches", description: "Digital artwork from the portfolio collection." },
      { file: "self-portrait", title: "Self Portrait", description: "Digital artwork from the portfolio collection." },
      { file: "character-sheet", title: "Character Sheet", description: "Digital artwork from the portfolio collection." },
      { file: "lions-pattern", title: "Lions Pattern", description: "Digital artwork from the portfolio collection." },
      { file: "jaguar-man", title: "Jaguar Man", description: "Digital artwork from the portfolio collection." },
      { file: "form-study", title: "Form Study", description: "Digital artwork from the portfolio collection." },
      { file: "anime-samurai", title: "Anime Samurai", description: "Digital artwork from the portfolio collection." },
      { file: "stripes", title: "Stripes", description: "Digital artwork from the portfolio collection." },
      { file: "majesty", title: "Majesty", description: "Digital artwork from the portfolio collection." },
      { file: "typography-color", title: "Typography Color", description: "Digital artwork from the portfolio collection." },
      { file: "three-cats", title: "Three Cats", description: "Digital artwork from the portfolio collection." },
      { file: "in-the-grass", title: "In The Grass", description: "Digital artwork from the portfolio collection." },
      { file: "google-doodle", title: "Google Doodle", description: "Digital artwork from the portfolio collection." },
      { file: "violence-typography", title: "Violence Typography", description: "Digital artwork from the portfolio collection." },
      { file: "figure-studies", title: "Figure Studies", description: "Digital artwork from the portfolio collection." },
      { file: "cowboy-closeup", title: "Cowboy Closeup", description: "Digital artwork from the portfolio collection." },
      { file: "warp-art", title: "Warp Art", description: "Digital artwork from the portfolio collection." },
      { file: "black-angel", title: "Black Angel", description: "Digital artwork from the portfolio collection." },
      { file: "demon-headshot-alt", title: "Demon Headshot Alt", description: "Digital artwork from the portfolio collection." },
      { file: "typography-black-white", title: "Typography Black White", description: "Digital artwork from the portfolio collection." },
      { file: "portrait-warp", title: "Portrait Warp", description: "Digital artwork from the portfolio collection." },
      { file: "dragon-anime-girl", title: "Dragon Anime Girl", description: "Digital artwork from the portfolio collection." }
    ];


    /* =========================
       GALLERY ELEMENTS
       ========================= */

    const fullPath = artwork => `images/optimized/full/${artwork.file}.webp`;
    const thumbPath = artwork => `images/optimized/thumbs/${artwork.file}.webp`;
    let currentIndex = 0;

    const featuredImage =
      document.getElementById("featured-image");

    const previousImage =
      document.getElementById("previous-image");

    const nextImage =
      document.getElementById("next-image");

    const artTitle =
      document.getElementById("art-title");

    const artDescription =
      document.getElementById("art-description");

    const artCounter =
      document.getElementById("art-counter");


    /* =========================
       UPDATE GALLERY
       ========================= */

    function updateGallery() {

      const total = artworks.length;

      const previousIndex =
        (currentIndex - 1 + total) % total;

      const nextIndex =
        (currentIndex + 1) % total;


      // UPDATE MAIN IMAGE

      featuredImage.src =
        fullPath(artworks[currentIndex]);

      featuredImage.alt =
        artworks[currentIndex].title;


      // UPDATE SIDE IMAGES

      previousImage.src =
        thumbPath(artworks[previousIndex]);

      previousImage.alt =
        "Previous artwork: " + artworks[previousIndex].title;

      nextImage.src =
        thumbPath(artworks[nextIndex]);

      nextImage.alt =
        "Next artwork: " + artworks[nextIndex].title;


      // Highlight the current image in the browse strip
      document.querySelectorAll('.gallery-thumb').forEach((button, index) => {
        button.classList.toggle('selected', index === currentIndex);
        button.setAttribute('aria-pressed', String(index === currentIndex));
      });

      // UPDATE TEXT

      artTitle.textContent =
        artworks[currentIndex].title;

      artDescription.textContent =
        artworks[currentIndex].description;


      // UPDATE COUNTER

      artCounter.textContent =
        String(currentIndex + 1).padStart(2, "0")
        + " / " +
        String(total).padStart(2, "0");

    }


    /* =========================
       PREVIOUS ARTWORK
       ========================= */

    document.getElementById("previous-art")
      .addEventListener("click", () => {

        currentIndex =
          (currentIndex - 1 + artworks.length)
          % artworks.length;

        updateGallery();

      });


    /* =========================
       NEXT ARTWORK
       ========================= */

    document.getElementById("next-art")
      .addEventListener("click", () => {

        currentIndex =
          (currentIndex + 1) % artworks.length;

        updateGallery();

      });


    /* =========================
       FULLSCREEN VIEWER ELEMENTS
       ========================= */

    const lightbox =
      document.getElementById("art-lightbox");

    const lightboxImage =
      document.getElementById("lightbox-image");

    const closeLightboxButton =
      document.getElementById("lightbox-close");


    /* =========================
       OPEN FULLSCREEN ARTWORK
       ========================= */

    function openArtwork() {

      lightboxImage.src =
        featuredImage.src;

      lightboxImage.alt =
        featuredImage.alt;

      lightbox.hidden = false;

      document.body.style.overflow = "hidden";

      closeLightboxButton.focus();

    }


    /* =========================
       CLOSE FULLSCREEN ARTWORK
       ========================= */

    function closeArtwork() {

      lightbox.hidden = true;

      document.body.style.overflow = "";

      featuredImage.focus();

    }


    /* =========================
       CLICK TO ENLARGE
       ========================= */

    featuredImage.addEventListener(
      "click",
      openArtwork
    );


    /* =========================
       KEYBOARD: ENTER / SPACE
       ========================= */

    featuredImage.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openArtwork();

        }

      }
    );


    /* =========================
       CLOSE WITH X BUTTON
       ========================= */

    closeLightboxButton.addEventListener(
      "click",
      closeArtwork
    );


    /* =========================
       CLOSE BY CLICKING BACKGROUND
       ========================= */

    lightbox.addEventListener(
      "click",
      (event) => {

        if (event.target === lightbox) {

          closeArtwork();

        }

      }
    );


    /* =========================
       CLOSE WITH ESCAPE KEY
       ========================= */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          !lightbox.hidden
        ) {

          closeArtwork();

        }

      }
    );


    /* =========================
       INITIALIZE GALLERY
       ========================= */

    const thumbnailContainer = document.getElementById('gallery-thumbnails');
    artworks.forEach((artwork, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-thumb';
      button.setAttribute('aria-label', `View ${artwork.title}`);
      const img = document.createElement('img');
      img.src = thumbPath(artwork);
      img.alt = artwork.title;
      img.loading = index < 8 ? 'eager' : 'lazy';
      button.append(img);
      button.addEventListener('click', () => {
        currentIndex = index;
        updateGallery();
        document.querySelector('.gallery-viewer').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      thumbnailContainer.append(button);
    });
    document.getElementById('collection-total').textContent = `${artworks.length} WORKS`;
    updateGallery();

  
