// // // import React, { useState } from 'react';
// // // import { useDispatch } from 'react-redux';
// // // import { loginUser, registerUser, fetchMe } from '../store/userSlice.js';

// // // export default function Profile(){
// // //   // Login state
// // //   const [log, setLog] = useState({ email:'', password:'' });
// // //   const [loginAs, setLoginAs] = useState('user'); // 'user' | 'admin'

// // //   // Register state
// // //   const [reg, setReg] = useState({ name:'', email:'', password:'' });
// // //   const [registerAs, setRegisterAs] = useState('user'); // 'user' | 'admin'

// // //   const dispatch = useDispatch();

// // //   const handleLogin = async () => {
// // //     if (!log.email || !log.password) return alert('Enter email and password');
// // //     try {
// // //       await dispatch(loginUser(log)).unwrap();
// // //       const me = await dispatch(fetchMe()).unwrap();
// // //       if (loginAs === 'admin' && me.role !== 'admin') {
// // //         alert('This account is not an admin. Please login with an admin account or use "Login as User".');
// // //       } else if (loginAs === 'user' && me.role === 'admin') {
// // //         // It’s okay to use an admin account as user too; just inform.
// // //         console.log('Logged in as admin; user pages will still work. Admin link will be visible.');
// // //       }
// // //     } catch (e) {
// // //       alert(typeof e === 'string' ? e : 'Login failed');
// // //     }
// // //   };

// // //   const handleRegister = async () => {
// // //     const { name, email, password } = reg;
// // //     if (!name || !email || !password) return alert('Enter name, email and password');
// // //     try {
// // //       await dispatch(registerUser({ ...reg, role: registerAs })).unwrap();
// // //       await dispatch(fetchMe());
// // //       alert(`Registered as ${registerAs}. You are now logged in.`);
// // //     } catch (e) {
// // //       alert(typeof e === 'string' ? e : 'Register failed');
// // //     }
// // //   };

// // //   return (
// // //     <div className="row gap">
// // //       {/* Login Card */}
// // //       <div className="panel" style={{minWidth: 360}}>
// // //         <h3>Login</h3>

// // //         <div className="row gap" style={{marginBottom: 8}}>
// // //           <label style={{display:'flex',alignItems:'center',gap:4}}>
// // //             <input type="radio" name="loginAs" value="user"
// // //               checked={loginAs==='user'} onChange={()=>setLoginAs('user')} />
// // //             Login as User
// // //           </label>
// // //           <label style={{display:'flex',alignItems:'center',gap:4}}>
// // //             <input type="radio" name="loginAs" value="admin"
// // //               checked={loginAs==='admin'} onChange={()=>setLoginAs('admin')} />
// // //             Login as Admin
// // //           </label>
// // //         </div>

// // //         <input placeholder="Email" value={log.email}
// // //                onChange={e=>setLog({...log, email:e.target.value})}/>
// // //         <input placeholder="Password" type="password" value={log.password}
// // //                onChange={e=>setLog({...log, password:e.target.value})}/>
// // //         <button className="btn" onClick={handleLogin}>Login</button>
// // //         <p className="muted" style={{marginTop:8}}>
// // //           Tip: Seeded admin → <b>admin@myntra.demo</b> / <b>admin123</b>
// // //         </p>
// // //       </div>

// // //       {/* Register Card */}
// // //       <div className="panel" style={{minWidth: 360}}>
// // //         <h3>Register</h3>

// // //         <div className="row gap" style={{marginBottom: 8}}>
// // //           <label style={{display:'flex',alignItems:'center',gap:4}}>
// // //             <input type="radio" name="registerAs" value="user"
// // //               checked={registerAs==='user'} onChange={()=>setRegisterAs('user')} />
// // //             Register as User
// // //           </label>
// // //           <label style={{display:'flex',alignItems:'center',gap:4}}>
// // //             <input type="radio" name="registerAs" value="admin"
// // //               checked={registerAs==='admin'} onChange={()=>setRegisterAs('admin')} />
// // //             Register as Admin
// // //           </label>
// // //         </div>

// // //         <input placeholder="Name" value={reg.name}
// // //                onChange={e=>setReg({...reg, name:e.target.value})}/>
// // //         <input placeholder="Email" value={reg.email}
// // //                onChange={e=>setReg({...reg, email:e.target.value})}/>
// // //         <input placeholder="Password" type="password" value={reg.password}
// // //                onChange={e=>setReg({...reg, password:e.target.value})}/>
// // //         <button className="btn" onClick={handleRegister}>Register</button>
// // //         <p className="muted" style={{marginTop:8}}>
// // //           Admin registration enabled for demo. In production, restrict this to authorized staff only.
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { loginUser, registerUser, fetchMe } from "../store/userSlice.js";
// // import "./Profile.css";
// // import { useNavigate } from "react-router-dom";

// // export default function Profile() {
// //   // Login state
// //   const [log, setLog] = useState({ email: "", password: "" });
// //   const [loginAs, setLoginAs] = useState("user"); // 'user' | 'admin'

// //   // Register state
// //   const [reg, setReg] = useState({ name: "", email: "", password: "" });
// //   const [registerAs, setRegisterAs] = useState("user"); // 'user' | 'admin'

// //   const dispatch = useDispatch();
// //    const navigate = useNavigate()

// //   // const handleLogin = async () => {
// //   //   if (!log.email || !log.password) return alert("Enter email and password");
// //   //   try {
// //   //     await dispatch(loginUser(log)).unwrap();
// //   //     const me = await dispatch(fetchMe()).unwrap();
// //   //     if (loginAs === "admin" && me.role !== "admin") {
// //   //       alert(
// //   //         'This account is not an admin. Please login with an admin account or use "Login as User".'
// //   //       );
// //   //     } else if (loginAs === "user" && me.role === "admin") {
// //   //       console.log(
// //   //         "Logged in as admin; user pages will still work. Admin link will be visible."
// //   //       );
// //   //     }
// //   //   } catch (e) {
// //   //     alert(typeof e === "string" ? e : "Login failed");
// //   //   }
// //   // };


// //    const handleLogin = async () => {
// //     if (!log.email || !log.password) return alert("Enter email and password");
// //     try {
// //       await dispatch(loginUser(log)).unwrap();
// //       const me = await dispatch(fetchMe()).unwrap();

// //       if (loginAs === "admin" && me.role !== "admin") {
// //         alert(
// //           'This account is not an admin. Please login with an admin account or use "Login as User".'
// //         );
// //       } else if (loginAs === "user" && me.role === "admin") {
// //         console.log(
// //           "Logged in as admin; user pages will still work. Admin link will be visible."
// //         );
// //       }

// //       // ✅ Login success → navigate home
// //       navigate("/");  

// //     } catch (e) {
// //       alert(typeof e === "string" ? e : "Login failed");
// //     }
// //   };


// //   const handleRegister = async () => {
// //     const { name, email, password } = reg;
// //     if (!name || !email || !password)
// //       return alert("Enter name, email and password");
// //     try {
// //       await dispatch(registerUser({ ...reg, role: registerAs })).unwrap();
// //       await dispatch(fetchMe());
// //       alert(`Registered as ${registerAs}. You are now logged in.`);
// //     } catch (e) {
// //       alert(typeof e === "string" ? e : "Register failed");
// //     }
// //   };

// //   return (
// //     <div className="pf-wrap">
// //       {/* Login Card */}
// //       <section className="pf-card">
// //         <header className="pf-card-head">
// //           <h3>Login</h3>
// //           <div className="seg">
// //             <label className={`seg-opt ${loginAs === "user" ? "on" : ""}`}>
// //               <input
// //                 type="radio"
// //                 name="loginAs"
// //                 value="user"
// //                 checked={loginAs === "user"}
// //                 onChange={() => setLoginAs("user")}
// //               />
// //               User
// //             </label>
// //             <label className={`seg-opt ${loginAs === "admin" ? "on" : ""}`}>
// //               <input
// //                 type="radio"
// //                 name="loginAs"
// //                 value="admin"
// //                 checked={loginAs === "admin"}
// //                 onChange={() => setLoginAs("admin")}
// //               />
// //               Admin
// //             </label>
// //           </div>
// //         </header>

// //         <div className="pf-field">
// //           <label htmlFor="log-email">Email</label>
// //           <input
// //             id="log-email"
// //             type="email"
// //             placeholder="you@example.com"
// //             value={log.email}
// //             onChange={(e) => setLog({ ...log, email: e.target.value })}
// //           />
// //         </div>

// //         <div className="pf-field">
// //           <label htmlFor="log-pass">Password</label>
// //           <input
// //             id="log-pass"
// //             type="password"
// //             placeholder="••••••••"
// //             value={log.password}
// //             onChange={(e) => setLog({ ...log, password: e.target.value })}
// //           />
// //         </div>

// //         <button className="btn btn-dark" onClick={handleLogin}>
// //           Login
// //         </button>

// //         <p className="tip">
// //           Tip: Seeded admin → <b>admin@myntra.demo</b> / <b>admin123</b>
// //         </p>
// //       </section>

// //       {/* Register Card */}
// //       <section className="pf-card">
// //         <header className="pf-card-head">
// //           <h3>Register</h3>
// //           <div className="seg">
// //             <label className={`seg-opt ${registerAs === "user" ? "on" : ""}`}>
// //               <input
// //                 type="radio"
// //                 name="registerAs"
// //                 value="user"
// //                 checked={registerAs === "user"}
// //                 onChange={() => setRegisterAs("user")}
// //               />
// //               User
// //             </label>
// //             <label className={`seg-opt ${registerAs === "admin" ? "on" : ""}`}>
// //               <input
// //                 type="radio"
// //                 name="registerAs"
// //                 value="admin"
// //                 checked={registerAs === "admin"}
// //                 onChange={() => setRegisterAs("admin")}
// //               />
// //               Admin
// //             </label>
// //           </div>
// //         </header>

// //         <div className="pf-field">
// //           <label htmlFor="reg-name">Name</label>
// //           <input
// //             id="reg-name"
// //             type="text"
// //             placeholder="Full name"
// //             value={reg.name}
// //             onChange={(e) => setReg({ ...reg, name: e.target.value })}
// //           />
// //         </div>

// //         <div className="pf-field">
// //           <label htmlFor="reg-email">Email</label>
// //           <input
// //             id="reg-email"
// //             type="email"
// //             placeholder="you@example.com"
// //             value={reg.email}
// //             onChange={(e) => setReg({ ...reg, email: e.target.value })}
// //           />
// //         </div>

// //         <div className="pf-field">
// //           <label htmlFor="reg-pass">Password</label>
// //           <input
// //             id="reg-pass"
// //             type="password"
// //             placeholder="Create a strong password"
// //             value={reg.password}
// //             onChange={(e) => setReg({ ...reg, password: e.target.value })}
// //           />
// //         </div>

// //         <button className="btn btn-dark" onClick={handleRegister}>
// //           Register
// //         </button>

// //         <p className="tip">
// //           Admin registration enabled for demo. In production, restrict this to
// //           authorized staff only.
// //         </p>
// //       </section>
// //     </div>
// //   );
// // }



// // frontend/src/pages/Profile.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// export default function Profile() {
//   const { me } = useSelector((state) => state.user);

//   if (!me) {
//     return <div className="text-center py-20">Please login first</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-12 px-6">
//       <div className="bg-white rounded-3xl shadow-xl p-10">
//         <div className="flex items-center gap-6 mb-10">
//           <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-5xl text-white">
//             {me.name?.[0]?.toUpperCase()}
//           </div>
//           <div>
//             <h1 className="text-4xl font-bold">{me.name}</h1>
//             <p className="text-gray-600 text-lg">{me.email}</p>
//             <p className="mt-1 text-sm font-medium text-green-600">
//               {me.role === "admin" ? "👑 Admin Account" : "👤 Customer"}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="border border-gray-200 rounded-2xl p-8">
//             <h3 className="font-semibold text-xl mb-4">Account Information</h3>
//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Email</span>
//                 <span className="font-medium">{me.email}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Role</span>
//                 <span className="font-medium capitalize">{me.role}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Joined</span>
//                 <span className="font-medium">March 2025</span>
//               </div>
//             </div>
//           </div>

//           <div className="border border-gray-200 rounded-2xl p-8">
//             <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <Link to="/orders" className="block p-4 border rounded-2xl hover:bg-gray-50 text-center">
//                 📦 My Orders
//               </Link>
//               <Link to="/wishlist" className="block p-4 border rounded-2xl hover:bg-gray-50 text-center">
//                 ❤️ Wishlist
//               </Link>
//               <Link to="/cart" className="block p-4 border rounded-2xl hover:bg-gray-50 text-center">
//                 🛒 Cart
//               </Link>
//               {me.role === "admin" && (
//                 <Link to="/admin" className="block p-4 border rounded-2xl hover:bg-gray-50 text-center">
//                   📊 Dashboard
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// frontend/src/pages/Profile.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { me } = useSelector((state) => state.user);

  if (!me) {
    return <div className="text-center py-20">Please login first</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-5xl text-white">
            {me.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-bold">{me.name}</h1>
            <p className="text-gray-600 text-lg">{me.email}</p>
            <p className="mt-1 text-sm font-medium text-green-600">
              {me.role === "admin" ? "👑 Admin Account" : "👤 Customer"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="font-semibold text-xl mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{me.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Role</span>
                <span className="font-medium capitalize">{me.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Joined</span>
                <span className="font-medium">March 2025</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/orders" className="block p-4 border rounded-2xl hover:bg-gray-50 text-center">
                📦 My Orders
              </Link>
              <Link to="/wishlist" className="block p-4 border rounded-2xl hover:bg-gray-50 text-center">
                ❤️ Wishlist
              </Link>
              <Link to="/cart" className="block p-4 border rounded-2xl hover:bg-gray-50 text-center">
                🛒 Cart
              </Link>
              {me.role === "admin" && (
                <Link to="/admin" className="block p-4 border rounded-2xl hover:bg-gray-50 text-center">
                  📊 Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}