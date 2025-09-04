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
//     cod: { type: Boolean, default: true },
//     status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model('Order', orderSchema);
// export default Order;


import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: String,
    sku: String,
    size: String,
    color: String,
    image: String,
    qty: { type: Number, min: 1, required: true },
    price: { type: Number, min: 0, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], required: true },
    address: { type: String, default: '' },
    total: { type: Number, required: true },
    cod: { type: Boolean, default: true }, // prepaid hone par false
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    payment: {
      method: { type: String, default: 'cod' },       // 'cod' | 'prepaid'
      provider: { type: String },                      // 'razorpay'
      rzpOrderId: { type: String },
      rzpPaymentId: { type: String },
      rzpSignature: { type: String },
      status: { type: String }                         // 'paid' | 'failed'
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
