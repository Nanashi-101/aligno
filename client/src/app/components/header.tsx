/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'


type IAppProps = {
    name: string;
    buttonComponent?: any; 
    isSmallText?: boolean;
}
function Header({
    name,
    buttonComponent,
    isSmallText = false
 }: IAppProps
) {
  return (
    <div className='flex justify-between items-center px-2 mb-5 w-full'>
      <h1 className={`${isSmallText ? "text-lg": "text-2xl"} font-semibold dark:text-white`}>
        {name}
      </h1>
      {buttonComponent}
    </div>
  )
}

export default Header
