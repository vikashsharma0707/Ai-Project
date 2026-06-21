// frontend/src/components/VirtualTryOn.jsx
import React, { useRef, useState } from "react";
import http from "../api/http.js";
import { toast } from "react-toastify";

/**
 * Drop this on any product page:
 *   <VirtualTryOn garmentImageUrl={product.images[0]} />
 *
 * It fetches the garment image as a Blob (so it can be sent as multipart
 * form data alongside the user's uploaded photo) and posts both to
 * POST /api/ai/virtual-try-on.
 */
const VirtualTryOn = ({ garmentImageUrl, productTitle = "this item" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [personFile, setPersonFile] = useState(null);
  const [personPreview, setPersonPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a photo (JPG or PNG).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Photo is too large. Please use an image under 8MB.");
      return;
    }

    setPersonFile(file);
    setPersonPreview(URL.createObjectURL(file));
    setResultImage(null);
  };

  const handleTryOn = async () => {
    if (!personFile) {
      toast.error("Upload a full-length photo first.");
      return;
    }

    setLoading(true);
    setResultImage(null);

    try {
      // Pull the garment product image as a blob so it can ride along in
      // the same multipart request as the person's photo.
      const garmentRes = await fetch(garmentImageUrl);
      const garmentBlob = await garmentRes.blob();

      const formData = new FormData();
      formData.append("person_image", personFile);
      formData.append("garment_image", garmentBlob, "garment.jpg");

      const { data } = await http.post("/api/ai/virtual-try-on", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      if (!data?.ok || !data?.image) {
        throw new Error(data?.error || "No image returned");
      }

      setResultImage(data.image);
    } catch (err) {
      console.error("Virtual try-on error:", err);
      const serverError = err.response?.data?.error;
      toast.error(serverError || "Couldn't generate your try-on. Please try a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setPersonFile(null);
    setPersonPreview(null);
    setResultImage(null);
  };

  return (
    <>
      {/* Trigger button — place this near "Add to Cart" / "Buy Now" */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 border-2 border-violet-600 text-violet-600 font-semibold rounded-xl py-3 hover:bg-violet-50 transition active:scale-[0.98]"
      >
        <span className="text-lg">✨</span>
        Try It On
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h3 className="font-semibold text-lg">Virtual Try-On</h3>
                <p className="text-sm text-gray-500">See yourself in {productTitle}</p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-xl transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Result view */}
              {resultImage ? (
                <div className="space-y-4">
                  <img
                    src={resultImage}
                    alt="Virtual try-on result"
                    className="w-full rounded-2xl border border-gray-100"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setResultImage(null)}
                      className="flex-1 border border-gray-300 rounded-xl py-3 font-medium hover:bg-gray-50 transition"
                    >
                      Try Another Photo
                    </button>
                    <a
                      href={resultImage}
                      download="virtual-try-on.png"
                      className="flex-1 text-center bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 font-medium transition"
                    >
                      Save Image
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {/* Upload area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-2xl aspect-[3/4] flex items-center justify-center cursor-pointer hover:border-violet-400 hover:bg-violet-50/40 transition overflow-hidden"
                  >
                    {personPreview ? (
                      <img src={personPreview} alt="Your upload" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center px-6">
                        <div className="text-4xl mb-3">📸</div>
                        <p className="font-medium text-gray-700">Upload a full-length photo</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Stand straight, plain background, good lighting
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {personPreview && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm text-violet-600 font-medium hover:underline"
                    >
                      Change photo
                    </button>
                  )}

                  <button
                    onClick={handleTryOn}
                    disabled={!personFile || loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white font-semibold rounded-xl py-3.5 transition active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Generating your look...
                      </>
                    ) : (
                      "Generate Try-On"
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    Your photo is used only to generate this preview and is not stored.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualTryOn;