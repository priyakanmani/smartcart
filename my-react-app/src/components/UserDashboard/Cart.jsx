// // src/components/UserDashboard/Cart.jsx
// import { Minus, Plus, Trash2 } from 'lucide-react';

// const Cart = ({ cartItems, updateQuantity, removeItem }) => {
//   return (
//     <div className="flex-1 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Your Smart Cart</h2>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//           <span className="text-green-600 font-medium">Connected</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {cartItems.map(item => (
//           <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
//                 {item.image}
//               </div>
              
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                 <p className="text-sm text-gray-600">{item.unit}</p>
//                 {item.savings > 0 && (
//                   <p className="text-sm text-green-600 font-medium">
//                     Save ₹{item.savings.toFixed(2)}
//                   </p>
//                 )}
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <div className="text-right">
//                   <p className="font-bold text-lg">₹{item.price.toFixed(2)}</p>
//                   {item.originalPrice > item.price && (
//                     <p className="text-sm text-gray-500 line-through">
//                       ₹{item.originalPrice.toFixed(2)}
//                     </p>
//                   )}
//                 </div>
                
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="text-red-500 hover:text-red-700 p-2"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
                
//                 <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => updateQuantity(item.id, -1)}
//                     className="p-1 hover:bg-gray-200 rounded"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="w-8 text-center font-medium">{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item.id, 1)}
//                     className="p-1 hover:bg-gray-200 rounded"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cart;















// src/components/UserDashboard/Cart.jsx
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = ({ cartItems = [], updateQuantity, removeItem }) => {
  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Smart Cart</h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-green-600 font-medium">Connected</span>
        </div>
      </div>

      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cartItems.map(item => {
            const {
              id,
              name = 'Unnamed Item',
              unit = '',
              price = 0,
              originalPrice = 0,
              savings = 0,
              quantity = 0,
              image = ''
            } = item;

            return (
              <div key={id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    {image || '📦'}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-600">{unit}</p>
                    {savings > 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        Save ₹{savings.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{price.toFixed(2)}</p>
                      {originalPrice > price && (
                        <p className="text-sm text-gray-500 line-through">
                          ₹{originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(id, -1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(id, 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Cart;
