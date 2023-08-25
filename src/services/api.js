const API_KEY = '37777153-247ca5bc8290e5f945f6d08af';

function fetchImage(nextName, page) {
  return fetch(
    `https://pixabay.com/api/?q=${nextName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}

const api = {
  fetchImage,
};
export default api;
