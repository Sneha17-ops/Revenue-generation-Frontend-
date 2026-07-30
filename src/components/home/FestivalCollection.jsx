import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Sparkles, ArrowRight } from 'lucide-react';

export const FestivalCollection = () => {
  const FESTIVAL_HAMPERS = [
    {
      title: "Raksha Bandhan Royal Box",
      desc: "Includes Silver Kaju Katli, Handcrafted Designer Rakhi, Roli Chawal set, and Saffron Almonds.",
      price: 1899,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Diwali Mahotsav Trunk",
      desc: "Brass-embossed velvet trunk filled with Gud Tilkut, Motichur Laddu, Kesar Peda, and Brass Diya.",
      price: 3499,
      image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Corporate Luxury Gifting",
      desc: "Custom logo engraved gold boxes with premium dry fruit mix & silver vark sweets for VIP clients.",
      price: 2499,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-royal-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-royal-gold/20 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-royal-goldDark font-bold">Celebration Specials</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-royal-green mt-1">
              Festive & Corporate Bespoke Gifting
            </h2>
          </div>
          <Link 
            to="/hamper-builder" 
            className="gold-btn px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Customize 3D Festive Hamper</span>
          </Link>
        </div>

        {/* Hampers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FESTIVAL_HAMPERS.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-royal-gold/30 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-greenDark/80 via-transparent to-transparent" />
                
                <span className="absolute top-4 left-4 bg-royal-green text-royal-gold font-bold text-[10px] uppercase px-3 py-1 rounded-full border border-royal-gold/30">
                  ✨ Festival Edition
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-royal-green group-hover:text-royal-goldDark transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-royal-gold/15 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Hamper Price</span>
                    <span className="font-bold text-base text-royal-green">₹{item.price}</span>
                  </div>
                  <Link 
                    to="/hamper-builder"
                    className="emerald-btn px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1"
                  >
                    <span>View Box</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
