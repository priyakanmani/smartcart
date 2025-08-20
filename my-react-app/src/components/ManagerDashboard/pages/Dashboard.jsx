// src/components/ManagerDashboard/Overview.jsx
import { ShoppingCart, DollarSign, Package, Users, Gift, Leaf } from "lucide-react";

const Overview = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Store Overview</h2>
        <p className="text-gray-600">Monitor shopping activity and store performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Carts</p>
              <p className="text-3xl font-bold text-gray-800">47</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Sales</p>
              <p className="text-3xl font-bold text-green-600">₹2,847</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Products Sold</p>
              <p className="text-3xl font-bold text-blue-600">156</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Customers</p>
              <p className="text-3xl font-bold text-purple-600">89</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling & Promotions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Top Selling Products</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">🍎</div>
                <span className="font-medium">Fresh Apples</span>
              </div>
              <span className="text-green-600 font-medium">156 sold</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">🥛</div>
                <span className="font-medium">Organic Milk</span>
              </div>
              <span className="text-blue-600 font-medium">142 sold</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">🍌</div>
                <span className="font-medium">Bananas</span>
              </div>
              <span className="text-yellow-600 font-medium">128 sold</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Active Promotions</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-orange-600" />
                <span className="font-medium">BOGO Noodles</span>
              </div>
              <span className="text-orange-600 font-medium">50% Off</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="font-medium">Fresh Produce</span>
              </div>
              <span className="text-green-600 font-medium">10% Off</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Recent Shopping Activity</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-gray-800">Customer #1234 completed checkout - ₹45.67</p>
              <p className="text-sm text-gray-500">2 min ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-gray-800">New customer started shopping</p>
              <p className="text-sm text-gray-500">5 min ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-gray-800">Cart #5678 abandoned - ₹23.45</p>
              <p className="text-sm text-gray-500">8 min ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
