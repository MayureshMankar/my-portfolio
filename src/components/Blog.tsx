import React from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: "React Architecture Patterns",
    excerpt: "Modern approaches to structuring scalable React applications with clean component hierarchies and state management.",
    date: "2024-01-15",
    category: "React",
    readTime: "8 min"
  },
  {
    id: 2,
    title: "TypeScript Mastery",
    excerpt: "Advanced TypeScript techniques including conditional types, mapped types, and template literal types for robust typing.",
    date: "2024-01-10",
    category: "TypeScript",
    readTime: "12 min"
  },
  {
    id: 3,
    title: "Next.js Performance",
    excerpt: "Optimizing Next.js applications with Server Components, Partial Prerendering, and modern bundling strategies.",
    date: "2024-01-05",
    category: "Next.js",
    readTime: "10 min"
  },
  {
    id: 4,
    title: "System Design Fundamentals",
    excerpt: "Essential principles for designing scalable distributed systems with real-world architecture examples.",
    date: "2023-12-28",
    category: "Architecture",
    readTime: "15 min"
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-24 px-4 bg-black text-white relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm uppercase tracking-widest text-white/60 font-semibold">Knowledge Sharing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white">
            Latest Insights
          </h2>
          <div className="w-24 h-px bg-white mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="h-full border border-white/20 p-8 transition-all duration-500 hover:border-white/60 hover:bg-white/5">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-wider text-white/60 font-semibold">{post.category}</span>
                  <span className="text-sm text-white/60 font-medium">{post.readTime} read</span>
                </div>
                
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-white transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-white/70 mb-6 leading-relaxed font-medium">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <span className="text-sm text-white/60 font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                    Read more →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-white/30 mb-6">
            <span className="text-xl">✍</span>
          </div>
          <h3 className="text-2xl font-black mb-4 text-white">Stay Updated</h3>
          <p className="text-white/70 max-w-md mx-auto mb-8 text-lg font-medium">
            Subscribe for technical insights on web development and software architecture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300">
              Subscribe via Email
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300">
              View Archive
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;