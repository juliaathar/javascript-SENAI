import React, { useState } from 'react';
import Button from '../../componentes/Button/Button';
import Input from '../../componentes/Input/Input';

const TestePage = () => {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    return (
        <div>
            <h1>Página de Poc's</h1>
            <h2>Calculadora</h2>

            <form action="">
                <Input type="number" placeholder="Primeiro número" name="n1" id="n1" value={n1} onChange= {(e) => {setN1(e.target.value)}}/>
                <br />
                <Input type="number" placeholder="Segundo número" name="n2" id="n2" value={n2} onChange= {(e) => {setN2(e.target.value)}}/>
                <br />
                <Button textButton= "Calcular" type="submit"/>
            </form>
        </div>
    );
};

export default TestePage;