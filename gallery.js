(() => {
  const grid = document.getElementById("galleryGrid");
  const filter = document.getElementById("galleryFilters");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("galleryLightboxImg");
  const closeBtn = document.getElementById("galleryClose");

  if (!grid || !filter || !lightbox || !lightboxImg) return;

  // Ищем карточки .gallery-card (ранее было .gallery-item)
  const items = [...grid.querySelectorAll(".gallery-card")];

  // Логика работы фильтра (Все / Kiiisk Fall Cup 2026)
  filter.addEventListener("click", e => {
    const btn = e.target.closest(".gallery-filter");
    if (!btn) return;

    filter.querySelectorAll(".gallery-filter").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");

    const value = btn.dataset.filter;
    
    // Сравниваем data-filter кнопки с data-category карточки (ранее было .series)
    items.forEach(item => {
      item.style.display = (value === "all" || item.dataset.category === value) ? "" : "none";
    });
  });

  // Логика открытия фото в полноэкранный режим
  grid.addEventListener("click", e => {
    const item = e.target.closest(".gallery-card");
    if (!item) return;

    const img = item.querySelector("img");
    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open"); // Открывает полноэкранный режим
    }
  });

  // Логика закрытия
  const close = () => lightbox.classList.remove("open");

  lightbox.addEventListener("click", e => { 
    if (e.target === lightbox) close(); 
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }

  document.addEventListener("keydown", e => { 
    if (e.key === "Escape") close(); 
  });
})();
