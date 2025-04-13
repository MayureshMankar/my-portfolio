import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Real EmailJS implementation
    emailjs.sendForm(
      'service_your_service_id', 
      'template_your_template_id', 
      e.target, 
      'your_user_id'
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto-hide success message
      setTimeout(() => {
        setSubmitStatus('');
      }, 4000);
    }, (error) => {
      console.error('Email sending failed:', error.text);
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      // Auto-hide error message
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    });
  };

  return (
    <motion.section
      className="py-16 px-4 bg-black text-white min-h-screen"
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Ready to turn your ideas into reality? I'm here to help you build scalable, modern solutions that drive results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-white text-xl" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:mayureshmankar@example.com" className="text-white/80 hover:text-white transition">
                      mayureshmankar@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-white text-xl" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a href="tel:+919876543210" className="text-white/80 hover:text-white transition">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-white text-xl" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-white/80">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Connect With Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/MayureshMankar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200 rounded-lg"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href="https://linkedin.com/in/mankarmayuresh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200 rounded-lg"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3 text-white">Why Work With Me?</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Fast turnaround and reliable delivery</li>
                <li>• Modern, scalable solutions</li>
                <li>• Clear communication throughout</li>
                <li>• Post-launch support and maintenance</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black border-2 border-white text-white placeholder-white/60 rounded-lg focus:outline-none focus:border-white/80 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="reply_to"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black border-2 border-white text-white placeholder-white/60 rounded-lg focus:outline-none focus:border-white/80 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border-2 border-white text-white placeholder-white/60 rounded-lg focus:outline-none focus:border-white/80 transition-colors"
                  placeholder="Project Discussion / Collaboration / etc."
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black border-2 border-white text-white placeholder-white/60 rounded-lg focus:outline-none focus:border-white/80 transition-colors resize-vertical"
                  placeholder="Tell me about your project, timeline, and how I can help..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900/20 border border-green-500 rounded-lg">
                  <p className="text-green-400 font-medium">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
                  <p className="text-red-400 font-medium">Failed to send message. Please try again or contact me directly.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-black border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
