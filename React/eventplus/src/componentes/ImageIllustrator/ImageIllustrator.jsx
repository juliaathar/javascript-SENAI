import React from 'react';
import './ImageIllustrator.css'

const ImageIllustrator = ({alteText, additionalClass, imageRender}) => {

    return(
        <figure className="illustrator-box">
            <img 
                src={imageRender} 
                alt={alteText}
                className={`illustrator-box__image ${additionalClass}`} 
            />
        </figure>
    );
};

export default ImageIllustrator