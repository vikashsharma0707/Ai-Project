// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { assistant } from '../store/aiSlice.js';

// export default function ChatAssistant(){
//   const [msg, setMsg] = useState('');
//   const dispatch = useDispatch();
//   const reply = useSelector(s=>s.ai.reply);
//   return (
//     <div className="panel">
//       <h3>Assistant</h3>
//       <div className="row gap">
//         <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Ask about size/returns..."/>
//         <button onClick={()=>dispatch(assistant(msg))}>Ask</button>
//       </div>
//       {reply && <div className="bubble">{reply}</div>}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assistant } from '../store/aiSlice.js';

export default function ChatAssistant() {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const reply = useSelector(s => s.ai.reply);

  const send = async (e) => {
    e.preventDefault();
    await dispatch(assistant(msg));
  };

  return (
    <div className="panel">
      <h3>Shopping Assistant</h3>
      <form className="row" style={{ gap: 8 }} onSubmit={send}>
        <input value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="Ask about size, returns, COD…" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #e5e7eb' }} />
        <button className="btn" type="submit">Ask</button>
      </form>
      {reply && <p style={{ marginTop: 10 }}>{reply}</p>}
    </div>
  );
}
