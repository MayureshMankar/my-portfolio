import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Mangesh Mankar",
    role: "Manager, Shreedevi Engineers",
    content: "Exceptional delivery and technical expertise. The website exceeded our expectations and drove significant business growth.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Manager, TechStart Inc",
    content: "Transformative collaboration. Built exactly what we needed with clean architecture and outstanding problem-solving skills.",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "CTO, InnovateLab Solutions",
    content: "Impressive full-stack capabilities. Delivered complex solutions with maintainable code and professional documentation.",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-4 bg-black text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white rotate-45"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-white rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 border border-white -rotate-12"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm uppercase tracking-widest text-white/60 font-semibold">Client Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white">
            What People Say
          </h2>
          <div className="w-24 h-px bg-white mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="h-full border border-white/30 p-8 transition-all duration-500 hover:border-white/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <div className="mb-6">
                  <div className="text-5xl text-white/20 font-light leading-none">"</div>
                </div>
                
                <blockquote className="text-lg mb-8 text-white leading-relaxed font-medium">
                  {testimonial.content}
                </blockquote>
                
                <div className="flex items-center mt-auto pt-6 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold text-white">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-white/30 mb-6">
            <span className="text-2xl">★</span>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-normal">
            Delivering exceptional results that clients trust and recommend
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;