// backend/ai/memory.js
const conversations = new Map(); // userId -> messages array

export const addToMemory = (userId, message, role = "user") => {
  if (!userId) return;
  
  if (!conversations.has(userId)) {
    conversations.set(userId, []);
  }

  const history = conversations.get(userId);
  
  history.push({
    role,
    content: message,
    timestamp: new Date().toISOString()
  });

  // Keep last 20 messages only
  if (history.length > 20) history.shift();
};

export const getMemory = (userId) => {
  return conversations.get(userId) || [];
};

export const clearMemory = (userId) => {
  if (userId) conversations.delete(userId);
};

export const getAllHistory = () => {
  return Array.from(conversations.entries()).map(([userId, msgs]) => ({
    userId,
    messages: msgs,
    lastUpdated: msgs.length > 0 ? msgs[msgs.length-1].timestamp : null
  }));
};