document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // ハンバーガーメニュー
  // =========================
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // =========================
  // 複数スライダー対応
  // =========================
  const sliders = document.querySelectorAll(".slider-outer");

  sliders.forEach((slider) => {
    const sliderInner = slider.querySelector(".slider-inner");
    const slides = slider.querySelectorAll(".slide-img");
    const prevBtn = slider.querySelector(".slider-btn.prev");
    const nextBtn = slider.querySelector(".slider-btn.next");
    const indicators = slider.querySelectorAll(".indicator");

    if (!sliderInner || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
      sliderInner.style.transform = `translateX(-${currentIndex * 100}%)`;

      indicators.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
      });
    }

    indicators.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
    });

    let autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }, 5000);

    slider.addEventListener("mouseover", () => {
      clearInterval(autoSlide);
    });

    slider.addEventListener("mouseout", () => {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
      }, 5000);
    });

    updateSlider();
  });
});
