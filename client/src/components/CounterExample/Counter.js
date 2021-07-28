import React from 'react'
import { useCounter } from './useCounter'

function Counter() {

    const [{ counter }, { increment, decrement }] = useCounter();
    
    return (
        <div>
            <button onClick={decrement}>
                decrement
            </button>
                {counter}
            <button onClick={increment}>
                increment
            </button>
        </div>
    )
}

export default Counter
