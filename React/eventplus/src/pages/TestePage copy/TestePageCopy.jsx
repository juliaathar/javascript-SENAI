import React, { useEffect, useState } from 'react';
import Button from '../../componentes/Button/Button';
import Input from '../../componentes/Input/Input';

const TestePageCopy = () => {
    const [count, setCount] = useState(10);
    const [calculation, setCalculation] = useState(0);

    useEffect(() => {
        setCalculation(count * 1);
    }, [count])

    return (
        <>
        <p>Count: {count}</p>
        <button onClick={() => {setCalculation((c) => c + 1)}}>+</button>
        <p>Calculation: {calculation}</p>
        </>
    );
};

export default TestePageCopy;