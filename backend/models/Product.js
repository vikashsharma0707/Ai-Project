import mongoose from 'mongoose';
import slugify from 'slugify';

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, required: true, trim: true },
    color: { type: String, default: 'default', trim: true },
    stock: { type: Number, default: 0, min: 0 },
    price: { type: Number, default: 0, min: 0 },
    sku: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    images: [{ type: String }],
    price: { type: Number, required: true, min: 0.01 },
    oldPrice: { type: Number, min: 0 },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    variants: { type: [variantSchema], default: [] },
    isActive: { type: Boolean, default: true },
    slug: { type: String, unique: true, sparse: true }
  },
  { timestamps: true }
);

productSchema.pre('validate', function (next) {
  // Duplicate SKU check
  const skus = new Set(this.variants.map(v => v.sku));
  if (skus.size !== this.variants.length) return next(new Error('Duplicate SKUs are not allowed'));
  if (!this.slug) {
    const tail = (this._id || '').toString().slice(-5);
    this.slug = slugify(`${this.title}-${this.brand}-${tail}`, { lower: true, strict: true });
  }
  next();
});

productSchema.index({ title: 'text', brand: 'text', category: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
