'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Bell,
  Store,
  CheckCircle,
  Truck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { io } from 'socket.io-client';
import { PRODUCTS as INITIAL_PRODUCTS, PRODUCT_UNITS } from '../../data/products';
import { useOrderStore } from '../../store/useOrderStore';
import { useJourneyGalleryStore } from '../../store/useJourneyGalleryStore';
import ProductMediaManager from '../../components/admin/ProductMediaManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'orders' | 'inventory' | 'media' | 'gallery' | 'seasons' | 'coupons'
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForMedia, setSelectedProductForMedia] = useState(null);
  const { orders: localOrders, addOrder } = useOrderStore();

  // Admin Live Orders & Real-time Notifications State
  const [backendOrders, setBackendOrders] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: "notif_init_1",
      orderId: "VWB-2026-881920",
      customerName: "Rohan Verma",
      totalAmount: 1175,
      itemsCount: 2,
      paymentStatus: "PAID",
      orderStatus: "CONFIRMED",
      pickupMethod: "STORE_PICKUP",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      read: false
    }
  ]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // 1. Fetch Orders from Backend & Establish Socket.IO Real-time Listener
  useEffect(() => {
    // Fetch initial backend orders
    const fetchBackendOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/orders`);
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          setBackendOrders(data.orders);
        }
      } catch (err) {
        console.warn("Could not fetch backend orders:", err.message);
      }
    };

    fetchBackendOrders();

    // Initialize Socket.IO Client Connection
    const socket = io(API_URL, {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('🔌 [ADMIN SOCKET] Connected to real-time notification gateway.');
    });

    // Real-Time Event: NEW_PAID_ORDER
    socket.on('new_order', (data) => {
      console.log('🔔 [ADMIN REAL-TIME NOTIFICATION] New order received:', data);

      const newNotif = {
        id: `notif_${Date.now()}`,
        orderId: data.orderId,
        customerName: data.customerName,
        totalAmount: data.totalAmount,
        itemsCount: data.itemsCount || data.order?.items?.length || 1,
        paymentStatus: data.paymentStatus || 'PAID',
        orderStatus: data.orderStatus || 'CONFIRMED',
        pickupMethod: data.pickupMethod || 'STORE_PICKUP',
        createdAt: data.createdAt || new Date().toISOString(),
        read: false,
        orderData: data.order
      };

      setNotifications((prev) => [newNotif, ...prev]);

      if (data.order) {
        setBackendOrders((prev) => [data.order, ...prev.filter(o => o.orderId !== data.orderId)]);
      }
    });

    // Real-Time Event: ORDER_STATUS_UPDATED
    socket.on('order_status_updated', (data) => {
      setBackendOrders((prev) => 
        prev.map(o => (o.orderId === data.orderId || o.id === data.orderId) ? { ...o, orderStatus: data.orderStatus } : o)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [API_URL]);

  // Handle Updating Order Status on Backend
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus })
      });

      const data = await res.json();
      if (data.success) {
        setBackendOrders((prev) => 
          prev.map(o => (o.orderId === orderId || o.id === orderId) ? { ...o, orderStatus: newStatus } : o)
        );
        if (selectedOrderModal && (selectedOrderModal.orderId === orderId || selectedOrderModal.id === orderId)) {
          setSelectedOrderModal({ ...selectedOrderModal, orderStatus: newStatus });
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notif) => {
    // Mark read
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setShowNotificationDropdown(false);
    
    // Find order and open modal in orders tab
    const matched = backendOrders.find(o => o.orderId === notif.orderId || o.id === notif.orderId);
    if (matched) {
      setSelectedOrderModal(matched);
    }
    setActiveTab('orders');
  };

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

  const displayOrders = backendOrders.length > 0 ? backendOrders : localOrders;

  return (
    <div className="min-h-screen bg-[#06241B] text-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header with Real-Time Notification Bell */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#D4AF37]/20 pb-6 relative">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                👑 Executive Admin Portal • Role: Super Admin
              </span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#D4AF37] mt-2">
              VINDHYAWASINI TILKUT BHANDAR Command Center
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Real-time Notification Bell Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                className="relative p-2.5 bg-[#0B3D2E] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-gold-glow"
                title="Live Paid Order Notifications"
              >
                <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'animate-bounce text-[#D4AF37]' : ''}`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow border border-rose-400 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0B3D2E] border border-[#D4AF37] rounded-3xl shadow-2xl z-50 overflow-hidden text-xs">
                  <div className="p-4 bg-[#06241B] border-b border-[#D4AF37]/20 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-[#D4AF37] font-bold">
                      <Bell className="w-4 h-4" />
                      <span>Live Order Notifications ({unreadCount} New)</span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                        className="text-[10px] text-[#D4AF37]/80 hover:text-[#D4AF37] underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#D4AF37]/15">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-[#FAF7F2]/60 text-xs">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`p-4 hover:bg-[#D4AF37]/10 transition-all cursor-pointer space-y-1.5 ${
                            !notif.read ? 'bg-[#D4AF37]/15 border-l-4 border-[#D4AF37]' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start font-bold">
                            <span className="text-[#D4AF37] font-mono">🔔 New Order {notif.orderId}</span>
                            <span className="text-[10px] text-[#FAF7F2]/60 font-mono">
                              {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          
                          <div className="text-white font-medium">
                            {notif.customerName} • <strong className="text-emerald-400">₹{notif.totalAmount}</strong> ({notif.itemsCount} Items)
                          </div>

                          <div className="flex items-center space-x-2 text-[10px]">
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                              Payment: {notif.paymentStatus}
                            </span>
                            <span className="bg-[#06241B] text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded font-bold">
                              Status: {notif.orderStatus}
                            </span>
                            <span className="text-[#FAF7F2]/70 font-semibold">🛍 Store Pickup</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
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
                  className={`px-4 py-2 rounded-xl font-bold capitalize transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-[#D4AF37] text-[#0B3D2E] shadow-gold-glow' 
                      : 'bg-[#0B3D2E] text-[#FAF7F2]/70 border border-[#D4AF37]/30 hover:border-[#D4AF37]'
                  }`}
                >
                  {tab === 'gallery' ? 'Photo Gallery Journey' : tab === 'media' ? 'Product Media Manager' : tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#0B3D2E]/80 rounded-3xl border border-[#D4AF37]/30 shadow-luxury space-y-2">
            <div className="flex justify-between items-center text-[#D4AF37]">
              <span className="text-xs uppercase tracking-wider font-bold">Total Sales Revenue</span>
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-white">₹7,40,000</div>
            <span className="text-[11px] text-emerald-400 font-semibold">↑ +24.8% vs last month</span>
          </div>

          <div className="p-6 bg-[#0B3D2E]/80 rounded-3xl border border-[#D4AF37]/30 shadow-luxury space-y-2">
            <div className="flex justify-between items-center text-[#D4AF37]">
              <span className="text-xs uppercase tracking-wider font-bold">Live Placed Orders</span>
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-white">{displayOrders.length}</div>
            <span className="text-[11px] text-emerald-400 font-semibold">Store Pickup Active</span>
          </div>

          <div className="p-6 bg-[#0B3D2E]/80 rounded-3xl border border-[#D4AF37]/30 shadow-luxury space-y-2">
            <div className="flex justify-between items-center text-[#D4AF37]">
              <span className="text-xs uppercase tracking-wider font-bold">Top Bihari Item</span>
              <Flame className="w-5 h-5" />
            </div>
            <div className="font-serif-luxury text-lg font-bold text-white truncate">Authentic Gud Tilkut</div>
            <span className="text-[11px] text-[#FAF7F2]/70">Gaya Special Artisanal</span>
          </div>

          <div className="p-6 bg-[#0B3D2E]/80 rounded-3xl border border-[#D4AF37]/30 shadow-luxury space-y-2">
            <div className="flex justify-between items-center text-[#D4AF37]">
              <span className="text-xs uppercase tracking-wider font-bold">Active Products</span>
              <Package className="w-5 h-5" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-white">{productsList.length}</div>
            <span className="text-[11px] text-emerald-400 font-semibold">All Confections Active</span>
          </div>
        </div>

        {/* TAB 1: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-[#0B3D2E]/90 p-8 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-xl font-bold text-[#D4AF37]">Monthly Revenue Performance (INR)</h3>
              <span className="text-xs text-[#FAF7F2]/70">Live Store Analytics</span>
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
          <div className="bg-[#0B3D2E]/90 p-8 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-xl font-bold text-[#D4AF37]">Live Customer Store Pickup Orders</h3>
              <span className="text-xs text-[#FAF7F2]/70 bg-[#06241B] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                ⚡ Real-time Socket.IO Sync Active
              </span>
            </div>

            {displayOrders.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#FAF7F2]/70 space-y-2 bg-[#06241B] rounded-2xl border border-[#D4AF37]/20">
                <ShoppingBag className="w-8 h-8 mx-auto text-[#D4AF37]/40" />
                <p>No customer orders placed yet.</p>
                <p className="text-[10px] text-[#FAF7F2]/50">When patrons place paid store pickup orders, they will appear here in real-time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#D4AF37]/30 text-[#D4AF37] font-bold">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Fulfillment</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment Status</th>
                      <th className="pb-3">Order Status</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4AF37]/15">
                    {displayOrders.map((ord) => {
                      const displayId = ord.orderId || ord.id;
                      const customerName = ord.customerName || ord.recipientName || "Patron";
                      const customerPhone = ord.customerPhone || ord.recipientPhone || "N/A";
                      const totalAmount = ord.totalAmount || ord.grandTotal || 0;
                      const payStatus = ord.paymentStatus || 'PAID';
                      const ordStatus = ord.orderStatus || ord.status || 'CONFIRMED';

                      return (
                        <tr key={displayId} className="hover:bg-[#D4AF37]/5 transition-all">
                          <td className="py-4 font-bold text-[#D4AF37] font-mono">{displayId}</td>
                          <td className="py-4">
                            <div className="font-bold text-white">{customerName}</div>
                            <div className="text-[10px] text-[#FAF7F2]/60 font-mono">{customerPhone}</div>
                          </td>
                          <td className="py-4 text-[#FAF7F2]/80">🛍 STORE PICKUP</td>
                          <td className="py-4 font-bold text-emerald-400 font-mono">₹{totalAmount}</td>
                          <td className="py-4">
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold text-[10px]">
                              {payStatus}
                            </span>
                          </td>
                          <td className="py-4">
                            <select
                              disabled={isUpdatingStatus}
                              value={ordStatus}
                              onChange={(e) => handleUpdateOrderStatus(displayId, e.target.value)}
                              className="bg-[#06241B] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                            >
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="PREPARING">PREPARING</option>
                              <option value="READY_FOR_PICKUP">READY FOR PICKUP</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() => setSelectedOrderModal(ord)}
                              className="text-[11px] bg-[#06241B] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ORDER DETAILS MODAL */}
        {selectedOrderModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-xl w-full bg-[#0B3D2E] p-8 rounded-3xl border border-[#D4AF37] shadow-2xl space-y-6 text-[#FAF7F2]">
              <button
                onClick={() => setSelectedOrderModal(null)}
                className="absolute top-4 right-4 text-[#D4AF37] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 border-b border-[#D4AF37]/20 pb-4">
                <span className="text-xs uppercase font-bold text-[#D4AF37]">
                  Order Details Preview
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#D4AF37] font-mono">
                  {selectedOrderModal.orderId || selectedOrderModal.id}
                </h3>
              </div>

              <div className="bg-[#06241B] p-4 rounded-2xl border border-[#D4AF37]/20 space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#D4AF37]/15 pb-2">
                  <span>Customer: <strong className="text-white">{selectedOrderModal.customerName || selectedOrderModal.recipientName}</strong></span>
                  <span>Mobile: <strong className="text-[#D4AF37] font-mono">{selectedOrderModal.customerPhone || selectedOrderModal.recipientPhone}</strong></span>
                </div>

                <div className="flex justify-between">
                  <span>Fulfillment: <strong className="text-white">🛍 STORE PICKUP</strong></span>
                  <span>Payment: <strong className="text-emerald-400">{selectedOrderModal.paymentStatus || 'PAID'}</strong></span>
                </div>

                {selectedOrderModal.items && (
                  <div className="space-y-1.5 pt-2 border-t border-[#D4AF37]/15">
                    <span className="font-bold text-[#D4AF37] block">Items Ordered:</span>
                    {selectedOrderModal.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{it.name} ({it.unit || '500g'}) × {it.quantity || 1}</span>
                        <span className="font-bold">₹{it.price * (it.quantity || 1)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold text-[#D4AF37] pt-2 border-t border-[#D4AF37]/15">
                  <span>Grand Total:</span>
                  <span>₹{selectedOrderModal.totalAmount || selectedOrderModal.grandTotal}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#D4AF37] block">Update Order Status:</label>
                <div className="flex flex-wrap gap-2">
                  {['CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'COMPLETED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateOrderStatus(selectedOrderModal.orderId || selectedOrderModal.id, st)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        (selectedOrderModal.orderStatus || selectedOrderModal.status) === st
                          ? 'bg-[#D4AF37] text-[#0B3D2E] shadow-gold-glow'
                          : 'bg-[#06241B] text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
                      }`}
                    >
                      {st.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedOrderModal(null)}
                className="w-full bg-[#06241B] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs py-3 rounded-xl hover:border-[#D4AF37]"
              >
                Close Details
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="bg-[#0B3D2E]/90 p-8 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-serif-luxury text-xl font-bold text-[#D4AF37]">Artisanal Product Inventory</h3>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                <input 
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#06241B] border border-[#D4AF37]/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto pr-2">
              {filteredProducts.map((p) => (
                <div key={p.id} className="p-4 bg-[#06241B] rounded-2xl border border-[#D4AF37]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-3 items-center">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-12 h-12 object-cover rounded-xl border border-[#D4AF37]/30 shrink-0" 
                        />
                        <div>
                          <span className="text-[10px] text-[#FAF7F2]/60 uppercase">{p.category}</span>
                          <h4 className="font-bold text-[#D4AF37] text-sm truncate max-w-[150px]">{p.name}</h4>
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

                    <div className="flex items-center justify-between text-xs text-[#FAF7F2]/70">
                      <span>Price: <strong className="text-white">₹{p.price}</strong> / {p.unit}</span>
                      <span>Season: <strong className="text-[#D4AF37]">{p.season || 'All Year'}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProductForMedia(p);
                      setActiveTab('media');
                    }}
                    className="w-full bg-[#0B3D2E] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-bold py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all"
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
            <div className="bg-[#0B3D2E]/90 p-6 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-serif-luxury text-xl font-bold text-[#D4AF37] flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
                  <span>Select Product to Manage Media</span>
                </h3>

                <select
                  value={selectedProductForMedia?.id || ''}
                  onChange={(e) => {
                    const prod = productsList.find(p => p.id === e.target.value);
                    if (prod) setSelectedProductForMedia(prod);
                  }}
                  className="bg-[#06241B] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none w-full sm:w-72"
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
          <div className="bg-[#0B3D2E]/90 p-8 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif-luxury text-xl font-bold text-[#D4AF37]">Season Assignment Controls</h3>
              <p className="text-xs text-[#FAF7F2]/70">
                Assign seasonal tags (Winter, Summer, Festival, All Year). The website automatically displays "Available Only During Winter" badges on product cards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productsList.slice(0, 8).map((p) => (
                <div key={p.id} className="bg-[#06241B] p-4 rounded-xl border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{p.name}</h4>
                    <span className="text-xs text-[#D4AF37] font-semibold">Current Season: {p.season || 'All Year'}</span>
                  </div>

                  <select 
                    value={p.season || 'All Year'}
                    onChange={(e) => toggleProductSeason(p.id, e.target.value)}
                    className="bg-[#0B3D2E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none"
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
          <div className="bg-[#0B3D2E]/90 p-8 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-[#D4AF37]">Promo & Festival Coupon Management</h3>

            <form onSubmit={handleAddCoupon} className="flex flex-col sm:flex-row gap-3 bg-[#06241B] p-4 rounded-2xl border border-[#D4AF37]/30">
              <input 
                type="text" 
                placeholder="Coupon Code (e.g. WINTER25)" 
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="bg-[#0B3D2E] border border-[#D4AF37]/30 text-white text-xs px-4 py-2.5 rounded-xl flex-1 focus:outline-none"
              />
              <input 
                type="number" 
                placeholder="Discount % (e.g. 25)" 
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(e.target.value)}
                className="bg-[#0B3D2E] border border-[#D4AF37]/30 text-white text-xs px-4 py-2.5 rounded-xl w-32 focus:outline-none"
              />
              <button type="submit" className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold shrink-0">
                Create Coupon
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coupons.map((c, idx) => (
                <div key={idx} className="bg-[#06241B] p-4 rounded-2xl border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[#D4AF37] font-bold text-lg">{c.code}</span>
                    <span className="text-xs text-[#FAF7F2]/60 block">Min order ₹{c.minOrder}</span>
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
          <div className="bg-[#0B3D2E]/90 p-8 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#D4AF37] flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" />
                  <span>Photo Wall Journey Management</span>
                </h3>
                <p className="text-xs text-[#FAF7F2]/70 mt-1">
                  Upload images, reorder cards, change captions, pick the cover image, and enable/disable photos for "Our Journey Through the Years".
                </p>
              </div>

              <button
                onClick={resetToDefaults}
                className="bg-[#06241B] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#FAF7F2]/70 hover:text-[#D4AF37] text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default Gallery</span>
              </button>
            </div>

            {/* Upload & Add Photo Form */}
            <div className="bg-[#06241B] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4">
              <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">Add New Journey Photo</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* File Upload Box */}
                <div className="relative border-2 border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl p-6 text-center transition-all bg-[#0B3D2E]/40 flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="w-8 h-8 text-[#D4AF37] mb-2" />
                  <span className="text-xs font-bold text-white">Click or Drag Image File to Upload</span>
                  <span className="text-[10px] text-[#FAF7F2]/60 mt-1">PNG, JPG, WEBP formats supported</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {/* URL Input Box */}
                <form onSubmit={handleAddUrlImage} className="space-y-3 flex flex-col justify-between bg-[#0B3D2E]/40 p-4 rounded-2xl border border-[#D4AF37]/20">
                  <div className="space-y-2">
                    <label className="text-xs text-[#D4AF37] font-semibold block">Or Add Image via Web URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="w-full bg-[#06241B] border border-[#D4AF37]/30 text-white text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-[#D4AF37] font-semibold block">Optional Caption Placeholder</label>
                    <input
                      type="text"
                      placeholder="Small Caption Placeholder"
                      value={imageCaptionInput}
                      onChange={(e) => setImageCaptionInput(e.target.value)}
                      className="w-full bg-[#06241B] border border-[#D4AF37]/30 text-white text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#D4AF37]"
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
              <div className="flex justify-between items-center text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <span>Current Gallery Photos ({photos.length})</span>
                <span className="text-[10px] text-[#FAF7F2]/60 font-normal lowercase">Use Up / Down buttons to reorder</span>
              </div>

              {photos.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#FAF7F2]/60 bg-[#06241B] rounded-2xl border border-[#D4AF37]/20 space-y-2">
                  <ImageIcon className="w-8 h-8 mx-auto text-[#D4AF37]/40" />
                  <p>No photos in gallery.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-center gap-4 ${
                        photo.isCover
                          ? 'bg-[#06241B] border-[#D4AF37] shadow-gold-glow'
                          : photo.enabled
                          ? 'bg-[#06241B] border-[#D4AF37]/30'
                          : 'bg-[#06241B]/50 border-[#D4AF37]/10 opacity-65'
                      }`}
                    >
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-[#D4AF37]/30 shrink-0">
                        <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                        {photo.isCover && (
                          <span className="absolute top-1 left-1 bg-[#D4AF37] text-[#0B3D2E] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                            COVER
                          </span>
                        )}
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded">
                            Position #{index + 1}
                          </span>
                        </div>

                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => updateCaption(photo.id, e.target.value)}
                          placeholder="Small Caption Placeholder"
                          className="w-full bg-[#0B3D2E] border border-[#D4AF37]/20 text-white text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <div className="flex items-center bg-[#0B3D2E] rounded-lg border border-[#D4AF37]/20">
                          <button
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                            className="p-1.5 text-[#D4AF37] hover:text-white disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveDown(index)}
                            disabled={index === photos.length - 1}
                            className="p-1.5 text-[#D4AF37] hover:text-white disabled:opacity-30 border-l border-[#D4AF37]/20"
                            title="Move Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => setCoverImage(photo.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 border transition-all ${
                            photo.isCover
                              ? 'bg-[#D4AF37] text-[#0B3D2E] border-[#D4AF37]'
                              : 'bg-[#0B3D2E] text-[#D4AF37] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{photo.isCover ? 'Cover Image' : 'Set Cover'}</span>
                        </button>

                        <button
                          onClick={() => toggleEnabled(photo.id)}
                          className={`p-1.5 rounded-lg text-xs border transition-all ${
                            photo.enabled
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900'
                              : 'bg-rose-950 text-rose-300 border-rose-500/40 hover:bg-rose-900'
                          }`}
                        >
                          {photo.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => deleteImage(photo.id)}
                          className="p-1.5 bg-rose-950/80 text-rose-300 border border-rose-500/40 rounded-lg hover:bg-rose-900 transition-all"
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
