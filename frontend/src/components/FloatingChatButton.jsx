// // import React, { useState } from "react";
// // import ChatAssistant from "./ChatAssistant";

// // const FloatingChatButton = () => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <>
// //       <button
// //         className="floating-chat-btn"
// //         onClick={() => setIsOpen(!isOpen)}
// //         title="AI Shopping Assistant"
// //       >
// //         💬
// //       </button>

// //       <ChatAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
// //     </>
// //   );
// // };

// // export default FloatingChatButton;



// // frontend/src/components/FloatingChatButton.jsx
// import React, { useState } from "react";
// import ChatAssistant from "./ChatAssistant";

// const FloatingChatButton = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Modern Floating Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-2xl shadow-2xl flex items-center justify-center text-4xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 group"
//         title="AI Shopping Assistant"
//       >
//         <span className="group-hover:rotate-12 transition-transform duration-300">🤖</span>
        
//         {/* Online Indicator */}
//         <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
//       </button>

//       <ChatAssistant 
//         isOpen={isOpen} 
//         onClose={() => setIsOpen(false)} 
//       />
//     </>
//   );
// };

// export default FloatingChatButton;





// frontend/src/components/FloatingChatButton.jsx
import React, { useEffect, useState } from "react";
import ChatAssistant from "./ChatAssistant";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  // Surface a one-time "nudge" label a couple seconds after the page loads —
  // mimics how most production chat widgets introduce themselves once,
  // then get out of the way. Dismissed permanently once the user opens it
  // or after a short window.
  useEffect(() => {
    if (hasGreeted) return;
    const showTimer = setTimeout(() => setShowHint(true), 1800);
    const hideTimer = setTimeout(() => setShowHint(false), 7000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hasGreeted]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setShowHint(false);
    setHasGreeted(true);
  };

  return (
    <>
      {/* Greeting bubble — appears once, points at the button like a real
          support widget nudge, not a decorative tooltip. */}
      <div
        className={`fixed bottom-[88px] right-6 z-40 max-w-[230px] origin-bottom-right transition-all duration-300 ${
          showHint && !isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-2 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative bg-white text-gray-800 text-sm leading-snug rounded-2xl rounded-br-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 px-4 py-3">
          <button
            onClick={() => setShowHint(false)}
            aria-label="Dismiss"
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full text-[11px] flex items-center justify-center transition"
          >
            ✕
          </button>
          <span className="font-medium">Need outfit ideas or sizing help?</span>
          <br />
          <span className="text-gray-500">Ask the AI Stylist — it's free.</span>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Close AI Shopping Assistant" : "Open AI Shopping Assistant"}
        aria-expanded={isOpen}
        title="AI Shopping Assistant"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full text-white
          bg-gradient-to-br from-violet-600 to-indigo-600
          shadow-[0_10px_25px_-5px_rgba(124,58,237,0.5)]
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:shadow-[0_14px_30px_-5px_rgba(124,58,237,0.6)] hover:scale-105
          active:scale-95
          focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-300"
      >
        {/* Ambient pulse ring — only while closed, signals "live" without being noisy */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-violet-500/40 animate-ping" />
        )}

        {/* Icon swap: chat glyph <-> close glyph, cross-faded + rotated */}
        <span className="relative w-7 h-7 grid place-items-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`absolute w-7 h-7 transition-all duration-300 ${
              isOpen ? "opacity-0 rotate-45 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
          >
            <path
              d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1 0-2-.16-2.9-.46L5 21l1.3-3.9C5.1 15.9 4 14 4 12Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="15" cy="12" r="1" fill="currentColor" />
          </svg>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`absolute w-6 h-6 transition-all duration-300 ${
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-75"
            }`}
          >
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>

        {/* Online indicator — hidden once open, since the panel itself is the "active" state */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full transition-opacity duration-200 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
      </button>

      <ChatAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default FloatingChatButton;