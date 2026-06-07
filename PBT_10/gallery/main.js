const CONFIG = {
    apiUrl: 'https://picsum.photos/v2/list',
    photosPerPage: 20,
    startPage: 1
};

let currentPage = CONFIG.startPage;
let isLoading = false;
let hasMore = true;

const gallery = document.getElementById('gallery');
const loadingMore = document.getElementById('loadingMore');
const loadTrigger = document.getElementById('loadTrigger');
const endMessage = document.getElementById('endMessage');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');

async function fetchPhotos(page, limit) {
    const url = `${CONFIG.apiUrl}?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Không thể tải ảnh');
    }
    return await response.json();
}

function getImageUrl(id, width = 400, height = 400) {
    return `https://picsum.photos/id/${id}/${width}/${height}`;
}

function createPhotoElement(photo) {
    const item = document.createElement('div');
    item.className = 'photo-item skeleton';
    
    const img = document.createElement('img');
    img.dataset.src = getImageUrl(photo.id, 400, 400);
    img.alt = `Photo by ${photo.author}`;
    img.className = 'lazy';
    
    const title = document.createElement('div');
    title.className = 'photo-title';
    title.textContent = `📷 ${photo.author}`;
    
    item.addEventListener('click', () => {
        openLightbox(photo);
    });
    
    item.appendChild(img);
    item.appendChild(title);
    
    return item;
}

function addPhotosToGallery(photos) {
    photos.forEach(photo => {
        const element = createPhotoElement(photo);
        gallery.appendChild(element);
        imageObserver.observe(element.querySelector('img'));
    });
}

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.onload = () => {
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    img.parentElement.classList.remove('skeleton');
                };
                img.onerror = () => {
                    img.parentElement.classList.remove('skeleton');
                    img.src = 'https://via.placeholder.com/400?text=Error';
                };
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '100px',
    threshold: 0
});

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading && hasMore) {
            loadMorePhotos();
        }
    });
}, {
    rootMargin: '300px',
    threshold: 0
});

async function loadInitialPhotos() {
    try {
        loadingMore.classList.remove('hidden');
        const photos = await fetchPhotos(currentPage, CONFIG.photosPerPage);
        
        if (photos.length === 0) {
            hasMore = false;
            endMessage.classList.remove('hidden');
        } else {
            addPhotosToGallery(photos);
            currentPage++;
        }
        
        loadingMore.classList.add('hidden');
        scrollObserver.observe(loadTrigger);
    } catch (error) {
        console.error('Lỗi load ảnh:', error);
        loadingMore.innerHTML = '<p style="color: #ff6b6b;">❌ Lỗi tải ảnh. Vui lòng refresh trang.</p>';
    }
}

async function loadMorePhotos() {
    if (isLoading || !hasMore) return;
    
    isLoading = true;
    loadingMore.classList.remove('hidden');
    
    try {
        const photos = await fetchPhotos(currentPage, CONFIG.photosPerPage);
        
        if (photos.length === 0 || photos.length < CONFIG.photosPerPage) {
            hasMore = false;
            endMessage.classList.remove('hidden');
            scrollObserver.unobserve(loadTrigger);
        } else {
            addPhotosToGallery(photos);
            currentPage++;
        }
    } catch (error) {
        console.error('Lỗi load thêm ảnh:', error);
    } finally {
        isLoading = false;
        loadingMore.classList.add('hidden');
    }
}

function openLightbox(photo) {
    const largeImageUrl = getImageUrl(photo.id, 1200, 800);
    lightboxImage.src = largeImageUrl;
    lightboxTitle.textContent = `📷 Photo by ${photo.author}`;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
    document.body.style.overflow = '';
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

function init() {
    loadInitialPhotos();
}

document.addEventListener('DOMContentLoaded', init);