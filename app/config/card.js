import PropTypes from 'prop-types';

export default PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    order: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    isLocal: PropTypes.bool.isRequired,
    isDownloading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    videoUri: PropTypes.string.isRequired,
    imgUri: PropTypes.string.isRequired,
});
