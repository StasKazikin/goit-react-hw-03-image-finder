import axios from 'axios';

const apiKey = '19904270-bfb8182e3389ed52e8bacab6a';

export const fetchImages = ({
  searchQuery = '',
  currentPage = 1,
  per_page = 12,
}) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&key=${apiKey}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${per_page}`,
    )
    .then(response => response.data.hits);
};
