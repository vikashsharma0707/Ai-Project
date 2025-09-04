// import { API_BASE } from "../api/http.js";

// const PLACEHOLDER = "https://via.placeholder.com/600x600?text=IMG";

// export function imgUrl(u) {
//   if (!u) return PLACEHOLDER;
//   // backend multer saves like /uploads/<file>
//   if (u.startsWith("/uploads")) return `${API_BASE}${u}`;
//   return u;
// }


import { API_BASE } from "../api/http.js";

// local inline placeholder (no internet needed)
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#9ca3af">
        IMG
      </text>
    </svg>`
  );

/**
 * Build a safe image URL for cards/detail.
 * - If starts with /uploads -> prefix API_BASE
 * - If falsy -> inline placeholder
 */
export function imgUrl(u) {
  if (!u) return PLACEHOLDER;
  if (u.startsWith("/uploads")) return `${API_BASE}${u}`;
  return u;
}
