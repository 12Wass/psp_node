import React, {useState} from 'react'
import Settings from '../components/SiteMarchand/Settings';
import NavBar from '../components/Navigation/NabBar';
import roles from '../configs/roles';

function SettingsPage() {

    const [selectedItem, setSelectedItem] = useState(1);

    return (
        <>
             <NavBar 
                role={roles.TRADER}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <Settings />
            
        </>
    )
}

export default SettingsPage
