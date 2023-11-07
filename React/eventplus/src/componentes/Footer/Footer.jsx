import React from 'react';
import Container from '../Container/Container'
import './Footer.css'

const Footer = ({textRights = "Escola SENAI de Informática"}) => {
    return (

        <footer className='footer-page'>
            <Container>
                <p className='footer-page__rights'>{textRights}</p>
            </Container>
        </footer>
    );
};

export default Footer;