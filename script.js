const gallery = document.getElementById('gallery');
const fileInput = document.getElementById('file-input');
const uploadForm = document.getElementById('upload-form');

  /* JavaScript interactivity */
  const photoAlbums = document.querySelectorAll('.photo-album');
    
  photoAlbums.forEach(photoAlbum => {
    photoAlbum.addEventListener('click', () => {
      // Open the full-size photo in a new tab
      window.open(photoAlbum.dataset.src, '_blank');
    });
  });

// Load the images from the "images.json" file and add them to the gallery
fetch('images.json')
  .then(response => response.json())
  .then(images => {
    for (const image of images) {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      const img = document.createElement('img');
      img.src = image;
      thumbnail.appendChild(img);
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      const h3 = document.createElement('h3');
      h3.textContent = 'Date Photo';
      overlay.appendChild(h3);
      thumbnail.appendChild(overlay);
      gallery.appendChild(thumbnail);
    }
  });

// Handle form submission to upload new images
uploadForm.addEventListener('submit', e => {
  e.preventDefault();
  const files = fileInput.files;
  const formData = new FormData();
  for (const file of files) {
    formData.append('images', file);
  }
  fetch('upload.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(images => {
    for (const image of images) {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      const img = document.createElement('img');
      img.src = image;
      thumbnail.appendChild(img);
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      const h3 = document.createElement('h3');
      h3.textContent = 'Date Photo';
      overlay.appendChild(h3);
      thumbnail.appendChild(overlay);
      gallery.appendChild(thumbnail);
    }
  });
});

// Add animations to the thumbnails when they are hovered over
const thumbnails = document.getElementsByClassName('thumbnail');
for (const thumbnail of thumbnails) {
  thumbnail.addEventListener('mouseover', e => {
    e.currentTarget.children[1].style.opacity = '1';
  });
  thumbnail.addEventListener('mouseout', e => {
    e.currentTarget.children[1].style.opacity = '0';
  });
}
