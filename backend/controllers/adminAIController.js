// // // backend/controllers/adminAIController.js
// // import inventoryManager from '../ai/agents/admin/inventoryManager.js';
// // import salesAnalyst from '../ai/agents/admin/salesAnalyst.js';
// // import productOptimizer from '../ai/agents/admin/productOptimizer.js';

// // // Main Admin AI Chat Assistant
// // export const adminAssistant = async (req, res) => {
// //   try {
// //     const { message } = req.body;
// //     const lowerMsg = message.toLowerCase().trim();

// //     if (lowerMsg.includes("inventory") || lowerMsg.includes("stock") || lowerMsg.includes("restock")) {
// //       const result = await inventoryManager();
// //       return res.json({ reply: result.reply });
// //     }

// //     if (lowerMsg.includes("sales") || lowerMsg.includes("revenue") || lowerMsg.includes("report")) {
// //       const result = await salesAnalyst();
// //       return res.json({ reply: result.reply });
// //     }

// //     if (lowerMsg.includes("optimize") || lowerMsg.includes("seo") || lowerMsg.includes("description")) {
// //       const result = await productOptimizer(req);
// //       return res.json({ reply: result.reply });
// //     }

// //     return res.json({
// //       reply: "Welcome Admin! You can ask:\n• Show low stock products\n• Last 30 days sales report\n• Optimize product description"
// //     });

// //   } catch (err) {
// //     console.error("Admin AI Error:", err);
// //     res.json({ reply: "AI Agent is busy. Please try again." });
// //   }
// // };

// // // Direct endpoints (optional)
// // export const getInventoryReport = async (req, res) => {
// //   const result = await inventoryManager();
// //   res.json(result);
// // };

// // export const getSalesReport = async (req, res) => {
// //   const result = await salesAnalyst();
// //   res.json(result);
// // };

// // export const optimizeProduct = async (req, res) => {
// //   const result = await productOptimizer(req);
// //   res.json(result);
// // };

// // export const getAIHistory = async (req, res) => {
// //   try {
// //     const userId = req.user?._id;
// //     const history = getMemory(userId);
// //     res.json({ history });
// //   } catch (err) {
// //     res.status(500).json({ error: "Failed to fetch history" });
// //   }
// // };




// // backend/controllers/adminAIController.js
// import { addToMemory, getMemory } from '../ai/memory.js';
// import inventoryManager from '../ai/agents/admin/inventoryManager.js';
// import salesAnalyst from '../ai/agents/admin/salesAnalyst.js';
// import productOptimizer from '../ai/agents/admin/productOptimizer.js';

// export const adminAssistant = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const userId = req.user?._id;

//     if (!userId) return res.status(401).json({ reply: "Please login" });

//     addToMemory(userId, message, "user");

//     const lowerMsg = message.toLowerCase().trim();

//     let result;

//     if (lowerMsg.includes("inventory") || lowerMsg.includes("stock")) {
//       result = await inventoryManager();
//     } else if (lowerMsg.includes("sales") || lowerMsg.includes("revenue")) {
//       result = await salesAnalyst();
//     } else if (lowerMsg.includes("optimize") || lowerMsg.includes("seo")) {
//       result = await productOptimizer(req);
//     } else {
//       result = { reply: "Please select an agent from the list." };
//     }
//     // Inside adminAssistant function:
// if (lowerMsg.includes("campaign") || lowerMsg.includes("offer") || lowerMsg.includes("festival")) {
//   const result = await marketingCampaignAgent();
//   return res.json({ reply: result.reply });
// }

// if (lowerMsg.includes("customer") || lowerMsg.includes("insight") || lowerMsg.includes("user behavior")) {
//   const result = await customerInsightsAgent();
//   return res.json({ reply: result.reply });
// }

//     addToMemory(userId, result.reply, "assistant");

//     return res.json({ reply: result.reply });

//   } catch (err) {
//     console.error(err);
//     res.json({ reply: "AI is busy. Please try again." });
//   }
// };

// // Get Conversation History
// export const getAIHistory = async (req, res) => {
//   try {
//     const userId = req.user?._id;
//     const history = getMemory(userId);
//     res.json({ history });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch history" });
//   }
// };



// export const getInventoryReport = async (req, res) => {
//   const result = await inventoryManager();
//   res.json(result);
// };



// export const getSalesReport = async (req, res) => {
//   const result = await salesAnalyst();
//   res.json(result);
// };



// export const optimizeProduct = async (req, res) => {
//   const result = await productOptimizer(req);
//   res.json(result);
// };





// backend/controllers/adminAIController.js
import { addToMemory, getMemory } from '../ai/memory.js';

// Import All Agents
import inventoryManager from '../ai/agents/admin/inventoryManager.js';
import salesAnalyst from '../ai/agents/admin/salesAnalyst.js';
import productOptimizer from '../ai/agents/admin/productOptimizer.js';
import marketingCampaignAgent from '../ai/agents/admin/marketingCampaignAgent.js';
import customerInsightsAgent from '../ai/agents/admin/customerInsightsAgent.js';

export const adminAssistant = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ reply: "Please login first" });

    addToMemory(userId, message, "user");

    const lowerMsg = message.toLowerCase().trim();
    let result;

    // ==================== AGENT ROUTING ====================
    if (lowerMsg.includes("inventory") || lowerMsg.includes("stock") || lowerMsg.includes("restock")) {
      result = await inventoryManager();
    } 
    else if (lowerMsg.includes("sales") || lowerMsg.includes("revenue") || lowerMsg.includes("report")) {
      result = await salesAnalyst();
    } 
    else if (lowerMsg.includes("optimize") || lowerMsg.includes("seo") || lowerMsg.includes("description")) {
      result = await productOptimizer(req);
    } 
    else if (lowerMsg.includes("campaign") || lowerMsg.includes("offer") || lowerMsg.includes("festival")) {
      result = await marketingCampaignAgent();
    } 
    else if (lowerMsg.includes("customer") || lowerMsg.includes("insight") || lowerMsg.includes("user behavior") || lowerMsg.includes("repeat")) {
      result = await customerInsightsAgent();
    } 
    else {
      result = { reply: "Please select an agent from the list or ask something specific." };
    }

    addToMemory(userId, result.reply, "assistant");

    return res.json({ reply: result.reply });

  } catch (err) {
    console.error("Admin AI Error:", err);
    res.json({ reply: "AI Agent is busy right now. Please try again." });
  }
};

// Direct Endpoints
export const getInventoryReport = async (req, res) => {
  const result = await inventoryManager();
  res.json(result);
};

export const getSalesReport = async (req, res) => {
  const result = await salesAnalyst();
  res.json(result);
};

export const optimizeProduct = async (req, res) => {
  const result = await productOptimizer(req);
  res.json(result);
};

// Get Conversation History
export const getAIHistory = async (req, res) => {
  try {
    const userId = req.user?._id;
    const history = getMemory(userId);
    res.json({ history });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};