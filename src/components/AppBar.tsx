import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/appSlice'
import { useNavigate } from 'react-router-dom'

function AppBar({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const user ={
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      }

    const handleLogout = () => {
        console.log("Logout");
        dispatch(logout());
        navigate("/");
    }

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