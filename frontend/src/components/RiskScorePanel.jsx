import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { riskScore } from '../store/aiSlice.js';

export default function RiskScorePanel() {
  const [ctx, setCtx] = useState({
    deviceFingerprint: 'dev-fp',
    ipCountry: 'IN',
    billingCountry: 'IN',
    ordersLast24h: 0,
    codAbuseCount: 0,
    emailAgeDays: 365,
    velocityPerMin: 0
  });
  const dispatch = useDispatch();
  const risk = useSelector(s => s.ai.risk);

  const onChange = (e)=> setCtx({...ctx, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value});
  const check = async ()=> { await dispatch(riskScore(ctx)); };

  return (
    <div className="panel">
      <h3>Fraud Risk (COD)</h3>
      <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
        <input name="ipCountry" value={ctx.ipCountry} onChange={onChange} placeholder="IP Country" />
        <input name="billingCountry" value={ctx.billingCountry} onChange={onChange} placeholder="Billing Country" />
        <input name="ordersLast24h" type="number" value={ctx.ordersLast24h} onChange={onChange} placeholder="Orders 24h" />
        <input name="codAbuseCount" type="number" value={ctx.codAbuseCount} onChange={onChange} placeholder="COD Abuse" />
        <input name="emailAgeDays" type="number" value={ctx.emailAgeDays} onChange={onChange} placeholder="Email Age (days)" />
        <input name="velocityPerMin" type="number" value={ctx.velocityPerMin} onChange={onChange} placeholder="Velocity/min" />
        <button className="btn" onClick={check}>Score</button>
      </div>
      <div style={{ marginTop: 8 }}>
        <b>Score:</b> {risk.score} • <b>Action:</b> {risk.action}
      </div>
    </div>
  );
}
