// // import mongoose from 'mongoose';

// // const orderItemSchema = new mongoose.Schema(
// //   {
// //     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
// //     title: String,
// //     sku: String,
// //     size: String,
// //     color: String,
// //     image: String,
// //     qty: { type: Number, min: 1, required: true },
// //     price: { type: Number, min: 0, required: true }
// //   },
// //   { _id: false }
// // );

// // const orderSchema = new mongoose.Schema(
// //   {
// //     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //     items: { type: [orderItemSchema], required: true },
// //     address: { type: String, default: '' },
// //     total: { type: Number, required: true },
// //     cod: { type: Boolean, default: true },
// //     status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
// //   },
// //   { timestamps: true }
// // );

// // const Order = mongoose.model('Order', orderSchema);
// // export default Order;


// import mongoose from 'mongoose';

// const orderItemSchema = new mongoose.Schema(
//   {
//     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     title: String,
//     sku: String,
//     size: String,
//     color: String,
//     image: String,
//     qty: { type: Number, min: 1, required: true },
//     price: { type: Number, min: 0, required: true }
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: { type: [orderItemSchema], required: true },
//     address: { type: String, default: '' },
//     total: { type: Number, required: true },
//     cod: { type: Boolean, default: true }, // prepaid hone par false
//     status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
//     payment: {
//       method: { type: String, default: 'cod' },       // 'cod' | 'prepaid'
//       provider: { type: String },                      // 'razorpay'
//       rzpOrderId: { type: String },
//       rzpPaymentId: { type: String },
//       rzpSignature: { type: String },
//       status: { type: String }                         // 'paid' | 'failed'
//     }
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model('Order', orderSchema);
// export default Order;


// backend/models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: { type: String, required: true },
  sku: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, default: 'default' },
  image: { type: String },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [orderItemSchema],
  total: { 
    type: Number, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    enum: ['COD', 'razorpay'], 
    default: 'COD' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  address: { type: String, required: true },
  razorpayOrderId: { type: String },     // for prepaid
  fraudRiskScore: { type: Number, default: 0 }, // 0-100
  discountApplied: { type: Number, default: 0 },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;