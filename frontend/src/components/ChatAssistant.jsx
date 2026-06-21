// // // // // // // // frontend/src/components/ChatAssistant.jsx
// // // // // // // import React, { useState } from "react";
// // // // // // // import http from "../api/http.js";
// // // // // // // import { toast } from "react-toastify";
// // // // // // // import "./ChatAssistant.css";

// // // // // // // const AGENT_CARDS = [
// // // // // // //   {
// // // // // // //     id: "chat-to-order",
// // // // // // //     icon: "🛍️",
// // // // // // //     title: "Chat to Order",
// // // // // // //     prompt: "Nylon T Shirt for Men order kar do size M",
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: "personal-stylist",
// // // // // // //     icon: "👗",
// // // // // // //     title: "Personal Stylist",
// // // // // // //     prompt: "Wedding ke liye outfit suggest karo",
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: "size-advisor",
// // // // // // //     icon: "📏",
// // // // // // //     title: "Size Advisor",
// // // // // // //     prompt: "Size advisor for height 5'8\" weight 70kg",
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: "visual-search",
// // // // // // //     icon: "🔍",
// // // // // // //     title: "Visual Search",
// // // // // // //     prompt: "Find similar products",
// // // // // // //   },
// // // // // // // ];

// // // // // // // const ChatAssistant = ({ isOpen, onClose }) => {
// // // // // // //   const [messages, setMessages] = useState([
// // // // // // //     { type: "bot", text: "Hi! Click any agent card below or type your request." }
// // // // // // //   ]);
// // // // // // //   const [input, setInput] = useState("");
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   // 🔥 CLICK AGENT CARD → DIRECTLY RUN AGENT
// // // // // // //   const handleAgentClick = async (agent) => {
// // // // // // //     const userMessage = agent.prompt;

// // // // // // //     setMessages(prev => [...prev, { type: "user", text: userMessage }]);
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       const { data } = await http.post("/api/ai/assistant", { 
// // // // // // //         message: userMessage 
// // // // // // //       });

// // // // // // //       setMessages(prev => [...prev, { 
// // // // // // //         type: "bot", 
// // // // // // //         text: data.reply 
// // // // // // //       }]);

// // // // // // //       // Handle Razorpay if returned
// // // // // // //       if (data.action === "open_razorpay" && data.paymentData) {
// // // // // // //         openRazorpay(data.paymentData);
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error(err);
// // // // // // //       toast.error("Agent failed. Please try again.");
// // // // // // //       setMessages(prev => [...prev, { 
// // // // // // //         type: "bot", 
// // // // // // //         text: "Sorry, something went wrong. Try typing manually." 
// // // // // // //       }]);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const sendMessage = async () => {
// // // // // // //     if (!input.trim() || loading) return;
// // // // // // //     const userMessage = input.trim();
// // // // // // //     setMessages(prev => [...prev, { type: "user", text: userMessage }]);
// // // // // // //     setInput("");
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       const { data } = await http.post("/api/ai/assistant", { message: userMessage });
// // // // // // //       setMessages(prev => [...prev, { type: "bot", text: data.reply }]);

// // // // // // //       if (data.action === "open_razorpay" && data.paymentData) {
// // // // // // //         openRazorpay(data.paymentData);
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       toast.error("AI Assistant error");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const openRazorpay = (paymentData) => {
// // // // // // //     const script = document.createElement("script");
// // // // // // //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // // //     script.onload = () => {
// // // // // // //       const options = {
// // // // // // //         key: paymentData.key,
// // // // // // //         amount: paymentData.amount,
// // // // // // //         currency: "INR",
// // // // // // //         order_id: paymentData.order_id,
// // // // // // //         name: "Myntra Clone",
// // // // // // //         description: "AI Order",
// // // // // // //         handler: () => toast.success("Payment Successful! Order Placed."),
// // // // // // //       };
// // // // // // //       new window.Razorpay(options).open();
// // // // // // //     };
// // // // // // //     document.body.appendChild(script);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className={`chat-assistant ${isOpen ? 'open' : ''}`}>
// // // // // // //       <div className="chat-header">
// // // // // // //         <div>
// // // // // // //           <h3>🤖 AI Shopping Assistant</h3>
// // // // // // //           <p>One chat, Multiple Fashion Agents</p>
// // // // // // //         </div>
// // // // // // //         <button className="close-btn" onClick={onClose}>✕</button>
// // // // // // //       </div>

// // // // // // //       {/* Agent Cards - Click to Run */}
// // // // // // //       <div className="agents-grid">
// // // // // // //         {AGENT_CARDS.map((agent) => (
// // // // // // //           <div
// // // // // // //             key={agent.id}
// // // // // // //             className="agent-card"
// // // // // // //             onClick={() => handleAgentClick(agent)}
// // // // // // //           >
// // // // // // //             <div className="agent-icon">{agent.icon}</div>
// // // // // // //             <div className="agent-content">
// // // // // // //               <h4>{agent.title}</h4>
// // // // // // //               <p>{agent.prompt}</p>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* Messages Area */}
// // // // // // //       <div className="chat-messages">
// // // // // // //         {messages.map((msg, i) => (
// // // // // // //           <div key={i} className={`message ${msg.type}`}>
// // // // // // //             {msg.text}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //         {loading && <div className="message bot">AI Agent is working...</div>}
// // // // // // //       </div>

// // // // // // //       {/* Input Area */}
// // // // // // //       <div className="chat-input">
// // // // // // //         <input
// // // // // // //           value={input}
// // // // // // //           onChange={(e) => setInput(e.target.value)}
// // // // // // //           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // // // // // //           placeholder="Type your request... (Hindi / English)"
// // // // // // //         />
// // // // // // //         <button onClick={sendMessage} disabled={loading || !input.trim()}>
// // // // // // //           Send
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default ChatAssistant;






// // // // // // // frontend/src/components/ChatAssistant.jsx
// // // // // // import React, { useState } from "react";
// // // // // // import http from "../api/http.js";
// // // // // // import { toast } from "react-toastify";
// // // // // // import "./ChatAssistant.css";

// // // // // // const AGENT_CARDS = [
// // // // // //   {
// // // // // //     id: "chat-to-order",
// // // // // //     icon: "🛍️",
// // // // // //     title: "Chat to Order",
// // // // // //     desc: "Nylon T Shirt for Men order kar do size M",
// // // // // //   },
// // // // // //   {
// // // // // //     id: "personal-stylist",
// // // // // //     icon: "👗",
// // // // // //     title: "Personal Stylist",
// // // // // //     desc: "Wedding ke liye outfit suggest karo",
// // // // // //   },
// // // // // //   {
// // // // // //     id: "size-advisor",
// // // // // //     icon: "📏",
// // // // // //     title: "Size Advisor",
// // // // // //     desc: "Size advisor for height 5'8\" weight 70kg",
// // // // // //   },
// // // // // //   {
// // // // // //     id: "visual-search",
// // // // // //     icon: "🔍",
// // // // // //     title: "Visual Search",
// // // // // //     desc: "Find similar products",
// // // // // //   },
// // // // // // ];

// // // // // // const ChatAssistant = ({ isOpen, onClose }) => {
// // // // // //   const [messages, setMessages] = useState([
// // // // // //     { type: "bot", text: "Hi! Click any agent card below or type your request." }
// // // // // //   ]);
// // // // // //   const [input, setInput] = useState("");
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // ================== AGENT CARD CLICK → SHOW DRAFT ==================
// // // // // //   const handleAgentClick = async (agent) => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const { data } = await http.post("/api/ai/draft", { 
// // // // // //         agentType: agent.id 
// // // // // //       });

// // // // // //       // Show draft in input box (User can edit)
// // // // // //       setInput(data.message || agent.desc);
      
// // // // // //       setMessages(prev => [...prev, { 
// // // // // //         type: "bot", 
// // // // // //         text: `Draft ready for "${agent.title}". Edit if needed and click Send.` 
// // // // // //       }]);
// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //       setInput(agent.desc);
// // // // // //       toast.info("Draft loaded (fallback)");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ================== SEND MESSAGE → REAL EXECUTION ==================
// // // // // //   const sendMessage = async () => {
// // // // // //     if (!input.trim() || loading) return;

// // // // // //     const userMessage = input.trim();
// // // // // //     setMessages(prev => [...prev, { type: "user", text: userMessage }]);
// // // // // //     setInput("");
// // // // // //     setLoading(true);

// // // // // //     try {
// // // // // //       const { data } = await http.post("/api/ai/assistant", { 
// // // // // //         message: userMessage 
// // // // // //       });

// // // // // //       setMessages(prev => [...prev, { 
// // // // // //         type: "bot", 
// // // // // //         text: data.reply 
// // // // // //       }]);

// // // // // //       if (data.action === "open_razorpay" && data.paymentData) {
// // // // // //         openRazorpay(data.paymentData);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //       toast.error("AI Assistant error");
// // // // // //       setMessages(prev => [...prev, { 
// // // // // //         type: "bot", 
// // // // // //         text: "Something went wrong. Please try again." 
// // // // // //       }]);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const openRazorpay = (paymentData) => {
// // // // // //     const script = document.createElement("script");
// // // // // //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // //     script.onload = () => {
// // // // // //       const options = {
// // // // // //         key: paymentData.key,
// // // // // //         amount: paymentData.amount,
// // // // // //         currency: "INR",
// // // // // //         order_id: paymentData.order_id,
// // // // // //         name: "Myntra Clone",
// // // // // //         description: "AI Order",
// // // // // //         handler: () => toast.success("✅ Payment Successful!"),
// // // // // //       };
// // // // // //       new window.Razorpay(options).open();
// // // // // //     };
// // // // // //     document.body.appendChild(script);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className={`chat-assistant ${isOpen ? 'open' : ''}`}>
// // // // // //       <div className="chat-header">
// // // // // //         <div>
// // // // // //           <h3>🤖 AI Shopping Assistant</h3>
// // // // // //           <p>One chat, Multiple Fashion Agents</p>
// // // // // //         </div>
// // // // // //         <button className="close-btn" onClick={onClose}>✕</button>
// // // // // //       </div>

// // // // // //       {/* Agent Cards */}
// // // // // //       <div className="agents-grid">
// // // // // //         {AGENT_CARDS.map((agent) => (
// // // // // //           <div
// // // // // //             key={agent.id}
// // // // // //             className="agent-card"
// // // // // //             onClick={() => handleAgentClick(agent)}
// // // // // //           >
// // // // // //             <div className="agent-icon">{agent.icon}</div>
// // // // // //             <div className="agent-content">
// // // // // //               <h4>{agent.title}</h4>
// // // // // //               <p>{agent.desc}</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Messages */}
// // // // // //       <div className="chat-messages">
// // // // // //         {messages.map((msg, i) => (
// // // // // //           <div key={i} className={`message ${msg.type}`}>
// // // // // //             {msg.text}
// // // // // //           </div>
// // // // // //         ))}
// // // // // //         {loading && <div className="message bot">Thinking...</div>}
// // // // // //       </div>

// // // // // //       {/* Input */}
// // // // // //       <div className="chat-input">
// // // // // //         <input
// // // // // //           value={input}
// // // // // //           onChange={(e) => setInput(e.target.value)}
// // // // // //           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // // // // //           placeholder="Edit draft and press Send... (Hindi / English)"
// // // // // //         />
// // // // // //         <button 
// // // // // //           onClick={sendMessage} 
// // // // // //           disabled={loading || !input.trim()}
// // // // // //         >
// // // // // //           Send
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ChatAssistant;




// // // // // // frontend/src/components/ChatAssistant.jsx
// // // // // import React, { useState } from "react";
// // // // // import http from "../api/http.js";
// // // // // import { toast } from "react-toastify";
// // // // // import "./ChatAssistant.css";

// // // // // const AGENT_CARDS = [
// // // // //   {
// // // // //     id: "chat-to-order",
// // // // //     icon: "🛍️",
// // // // //     title: "Chat to Order",
// // // // //     desc: "Nylon T Shirt for Men order kar do size M",
// // // // //   },
// // // // //   {
// // // // //     id: "personal-stylist",
// // // // //     icon: "👗",
// // // // //     title: "Personal Stylist",
// // // // //     desc: "Wedding ke liye outfit suggest karo",
// // // // //   },
// // // // //   {
// // // // //     id: "size-advisor",
// // // // //     icon: "📏",
// // // // //     title: "Size Advisor",
// // // // //     desc: "Size advisor for height 5'8\" weight 70kg",
// // // // //   },
// // // // //   {
// // // // //     id: "order-delivery",
// // // // //     icon: "📦",
// // // // //     title: "Order Tracking",
// // // // //     desc: "Mera order kab tak aayega?",
// // // // //   },
// // // // // ];

// // // // // const ChatAssistant = ({ isOpen, onClose }) => {
// // // // //   const [messages, setMessages] = useState([
// // // // //     { type: "bot", text: "Hi! Click any agent card below or type your request." }
// // // // //   ]);
// // // // //   const [input, setInput] = useState("");
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   // Draft for Agent Cards
// // // // //   const handleAgentClick = async (agent) => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       if (agent.id === "order-delivery") {
// // // // //         // Direct tracking
// // // // //         const { data } = await http.post("/api/ai/assistant", { 
// // // // //           message: "Track my order" 
// // // // //         });
// // // // //         setMessages(prev => [...prev, { type: "bot", text: data.reply }]);
// // // // //       } else {
// // // // //         // Draft for other agents
// // // // //         const { data } = await http.post("/api/ai/draft", { agentType: agent.id });
// // // // //         setInput(data.message || agent.desc);
// // // // //         setMessages(prev => [...prev, { 
// // // // //           type: "bot", 
// // // // //           text: `Draft ready for ${agent.title}. Edit & Send.` 
// // // // //         }]);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       setInput(agent.desc);
// // // // //       toast.info("Using default prompt");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const sendMessage = async () => {
// // // // //     if (!input.trim() || loading) return;

// // // // //     const userMessage = input.trim();
// // // // //     setMessages(prev => [...prev, { type: "user", text: userMessage }]);
// // // // //     setInput("");
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       const { data } = await http.post("/api/ai/assistant", { message: userMessage });
// // // // //       setMessages(prev => [...prev, { type: "bot", text: data.reply }]);

// // // // //       if (data.action === "open_razorpay" && data.paymentData) {
// // // // //         openRazorpay(data.paymentData);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       toast.error("AI error");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const openRazorpay = (paymentData) => { /* same as before */ };

// // // // //   return (
// // // // //     <div className={`chat-assistant ${isOpen ? 'open' : ''}`}>
// // // // //       <div className="chat-header">
// // // // //         <div>
// // // // //           <h3>🤖 AI Shopping Assistant</h3>
// // // // //           <p>One chat, Multiple Fashion Agents</p>
// // // // //         </div>
// // // // //         <button className="close-btn" onClick={onClose}>✕</button>
// // // // //       </div>

// // // // //       <div className="agents-grid">
// // // // //         {AGENT_CARDS.map((agent) => (
// // // // //           <div key={agent.id} className="agent-card" onClick={() => handleAgentClick(agent)}>
// // // // //             <div className="agent-icon">{agent.icon}</div>
// // // // //             <div className="agent-content">
// // // // //               <h4>{agent.title}</h4>
// // // // //               <p>{agent.desc}</p>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       <div className="chat-messages">
// // // // //         {messages.map((msg, i) => (
// // // // //           <div key={i} className={`message ${msg.type}`}>{msg.text}</div>
// // // // //         ))}
// // // // //         {loading && <div className="message bot">Processing...</div>}
// // // // //       </div>

// // // // //       <div className="chat-input">
// // // // //         <input
// // // // //           value={input}
// // // // //           onChange={(e) => setInput(e.target.value)}
// // // // //           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // // // //           placeholder="Type or edit message..."
// // // // //         />
// // // // //         <button onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ChatAssistant;








// // // // // frontend/src/components/ChatAssistant.jsx
// // // // import React, { useState } from "react";
// // // // import http from "../api/http.js";
// // // // import { toast } from "react-toastify";
// // // // import "./ChatAssistant.css";

// // // // const AGENT_CARDS = [
// // // //   {
// // // //     id: "chat-to-order",
// // // //     icon: "🛍️",
// // // //     title: "Chat to Order",
// // // //     desc: "Nylon T Shirt for Men order kar do size M",
// // // //   },
// // // //   {
// // // //     id: "personal-stylist",
// // // //     icon: "👗",
// // // //     title: "Personal Stylist",
// // // //     desc: "Wedding ke liye outfit suggest karo",
// // // //   },
// // // //   {
// // // //     id: "size-advisor",
// // // //     icon: "📏",
// // // //     title: "Size Advisor",
// // // //     desc: "Height 5'8\" weight 70kg ke liye size batao",
// // // //   },
// // // //   {
// // // //     id: "budget-shopper",
// // // //     icon: "💰",
// // // //     title: "Budget Shopper",
// // // //     desc: "Under 1500 mein best casual wear",
// // // //   },
// // // //   {
// // // //     id: "occasion-planner",
// // // //     icon: "🎉",
// // // //     title: "Occasion Planner",
// // // //     desc: "Ganesh Chaturthi ke liye traditional outfit",
// // // //   },
// // // //   {
// // // //     id: "wardrobe-assistant",
// // // //     icon: "👕",
// // // //     title: "Wardrobe Assistant",
// // // //     desc: "Mere paas blue jeans hai, uske saath kya pair karu",
// // // //   },
// // // //   {
// // // //     id: "trend-spotter",
// // // //     icon: "🔥",
// // // //     title: "Trend Spotter",
// // // //     desc: "Current summer trends mein kya chal raha hai",
// // // //   },
// // // //   {
// // // //     id: "outfit-completer",
// // // //     icon: "🧥",
// // // //     title: "Outfit Completer",
// // // //     desc: "White shirt ke saath best bottom suggest karo",
// // // //   },
// // // //   {
// // // //     id: "gift-suggester",
// // // //     icon: "🎁",
// // // //     title: "Gift Suggester",
// // // //     desc: "Girlfriend ke liye anniversary gift",
// // // //   },
// // // //   {
// // // //     id: "order-tracking",
// // // //     icon: "📦",
// // // //     title: "Order Tracking",
// // // //     desc: "Mera order kab tak aayega?",
// // // //   },
// // // // ];

// // // // const ChatAssistant = ({ isOpen, onClose }) => {
// // // //   const [messages, setMessages] = useState([
// // // //     { type: "bot", text: "Hi! Click any agent card below or type your request." }
// // // //   ]);
// // // //   const [input, setInput] = useState("");
// // // //   const [loading, setLoading] = useState(false);

// // // //   // Handle Agent Card Click
// // // //   const handleAgentClick = async (agent) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       if (agent.id === "order-tracking") {
// // // //         // Direct tracking for order
// // // //         const { data } = await http.post("/api/ai/assistant", { 
// // // //           message: "Track my order" 
// // // //         });
// // // //         setMessages(prev => [...prev, { type: "bot", text: data.reply }]);
// // // //       } else {
// // // //         // Draft for all other agents
// // // //         const { data } = await http.post("/api/ai/draft", { 
// // // //           agentType: agent.id 
// // // //         });

// // // //         setInput(data.message || agent.desc);
// // // //         setMessages(prev => [...prev, { 
// // // //           type: "bot", 
// // // //           text: `✅ Draft ready for **${agent.title}**. Edit if needed and click Send.` 
// // // //         }]);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setInput(agent.desc);
// // // //       toast.info("Using default prompt");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Send Message to AI
// // // //   const sendMessage = async () => {
// // // //     if (!input.trim() || loading) return;

// // // //     const userMessage = input.trim();
// // // //     setMessages(prev => [...prev, { type: "user", text: userMessage }]);
// // // //     setInput("");
// // // //     setLoading(true);

// // // //     try {
// // // //       const { data } = await http.post("/api/ai/assistant", { 
// // // //         message: userMessage 
// // // //       });

// // // //       setMessages(prev => [...prev, { type: "bot", text: data.reply }]);

// // // //       if (data.action === "open_razorpay" && data.paymentData) {
// // // //         openRazorpay(data.paymentData);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       toast.error("AI Assistant unavailable");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const openRazorpay = (paymentData) => {
// // // //     const script = document.createElement("script");
// // // //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // //     script.onload = () => {
// // // //       const options = {
// // // //         key: paymentData.key,
// // // //         amount: paymentData.amount,
// // // //         currency: "INR",
// // // //         order_id: paymentData.order_id,
// // // //         name: "Myntra Clone",
// // // //         description: "AI Order",
// // // //         handler: () => toast.success("✅ Payment Successful! Order Placed."),
// // // //       };
// // // //       new window.Razorpay(options).open();
// // // //     };
// // // //     document.body.appendChild(script);
// // // //   };

// // // //   return (
// // // //     <div className={`chat-assistant ${isOpen ? 'open' : ''}`}>
// // // //       <div className="chat-header">
// // // //         <div>
// // // //           <h3>🤖 AI Shopping Assistant</h3>
// // // //           <p>One chat, Multiple Fashion Agents</p>
// // // //         </div>
// // // //         <button className="close-btn" onClick={onClose}>✕</button>
// // // //       </div>

// // // //       {/* All Agent Cards */}
// // // //       <div className="agents-grid">
// // // //         {AGENT_CARDS.map((agent) => (
// // // //           <div
// // // //             key={agent.id}
// // // //             className="agent-card"
// // // //             onClick={() => handleAgentClick(agent)}
// // // //           >
// // // //             <div className="agent-icon">{agent.icon}</div>
// // // //             <div className="agent-content">
// // // //               <h4>{agent.title}</h4>
// // // //               <p>{agent.desc}</p>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* Messages Area */}
// // // //       <div className="chat-messages">
// // // //         {messages.map((msg, i) => (
// // // //           <div key={i} className={`message ${msg.type}`}>
// // // //             {msg.text}
// // // //           </div>
// // // //         ))}
// // // //         {loading && <div className="message bot">AI Agent is thinking...</div>}
// // // //       </div>

// // // //       {/* Input Area */}
// // // //       <div className="chat-input">
// // // //         <input
// // // //           value={input}
// // // //           onChange={(e) => setInput(e.target.value)}
// // // //           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // // //           placeholder="Edit draft here and press Send..."
// // // //         />
// // // //         <button 
// // // //           onClick={sendMessage} 
// // // //           disabled={loading || !input.trim()}
// // // //         >
// // // //           Send
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ChatAssistant;








// // // // frontend/src/components/ChatAssistant.jsx
// // // import React, { useState } from "react";
// // // import http from "../api/http.js";
// // // import { toast } from "react-toastify";

// // // const AGENT_CARDS = [
// // //   { id: "chat-to-order", icon: "🛍️", title: "Chat to Order", desc: "Nylon T Shirt order kar do size M" },
// // //   { id: "personal-stylist", icon: "👗", title: "Personal Stylist", desc: "Wedding ke liye outfit suggest karo" },
// // //   { id: "size-advisor", icon: "📏", title: "Size Advisor", desc: "Height 5'8\" weight 70kg ke liye size batao" },
// // //   { id: "budget-shopper", icon: "💰", title: "Budget Shopper", desc: "Under 1500 mein best items" },
// // //   { id: "occasion-planner", icon: "🎉", title: "Occasion Planner", desc: "Ganesh Chaturthi ke liye outfit" },
// // //   { id: "wardrobe-assistant", icon: "👕", title: "Wardrobe Assistant", desc: "Mere paas blue jeans hai..." },
// // //   { id: "trend-spotter", icon: "🔥", title: "Trend Spotter", desc: "Current summer trends" },
// // //   { id: "outfit-completer", icon: "🧥", title: "Outfit Completer", desc: "White shirt ke saath best match" },
// // //   { id: "gift-suggester", icon: "🎁", title: "Gift Suggester", desc: "Anniversary gift suggestions" },
// // //   { id: "order-tracking", icon: "📦", title: "Order Tracking", desc: "Mera order kab tak aayega?" },
// // // ];

// // // const ChatAssistant = ({ isOpen, onClose }) => {
// // //   const [messages, setMessages] = useState([
// // //     { type: "bot", text: "Hi! Click any agent card or type your request below 👇" }
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const handleAgentClick = async (agent) => {
// // //     setLoading(true);
// // //     try {
// // //       if (agent.id === "order-tracking") {
// // //         const { data } = await http.post("/api/ai/assistant", { message: "Track my order" });
// // //         setMessages(prev => [...prev, { type: "bot", text: data.reply }]);
// // //       } else {
// // //         const { data } = await http.post("/api/ai/draft", { agentType: agent.id });
// // //         setInput(data.message || agent.desc);
// // //         setMessages(prev => [...prev, { 
// // //           type: "bot", 
// // //           text: `✅ Draft ready for **${agent.title}**. Edit if needed & click Send.` 
// // //         }]);
// // //       }
// // //     } catch (err) {
// // //       setInput(agent.desc);
// // //       toast.info("Using default prompt");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const sendMessage = async () => {
// // //     if (!input.trim() || loading) return;

// // //     const userMessage = input.trim();
// // //     setMessages(prev => [...prev, { type: "user", text: userMessage }]);
// // //     setInput("");
// // //     setLoading(true);

// // //     try {
// // //       const { data } = await http.post("/api/ai/assistant", { message: userMessage });

// // //       setMessages(prev => [...prev, { type: "bot", text: data.reply }]);

// // //       if (data.action === "open_razorpay" && data.paymentData) {
// // //         // Razorpay logic
// // //         toast.success("Opening Razorpay...");
// // //       }
// // //     } catch (err) {
// // //       toast.error("AI Assistant unavailable");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className={`fixed bottom-24 right-6 w-[420px] h-[620px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>

// // //       {/* Header */}
// // //       <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white px-6 py-5 flex items-center justify-between">
// // //         <div className="flex items-center gap-3">
// // //           <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">🤖</div>
// // //           <div>
// // //             <h3 className="font-semibold text-lg">AI Shopping Assistant</h3>
// // //             <p className="text-xs opacity-75">Multiple Agents • Smart Help</p>
// // //           </div>
// // //         </div>
// // //         <button 
// // //           onClick={onClose}
// // //           className="w-9 h-9 hover:bg-white/20 rounded-xl flex items-center justify-center text-2xl transition"
// // //         >
// // //           ✕
// // //         </button>
// // //       </div>

// // //       {/* Agent Cards */}
// // //       <div className="p-5 grid grid-cols-2 gap-4 overflow-y-auto flex-1 bg-gray-50">
// // //         {AGENT_CARDS.map((agent) => (
// // //           <div
// // //             key={agent.id}
// // //             onClick={() => handleAgentClick(agent)}
// // //             className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-violet-300 hover:shadow-lg cursor-pointer transition-all duration-200 group"
// // //           >
// // //             <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{agent.icon}</div>
// // //             <h4 className="font-semibold text-base mb-1">{agent.title}</h4>
// // //             <p className="text-sm text-gray-500 line-clamp-2">{agent.desc}</p>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Messages Area */}
// // //       <div className="flex-1 p-5 overflow-y-auto bg-gray-50 space-y-4">
// // //         {messages.map((msg, i) => (
// // //           <div
// // //             key={i}
// // //             className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-[15px] leading-relaxed ${
// // //               msg.type === "user" 
// // //                 ? "ml-auto bg-violet-600 text-white rounded-br-none" 
// // //                 : "mr-auto bg-white border border-gray-200 rounded-bl-none"
// // //             }`}
// // //           >
// // //             {msg.text}
// // //           </div>
// // //         ))}
// // //         {loading && (
// // //           <div className="chat-message bot flex items-center gap-2">
// // //             <span className="animate-pulse">🤖</span>
// // //             <span>AI Agent is thinking...</span>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Input Area */}
// // //       <div className="p-4 border-t bg-white">
// // //         <div className="flex gap-3">
// // //           <input
// // //             value={input}
// // //             onChange={(e) => setInput(e.target.value)}
// // //             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // //             placeholder="Type your message or edit draft..."
// // //             className="flex-1 border border-gray-300 rounded-full px-6 py-4 focus:outline-none focus:border-violet-500 text-base"
// // //           />
// // //           <button
// // //             onClick={sendMessage}
// // //             disabled={!input.trim() || loading}
// // //             className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white px-8 rounded-full font-semibold transition"
// // //           >
// // //             Send
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ChatAssistant;




// // // frontend/src/components/ChatAssistant.jsx
// // import React, { useState, useRef, useEffect } from "react";
// // import http from "../api/http.js";
// // import { toast } from "react-toastify";

// // const AGENT_CARDS = [
// //   { id: "chat-to-order", icon: "🛍️", title: "Chat to Order", desc: "Nylon T Shirt order kar do size M" },
// //   { id: "personal-stylist", icon: "👗", title: "Personal Stylist", desc: "Wedding ke liye outfit suggest karo" },
// //   { id: "size-advisor", icon: "📏", title: "Size Advisor", desc: "Height 5'8\" weight 70kg ke liye size batao" },
// //   { id: "budget-shopper", icon: "💰", title: "Budget Shopper", desc: "Under 1500 mein best items" },
// //   { id: "occasion-planner", icon: "🎉", title: "Occasion Planner", desc: "Ganesh Chaturthi ke liye outfit" },
// //   { id: "wardrobe-assistant", icon: "👕", title: "Wardrobe Assistant", desc: "Mere paas blue jeans hai..." },
// //   { id: "trend-spotter", icon: "🔥", title: "Trend Spotter", desc: "Current summer trends" },
// //   { id: "outfit-completer", icon: "🧥", title: "Outfit Completer", desc: "White shirt ke saath best match" },
// //   { id: "gift-suggester", icon: "🎁", title: "Gift Suggester", desc: "Anniversary gift suggestions" },
// //   { id: "order-tracking", icon: "📦", title: "Order Tracking", desc: "Mera order kab tak aayega?" },
// // ];

// // const ChatAssistant = ({ isOpen, onClose }) => {
// //   const [messages, setMessages] = useState([
// //     { type: "bot", text: "Hi! Click any agent card or type your request below 👇" }
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showCards, setShowCards] = useState(true); // Toggle between cards and chat
// //   const messagesEndRef = useRef(null);

// //   // Auto-scroll to bottom
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   const handleAgentClick = async (agent) => {
// //     setLoading(true);
// //     setShowCards(false);
    
// //     try {
// //       if (agent.id === "order-tracking") {
// //         const { data } = await http.post("/api/ai/assistant", { message: "Track my order" });
// //         setMessages(prev => [...prev, { type: "bot", text: data.reply }]);
// //       } else {
// //         // Get draft for the agent
// //         const { data } = await http.post("/api/ai/draft", { agentType: agent.id });
// //         const draftMessage = data.message || agent.desc;
        
// //         setInput(draftMessage);
// //         setMessages(prev => [...prev, { 
// //           type: "bot", 
// //           text: `✅ **${agent.title}** draft ready. Edit if needed & click Send.` 
// //         }]);
// //       }
// //     } catch (err) {
// //       console.error("Agent click error:", err);
// //       setInput(agent.desc);
// //       toast.error("Could not load draft, using default");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const sendMessage = async () => {
// //     if (!input.trim() || loading) return;

// //     const userMessage = input.trim();
// //     setMessages(prev => [...prev, { type: "user", text: userMessage }]);
// //     setInput("");
// //     setLoading(true);

// //     try {
// //       const { data } = await http.post("/api/ai/assistant", { message: userMessage });

// //       if (!data || !data.reply) {
// //         throw new Error("Invalid response from server");
// //       }

// //       setMessages(prev => [...prev, { type: "bot", text: data.reply }]);

// //       // Handle Razorpay redirect
// //       if (data.action === "open_razorpay" && data.paymentData) {
// //         setTimeout(() => {
// //           // Razorpay initialization logic here
// //           toast.success("Opening payment gateway...");
// //         }, 500);
// //       }
// //     } catch (err) {
// //       console.error("Send message error:", err);
// //       toast.error("Failed to send message. Please try again.");
// //       setMessages(prev => [...prev, { 
// //         type: "bot", 
// //         text: "Sorry, something went wrong. Please try again or select an agent." 
// //       }]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setMessages([{ type: "bot", text: "Hi! Click any agent card or type your request below 👇" }]);
// //     setInput("");
// //     setShowCards(true);
// //   };

// //   return (
// //     <div className={`fixed bottom-24 right-6 w-[420px] h-[620px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 ${
// //       isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
// //     }`}>

// //       {/* Header */}
// //       <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white px-6 py-5 flex items-center justify-between">
// //         <div className="flex items-center gap-3 flex-1">
// //           <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">🤖</div>
// //           <div className="flex-1">
// //             <h3 className="font-semibold text-lg">AI Shopping Assistant</h3>
// //             <p className="text-xs opacity-75">Smart Recommendations</p>
// //           </div>
// //         </div>
// //         <button 
// //           onClick={onClose}
// //           className="w-9 h-9 hover:bg-white/20 rounded-xl flex items-center justify-center text-2xl transition"
// //           aria-label="Close chat"
// //         >
// //           ✕
// //         </button>
// //       </div>

// //       {/* Agent Cards Section */}
// //       {showCards && (
// //         <div className="p-5 grid grid-cols-2 gap-4 overflow-y-auto flex-1 bg-gray-50">
// //           {AGENT_CARDS.map((agent) => (
// //             <button
// //               key={agent.id}
// //               onClick={() => handleAgentClick(agent)}
// //               disabled={loading}
// //               className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-violet-300 hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed text-left"
// //             >
// //               <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{agent.icon}</div>
// //               <h4 className="font-semibold text-base mb-1">{agent.title}</h4>
// //               <p className="text-sm text-gray-500 line-clamp-2">{agent.desc}</p>
// //             </button>
// //           ))}
// //         </div>
// //       )}

// //       {/* Messages Area */}
// //       <div className="flex-1 p-5 overflow-y-auto bg-gray-50 space-y-4 flex flex-col">
// //         {messages.map((msg, i) => (
// //           <div
// //             key={i}
// //             className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-[15px] leading-relaxed break-words ${
// //               msg.type === "user" 
// //                 ? "ml-auto bg-violet-600 text-white rounded-br-none" 
// //                 : "mr-auto bg-white border border-gray-200 rounded-bl-none"
// //             }`}
// //           >
// //             {msg.text}
// //           </div>
// //         ))}
// //         {loading && (
// //           <div className="flex items-center gap-2 text-gray-600">
// //             <span className="animate-pulse text-xl">🤖</span>
// //             <span className="text-sm">AI Agent is thinking...</span>
// //           </div>
// //         )}
// //         <div ref={messagesEndRef} />
// //       </div>

// //       {/* Input Area */}
// //       <div className="p-4 border-t bg-white space-y-2">
// //         {!showCards && (
// //           <button
// //             onClick={handleReset}
// //             className="text-xs text-gray-500 hover:text-violet-600 transition"
// //           >
// //             ← Back to Agents
// //           </button>
// //         )}
// //         <div className="flex gap-3">
// //           <input
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyPress={(e) => e.key === "Enter" && !loading && sendMessage()}
// //             placeholder="Type message or edit draft..."
// //             disabled={loading}
// //             className="flex-1 border border-gray-300 rounded-full px-6 py-4 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base disabled:bg-gray-100"
// //           />
// //           <button
// //             onClick={sendMessage}
// //             disabled={!input.trim() || loading}
// //             className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white px-8 rounded-full font-semibold transition active:scale-95"
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatAssistant;






// // frontend/src/components/ChatAssistant.jsx
// import React, { useState, useRef, useEffect } from "react";
// import http from "../api/http.js";
// import { toast } from "react-toastify";

// const AGENT_CARDS = [
//   { id: "chat-to-order", icon: "🛍️", title: "Chat to Order", desc: "Nylon T Shirt order kar do size M" },
//   { id: "personal-stylist", icon: "👗", title: "Personal Stylist", desc: "Wedding ke liye outfit suggest karo" },
//   { id: "size-advisor", icon: "📏", title: "Size Advisor", desc: "Height 5'8\" weight 70kg ke liye size batao" },
//   { id: "budget-shopper", icon: "💰", title: "Budget Shopper", desc: "Under 1500 mein best items" },
//   { id: "occasion-planner", icon: "🎉", title: "Occasion Planner", desc: "Ganesh Chaturthi ke liye outfit" },
//   { id: "wardrobe-assistant", icon: "👕", title: "Wardrobe Assistant", desc: "Mere paas blue jeans hai..." },
//   { id: "trend-spotter", icon: "🔥", title: "Trend Spotter", desc: "Current summer trends" },
//   { id: "outfit-completer", icon: "🧥", title: "Outfit Completer", desc: "White shirt ke saath best match" },
//   { id: "gift-suggester", icon: "🎁", title: "Gift Suggester", desc: "Anniversary gift suggestions" },
//   { id: "order-tracking", icon: "📦", title: "Order Tracking", desc: "Mera order kab tak aayega?" },
// ];

// const ChatAssistant = ({ isOpen, onClose }) => {
//   const [messages, setMessages] = useState([
//     { type: "bot", text: "Hi! Click any agent card or type your request below 👇" }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showCards, setShowCards] = useState(true); // Toggle between cards and chat
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleAgentClick = async (agent) => {
//     setLoading(true);
//     setShowCards(false);

//     try {
//       if (agent.id === "order-tracking") {
//         // /api/ai/assistant -> { reply, action?, paymentData? }
//         const { data } = await http.post("/api/ai/assistant", { message: "Track my order" });
//         setMessages(prev => [...prev, { type: "bot", text: data.reply }]);
//       } else {
//         // /api/ai/draft -> { type, message, intent, success }
//         const { data } = await http.post("/api/ai/draft", { agentType: agent.id });
//         const draftMessage = data?.message || agent.desc;

//         setInput(draftMessage);
//         setMessages(prev => [...prev, {
//           type: "bot",
//           text: `✅ **${agent.title}** draft ready. Edit if needed & click Send.`
//         }]);
//       }
//     } catch (err) {
//       console.error("Agent click error:", err);
//       // Controller's error fallbacks still return a usable `reply`/`message`,
//       // so prefer that over the static card description when available.
//       const serverText = err.response?.data?.reply || err.response?.data?.message;

//       if (agent.id === "order-tracking") {
//         setMessages(prev => [...prev, {
//           type: "bot",
//           text: serverText || "Sorry, couldn't fetch your order status. Please try again."
//         }]);
//       } else {
//         setInput(serverText || agent.desc);
//       }
//       toast.error("Could not load draft, using default");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userMessage = input.trim();
//     setMessages(prev => [...prev, { type: "user", text: userMessage }]);
//     setInput("");
//     setLoading(true);

//     try {
//       // /api/ai/assistant expects { message } and returns { reply, action?, paymentData? }
//       const { data } = await http.post("/api/ai/assistant", { message: userMessage });

//       if (!data || !data.reply) {
//         throw new Error("Invalid response from server");
//       }

//       setMessages(prev => [...prev, { type: "bot", text: data.reply }]);

//       // Handle Razorpay redirect
//       if (data.action === "open_razorpay" && data.paymentData) {
//         setTimeout(() => {
//           // Razorpay initialization logic here
//           toast.success("Opening payment gateway...");
//         }, 500);
//       }
//     } catch (err) {
//       console.error("Send message error:", err);
//       // The controller still sends a JSON body with a `reply` field on
//       // non-2xx responses (401 "Please login first", 400 "Please provide
//       // a valid message.", 500 generic failure) — axios surfaces these as
//       // errors, so pull the real message back out instead of a generic one.
//       const serverReply = err.response?.data?.reply;
//       toast.error(serverReply || "Failed to send message. Please try again.");
//       setMessages(prev => [...prev, {
//         type: "bot",
//         text: serverReply || "Sorry, something went wrong. Please try again or select an agent."
//       }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setMessages([{ type: "bot", text: "Hi! Click any agent card or type your request below 👇" }]);
//     setInput("");
//     setShowCards(true);
//   };

//   return (
//     <div className={`fixed bottom-24 right-6 w-[420px] h-[620px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 ${
//       isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
//     }`}>

//       {/* Header */}
//       <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white px-6 py-5 flex items-center justify-between">
//         <div className="flex items-center gap-3 flex-1">
//           <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">🤖</div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-lg">AI Shopping Assistant</h3>
//             <p className="text-xs opacity-75">Smart Recommendations</p>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           className="w-9 h-9 hover:bg-white/20 rounded-xl flex items-center justify-center text-2xl transition"
//           aria-label="Close chat"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Agent Cards Section */}
//       {showCards && (
//         <div className="p-5 grid grid-cols-2 gap-4 overflow-y-auto flex-1 bg-gray-50">
//           {AGENT_CARDS.map((agent) => (
//             <button
//               key={agent.id}
//               onClick={() => handleAgentClick(agent)}
//               disabled={loading}
//               className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-violet-300 hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed text-left"
//             >
//               <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{agent.icon}</div>
//               <h4 className="font-semibold text-base mb-1">{agent.title}</h4>
//               <p className="text-sm text-gray-500 line-clamp-2">{agent.desc}</p>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Messages Area */}
//       <div className="flex-1 p-5 overflow-y-auto bg-gray-50 space-y-4 flex flex-col">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-[15px] leading-relaxed break-words ${
//               msg.type === "user"
//                 ? "ml-auto bg-violet-600 text-white rounded-br-none"
//                 : "mr-auto bg-white border border-gray-200 rounded-bl-none"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {loading && (
//           <div className="flex items-center gap-2 text-gray-600">
//             <span className="animate-pulse text-xl">🤖</span>
//             <span className="text-sm">AI Agent is thinking...</span>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="p-4 border-t bg-white space-y-2">
//         {!showCards && (
//           <button
//             onClick={handleReset}
//             className="text-xs text-gray-500 hover:text-violet-600 transition"
//           >
//             ← Back to Agents
//           </button>
//         )}
//         <div className="flex gap-3">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && !loading && sendMessage()}
//             placeholder="Type message or edit draft..."
//             disabled={loading}
//             className="flex-1 border border-gray-300 rounded-full px-6 py-4 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base disabled:bg-gray-100"
//           />
//           <button
//             onClick={sendMessage}
//             disabled={!input.trim() || loading}
//             className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white px-8 rounded-full font-semibold transition active:scale-95"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatAssistant;



// frontend/src/components/ChatAssistant.jsx
import React, { useState, useRef, useEffect } from "react";
import http from "../api/http.js";
import { toast } from "react-toastify";

const AGENT_CARDS = [
  { id: "chat-to-order", icon: "🛍️", title: "Chat to Order", desc: "Nylon T Shirt order kar do size M" },
  { id: "personal-stylist", icon: "👗", title: "Personal Stylist", desc: "Wedding ke liye outfit suggest karo" },
  { id: "size-advisor", icon: "📏", title: "Size Advisor", desc: "Height 5'8\" weight 70kg ke liye size batao" },
  { id: "budget-shopper", icon: "💰", title: "Budget Shopper", desc: "Under 1500 mein best items" },
  { id: "occasion-planner", icon: "🎉", title: "Occasion Planner", desc: "Ganesh Chaturthi ke liye outfit" },
  { id: "wardrobe-assistant", icon: "👕", title: "Wardrobe Assistant", desc: "Mere paas blue jeans hai..." },
  { id: "trend-spotter", icon: "🔥", title: "Trend Spotter", desc: "Current summer trends" },
  { id: "outfit-completer", icon: "🧥", title: "Outfit Completer", desc: "White shirt ke saath best match" },
  { id: "gift-suggester", icon: "🎁", title: "Gift Suggester", desc: "Anniversary gift suggestions" },
  { id: "order-tracking", icon: "📦", title: "Order Tracking", desc: "Mera order kab tak aayega?" },
];

// Load the Razorpay checkout.js script once and reuse it.
// Returns a promise that resolves to true/false.
let razorpayScriptPromise = null;
const loadRazorpayScript = () => {
  if (window.Razorpay) return Promise.resolve(true);

  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }
  return razorpayScriptPromise;
};

const ChatAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! Click any agent card or type your request below 👇" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCards, setShowCards] = useState(true); // Toggle between cards and chat
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Actually opens the Razorpay checkout popup using the paymentData
  // returned by the backend (instead of the old placeholder toast-only code).
  const openRazorpayCheckout = async (paymentData) => {
    if (!paymentData) {
      toast.error("Payment data missing. Please try again.");
      return;
    }

    const ok = await loadRazorpayScript();
    if (!ok) {
      toast.error("Could not load payment gateway. Check your internet connection.");
      return;
    }

    // Support a few possible field-name variants from the backend's
    // paymentAgent response so this doesn't silently break if naming differs.
    const key = paymentData.key || paymentData.keyId || paymentData.razorpayKey;
    const orderId = paymentData.orderId || paymentData.order_id || paymentData.id;
    const amount = paymentData.amount; // should already be in paise from backend
    const currency = paymentData.currency || "INR";

    if (!key || !orderId) {
      console.error("Incomplete Razorpay paymentData:", paymentData);
      toast.error("Payment setup incomplete. Please try again.");
      return;
    }

    const options = {
      key,
      amount,
      currency,
      order_id: orderId,
      name: paymentData.name || "Male Fashion",
      description: paymentData.description || "Order Payment",
      prefill: paymentData.prefill || {},
      notes: paymentData.notes || {},
      theme: { color: "#7c3aed" },
      handler: async function (response) {
        // response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
        try {
          await http.post("/api/payments/verify", response);
          toast.success("Payment successful! 🎉");
          setMessages((prev) => [
            ...prev,
            { type: "bot", text: "✅ Payment received! Your order is confirmed." }
          ]);
        } catch (err) {
          console.error("Payment verify error:", err);
          toast.error("Payment captured but verification failed. We'll confirm shortly.");
        }
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.error("Razorpay payment failed:", response.error);
      toast.error(response.error?.description || "Payment failed. Please try again.");
    });
    rzp.open();
  };

  const handleAgentClick = async (agent) => {
    setLoading(true);
    setShowCards(false);

    try {
      if (agent.id === "order-tracking") {
        // /api/ai/assistant -> { reply, action?, paymentData? }
        const { data } = await http.post("/api/ai/assistant", { message: "Track my order" });
        setMessages(prev => [...prev, { type: "bot", text: data.reply }]);
      } else {
        // /api/ai/draft -> { type, message, intent, success }
        const { data } = await http.post("/api/ai/draft", { agentType: agent.id });
        const draftMessage = data?.message || agent.desc;

        setInput(draftMessage);
        setMessages(prev => [...prev, {
          type: "bot",
          text: `✅ **${agent.title}** draft ready. Edit if needed & click Send.`
        }]);
      }
    } catch (err) {
      console.error("Agent click error:", err);
      const serverText = err.response?.data?.reply || err.response?.data?.message;

      if (agent.id === "order-tracking") {
        setMessages(prev => [...prev, {
          type: "bot",
          text: serverText || "Sorry, couldn't fetch your order status. Please try again."
        }]);
      } else {
        setInput(serverText || agent.desc);
      }
      toast.error("Could not load draft, using default");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await http.post("/api/ai/assistant", { message: userMessage });

      if (!data || !data.reply) {
        throw new Error("Invalid response from server");
      }

      setMessages(prev => [...prev, { type: "bot", text: data.reply }]);

      // Actually open the Razorpay popup now (previously this was just a toast).
      if (data.action === "open_razorpay" && data.paymentData) {
        await openRazorpayCheckout(data.paymentData);
      }
    } catch (err) {
      console.error("Send message error:", err);
      const serverReply = err.response?.data?.reply;
      toast.error(serverReply || "Failed to send message. Please try again.");
      setMessages(prev => [...prev, {
        type: "bot",
        text: serverReply || "Sorry, something went wrong. Please try again or select an agent."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{ type: "bot", text: "Hi! Click any agent card or type your request below 👇" }]);
    setInput("");
    setShowCards(true);
  };

  return (
    <div className={`fixed bottom-24 right-6 w-[420px] h-[620px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 ${
      isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
    }`}>

      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">🤖</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">AI Shopping Assistant</h3>
            <p className="text-xs opacity-75">Smart Recommendations</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 hover:bg-white/20 rounded-xl flex items-center justify-center text-2xl transition"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Agent Cards Section */}
      {showCards && (
        <div className="p-5 grid grid-cols-2 gap-4 overflow-y-auto flex-1 bg-gray-50">
          {AGENT_CARDS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => handleAgentClick(agent)}
              disabled={loading}
              className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-violet-300 hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{agent.icon}</div>
              <h4 className="font-semibold text-base mb-1">{agent.title}</h4>
              <p className="text-sm text-gray-500 line-clamp-2">{agent.desc}</p>
            </button>
          ))}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 p-5 overflow-y-auto bg-gray-50 space-y-4 flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-[15px] leading-relaxed break-words ${
              msg.type === "user"
                ? "ml-auto bg-violet-600 text-white rounded-br-none"
                : "mr-auto bg-white border border-gray-200 rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <span className="animate-pulse text-xl">🤖</span>
            <span className="text-sm">AI Agent is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white space-y-2">
        {!showCards && (
          <button
            onClick={handleReset}
            className="text-xs text-gray-500 hover:text-violet-600 transition"
          >
            ← Back to Agents
          </button>
        )}
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !loading && sendMessage()}
            placeholder="Type message or edit draft..."
            disabled={loading}
            className="flex-1 border border-gray-300 rounded-full px-6 py-4 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base disabled:bg-gray-100"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white px-8 rounded-full font-semibold transition active:scale-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;