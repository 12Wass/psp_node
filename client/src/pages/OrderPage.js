import React, { useState } from 'react'
import roles from '../configs/roles';
import NavBar from '../components/Navigation/NabBar';
import Orders from '../components/SiteMarchand/Orders';

function OrderPage() {

    const [selectedItem, setSelectedItem] = useState(0);

    return (
        <div>
            <NavBar 
                role={roles.TRADER}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <Orders />
        </div>
    )
}

export default OrderPage
