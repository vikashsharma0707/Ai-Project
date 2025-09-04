import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminGuard({ children }){
  const me = useSelector(s=>s.user.me);
  if (!me) return <Navigate to="/profile" replace />;
  if (me.role !== 'admin') return <div className="panel">Forbidden: Admins only</div>;
  return children;
}
