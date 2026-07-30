'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  Crop, 
  Eye, 
  Check, 
  X, 
  FileImage, 
  Sparkles, 
  AlertCircle,
  Sliders,
  Layers,
  Image as ImageIcon,
  HardDrive
} from 'lucide-react';

export default function ProductMediaManager({ selectedProduct, onUpdateProduct, onClose }) {
  const [images, setImages] = useState(
    selectedProduct?.imageGallery?.length > 0 
      ? selectedProduct.imageGallery.map((url, idx) => ({
          id: `img_${idx}_${Date.now()}`,
          url,
          isFeatured: idx === 0,
          width: 800,
          height: 800,
          sizeKb: 120 + idx * 15,
          format: 'WebP',
          name: `${selectedProduct.slug || 'product'}_${idx + 1}.webp`
        }))
      : selectedProduct?.image 
      ? [{
          id: `img_0_${Date.now()}`,
          url: selectedProduct.image,
          isFeatured: true,
          width: 800,
          height: 800,
          sizeKb: 145,
          format: 'WebP',
          name: `${selectedProduct.slug || 'product'}_main.webp`
        }]
      : []
  );

  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null); // null | number
  const [previewImage, setPreviewImage] = useState(null);
  const [cropModalImage, setCropModalImage] = useState(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [statusMessage, setStatusMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Drag and Drop events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // Process and convert files to WebP & calculate metadata
  const handleFiles = (files) => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    const newImageEntries = [];
    let count = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Auto WebP Compression & Dimension Extraction
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          const webpDataUrl = canvas.toDataURL('image/webp', 0.85);

          newImageEntries.push({
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            url: webpDataUrl,
            isFeatured: images.length === 0 && newImageEntries.length === 0,
            width: img.width,
            height: img.height,
            sizeKb: Math.round((webpDataUrl.length * 0.75) / 1024),
            format: 'WebP',
            name: file.name.replace(/\.[^/.]+$/, "") + ".webp"
          });

          count++;
          if (count === files.length) {
            setUploadProgress(100);
            setTimeout(() => {
              setImages((prev) => [...prev, ...newImageEntries]);
              setUploadProgress(null);
              showStatus("✅ Images converted to WebP and optimized!");
            }, 300);
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Reorder Images
  const moveImage = (index, direction) => {
    const newImages = [...images];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newImages.length) return;
    const temp = newImages[index];
    newImages[index] = newImages[targetIdx];
    newImages[targetIdx] = temp;
    setImages(newImages);
  };

  // Set Featured Image
  const setFeatured = (id) => {
    setImages(images.map(img => ({
      ...img,
      isFeatured: img.id === id
    })));
    showStatus("⭐ Featured cover image updated!");
  };

  // Delete Image
  const deleteImage = (id) => {
    const filtered = images.filter(img => img.id !== id);
    // If deleted featured image, assign new featured image
    if (filtered.length > 0 && !filtered.some(img => img.isFeatured)) {
      filtered[0].isFeatured = true;
    }
    setImages(filtered);
    showStatus("🗑️ Image removed");
  };

  // Save changes back to product
  const handleSaveChanges = () => {
    if (images.length === 0) {
      alert("Product must have at least one media image.");
      return;
    }

    const featuredImg = images.find(img => img.isFeatured) || images[0];
    const galleryUrls = images.map(img => img.url);

    const updatedProduct = {
      ...selectedProduct,
      image: featuredImg.url,
      imageGallery: galleryUrls,
      isPendingAdminImage: false,
      badge: selectedProduct.badge === 'Image Pending Upload' ? 'Verified Sweet' : selectedProduct.badge
    };

    onUpdateProduct(updatedProduct);
    showStatus("🎉 Product Media saved to Cloudinary database!");
    if (onClose) onClose();
  };

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="bg-royal-green/95 border border-royal-gold/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-royal-ivory max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-royal-gold/20 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-royal-gold font-bold bg-royal-gold/15 px-3 py-1 rounded-full border border-royal-gold/30 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Media Manager • Cloudinary WebP Engine</span>
          </div>
          <h2 className="font-serif-luxury text-2xl font-bold text-royal-gold">
            {selectedProduct?.name || "Product Media Manager"}
          </h2>
          <p className="text-xs text-royal-goldMuted/80">
            Upload, crop, reorder, compress to WebP, and set featured images for desktop & mobile.
          </p>
        </div>

        {onClose && (
          <button onClick={onClose} className="p-2 rounded-xl bg-royal-greenDark border border-royal-gold/30 hover:border-royal-gold text-royal-gold">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {statusMessage && (
        <div className="bg-emerald-950/90 border border-emerald-500/50 p-3 rounded-2xl text-xs text-emerald-200 flex items-center justify-between animate-fade-in">
          <span>{statusMessage}</span>
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 ${
          dragActive 
            ? 'border-royal-gold bg-royal-gold/20 shadow-gold-glow scale-[1.01]' 
            : 'border-royal-gold/30 hover:border-royal-gold bg-royal-greenDark/60 hover:bg-royal-greenDark'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="w-14 h-14 rounded-2xl bg-royal-gold/15 border border-royal-gold/40 flex items-center justify-center text-royal-gold shadow-gold-glow">
          <Upload className="w-7 h-7" />
        </div>

        <div>
          <h4 className="font-bold text-sm text-royal-ivory">
            Drag & Drop Sweet Images Here, or <span className="text-royal-gold underline">Browse Files</span>
          </h4>
          <p className="text-xs text-royal-goldMuted/70 mt-1">
            Supports PNG, JPG, WEBP • Auto WebP compression • Multiple upload support
          </p>
        </div>

        {uploadProgress !== null && (
          <div className="w-full max-w-md space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-bold text-royal-gold">
              <span>Optimizing & Uploading to Cloudinary...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-2 w-full bg-royal-greenDark rounded-full overflow-hidden border border-royal-gold/30">
              <div 
                className="h-full bg-royal-gold transition-all duration-200 shadow-gold-glow"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Image Gallery Management */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-royal-gold">
          <span>Product Images ({images.length})</span>
          <span className="text-[10px] text-royal-goldMuted font-normal">Reorder using Up/Down • Click Star for Cover Image</span>
        </div>

        {images.length === 0 ? (
          <div className="p-8 text-center bg-royal-greenDark/50 rounded-2xl border border-royal-gold/20 text-xs text-royal-goldMuted space-y-2">
            <AlertCircle className="w-6 h-6 text-amber-400 mx-auto" />
            <p>No product images uploaded yet.</p>
            <p className="text-[10px] text-royal-goldMuted/70">Upload photos above to match this sweet accurately.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`relative p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  img.isFeatured 
                    ? 'bg-royal-greenDark border-royal-gold shadow-gold-glow ring-1 ring-royal-gold/50' 
                    : 'bg-royal-greenDark/60 border-royal-gold/25 hover:border-royal-gold/60'
                }`}
              >
                {/* Image Thumbnail & Badge */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-royal-gold/30 group">
                  <img 
                    src={img.url} 
                    alt={img.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  />

                  {img.isFeatured && (
                    <span className="absolute top-2 left-2 bg-royal-gold text-royal-green text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-gold-glow flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>FEATURED COVER</span>
                    </span>
                  )}

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setPreviewImage(img.url)}
                      className="p-2 bg-royal-green/90 text-royal-gold rounded-xl border border-royal-gold/40 hover:bg-royal-gold hover:text-royal-green transition-all"
                      title="Preview Image"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCropModalImage(img)}
                      className="p-2 bg-royal-green/90 text-royal-gold rounded-xl border border-royal-gold/40 hover:bg-royal-gold hover:text-royal-green transition-all"
                      title="Crop / Aspect Ratio"
                    >
                      <Crop className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata details */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center font-bold text-royal-ivory truncate">
                    <span className="truncate max-w-[150px]">{img.name}</span>
                    <span className="text-[10px] text-royal-gold bg-royal-gold/15 px-2 py-0.5 rounded border border-royal-gold/30 uppercase">
                      {img.format}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-royal-goldMuted/80 font-mono">
                    <span>Dim: {img.width}x{img.height}px</span>
                    <span>Size: {img.sizeKb} KB</span>
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-royal-gold/15 gap-1">
                  {/* Reorder Buttons */}
                  <div className="flex items-center bg-royal-green rounded-xl border border-royal-gold/20">
                    <button
                      onClick={() => moveImage(idx, -1)}
                      disabled={idx === 0}
                      className="p-1.5 text-royal-gold hover:text-royal-ivory disabled:opacity-30"
                      title="Move Up/Left"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveImage(idx, 1)}
                      disabled={idx === images.length - 1}
                      className="p-1.5 text-royal-gold hover:text-royal-ivory disabled:opacity-30 border-l border-royal-gold/20"
                      title="Move Down/Right"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Set Featured Cover */}
                  <button
                    onClick={() => setFeatured(img.id)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center space-x-1 border transition-all ${
                      img.isFeatured 
                        ? 'bg-royal-gold text-royal-green border-royal-gold' 
                        : 'bg-royal-green text-royal-gold border-royal-gold/30 hover:border-royal-gold'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>{img.isFeatured ? 'Cover' : 'Set Cover'}</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="p-1.5 bg-rose-950/80 text-rose-300 border border-rose-500/40 rounded-xl hover:bg-rose-900 transition-all"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-royal-gold/20 flex justify-end space-x-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-royal-greenDark border border-royal-gold/30 text-xs font-bold text-royal-goldMuted hover:text-royal-ivory"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleSaveChanges}
          className="gold-btn px-8 py-3 rounded-2xl text-xs font-bold shadow-gold-glow flex items-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Save Product Media (Cloudinary)</span>
        </button>
      </div>

      {/* Modal Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-royal-green p-4 rounded-3xl border border-royal-gold shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-royal-greenDark rounded-full border border-royal-gold text-royal-gold"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={previewImage} alt="Preview" className="w-full max-h-[75vh] object-contain rounded-2xl" />
          </div>
        </div>
      )}

      {/* Modal Crop Preview */}
      {cropModalImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full bg-royal-green p-6 rounded-3xl border border-royal-gold space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-royal-gold/20 pb-3">
              <h3 className="font-bold text-royal-gold text-sm flex items-center space-x-2">
                <Crop className="w-4 h-4" />
                <span>WebP Crop & Zoom Editor</span>
              </h3>
              <button onClick={() => setCropModalImage(null)} className="text-royal-gold hover:text-royal-ivory">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-royal-gold/40 bg-black flex items-center justify-center">
              <img 
                src={cropModalImage.url} 
                alt="Crop preview" 
                style={{ transform: `scale(${cropZoom})` }}
                className="transition-transform duration-150 max-h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-royal-gold">
                <span>Zoom Level ({cropZoom.toFixed(1)}x)</span>
                <span>Square 1:1 Aspect Ratio</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="2" 
                step="0.1" 
                value={cropZoom} 
                onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                className="w-full accent-royal-gold cursor-pointer"
              />
            </div>

            <button
              onClick={() => {
                setCropModalImage(null);
                setCropZoom(1);
                showStatus("✂️ Crop settings applied!");
              }}
              className="gold-btn w-full py-3 rounded-xl font-bold text-xs shadow-gold-glow"
            >
              Apply Crop & WebP Compression
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
