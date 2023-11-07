import React from 'react';
import './Titulo.css'

const Titulo = ({titleText, color="", additionalClass= ""}) => {
    return (
            <h1 className={`title ${additionalClass}`} style={{color: color}}>
                {titleText}
                <hr className='title__underscore' style={color !== "" ? {borderColor: color} : {}} />
            </h1>
    );
};

export default Titulo;