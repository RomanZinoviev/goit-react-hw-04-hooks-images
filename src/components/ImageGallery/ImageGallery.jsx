import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import s from "../ImageGallery/ImageGallery.module.css";
import PropTypes from 'prop-types';
export const ImageGallery = ({ array, onClick }) => {
    return (
        <ul className={s.gallery} onClick={onClick}>
            {array.map(({ id, webformatURL, largeImageURL }) => {
                return <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} />
            })}
        </ul>
    )
};
ImageGallery.propTypes = {
    array: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL:PropTypes.string.isRequired
    })),
    onClick:PropTypes.func.isRequired
};