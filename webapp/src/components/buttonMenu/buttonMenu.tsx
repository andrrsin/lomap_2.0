import React from 'react';
import Tooltip from "@mui/material/Tooltip"

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';


interface ButtonMenuProps {
    handleProfileToggle: () => void;
    profileOpen: boolean;
    logout: () => void;
}

const ButtonMenu: React.FC<ButtonMenuProps> = ({handleProfileToggle,profileOpen,logout}) => {
    
    return (
        <div>
            


            <button
                className='button'
                style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
                onClick={handleProfileToggle}
            >
                {profileOpen ? 'Close Profile' : 'Open Profile'}
            </button>
            <button data-testid="logout-button"
                className='button'
                style={{ position: 'absolute', top: 10, left: 105, zIndex: 1 }}
                onClick={logout}
            >
                Logout
            </button>
            <Tooltip leaveDelay={200} enterDelay={200}
                title="1. Click on the map to create a marker
                    2. Click on a marker to read info and make reviews
                    3. You can add friends and filter with the right bar
                    4. You can see your current level on the profile"

            >
                <button
                    className='button'
                    style={{ position: 'absolute', top: 10, left: 170, zIndex: 1, height: 31 }}

                >

                    <HelpOutlineOutlinedIcon /> {/* Use the FaQuestion icon from react-icons */}

                </button>
            </Tooltip>
        </div>
    );
};

export default ButtonMenu;