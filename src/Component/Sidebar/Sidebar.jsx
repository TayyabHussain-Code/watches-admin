import React, { useState } from "react";
import { 
  HiMenu, 
  HiX, 
  HiHome, 
  HiCollection, 
  HiCube, 
  HiLogout,
  HiUserCircle,
  HiChartBar,
  HiShoppingBag
} from "react-icons/hi";
import { TbBrandDaysCounter } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { IoIosCheckmark } from "react-icons/io";


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      path: "/dashboard", 
      name: "Dashboard", 
      icon: HiChartBar
    },
    { 
    path: "/orders", 
    name: "Orders", 
    icon: PiShoppingCartSimpleFill  
  },
    { 
     path: "/brand", 
     name: "Brands", 
     icon: TbBrandDaysCounter 
   },
    { 
      path: "/categories", 
      name: "Categories", 
      icon: HiCollection
    },
    { 
      path: "/products", 
      name: "Products", 
      icon: HiShoppingBag
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };
   const handleLogOut = () => {
    const log = localStorage.removeItem("token");
     window.location.reload();
  };

  return (
    <>
      
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-3 text-gray-700 bg-white border border-gray-200 fixed top-4 left-4 z-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
      >
        {open ? <HiX size={20} /> : <HiMenu size={20} />}
      </button>

     
      {open && (
        <div 
          className="fixed inset-0  z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between
          transform transition-transform duration-300 z-50 shadow-sm
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:fixed`}
      >
        
       
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
              <HiCube className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
              <p className="text-gray-500 text-sm">E-Commerce Manager</p>
            </div>
          </div>
        </div>

        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${active 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }
                  `}
                >
                  <Icon 
                    size={20} 
                    className={`shrink-0 ${
                      active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  <span className={`font-medium ${active ? 'text-blue-800' : 'text-gray-700'}`}>
                    {item.name}
                  </span>
                  
                  {active && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

       
        <div className="p-4 border-t border-gray-200 bg-gray-50">
    
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
            <HiUserCircle size={32} className="text-gray-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-medium text-sm truncate">Admin User</p>
              <p className="text-gray-500 text-xs truncate">Administrator</p>
            </div>
          </div>

         
          <button
            onClick={()=> handleLogOut()}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg border border-transparent hover:border-red-200 transition-all duration-200 group"
          >
            <HiLogout size={20} className="text-gray-400 group-hover:text-red-500 shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

       
      </div>
    </>
  );
};

export default Sidebar;