import React from 'react';
import './ImageIllustrator.css'

const ImageIllustrator = ({alteText, imageName, additionalClass}) => {
    return (

        <figure className='illustrator-box'>
            <img src={imageResource} alt={alteText} className={`illustrator-box__image ${additionalClass}`} />
        </figure>
    );
};

export default ImageIllustrator;{alteText, imageName, additionalClass}