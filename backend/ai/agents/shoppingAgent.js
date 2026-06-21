// // // backend/ai/agents/shoppingAgent.js
// // import Product from '../../models/Product.js';

// // export const shoppingAgent = async (query) => {
// //   try {
// //     const searchTerm = query.toLowerCase().trim();

// //     // Stronger multi-field search
// //     const products = await Product.find({
// //       $or: [
// //         { title: { $regex: searchTerm, $options: 'i' } },
// //         { brand: { $regex: searchTerm, $options: 'i' } },
// //         { category: { $regex: searchTerm, $options: 'i' } },
// //         { description: { $regex: searchTerm, $options: 'i' } }
// //       ],
// //       isActive: true
// //     })
// //     .limit(10)
// //     .sort({ ratingAvg: -1, price: 1 }); // Best rated first

// //     if (products.length === 0) {
// //       // Fallback: partial word search
// //       const words = searchTerm.split(' ').filter(w => w.length > 2);
// //       const fallback = await Product.find({
// //         $or: words.map(word => ({
// //           title: { $regex: word, $options: 'i' }
// //         }))
// //       }).limit(5);

// //       return fallback[0] || null;
// //     }

// //     return products[0]; // Return best match
// //   } catch (err) {
// //     console.error("Shopping Agent Error:", err);
// //     return null;
// //   }
// // };

// // backend/ai/agents/shoppingAgent.js
// import Product from '../../models/Product.js';

// export const shoppingAgent = async (query) => {
//   try {
//     const searchTerm = query.toLowerCase().trim();

//     // Strong search
//     const products = await Product.find({
//       $or: [
//         { title: { $regex: searchTerm, $options: 'i' } },
//         { brand: { $regex: searchTerm, $options: 'i' } },
//         { category: { $regex: searchTerm, $options: 'i' } }
//       ],
//       isActive: true
//     })
//     .limit(10)
//     .sort({ ratingAvg: -1 });

//     if (products.length > 0) return products[0];

//     // Fallback search
//     const words = searchTerm.split(' ').filter(w => w.length > 2);
//     if (words.length > 0) {
//       const fallback = await Product.find({
//         $or: words.map(word => ({ title: { $regex: word, $options: 'i' } }))
//       }).limit(5);
//       return fallback[0] || null;
//     }

//     return null;
//   } catch (err) {
//     console.error("Shopping Agent Error:", err);
//     return null;
//   }
// };




// backend/ai/agents/shoppingAgent.js
import Product from '../../models/Product.js';

export const shoppingAgent = async (query) => {
  try {
    const searchTerm = query.toLowerCase().trim();

    // Strict database search
    const products = await Product.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ],
      isActive: true
    })
    .limit(5)
    .sort({ ratingAvg: -1 });

    if (products.length === 0) return null;

    return products[0]; // Best match from database only
  } catch (err) {
    console.error("Shopping Agent Error:", err);
    return null;
  }
};