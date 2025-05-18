import React from 'react'

const ConfirmationPage = () => {
  const UserInfo = localStorage.getItem("UserInfo")
     // Navigate("/assessment", { state: { id: data.user._id } });
  return (
    <div>
        Thank You For Registration On Nivash jano
        {UserInfo.registrationId}
        
    </div>
  )
}

export default ConfirmationPage