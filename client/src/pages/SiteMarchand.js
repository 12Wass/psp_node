import React, { useState } from 'react'
import NavBar from '../components/Navigation/NabBar';
import MainPage from '../components/SiteMarchand/MainPage';

// /site-marchand/basket --> formulaire de passage order

// /site-marchand/settings  --> set credentials
// /site-marchand/orders    --> liste des orders
// /site-marchand/orders/:id --> details de l'order, possibilité de faire un refund

// [{ name, desc, price, quantity }] --> format à renvoyer

const SiteMarchand = () => {

    const [role, setRole] = useState("")

    return (
        <div>
            <NavBar role={role}/>
            <MainPage setRole={setRole}/>
        </div>
    )
}

export default SiteMarchand;
