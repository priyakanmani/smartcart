import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  Users, 
  Gift, 
  DollarSign,
  ChevronDown,
  ChevronRight,
  Store,
  LogOut
} from 'lucide-react';

const ManagerSidebar = ({ onLogout }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();

  const menuItems = [
    { icon: TrendingUp, label: "Store Overview", path: "/manager/overview" },
    { 
      icon: Package, label: "Product Management", path: "/manager/products",
      subItems: [
        { label: "Inventory", path: "/manager/products/inventory" },
        { label: "Categories", path: "/manager/products/categories" },
        { label: "Suppliers", path: "/manager/products/suppliers" }
      ]
    },
    { 
      icon: TrendingUp, label: "Sales Analytics", path: "/manager/sales",
      subItems: [
        { label: "Daily Reports", path: "/manager/sales/daily" },
        { label: "Weekly Trends", path: "/manager/sales/weekly" },
        { label: "Product Performance", path: "/manager/sales/products" }
      ]
    },
    { 
      icon: Users, label: "Customer Insights", path: "/manager/customers",
      subItems: [
        { label: "Customer List", path: "/manager/customers/list" },
        { label: "Loyalty Program", path: "/manager/customers/loyalty" },
        { label: "Feedback", path: "/manager/customers/feedback" }
      ]
    },
    { 
      icon: Gift, label: "Promotions", path: "/manager/promotions",
      subItems: [
        { label: "Current Offers", path: "/manager/promotions/current" },
        { label: "Create New", path: "/manager/promotions/new" },
        { label: "Performance", path: "/manager/promotions/performance" }
      ]
    },
    { 
      icon: DollarSign, label: "Financial Reports", path: "/manager/reports",
      subItems: [
        { label: "Daily Sales", path: "/manager/reports/daily" },
        { label: "Monthly Summary", path: "/manager/reports/monthly" },
        { label: "Expenses", path: "/manager/reports/expenses" }
      ]
    },
  ];

  const toggleExpand = (label) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white shadow-sm h-screen flex flex-col border-r border-gray-100"
    >
      {/* Branding */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl shadow-md">
            <Store className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Store Manager</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index} className="space-y-1">
              <NavLink
                to={item.path}
                onClick={() => item.subItems && toggleExpand(item.label)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.subItems && (
                  <motion.div
                    animate={{ 
                      rotate: expandedItems[item.label] ? 0 : -90,
                      opacity: 1
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                )}
              </NavLink>

              {/* Sub-items */}
              <AnimatePresence>
                {item.subItems && expandedItems[item.label] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-12 space-y-1"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActive
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-500 hover:bg-gray-50"
                          }`
                        }
                      >
                        <ChevronRight className="w-3 h-3" />
                        {subItem.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-gray-100">
        <motion.button
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ManagerSidebar;
