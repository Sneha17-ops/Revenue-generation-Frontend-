import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle } from 'lucide-react';

export const TestimonialsMarquee = () => {
  const REVIEWS = [
    {
      name: "Radhika Singhania",
      role: "Industrialist & VIP Buyer",
      location: "Mumbai",
      text: "The Silver Kaju Katli and 3D Custom Diwali Trunks were absolute showstoppers for our corporate partners. Pure A2 ghee taste is unmatched!",
      rating: 5,
      date: "Verified Buyer"
    },
    {
      name: "Dr. Ananya Roy",
      role: "Health Professional",
      location: "Kolkata",
      text: "The Sugar-Free Anjeer Khajur Barfi is a blessing! Pure natural ingredients with 0% refined sugar. VINDHYAWASINI TILKUT BHANDAR is pure luxury.",
      rating: 5,
      date: "Verified Buyer"
    },
    {
      name: "Vikramjit Singh",
      role: "Hotelier",
      location: "New Delhi",
      text: "The Authentic Gaya Gud Tilkut brings back childhood memories. Crisp, perfectly sweet, and delivered within 3 hours via cold chain!",
      rating: 5,
      date: "Verified Buyer"
    }
  ];

  return (
    <section className="py-20 bg-royal-green text-royal-ivory overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-royal-gold font-bold">
            Patron Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-royal-gold">
            Loved by Thousands Across India
          </h2>
          <p className="text-royal-goldMuted/80 text-sm">
            Read authentic reviews from our esteemed Royal Connoisseur patrons.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-royal-greenDark/80 p-8 rounded-3xl border border-royal-gold/30 shadow-2xl space-y-4 relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-royal-gold/20 absolute top-6 right-6" />

              <div className="space-y-3">
                <div className="flex text-royal-gold space-x-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-royal-goldMuted/90 text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-royal-gold/15 flex items-center justify-between">
                <div>
                  <h4 className="font-serif-luxury font-bold text-sm text-royal-gold">{rev.name}</h4>
                  <p className="text-[11px] text-royal-goldMuted/70">{rev.role} • {rev.location}</p>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>{rev.date}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
