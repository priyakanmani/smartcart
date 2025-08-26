// // src/components/ManagerDashboard/ManagerDashboardPage.jsx
// import React, { useState, useEffect } from "react";
// import { 
//   ShoppingCart, 
//   LogOut, 
//   Bell,
//   Search,
//   Menu
// } from "lucide-react";
// import { Outlet, useNavigate } from "react-router-dom";
// import ManagerSidebar from "./ManagerSidebar";

// const ManagerDashboardPage = () => {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("Manager");
//   const [userEmail, setUserEmail] = useState("");
//   const [userShop, setUserShop] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [notifications, setNotifications] = useState(3);

//   // Get user data from localStorage and fetch manager name from API
//   useEffect(() => {
//     const fetchManagerName = async () => {
//       try {
//         console.log('🔄 Fetching manager name...');
        
//         // Get data from localStorage
//         const managerToken = localStorage.getItem('managerToken');
//         const managerUser = localStorage.getItem('managerUser');
//         let managerEmail = localStorage.getItem('managerEmail');
        
//         console.log('📋 LocalStorage data:', {
//           managerEmail,
//           managerToken: managerToken ? 'Yes' : 'No',
//           managerUser
//         });
        
//         // If no email in localStorage, try to get it from managerUser
//         if (!managerEmail && managerUser && managerUser !== '{}') {
//           try {
//             const userData = JSON.parse(managerUser);
//             if (userData.email) {
//               managerEmail = userData.email;
//               localStorage.setItem('managerEmail', managerEmail);
//               console.log('📧 Retrieved email from managerUser:', managerEmail);
//             }
//           } catch (error) {
//             console.error("❌ Error parsing user data:", error);
//           }
//         }
        
//         if (managerEmail) {
//           setUserEmail(managerEmail);
          
//           // Try to get name from localStorage first
//           if (managerUser && managerUser !== '{}') {
//             try {
//               const userData = JSON.parse(managerUser);
//               console.log('📦 Parsed user data from localStorage:', userData);
              
//               if (userData.name) {
//                 setUserName(userData.name);
//                 setUserShop(userData.shop || "");
//                 setIsLoading(false);
//                 console.log('✅ Using name from localStorage:', userData.name);
//                 return;
//               }
//             } catch (error) {
//               console.error("❌ Error parsing user data:", error);
//             }
//           }
          
//           // If not in localStorage, fetch from API
//           if (managerToken && managerEmail) {
//             const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/manager/profile?email=${encodeURIComponent(managerEmail)}`;
//             console.log('🌐 Fetching profile from API:', apiUrl);
            
//             try {
//               const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${managerToken}`
//                 }
//               });
              
//               console.log('📥 Profile API response:', { status: response.status });
              
//               if (response.ok) {
//                 const data = await response.json();
//                 console.log('✅ Profile data received:', data);
                
//                 setUserName(data.name || "Manager");
//                 setUserShop(data.shop || "");
                
//                 // Update localStorage with the retrieved user data
//                 localStorage.setItem('managerUser', JSON.stringify({
//                   email: managerEmail,
//                   name: data.name,
//                   shop: data.shop
//                 }));
                
//                 console.log('💾 Updated localStorage with profile data');
//               } else {
//                 console.error("❌ Failed to fetch manager profile");
//                 setUserName("Manager");
//               }
//             } catch (error) {
//               console.error("❌ Network error fetching profile:", error);
//               setUserName("Manager");
//             }
//           }
//         } else {
//           console.log('❌ No manager email found anywhere');
//           // If we have a token but no email, redirect to login
//           if (managerToken) {
//             console.log('⚠️ Token exists but no email, redirecting to login');
//             localStorage.removeItem('managerToken');
//             navigate('/manager/login');
//           }
//         }
//       } catch (error) {
//         console.error("❌ Error fetching manager name:", error);
//         setUserName("Manager");
//       } finally {
//         setIsLoading(false);
//         console.log('🏁 Finished loading manager data');
//       }
//     };

//     fetchManagerName();
//   }, [navigate]);

//   const handleLogout = () => {
//     console.log('🚪 Logging out...');
//     localStorage.removeItem('managerToken');
//     localStorage.removeItem('managerEmail');
//     localStorage.removeItem('managerUser');
//     console.log('🧹 Cleared localStorage');
//     navigate('/manager/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="flex items-center justify-between px-4 lg:px-6 py-4">
//           <div className="flex items-center gap-3">
//             <button 
//               className="lg:hidden p-2 rounded-md text-gray-600"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//             <div className="bg-blue-500 rounded-lg w-10 h-10 flex items-center justify-center">
//               <ShoppingCart className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800">
//                 Smart Shopping System
//               </h1>
//               <p className="text-sm text-gray-600">Store Manager</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Search bar */}
//             <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
//               <Search className="w-4 h-4 text-gray-500 mr-2" />
//               <input 
//                 type="text" 
//                 placeholder="Search..." 
//                 className="bg-transparent outline-none text-sm w-40 lg:w-56"
//               />
//             </div>
            
//             {/* Notifications */}
//             <button className="relative p-2 text-gray-600 hover:text-gray-800">
//               <Bell className="w-5 h-5" />
//               {notifications > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {notifications}
//                 </span>
//               )}
//             </button>

//             {/* User profile */}
//             <div className="flex items-center gap-4">
//               <div className="text-right hidden md:block">
//                 <p className="text-sm font-medium text-gray-800">
//                   {isLoading ? "Loading..." : `Welcome, ${userName}!`}
//                 </p>
//                 <p className="text-xs text-gray-600">{userEmail}</p>
//                 {userShop && userShop.name && <p className="text-xs text-gray-500">{userShop.name}</p>}
//               </div>
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                 <span className="text-blue-800 font-medium">
//                   {userName ? userName.charAt(0).toUpperCase() : 'M'}
//                 </span>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span className="hidden lg:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-1">
//         {/* Sidebar - pass handleLogout, isOpen, and onToggle */}
//         <ManagerSidebar 
//           onLogout={handleLogout} 
//           isOpen={sidebarOpen} 
//           onToggle={setSidebarOpen}
//           userName={userName}
//           userShop={userShop}
//         />

//         {/* Dynamic Content */}
//         <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-gray-100">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboardPage;




// src/components/ManagerDashboard/ManagerDashboardPage.jsx
import React, { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  LogOut, 
  Bell,
  Search,
  Menu
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";

const ManagerDashboardPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Manager");
  const [userEmail, setUserEmail] = useState("");
  const [userShop, setUserShop] = useState("");
  const [userId, setUserId] = useState(""); // New state for manager ID
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Get user data from localStorage and fetch manager name from API
  useEffect(() => {
    const fetchManagerName = async () => {
      try {
        console.log('🔄 Fetching manager name...');
        
        // Get data from localStorage
        const managerToken = localStorage.getItem('managerToken');
        const managerUser = localStorage.getItem('managerUser');
        let managerEmail = localStorage.getItem('managerEmail');
        const managerId = localStorage.getItem('managerId'); // Get manager ID
        
        console.log('📋 LocalStorage data:', {
          managerEmail,
          managerId,
          managerToken: managerToken ? 'Yes' : 'No',
          managerUser
        });
        
        // If no email in localStorage, try to get it from managerUser
        if (!managerEmail && managerUser && managerUser !== '{}') {
          try {
            const userData = JSON.parse(managerUser);
            if (userData.email) {
              managerEmail = userData.email;
              localStorage.setItem('managerEmail', managerEmail);
              console.log('📧 Retrieved email from managerUser:', managerEmail);
            }
            // Check for both 'id' and '_id' fields
            const managerIdFromUser = userData._id || userData.id;
            if (managerIdFromUser && !managerId) {
              localStorage.setItem('managerId', managerIdFromUser);
              setUserId(managerIdFromUser);
              console.log('🆔 Retrieved ID from managerUser:', managerIdFromUser);
            }
          } catch (error) {
            console.error("❌ Error parsing user data:", error);
          }
        }
        
        // Set manager ID if available
        if (managerId) {
          setUserId(managerId);
        }
        
        if (managerEmail) {
          setUserEmail(managerEmail);
          
          // Try to get name from localStorage first
          if (managerUser && managerUser !== '{}') {
            try {
              const userData = JSON.parse(managerUser);
              console.log('📦 Parsed user data from localStorage:', userData);
              
              if (userData.name) {
                setUserName(userData.name);
                setUserShop(userData.shop || "");
                // Set manager ID if available in userData (check both 'id' and '_id')
                const managerIdFromUser = userData._id || userData.id;
                if (managerIdFromUser && !managerId) {
                  localStorage.setItem('managerId', managerIdFromUser);
                  setUserId(managerIdFromUser);
                }
                setIsLoading(false);
                console.log('✅ Using name from localStorage:', userData.name);
                return;
              }
            } catch (error) {
              console.error("❌ Error parsing user data:", error);
            }
          }
          
          // If not in localStorage, fetch from API
          if (managerToken && managerEmail) {
            const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/manager/profile?email=${encodeURIComponent(managerEmail)}`;
            console.log('🌐 Fetching profile from API:', apiUrl);
            
            try {
              const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${managerToken}`
                }
              });
              
              console.log('📥 Profile API response:', { status: response.status });
              
              if (response.ok) {
                const data = await response.json();
                console.log('✅ Profile data received:', data);
                
                setUserName(data.name || "Manager");
                setUserShop(data.shop || "");
                
                // Store manager ID if available (check both 'id' and '_id')
                const managerIdFromApi = data._id || data.id;
                if (managerIdFromApi) {
                  localStorage.setItem('managerId', managerIdFromApi);
                  setUserId(managerIdFromApi);
                  console.log('💾 Stored manager ID:', managerIdFromApi);
                }
                
                // Update localStorage with the retrieved user data
                localStorage.setItem('managerUser', JSON.stringify({
                  email: managerEmail,
                  name: data.name,
                  shop: data.shop,
                  id: managerIdFromApi // Use consistent field name
                }));
                
                console.log('💾 Updated localStorage with profile data');
              } else {
                console.error("❌ Failed to fetch manager profile");
                setUserName("Manager");
              }
            } catch (error) {
              console.error("❌ Network error fetching profile:", error);
              setUserName("Manager");
            }
          }
        } else {
          console.log('❌ No manager email found anywhere');
          // If we have a token but no email, redirect to login
          if (managerToken) {
            console.log('⚠️ Token exists but no email, redirecting to login');
            localStorage.removeItem('managerToken');
            localStorage.removeItem('managerId'); // Also remove ID
            navigate('/manager/login');
          }
        }
      } catch (error) {
        console.error("❌ Error fetching manager name:", error);
        setUserName("Manager");
      } finally {
        setIsLoading(false);
        console.log('🏁 Finished loading manager data');
        console.log('👤 Manager ID:', userId);
        
        // Also log the shop information for debugging
        if (userShop) {
          console.log('🏪 Shop Information:');
          console.log('Shop ID:', userId || 'Not available');
          console.log('Shop Name:', userShop.name || 'Not available');
        }
      }
    };

    fetchManagerName();
  }, [navigate, userId]); // Added userId to dependencies

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('managerToken');
    localStorage.removeItem('managerEmail');
    localStorage.removeItem('managerUser');
    localStorage.removeItem('managerId'); // Also remove ID on logout
    console.log('🧹 Cleared localStorage');
    navigate('/manager/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 rounded-md text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="bg-blue-500 rounded-lg w-10 h-10 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Smart Shopping System
              </h1>
              <p className="text-sm text-gray-600">Store Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none text-sm w-40 lg:w-56"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-800">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* User profile */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-800">
                  {isLoading ? "Loading..." : `Welcome, ${userName}!`}
                </p>
                <p className="text-xs text-gray-600">{userEmail}</p>
                {userId && <p className="text-xs text-gray-500">ID: {userId.substring(0, 8)}...</p>}
                {userShop && userShop.name && <p className="text-xs text-gray-500">{userShop.name}</p>}
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-800 font-medium">
                  {userName ? userName.charAt(0).toUpperCase() : 'M'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - pass handleLogout, isOpen, and onToggle */}
        <ManagerSidebar 
          onLogout={handleLogout} 
          isOpen={sidebarOpen} 
          onToggle={setSidebarOpen}
          userName={userName}
          userShop={userShop}
          userId={userId} // Pass userId to sidebar if needed
        />

        {/* Dynamic Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;