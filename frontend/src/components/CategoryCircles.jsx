// // import React from "react";
// // import { Link } from "react-router-dom";
// // import "./CategoryCircles.css";

// // /**
// //  * items: [{ title, img, to }]  // `to` is link (e.g. /shop?category=shirts)
// //  */
// // export default function CategoryCircles({ title = "CATEGORIES TO BAG", items = [] }) {
// //   return (
// //     <section className="catbag-sec">
// //       <div className="catbag-head">{title}</div>
// //       <div className="catbag-grid">
// //         {items.map((it, i) => (
// //           <Link to={it.to || "#"} className="catbag-card" key={i}>
// //             <div className="catbag-imgwrap" aria-hidden="true">
// //               <img src={it.img} alt={it.title} />
// //               <span className="catbag-ring" />
// //             </div>
// //             <div className="catbag-title">{it.title}</div>
// //           </Link>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }



// import React from "react";
// import { Link } from "react-router-dom";
// import "./CategoryCircles.css";

// /**
//  * items: [{ title, img, to }]  // `to` is link (e.g. /shop?category=shirts)
//  *
//  * `title` is optional now — pass it only if this component is rendered on
//  * its own. When it's nested inside a parent section that already has its
//  * own heading (e.g. CategorySection.jsx), pass title={null} or omit it
//  * entirely so you don't get two headings stacked on top of each other.
//  */
// export default function CategoryCircles({ title = null, items = [] }) {
//   return (
//     <section className="catbag-sec">
//       {title && <div className="catbag-head">{title}</div>}
//       <div className="catbag-grid">
//         {items.map((it, i) => (
//           <Link to={it.to || "#"} className="catbag-card" key={it.to || it.title || i}>
//             <div className="catbag-imgwrap" aria-hidden="true">
//               <img src={it.img} alt={it.title} loading="lazy" />
//               <span className="catbag-ring" />
//             </div>
//             <div className="catbag-title">{it.title}</div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }






import React from "react";
import { Link } from "react-router-dom";

/**
 * items: [{ title, img, to }]  // `to` is link (e.g. /shop?category=shirts)
 *
 * `title` is optional — pass it only if this component is rendered on its
 * own. When nested inside a parent section that already has its own
 * heading (e.g. CategorySection.jsx), omit it so you don't get two
 * headings stacked on top of each other.
 */
export default function CategoryCircles({ title = null, items = [] }) {
  return (
    <section className="w-full">
      {title && (
        <div className="text-[13px] font-bold tracking-[0.25em] uppercase text-[#15171c] mb-5">
          {title}
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 sm:gap-5">
        {items.map((it, i) => (
          <Link
            to={it.to || "#"}
            key={it.to || it.title || i}
            className="group flex flex-col items-center text-center no-underline"
          >
            {/* Fixed square circle — image always cropped to fill it,
                regardless of the source photo's own aspect ratio. This is
                what keeps busy/tall photos (e.g. a multi-item flatlay)
                from blowing the "circle" out into a pill shape. */}
            <div
              className="relative w-full max-w-[120px] sm:max-w-[168px] aspect-square rounded-full overflow-hidden bg-white
                shadow-[0_6px_18px_rgba(21,23,28,0.08)]
                transition-all duration-300 ease-out
                group-hover:-translate-y-1 group-hover:shadow-[0_14px_30px_rgba(21,23,28,0.16)]"
            >
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Decorative brass ring, sits just inside the circle's edge */}
              <span
                className="absolute inset-1.5 rounded-full border-[1.5px] border-[#AD8A4D]/55
                  transition-all duration-300 ease-out
                  group-hover:inset-1 group-hover:border-[#AD8A4D]"
              />
            </div>

            <div className="mt-3.5 text-[13px] sm:text-[15px] font-semibold text-[#15171c]">
              {it.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}