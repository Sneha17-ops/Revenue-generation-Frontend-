'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Phone, ShieldCheck, KeyRound, ArrowRight, UserCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [authMode, setAuthMode] = useState('otp'); // 'otp' | 'email' | 'register' | 'forgot'
  
  // OTP state
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Loading state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login({
        id: `usr_google_${Date.now()}`,
        name: "Valued Royal Connoisseur",
        email: "patron.google@gmail.com",
        role: "customer"
      }, `jwt_google_${Date.now()}`);
      setLoading(false);
    }, 600);
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 500);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setErrorMsg("Enter valid 6-digit OTP (Try 123456)");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login({
        id: `usr_otp_${Date.now()}`,
        name: `Patron (+91 ${phone})`,
        phone: `+91 ${phone}`,
        role: "customer"
      }, `jwt_otp_${Date.now()}`);
      setLoading(false);
    }, 600);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login({
        id: `usr_email_${Date.now()}`,
        name: name || email.split('@')[0],
        email: email,
        role: "customer"
      }, `jwt_email_${Date.now()}`);
      setLoading(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-royal-greenDark border border-royal-gold/40 rounded-2xl shadow-luxury overflow-hidden p-6 sm:p-8"
        >
          {/* Close Button */}
          <button 
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-royal-goldMuted hover:text-royal-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-full bg-royal-gold/10 border border-royal-gold/30 mx-auto flex items-center justify-center text-royal-gold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-royal-gold">
              Patron Authentication
            </h3>
            <p className="text-xs text-royal-goldMuted">
              Please log in to proceed with City Express Order Checkout.
            </p>
          </div>

          {/* Google One Tap CTA */}
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-100 text-slate-800 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-3 text-sm transition-all shadow-md mb-5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-royal-gold/20 mb-5">
            <button
              onClick={() => { setAuthMode('otp'); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all ${
                authMode === 'otp' ? 'border-royal-gold text-royal-gold' : 'border-transparent text-royal-goldMuted'
              }`}
            >
              OTP Login
            </button>
            <button
              onClick={() => { setAuthMode('email'); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all ${
                authMode === 'email' || authMode === 'register' ? 'border-royal-gold text-royal-gold' : 'border-transparent text-royal-goldMuted'
              }`}
            >
              Email Login
            </button>
          </div>

          {errorMsg && (
            <div className="bg-rose-950/80 text-rose-300 text-xs p-3 rounded-lg border border-rose-500/30 mb-4">
              {errorMsg}
            </div>
          )}

          {/* OTP FORM */}
          {authMode === 'otp' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs text-royal-goldMuted mb-1 font-medium">Mobile Number (+91)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
                      <input 
                        type="tel"
                        maxLength="10"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-royal-green/80 border border-royal-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-royal-ivory placeholder-royal-goldMuted/40 focus:outline-none focus:border-royal-gold"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full gold-btn py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2"
                  >
                    <span>{loading ? "Sending..." : "Send OTP"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-500/30 text-xs text-emerald-300">
                    OTP sent to +91 {phone}. Enter <strong>123456</strong> for quick testing.
                  </div>

                  <div>
                    <label className="block text-xs text-royal-goldMuted mb-1 font-medium">6-Digit OTP</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
                      <input 
                        type="text"
                        maxLength="6"
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full bg-royal-green/80 border border-royal-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-royal-ivory tracking-widest focus:outline-none focus:border-royal-gold"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setOtpSent(false)}
                      className="px-3 py-2 text-xs text-royal-goldMuted hover:text-royal-gold"
                    >
                      Change Number
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 gold-btn py-3 rounded-xl font-bold text-sm"
                    >
                      {loading ? "Verifying..." : "Verify & Continue"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* EMAIL FORM */}
          {(authMode === 'email' || authMode === 'register') && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs text-royal-goldMuted mb-1 font-medium">Full Name</label>
                  <input 
                    type="text"
                    placeholder="Maharaja / Patron Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-royal-green/80 border border-royal-gold/30 rounded-xl px-4 py-2.5 text-sm text-royal-ivory focus:outline-none focus:border-royal-gold"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-royal-goldMuted mb-1 font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
                  <input 
                    type="email"
                    placeholder="patron@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-royal-green/80 border border-royal-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-royal-ivory focus:outline-none focus:border-royal-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-royal-goldMuted mb-1 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-royal-green/80 border border-royal-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-royal-ivory focus:outline-none focus:border-royal-gold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-royal-goldMuted">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-royal-gold/30 bg-royal-green text-royal-gold focus:ring-0"
                  />
                  <span>Remember Me</span>
                </label>
                
                <button 
                  type="button"
                  onClick={() => alert("Password reset link sent to your email!")}
                  className="hover:text-royal-gold text-royal-goldMuted"
                >
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full gold-btn py-3 rounded-xl font-bold text-sm"
              >
                {loading ? "Processing..." : authMode === 'register' ? "Create Account & Proceed" : "Log In & Continue"}
              </button>

              <div className="text-center text-xs text-royal-goldMuted pt-2">
                {authMode === 'email' ? (
                  <span>New Patron? <button type="button" onClick={() => setAuthMode('register')} className="text-royal-gold font-bold underline">Create Account</button></span>
                ) : (
                  <span>Already registered? <button type="button" onClick={() => setAuthMode('email')} className="text-royal-gold font-bold underline">Log In</button></span>
                )}
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-royal-gold/15 flex items-center justify-center space-x-2 text-[11px] text-royal-goldMuted/60">
            <ShieldCheck className="w-3.5 h-3.5 text-royal-gold" />
            <span>256-Bit Encrypted Secure City Login</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
