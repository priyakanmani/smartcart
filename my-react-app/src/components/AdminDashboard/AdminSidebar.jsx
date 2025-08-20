import React from 'react';
import { BarChart3, ShoppingCart, Users, DollarSign, Activity, X, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { 
      name: 'Dashboard', 
      icon: <BarChart3 className="w-5 h-5" />, 
      path: '/admin/dashboard',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Carts', 
      icon: <ShoppingCart className="w-5 h-5" />, 
      path: '/admin/carts',
      color: 'from-purple-500 to-indigo-500'
    },
    { 
      name: 'Customers', 
      icon: <Users className="w-5 h-5" />, 
      path: '/admin/customers',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      name: 'Orders', 
      icon: <DollarSign className="w-5 h-5" />, 
      path: '/admin/orders',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Analytics', 
      icon: <Activity className="w-5 h-5" />, 
      path: '/admin/analytics',
      color: 'from-amber-500 to-orange-500'
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 z-30 transition-transform duration-300 ease-in-out w-64 flex flex-col bg-gradient-to-b from-indigo-50 to-purple-50 border-r border-gray-200`}
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-6 border-b border-gray-200"
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ rotate: -5 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg"
            >
              <Activity className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Admin</h1>
              <p className="text-xs text-gray-500">Control Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              end
              className={({ isActive }) =>
                `block relative overflow-hidden rounded-xl transition-all ${
                  isActive ? 'shadow-md' : 'hover:shadow-md'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    isActive 
                      ? `bg-gradient-to-br ${item.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-white/90'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isActive 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-br ${item.color}`
                    }`}>
                      {React.cloneElement(item.icon, {
                        className: `${item.icon.props.className} ${
                          isActive ? 'text-white' : 'text-white'
                        }`
                      })}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 border-t border-gray-200/50"
        >
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Overlay"
        />
      )}
    </>
  );
};

export default AdminSidebar;