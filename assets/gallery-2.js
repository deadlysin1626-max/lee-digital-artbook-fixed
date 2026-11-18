
  function updateActiveNavigation() {
    const links = document.querySelectorAll(".navbar a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const currentHash = window.location.hash;

    links.forEach(link => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");

      const url = new URL(link.getAttribute("href"), window.location.href);
      const linkPage = url.pathname.split("/").pop() || "index.html";

      if (
        linkPage === currentPage &&
        url.hash === currentHash
      ) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });

    // HOME is active when no section is selected
    if (currentPage === "index.html" && !currentHash) {
      const homeLink = document.querySelector(".navbar .logo");
      homeLink.classList.add("active");
      homeLink.setAttribute("aria-current", "page");
    }
  }

  window.addEventListener("hashchange", updateActiveNavigation);
  updateActiveNavigation();

