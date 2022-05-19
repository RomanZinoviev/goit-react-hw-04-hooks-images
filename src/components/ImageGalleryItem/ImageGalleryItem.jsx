import s from "../ImageGalleryItem/ImageGalleryItem.module.css";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
    return (
        <li className={s.galleryItem} >
            <img src={webformatURL} alt={largeImageURL} className={s.image} />
        </li>
    )
};
ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL:PropTypes.string.isRequired
}