// // backend/controllers/virtualTryOnController.js
// import multer from 'multer';
// import axios from 'axios';
// import { env } from '../config/env.js';

// // Accept up to 2 images in memory (person + garment), 8MB cap each.
// export const tryOnUpload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 8 * 1024 * 1024 },
// }).fields([
//   { name: 'person_image', maxCount: 1 },
//   { name: 'garment_image', maxCount: 1 },
// ]);

// // The exact system instructions you wrote, kept verbatim as the prompt sent
// // to the model — this is what tells Gemini how to treat the two images.
// const TRY_ON_PROMPT = `You are an advanced AI Virtual Try-On Engine for an e-commerce clothing platform.

// MISSION:
// Generate a realistic virtual try-on image by dressing the person in the uploaded photo with the selected garment.

// INPUTS:
// 1. person_image = first uploaded image (the user)
// 2. garment_image = second uploaded image (the selected clothing product)

// PRIMARY OBJECTIVE:
// Replace the user's current upper-body clothing with the garment from garment_image while preserving the person's identity and the original scene.

// STRICT PRESERVATION RULES:
// - Preserve face exactly
// - Preserve facial expression exactly
// - Preserve hairstyle exactly
// - Preserve skin tone exactly
// - Preserve body shape exactly
// - Preserve body proportions exactly
// - Preserve pose exactly
// - Preserve hands exactly
// - Preserve background exactly
// - Preserve camera angle exactly
// - Preserve image composition exactly

// GARMENT TRANSFER RULES:
// - Use the exact garment from garment_image
// - Preserve garment color accurately
// - Preserve fabric texture accurately
// - Preserve patterns accurately
// - Preserve branding and logos accurately
// - Preserve collar design accurately
// - Preserve buttons and stitching accurately
// - Preserve sleeve style accurately
// - Preserve garment fit and structure accurately

// FITTING REQUIREMENTS:
// - Align garment naturally with shoulders, chest, arms, torso
// - Generate realistic fabric folds, draping, shadows, and garment tension
// - Match body posture correctly

// IMAGE QUALITY:
// - Photorealistic, high resolution, professional fashion photography / e-commerce catalog quality
// - Natural and consistent lighting, sharp details, realistic fabric rendering

// NEGATIVE REQUIREMENTS:
// - No face changes, body deformation, anatomy errors, extra/duplicated body parts
// - No blurred garment details, color shifts, logo distortion
// - No background modification, unrealistic folds
// - No cartoon or illustration style

// OUTPUT:
// Generate one final image showing the user realistically wearing the selected garment.`;

// const bufferToDataUrl = (file) => {
//   const b64 = file.buffer.toString('base64');
//   return `data:${file.mimetype};base64,${b64}`;
// };

// export const virtualTryOn = async (req, res) => {
//   try {
//     const personFile = req.files?.person_image?.[0];
//     const garmentFile = req.files?.garment_image?.[0];

//     if (!personFile || !garmentFile) {
//       return res.status(400).json({
//         ok: false,
//         error: 'Both person_image and garment_image are required.',
//       });
//     }

//     const personDataUrl = bufferToDataUrl(personFile);
//     const garmentDataUrl = bufferToDataUrl(garmentFile);

//     const response = await axios.post(
//       'https://openrouter.ai/api/v1/chat/completions',
//       {
//         // Nano Banana 2 — better identity preservation across multiple images.
//         // Fallback to 'google/gemini-2.5-flash-image' if this preview model
//         // is ever unavailable on your account.
//         model: 'google/gemini-3.1-flash-image-preview',
//         messages: [
//           {
//             role: 'user',
//             content: [
//               { type: 'text', text: TRY_ON_PROMPT },
//               { type: 'image_url', image_url: { url: personDataUrl } },
//               { type: 'image_url', image_url: { url: garmentDataUrl } },
//             ],
//           },
//         ],
//         modalities: ['image', 'text'],
//         image_config: {
//           aspect_ratio: '3:4', // portrait, matches typical fashion catalog shots
//           image_size: '2K',
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
//           'Content-Type': 'application/json',
//           // Optional but recommended by OpenRouter for app attribution:
//           'HTTP-Referer': env.APP_URL || 'http://localhost:5173',
//           'X-Title': 'Male Fashion - Virtual Try-On',
//         },
//         timeout: 60_000,
//       }
//     );

//     const message = response.data?.choices?.[0]?.message;
//     const images = message?.images;

//     if (!images || !images.length) {
//       console.error('No image returned from model:', message?.content);
//       return res.status(502).json({
//         ok: false,
//         error: 'The try-on model did not return an image. Please try again.',
//       });
//     }

//     // images[0].image_url.url is a base64 data URL (data:image/png;base64,...)
//     return res.json({
//       ok: true,
//       image: images[0].image_url.url,
//       note: message?.content || null,
//     });
//   } catch (err) {
//     console.error('Virtual Try-On error:', err.response?.data || err.message);
//     return res.status(500).json({
//       ok: false,
//       error: 'Virtual try-on failed. Please try again with clearer photos.',
//     });
//   }
// };

// export default { tryOnUpload, virtualTryOn };

// backend/controllers/virtualTryOnController.js
import multer from 'multer';
import axios from 'axios';
import { env } from '../config/env.js';

// Accept up to 2 images in memory (person + garment), 8MB cap each.
export const tryOnUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
}).fields([
  { name: 'person_image', maxCount: 1 },
  { name: 'garment_image', maxCount: 1 },
]);

// The exact system instructions you wrote, kept verbatim as the prompt sent
// to the model — this is what tells Gemini how to treat the two images.
const TRY_ON_PROMPT = `You are an advanced AI Virtual Try-On Engine for an e-commerce clothing platform.

MISSION:
Generate a realistic virtual try-on image by dressing the person in the uploaded photo with the selected garment.

INPUTS:
1. person_image = first uploaded image (the user)
2. garment_image = second uploaded image (the selected clothing product)

PRIMARY OBJECTIVE:
Replace the user's current upper-body clothing with the garment from garment_image while preserving the person's identity and the original scene.

STRICT PRESERVATION RULES:
- Preserve face exactly
- Preserve facial expression exactly
- Preserve hairstyle exactly
- Preserve skin tone exactly
- Preserve body shape exactly
- Preserve body proportions exactly
- Preserve pose exactly
- Preserve hands exactly
- Preserve background exactly
- Preserve camera angle exactly
- Preserve image composition exactly

GARMENT TRANSFER RULES:
- Use the exact garment from garment_image
- Preserve garment color accurately
- Preserve fabric texture accurately
- Preserve patterns accurately
- Preserve branding and logos accurately
- Preserve collar design accurately
- Preserve buttons and stitching accurately
- Preserve sleeve style accurately
- Preserve garment fit and structure accurately

FITTING REQUIREMENTS:
- Align garment naturally with shoulders, chest, arms, torso
- Generate realistic fabric folds, draping, shadows, and garment tension
- Match body posture correctly

IMAGE QUALITY:
- Photorealistic, high resolution, professional fashion photography / e-commerce catalog quality
- Natural and consistent lighting, sharp details, realistic fabric rendering

NEGATIVE REQUIREMENTS:
- No face changes, body deformation, anatomy errors, extra/duplicated body parts
- No blurred garment details, color shifts, logo distortion
- No background modification, unrealistic folds
- No cartoon or illustration style

OUTPUT:
Generate one final image showing the user realistically wearing the selected garment.`;

const bufferToDataUrl = (file) => {
  const b64 = file.buffer.toString('base64');
  return `data:${file.mimetype};base64,${b64}`;
};

export const virtualTryOn = async (req, res) => {
  try {
    const personFile = req.files?.person_image?.[0];
    const garmentFile = req.files?.garment_image?.[0];

    if (!personFile || !garmentFile) {
      return res.status(400).json({
        ok: false,
        error: 'Both person_image and garment_image are required.',
      });
    }

    const personDataUrl = bufferToDataUrl(personFile);
    const garmentDataUrl = bufferToDataUrl(garmentFile);

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        // Nano Banana 2 — better identity preservation across multiple images.
        // Fallback to 'google/gemini-2.5-flash-image' if this preview model
        // is ever unavailable on your account.
        model: 'google/gemini-3.1-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: TRY_ON_PROMPT },
              { type: 'image_url', image_url: { url: personDataUrl } },
              { type: 'image_url', image_url: { url: garmentDataUrl } },
            ],
          },
        ],
        modalities: ['image', 'text'],
        max_tokens: 4096,
        image_config: {
          aspect_ratio: '3:4', // portrait, matches typical fashion catalog shots
          image_size: '1K', // lower than 2K to fit within typical free/low-balance credit limits
        },
      },
      {
        headers: {
          Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          // Optional but recommended by OpenRouter for app attribution:
          'HTTP-Referer': env.APP_URL || 'http://localhost:5173',
          'X-Title': 'Male Fashion - Virtual Try-On',
        },
        timeout: 60_000,
      }
    );

    const message = response.data?.choices?.[0]?.message;
    const images = message?.images;

    if (!images || !images.length) {
      console.error('No image returned from model:', message?.content);
      return res.status(502).json({
        ok: false,
        error: 'The try-on model did not return an image. Please try again.',
      });
    }

    // images[0].image_url.url is a base64 data URL (data:image/png;base64,...)
    return res.json({
      ok: true,
      image: images[0].image_url.url,
      note: message?.content || null,
    });
  } catch (err) {
    console.error('Virtual Try-On error:', err.response?.data || err.message);
    return res.status(500).json({
      ok: false,
      error: 'Virtual try-on failed. Please try again with clearer photos.',
    });
  }
};

export default { tryOnUpload, virtualTryOn };