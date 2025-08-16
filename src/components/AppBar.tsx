import React from 'react'

function AppBar({ children }: { children?: React.ReactNode }) {
    return (
      <div className="w-full h-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-between px-4">
        <div className="flex items-center">
        {children}
        <div className="text-lg font-semibold pl-2 whitespace-nowrap">Denali Weekend Support</div>
        </div>
      <div className="flex items-center space-x-2">
  </div>

</div>
    )
  }

export default AppBar