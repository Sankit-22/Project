const intervalTime = 5000; // Time in milliseconds for automatic sliding

// Function to initialize a carousel
function initializeCarousel(carouselContainer) {
  const carousel = carouselContainer.querySelector('.carousel');
  const images = carousel.querySelectorAll('img');
  const prevBtn = carouselContainer.querySelector('.prev-btn');
  const nextBtn = carouselContainer.querySelector('.next-btn');
  let currentIndex = 0;

  // Function to update the carousel position
  function updateCarousel() {
    const containerWidth = carouselContainer.clientWidth; // Get container width
    const imageWidth = (containerWidth - 40) / 3; // Calculate image width
    const slideWidth = imageWidth + 20; // Account for image width and gap
    const offset = -(currentIndex * slideWidth); // Calculate the offset
    carousel.style.transform = `translateX(${offset}px)`;
  }

  // Adjust image dimensions dynamically
  function adjustImageSizes() {
    const containerWidth = carouselContainer.clientWidth;
    const imageWidth = (containerWidth - 40) / 3;
    images.forEach((img) => {
      img.style.width = `${imageWidth}px`;
    });
  }

  // Show the next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  // Show the previous image
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }

  // Auto slide
  let autoSlide = setInterval(nextImage, intervalTime);

  // Event listeners for buttons
  nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    nextImage();
    autoSlide = setInterval(nextImage, intervalTime);
  });

  prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    prevImage();
    autoSlide = setInterval(nextImage, intervalTime);
  });

  // Recalculate sizes on window resize
  window.addEventListener('resize', () => {
    adjustImageSizes();
    updateCarousel();
  });

  // Initialize carousel
  adjustImageSizes();
  updateCarousel();
}

// Initialize all carousels on the page
document.querySelectorAll('.carousel-container').forEach(initializeCarousel);
