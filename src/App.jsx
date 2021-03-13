import { Component } from 'react';
import Searchbar from './components/Searchbar';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { fetchImages } from './services/pixabay-api';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    largeImageURL: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (prevState.images.length !== this.state.images.length) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = (largeImageURL, alt) => {
    const { showModal } = this.state;

    !showModal && this.setState({ largeImageURL: largeImageURL, alt: alt });

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      images,
      isLoading,
      error,
      showModal,
      largeImageURL,
      alt,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <p>Ой ошибка, всё пропало!!!</p>}
        <ImageGallery images={images} onClick={this.toggleModal} />
        {isLoading && (
          <Loader
            className="Loader"
            type="Audio"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
        <Button
          images={images}
          isLoading={isLoading}
          onClick={this.fetchImages}
        />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
