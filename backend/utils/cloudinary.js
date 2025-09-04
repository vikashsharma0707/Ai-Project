// Optional stub util if you later switch to Cloudinary.
// Right now uploads are handled by Multer → /uploads folder served statically.
export const cloudinaryUploadStub = async (localPath) => {
  return { url: localPath }; // keep path as-is
};
