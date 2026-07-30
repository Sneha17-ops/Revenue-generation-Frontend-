'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Tag, 
  Clock, 
  CheckCircle2,
  DollarSign,
  Calendar,
  AlertTriangle,
  Flame,
  Search,
  Filter,
  Check,
  X,
  Image as ImageIcon,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Star,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PRODUCTS as INITIAL_PRODUCTS, PRODUCT_UNITS } from '../../data/products';
import { useOrderStore } from '../../store/useOrderStore';
import { useJourneyGalleryStore } from '../../store/useJourneyGalleryStore';
import ProductMediaManager from '../../components/admin/ProductMediaManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'orders' | 'inventory' | 'media' | 'gallery' | 'seasons' | 'coupons'
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForMedia, setSelectedProductForMedia] = useState(null);
  const { orders, addOrder } = useOrderStore();

  // Gallery Store Hooks & State
  const { 
    photos, 
    addImage, 
    deleteImage, 
    updateCaption, 
    setCoverImage, 
    toggleEnabled, 
    moveUp, 
    moveDown,
    resetToDefaults 
  } = useJourneyGalleryStore();

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageCaptionInput, setImageCaptionInput] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        addImage({ 
          url: event.target.result, 
          caption: imageCaptionInput || `Photo ${photos.length + 1} • Small Caption Placeholder` 
        });
        setImageCaptionInput('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddUrlImage = (e) => {
    e.preventDefault();
    if (!imageUrlInput) return;
    addImage({ 
      url: imageUrlInput, 
      caption: imageCaptionInput || `Photo ${photos.length + 1} • Small Caption Placeholder` 
    });
    setImageUrlInput('');
    setImageCaptionInput('');
  };

  const handleUpdateProductMedia = (updatedProduct) => {
    setProductsList(productsList.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const ANALYTICS_DATA = [
    { month: 'Jan', sales: 320000 },
    { month: 'Feb', sales: 410000 },
    { month: 'Mar', sales: 380000 },
    { month: 'Apr', sales: 520000 },
    { month: 'May', sales: 490000 },
    { month: 'Jun', sales: 680000 },
    { month: 'Jul', sales: 740000 },
  ];

  const [coupons, setCoupons] = useState([
    { code: "BIHAR10", discountPercent: 10, minOrder: 500, active: true },
    { code: "FESTIVE20", discountPercent: 20, minOrder: 1500, active: true }
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');

  const toggleProductSeason = (prodId, newSeason) => {
    setProductsList(productsList.map(p => {
      if (p.id === prodId) {
        return {
          ...p,
          season: newSeason,
          seasonNotice: newSeason === 'Winter' ? 'Available Only During Winter' : newSeason === 'Summer' ? 'Available Only During Summer' : null
        };
      }
      return p;
    }));
  };

  const toggleProductStock = (prodId) => {
    setProductsList(productsList.map(p => {
      if (p.id === prodId) {
        const nextAvail = p.availability === 'In Stock' ? 'Out of Stock' : 'In Stock';
        return { ...p, availability: nextAvail };
      }
      return p;
    }));
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (newCouponCode && newCouponDiscount) {
      setCoupons([...coupons, {
        code: newCouponCode.toUpperCase(),
        discountPercent: Number(newCouponDiscount),
        minOrder: 500,
        active: true
      }]);
      setNewCouponCode('');
      setNewCouponDiscount('');
    }
  };

  const filteredProducts = productsList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-royal-greenDark text-royal-ivory py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-royal-gold/20 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-royal-gold font-bold bg-royal-gold/20 px-3 py-1 rounded-full border border-royal-gold/30">
                👑 Executive Admin Portal • Role: Super Admin
              </span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-royal-gold mt-2">
              Bindhyawasini Command Center
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {['analytics', 'orders', 'inventory', 'media', 'gallery', 'seasons', 'coupons'].map((tab) => (
              <button 
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'media' && !selectedProductForMedia && productsList.length > 0) {
                    setSelectedProductForMedia(productsList[0]);
                  }
                }}
                className={`px-4 py-2 rounded-xl font-bold capitalize transition-all ${
                  activeTab === tab ? 'bg-royal-gold text-royal-green shadow-gold-glow' : 'bg-royal-green text-royal-goldMuted border border-royal-gold/30'
                }`}
              >
                {tab === 'gallery' ? 'Photo Gallery Journey' : tab === 'media' ? 'Product Media Manager' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-royal-green/80 rounded-3xl border border-royal-gold/30 shadow-luxury space-y-2">
            <div className="flex justify-between items-center text-royal-gold">
              <span className="text-xs uppercase tracking-wider font-bold">Total Sales Revenue</span>
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-royal-ivory">₹7,40,000</div>
            <span className="text-[11px] text-emerald-400 font-semibold">↑ +24.8% vs last month</span>
          </div>

          <div className="p-6 bg-royal-green/80 rounded-3xl border border-royal-gold/30 shadow-luxury space-y-2">
            <div className="flex justify-between items-center text-royal-gold">
              <span className="text-xs uppercase tracking-wider font-bold">Live Placed Orders</span>
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-royal-ivory">{orders.length}</div>
            <span className="text-[11px] text-emerald-400 font-semibold">City Express Active</span>
          </div>

          <div className="p-6 bg-royal-green/80 rounded-3xl border border-royal-gold/30 shadow-luxury space-y-2">
            <div className="flex justify-between items-center text-royal-gold">
              <span className="text-xs uppercase tracking-wider font-bold">Top Bihari Item</span>
              <Flame className="w-5 h-5" />
            </div>
            <div className="font-serif-luxury text-lg font-bold text-royal-ivory truncate">Authentic Gud Tilkut</div>
            <span className="text-[11px] text-royal-goldMuted/70">Gaya Special Artisanal</span>
          </div>

          <div className="p-6 bg-royal-green/80 rounded-3xl border border-royal-gold/30 shadow-luxury space-y-2">
            <div className="flex justify-between items-center text-royal-gold">
              <span className="text-xs uppercase tracking-wider font-bold">Active Products</span>
              <Package className="w-5 h-5" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-royal-ivory">{productsList.length}</div>
            <span className="text-[11px] text-emerald-400 font-semibold">All Bihari Sweets Active</span>
          </div>
        </div>

        {/* TAB 1: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-royal-green/90 p-8 rounded-3xl border border-royal-gold/30 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Monthly Revenue Performance (INR)</h3>
              <span className="text-xs text-royal-goldMuted">Live Store Analytics</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ANALYTICS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.15)" />
                  <XAxis dataKey="month" stroke="#F3E5AB" />
                  <YAxis stroke="#F3E5AB" />
                  <Tooltip contentStyle={{ background: '#0B2519', borderColor: '#D4AF37', color: '#FDFBF7' }} />
                  <Bar dataKey="sales" fill="#D4AF37" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-royal-green/90 p-8 rounded-3xl border border-royal-gold/30 shadow-2xl space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Live Customer Express Orders</h3>

            {orders.length === 0 ? (
              <div className="py-8 text-center text-xs text-royal-goldMuted space-y-2">
                <p>No customer orders placed yet.</p>
                <p className="text-[10px] text-royal-goldMuted/60">When patrons checkout on the storefront, their orders will populate dynamically here in real-time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-royal-gold/30 text-royal-gold font-bold">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Fulfillment Type</th>
                      <th className="pb-3">Grand Total</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-royal-gold/15">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-royal-gold/5">
                        <td className="py-4 font-bold text-royal-gold">{ord.id}</td>
                        <td className="py-4">
                          <div className="font-bold text-royal-ivory">{ord.recipientName || "Patron"}</div>
                          <div className="text-[10px] text-royal-goldMuted">{ord.recipientPhone || "N/A"}</div>
                        </td>
                        <td className="py-4 text-royal-goldMuted">{ord.fulfillmentType === 'pickup' ? 'Store Pickup' : 'City Express Delivery'}</td>
                        <td className="py-4 font-bold text-royal-gold">₹{ord.grandTotal}</td>
                        <td className="py-4">
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold text-[10px]">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="bg-royal-green/90 p-8 rounded-3xl border border-royal-gold/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Artisanal Product Inventory</h3>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
                <input 
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-royal-greenDark border border-royal-gold/30 rounded-xl pl-9 pr-4 py-2 text-xs text-royal-ivory focus:outline-none focus:border-royal-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto pr-2">
              {filteredProducts.map((p) => (
                <div key={p.id} className="p-4 bg-royal-greenDark rounded-2xl border border-royal-gold/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-3 items-center">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-12 h-12 object-cover rounded-xl border border-royal-gold/30 shrink-0" 
                        />
                        <div>
                          <span className="text-[10px] text-royal-goldMuted uppercase">{p.category}</span>
                          <h4 className="font-bold text-royal-gold text-sm truncate max-w-[150px]">{p.name}</h4>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleProductStock(p.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          p.availability === 'In Stock' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : 'bg-rose-950 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {p.availability || 'In Stock'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-royal-goldMuted">
                      <span>Price: <strong className="text-royal-ivory">₹{p.price}</strong> / {p.unit}</span>
                      <span>Season: <strong className="text-royal-gold">{p.season || 'All Year'}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProductForMedia(p);
                      setActiveTab('media');
                    }}
                    className="w-full bg-royal-green border border-royal-gold/30 hover:border-royal-gold text-royal-gold text-xs font-bold py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Manage Product Media</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PRODUCT MEDIA MANAGER */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-royal-green/90 p-6 rounded-3xl border border-royal-gold/30 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-serif-luxury text-xl font-bold text-royal-gold flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-royal-gold" />
                  <span>Select Product to Manage Media</span>
                </h3>

                <select
                  value={selectedProductForMedia?.id || ''}
                  onChange={(e) => {
                    const prod = productsList.find(p => p.id === e.target.value);
                    if (prod) setSelectedProductForMedia(prod);
                  }}
                  className="bg-royal-greenDark border border-royal-gold/40 text-royal-gold text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none w-full sm:w-72"
                >
                  {productsList.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedProductForMedia && (
              <ProductMediaManager
                key={selectedProductForMedia.id}
                selectedProduct={selectedProductForMedia}
                onUpdateProduct={handleUpdateProductMedia}
              />
            )}
          </div>
        )}

        {/* TAB 4: SEASONS */}
        {activeTab === 'seasons' && (
          <div className="bg-royal-green/90 p-8 rounded-3xl border border-royal-gold/30 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Season Assignment Controls</h3>
              <p className="text-xs text-royal-goldMuted">
                Assign seasonal tags (Winter, Summer, Festival, All Year). The website automatically displays "Available Only During Winter" badges on product cards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productsList.slice(0, 8).map((p) => (
                <div key={p.id} className="bg-royal-greenDark p-4 rounded-xl border border-royal-gold/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-royal-ivory text-sm">{p.name}</h4>
                    <span className="text-xs text-royal-gold font-semibold">Current Season: {p.season || 'All Year'}</span>
                  </div>

                  <select 
                    value={p.season || 'All Year'}
                    onChange={(e) => toggleProductSeason(p.id, e.target.value)}
                    className="bg-royal-green border border-royal-gold/40 text-royal-gold text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="All Year">Available All Year</option>
                    <option value="Winter">Winter Special</option>
                    <option value="Summer">Summer Special</option>
                    <option value="Festival">Festival Exclusive</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-royal-green/90 p-8 rounded-3xl border border-royal-gold/30 shadow-2xl space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Promo & Festival Coupon Management</h3>

            <form onSubmit={handleAddCoupon} className="flex flex-col sm:flex-row gap-3 bg-royal-greenDark p-4 rounded-2xl border border-royal-gold/30">
              <input 
                type="text" 
                placeholder="Coupon Code (e.g. WINTER25)" 
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="bg-royal-green border border-royal-gold/30 text-royal-ivory text-xs px-4 py-2.5 rounded-xl flex-1 focus:outline-none"
              />
              <input 
                type="number" 
                placeholder="Discount % (e.g. 25)" 
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(e.target.value)}
                className="bg-royal-green border border-royal-gold/30 text-royal-ivory text-xs px-4 py-2.5 rounded-xl w-32 focus:outline-none"
              />
              <button type="submit" className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold shrink-0">
                Create Coupon
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coupons.map((c, idx) => (
                <div key={idx} className="bg-royal-greenDark p-4 rounded-2xl border border-royal-gold/30 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-royal-gold font-bold text-lg">{c.code}</span>
                    <span className="text-xs text-royal-goldMuted block">Min order ₹{c.minOrder}</span>
                  </div>
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                    {c.discountPercent}% OFF
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PHOTO GALLERY JOURNEY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="bg-royal-green/90 p-8 rounded-3xl border border-royal-gold/30 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-royal-gold flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" />
                  <span>Photo Wall Journey Management</span>
                </h3>
                <p className="text-xs text-royal-goldMuted mt-1">
                  Upload images, reorder cards, change captions, pick the cover image, and enable/disable photos for "Our Journey Through the Years".
                </p>
              </div>

              <button
                onClick={resetToDefaults}
                className="bg-royal-greenDark border border-royal-gold/30 hover:border-royal-gold text-royal-goldMuted hover:text-royal-gold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default Gallery</span>
              </button>
            </div>

            {/* Upload & Add Photo Form */}
            <div className="bg-royal-greenDark p-6 rounded-2xl border border-royal-gold/30 space-y-4">
              <h4 className="text-sm font-bold text-royal-gold uppercase tracking-wider">Add New Journey Photo</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* File Upload Box */}
                <div className="relative border-2 border-dashed border-royal-gold/30 hover:border-royal-gold rounded-2xl p-6 text-center transition-all bg-royal-green/40 flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="w-8 h-8 text-royal-gold mb-2" />
                  <span className="text-xs font-bold text-royal-ivory">Click or Drag Image File to Upload</span>
                  <span className="text-[10px] text-royal-goldMuted/70 mt-1">PNG, JPG, WEBP formats supported</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {/* URL Input Box */}
                <form onSubmit={handleAddUrlImage} className="space-y-3 flex flex-col justify-between bg-royal-green/40 p-4 rounded-2xl border border-royal-gold/20">
                  <div className="space-y-2">
                    <label className="text-xs text-royal-gold font-semibold block">Or Add Image via Web URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="w-full bg-royal-green border border-royal-gold/30 text-royal-ivory text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-royal-gold font-semibold block">Optional Caption Placeholder</label>
                    <input
                      type="text"
                      placeholder="Small Caption Placeholder"
                      value={imageCaptionInput}
                      onChange={(e) => setImageCaptionInput(e.target.value)}
                      className="w-full bg-royal-green border border-royal-gold/30 text-royal-ivory text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold w-full"
                  >
                    Add Image to Gallery
                  </button>
                </form>
              </div>
            </div>

            {/* Gallery Image List & Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-royal-gold uppercase tracking-wider">
                <span>Current Gallery Photos ({photos.length})</span>
                <span className="text-[10px] text-royal-goldMuted font-normal lowercase">Use Up / Down buttons to reorder</span>
              </div>

              {photos.length === 0 ? (
                <div className="py-12 text-center text-xs text-royal-goldMuted bg-royal-greenDark rounded-2xl border border-royal-gold/20 space-y-2">
                  <ImageIcon className="w-8 h-8 mx-auto text-royal-gold/40" />
                  <p>No photos in gallery.</p>
                  <p className="text-[10px] text-royal-goldMuted/60">Upload new images using the panel above.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-center gap-4 ${
                        photo.isCover
                          ? 'bg-royal-greenDark border-royal-gold shadow-gold-glow'
                          : photo.enabled
                          ? 'bg-royal-greenDark border-royal-gold/30'
                          : 'bg-royal-greenDark/50 border-royal-gold/10 opacity-65'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-royal-gold/30 shrink-0">
                        <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                        {photo.isCover && (
                          <span className="absolute top-1 left-1 bg-royal-gold text-royal-green text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                            COVER
                          </span>
                        )}
                      </div>

                      {/* Details & Caption Edit */}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-royal-gold bg-royal-gold/15 px-2 py-0.5 rounded">
                            Position #{index + 1}
                          </span>
                          {!photo.enabled && (
                            <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30">
                              Disabled
                            </span>
                          )}
                        </div>

                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => updateCaption(photo.id, e.target.value)}
                          placeholder="Small Caption Placeholder"
                          className="w-full bg-royal-green border border-royal-gold/20 text-royal-ivory text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-royal-gold"
                        />
                      </div>

                      {/* Controls Toolbar */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* Reorder Buttons */}
                        <div className="flex items-center bg-royal-green rounded-lg border border-royal-gold/20">
                          <button
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                            className="p-1.5 text-royal-gold hover:text-royal-ivory disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveDown(index)}
                            disabled={index === photos.length - 1}
                            className="p-1.5 text-royal-gold hover:text-royal-ivory disabled:opacity-30 border-l border-royal-gold/20"
                            title="Move Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Set Cover Button */}
                        <button
                          onClick={() => setCoverImage(photo.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 border transition-all ${
                            photo.isCover
                              ? 'bg-royal-gold text-royal-green border-royal-gold'
                              : 'bg-royal-green text-royal-gold border-royal-gold/30 hover:border-royal-gold'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{photo.isCover ? 'Cover Image' : 'Set Cover'}</span>
                        </button>

                        {/* Toggle Enable/Disable Button */}
                        <button
                          onClick={() => toggleEnabled(photo.id)}
                          className={`p-1.5 rounded-lg text-xs border transition-all ${
                            photo.enabled
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900'
                              : 'bg-rose-950 text-rose-300 border-rose-500/40 hover:bg-rose-900'
                          }`}
                          title={photo.enabled ? 'Disable Image' : 'Enable Image'}
                        >
                          {photo.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteImage(photo.id)}
                          className="p-1.5 bg-rose-950/80 text-rose-300 border border-rose-500/40 rounded-lg hover:bg-rose-900 transition-all"
                          title="Delete Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
