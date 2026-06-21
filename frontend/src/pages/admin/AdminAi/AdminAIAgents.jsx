// // // import React, { useState } from "react";
// // // import http from "../../../api/http";
// // // import { toast } from "react-toastify";

// // // const ADMIN_AGENTS = [
// // //   { id: "inventory", icon: "📦", title: "Inventory Manager", desc: "Low Stock & Restock Suggestions" },
// // //   { id: "sales", icon: "📈", title: "Sales Analyst", desc: "Revenue & Performance Report" },
// // //   { id: "product-optimizer", icon: "🏷️", title: "Product Optimizer", desc: "SEO & Description Improvement" },
// // // ];

// // // export default function AdminAIAgents() {
// // //   const [messages, setMessages] = useState([
// // //     { type: "bot", text: "Welcome Admin! Select any AI Agent below." }
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const handleAgentClick = async (agent) => {
// // //     setLoading(true);
// // //     try {
// // //       let message = "";
// // //       if (agent.id === "inventory") message = "Show low stock products and restock suggestions";
// // //       else if (agent.id === "sales") message = "Last 30 days sales report";
// // //       else message = "Optimize a product description and SEO";

// // //       const { data } = await http.post("/api/admin/ai/assistant", { message });
// // //       setMessages(prev => [...prev, { type: "bot", text: data.reply }]);
// // //     } catch (err) {
// // //       toast.error("Agent failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const sendMessage = async () => {
// // //     if (!input.trim() || loading) return;
// // //     // You can extend this for free text too
// // //     setMessages(prev => [...prev, { type: "user", text: input }]);
// // //     // Call /api/admin/ai/assistant
// // //     setInput("");
// // //   };

// // //   return (
// // //     <div className="admin-ai-container">
// // //       <h1>🤖 Admin AI Agents</h1>
      
// // //       <div className="admin-agents-grid">
// // //         {ADMIN_AGENTS.map(agent => (
// // //           <div key={agent.id} className="admin-agent-card" onClick={() => handleAgentClick(agent)}>
// // //             <span className="agent-icon">{agent.icon}</span>
// // //             <h3>{agent.title}</h3>
// // //             <p>{agent.desc}</p>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="admin-chat-box">
// // //         <div className="chat-messages">
// // //           {messages.map((msg, i) => (
// // //             <div key={i} className={`chat-msg ${msg.type}`}>{msg.text}</div>
// // //           ))}
// // //           {loading && <div className="chat-msg bot">Thinking...</div>}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import React, { useState } from "react";
// // import http from "../../../api/http";
// // import { toast } from "react-toastify";
// // import "./AdminAIAgents.css";

// // const ADMIN_AGENTS = [
// //   {
// //     id: "inventory",
// //     icon: "📦",
// //     title: "Inventory Manager",
// //     desc: "Low Stock & Restock Suggestions",
// //   },
// //   {
// //     id: "sales",
// //     icon: "📈",
// //     title: "Sales Analyst",
// //     desc: "Revenue & Performance Report",
// //   },
// //   {
// //     id: "product-optimizer",
// //     icon: "🏷️",
// //     title: "Product Optimizer",
// //     desc: "SEO & Description Improvement",
// //   },
// // ];

// // export default function AdminAIAgents() {
// //   const [messages, setMessages] = useState([
// //     { type: "bot", text: "Welcome Admin! Select any AI Agent below." }
// //   ]);
// //   const [loading, setLoading] = useState(false);

// //   const handleAgentClick = async (agent) => {
// //     setLoading(true);
// //     try {
// //       let prompt = "";
// //       if (agent.id === "inventory") prompt = "Show low stock products and restock suggestions";
// //       else if (agent.id === "sales") prompt = "Last 30 days sales report and trends";
// //       else prompt = "Optimize product description and SEO";

// //       const { data } = await http.post("/api/admin/ai/assistant", { message: prompt });

// //       setMessages(prev => [...prev, { type: "bot", text: data.reply }]);
// //     } catch (err) {
// //       toast.error("Agent failed to respond");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="admin-ai-page">
// //       <div className="admin-ai-header">
// //         <span className="robot-icon">🤖</span>
// //         <h1>Admin AI Agents</h1>
// //       </div>

// //       <div className="agents-container">
// //         {ADMIN_AGENTS.map((agent) => (
// //           <div
// //             key={agent.id}
// //             className="agent-card"
// //             onClick={() => handleAgentClick(agent)}
// //           >
// //             <div className="agent-icon-wrapper">
// //               <span className="agent-icon">{agent.icon}</span>
// //             </div>
// //             <div className="agent-info">
// //               <h3>{agent.title}</h3>
// //               <p>{agent.desc}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Chat Area */}
// //       <div className="ai-chat-box">
// //         <div className="chat-messages">
// //           {messages.map((msg, i) => (
// //             <div key={i} className={`chat-message ${msg.type}`}>
// //               {msg.text}
// //             </div>
// //           ))}
// //           {loading && <div className="chat-message bot">Thinking...</div>}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import http from "../../../api/http.js";
// import { toast } from "react-toastify";
// import "./AdminAIAgents.css";

// const ADMIN_AGENTS = [
//   {
//     id: "inventory",
//     icon: "📦",
//     title: "Inventory Manager",
//     desc: "Low Stock & Restock Suggestions",
//   },
//   {
//     id: "sales",
//     icon: "📈",
//     title: "Sales Analyst",
//     desc: "Revenue & Performance Report",
//   },
//   {
//     id: "product-optimizer",
//     icon: "🏷️",
//     title: "Product Optimizer",
//     desc: "SEO & Description Improvement",
//   },
// ];

// export default function AdminAIAgents() {
//   const [messages, setMessages] = useState([
//     { type: "bot", text: "Welcome Admin! Select any AI Agent below." }
//   ]);
//   const [loading, setLoading] = useState(false);

//   const handleAgentClick = async (agent) => {
//     setLoading(true);
//     try {
//       let prompt = `Run ${agent.title}`;
//       if (agent.id === "inventory") prompt = "Show low stock products and restock suggestions";
//       if (agent.id === "sales") prompt = "Last 30 days sales report and insights";
//       if (agent.id === "product-optimizer") prompt = "Optimize a product description and SEO";

//       const { data } = await http.post("/api/admin/ai/assistant", { message: prompt });

//       setMessages(prev => [...prev, { 
//         type: "bot", 
//         text: data.reply 
//       }]);
//     } catch (err) {
//       toast.error("Failed to get response");
//       setMessages(prev => [...prev, { 
//         type: "bot", 
//         text: "Sorry, AI is taking longer than expected. Please try again." 
//       }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admin-ai-page">
//       <div className="admin-ai-header">
//         <span className="robot-icon">🤖</span>
//         <h1>Admin AI Agents</h1>
//       </div>

//       <div className="agents-container">
//         {ADMIN_AGENTS.map((agent) => (
//           <div
//             key={agent.id}
//             className="agent-card"
//             onClick={() => handleAgentClick(agent)}
//           >
//             <div className="agent-icon-wrapper">
//               <span className="agent-icon">{agent.icon}</span>
//             </div>
//             <div className="agent-info">
//               <h3>{agent.title}</h3>
//               <p>{agent.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="ai-chat-box">
//         <div className="chat-messages">
//           {messages.map((msg, i) => (
//             <div key={i} className={`chat-message ${msg.type}`}>
//               {msg.text}
//             </div>
//           ))}
//           {loading && <div className="chat-message bot">🤖 AI Agent is working...</div>}
//         </div>
//       </div>
//     </div>
//   );
// }





// frontend/src/pages/AdminAi/AdminAIAgents.jsx
import React, { useState } from "react";
import http from "../../../api/http.js";
import { toast } from "react-toastify";
import "./AdminAIAgents.css";

const ADMIN_AGENTS = [
  {
    id: "inventory",
    icon: "📦",
    title: "Inventory Manager",
    desc: "Low Stock & Restock Suggestions",
  },
  {
    id: "sales",
    icon: "📈",
    title: "Sales Analyst",
    desc: "Revenue & Performance Report",
  },
  {
    id: "product-optimizer",
    icon: "🏷️",
    title: "Product Optimizer",
    desc: "SEO & Description Improvement",
  },
  {
    id: "marketing",
    icon: "🎯",
    title: "Marketing Campaign",
    desc: "Discounts & Festival Offers",
  },
  {
    id: "customer-insights",
    icon: "👥",
    title: "Customer Insights",
    desc: "User Behavior & Repeat Customers",
  },
];

export default function AdminAIAgents() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Welcome Admin! Select any AI Agent below." }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAgentClick = async (agent) => {
    setLoading(true);
    try {
      let prompt = "";

      switch (agent.id) {
        case "inventory":
          prompt = "Show low stock products and restock suggestions";
          break;
        case "sales":
          prompt = "Last 30 days sales report and insights";
          break;
        case "product-optimizer":
          prompt = "Optimize a product description and SEO";
          break;
        case "marketing":
          prompt = "Create Raksha Bandhan or upcoming festival campaign with discounts";
          break;
        case "customer-insights":
          prompt = "Analyze customer behavior and repeat purchase insights";
          break;
        default:
          prompt = `Run ${agent.title}`;
      }

      const { data } = await http.post("/api/admin/ai/assistant", { 
        message: prompt 
      });

      setMessages(prev => [...prev, { 
        type: "bot", 
        text: data.reply 
      }]);

    } catch (err) {
      console.error(err);
      toast.error("Failed to get response from AI Agent");
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: "Sorry, AI Agent is taking longer than expected. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-ai-page">
      <div className="admin-ai-header">
        <span className="robot-icon">🤖</span>
        <h1>Admin AI Agents</h1>
      </div>

      <div className="agents-container">
        {ADMIN_AGENTS.map((agent) => (
          <div
            key={agent.id}
            className="agent-card"
            onClick={() => handleAgentClick(agent)}
          >
            <div className="agent-icon-wrapper">
              <span className="agent-icon">{agent.icon}</span>
            </div>
            <div className="agent-info">
              <h3>{agent.title}</h3>
              <p>{agent.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="ai-chat-box">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="chat-message bot">🤖 AI Agent is working...</div>}
        </div>
      </div>
    </div>
  );
}