import React from 'react'
import Header from '../components/header';


function UserSettings() {
  const userSettingsDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    teamName: "Team Alpha",
    roleName: "Project Manager",
  }  

  const labelStyles = "block dark:text-white text-sm font-medium mb-2";
  const textStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className='p-8'>
        <Header name='User Settings' />
        <div className='space-y-4'>
            <div>
                <label htmlFor="" className={labelStyles}>Username: </label>
                <div className={textStyles}>
                    {userSettingsDetails.name}
                </div>
                <label htmlFor="" className={labelStyles}>Username: </label>
                <div className={textStyles}>
                    {userSettingsDetails.email}
                </div>
                <label htmlFor="" className={labelStyles}>Username: </label>
                <div className={textStyles}>
                    {userSettingsDetails.teamName}
                </div>
                <label htmlFor="" className={labelStyles}>Username: </label>
                <div className={textStyles}>
                    {userSettingsDetails.roleName}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserSettings