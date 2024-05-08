import React from 'react'
import { UserInfo } from '../UserInfo'
import { UserButton } from '../UserButton'
import { useState } from 'react'

const UserInfoWrapper = () => {
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
    const [isFlowerGardenOpen, setIsFlowerGardenOpen] = useState(false);

    const handleFlowerGardenInfo = () => {
        setIsFlowerGardenOpen(!isFlowerGardenOpen);
    };
    
    const handleToggleUserInfo = () => {
        setIsUserInfoOpen(!isUserInfoOpen);
    };

    const handleCloseUserInfo = () => {
        setIsUserInfoOpen(false);
    };
    return (
        <div>
            <UserInfo
                isOpen={isUserInfoOpen}
                onClose={handleCloseUserInfo}
                onToggleFlowerGarden={handleFlowerGardenInfo}
            />
            <UserButton onToggleUserInfo={handleToggleUserInfo} />
        </div>
  )
}

export default UserInfoWrapper