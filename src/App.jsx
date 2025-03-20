import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ShoppingBag, User, Search, ChevronRight, Star, ArrowRight, Menu, X } from 'lucide-react';
import active from "../src/assets/active.png";
import casual from "../src/assets/casual.png";
import formal from "../src/assets/formal.png";
import street from "../src/assets/street.png";
import blazer from "../src/assets/blazer.png";
import denim from "../src/assets/denim.png";
import linen from "../src/assets/linen.png";
import utility from "../src/assets/utility.png";
import min from "../src/assets/min.png";
import hero1 from "../src/assets/hero1.png";
import hero2 from "../src/assets/hero2.png";
import hero3 from "../src/assets/hero3.png";
import hero4 from "../src/assets/hero4.png";

const categoryImages = {
  Casual: casual,
  Formal: formal,
  Streetwear: street,
  Activewear: active,
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideInterval, setSlideInterval] = useState(null);

  const heroImages = [hero1, hero2, hero3, hero4];
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Start Auto Slide
  const startAutoSlide = () => {
    if (slideInterval) return; // Prevent multiple intervals
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000); // Adjust speed
    setSlideInterval(interval);
  };

  // Stop Auto Slide on Hover
  const stopAutoSlide = () => {
    clearInterval(slideInterval);
    setSlideInterval(null);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(slideInterval);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-sm`}>
        <div className="flex items-center space-x-12">
          <motion.h2 className="text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            LUXETHREAD
          </motion.h2>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:underline font-medium">New Arrivals</a>
            <a href="#" className="hover:underline font-medium">Women</a>
            <a href="#" className="hover:underline font-medium">Men</a>
            <a href="#" className="hover:underline font-medium">Collections</a>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-900" />}

          </button>
          <Search className="hidden md:block" size={20} />
          <ShoppingBag className="hidden md:block" size={20} />
          <User className="hidden md:block" size={20} />
          <button onClick={toggleMenu} className="md:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <motion.section
        className="relative h-screen flex items-center px-6 md:px-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImages[currentIndex]})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div> {/* Dark Overlay for Readability */}
        <div className="relative z-10 w-2/3 pr-8 text-white">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Summer '25 Collection
          </motion.h2>
          <motion.p
            className="text-lg mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Elevate your wardrobe with our latest designs. Minimalist aesthetics meet contemporary fashion.
          </motion.p>
          <motion.button
            className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium flex items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
            <motion.span
              className="inline-block ml-2"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={18} />
            </motion.span>
          </motion.button>
        </div>
        {/* Carousel */}
        <div className="absolute right-[20px] top-[-30px] h-full w-1/3 overflow-hidden z-10 flex items-center justify-center">
          <div className="relative w-90 h-[70%] rounded-xl overflow-hidden shadow-lg" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="absolute w-full h-full"
              >
                <img src={heroImages[currentIndex]} alt={`Carousel image ${currentIndex + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className={`py-16 px-6 md:px-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-12 text-center"
        >
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-4">Shop by Category</motion.h3>
          <motion.p variants={fadeInUp} className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Explore our diverse collection of high-quality apparel for every style and occasion.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {['Casual', 'Formal', 'Streetwear', 'Activewear'].map((category, index) => (
            <motion.div
              key={category}
              className="relative h-80 group overflow-hidden rounded-lg"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <img 
                src={categoryImages[category]} 
                alt={category} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white mb-2">{category}</h4>
                <motion.button 
                  className="bg-white text-gray-900 px-6 py-2 rounded w-full transition-all duration-300 
                            flex justify-center items-center group-hover:opacity-100 opacity-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending Collections */}
      <section className={`py-16 px-6 md:px-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex justify-between items-center mb-12"
        >
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold">New Arrivals</motion.h3>
          <motion.a 
            href="#"
            variants={fadeInUp}
            className="text-sm font-medium flex items-center group"
          >
            View All
            <motion.span
              className="ml-2"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.a>
        </motion.div>

        <div className="overflow-x-auto pb-4">
          <motion.div 
            className="flex space-x-6 min-w-max"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              { name: "Minimalist Tee", price: "$49.99", image: min },
              { name: "Relaxed Denim", price: "$89.99", image: denim },
              { name: "Utility Jacket", price: "$129.99", image: utility },
              { name: "Linen Shirt", price: "$59.99", image: linen },
              { name: "Classic Blazer", price: "$149.99", image: blazer }
            ].map((product, index) => (
              <motion.div 
                key={product.name}
                className={`w-64 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="h-72 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-1">{product.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-3">{product.price}</p>
                  <motion.button 
                    className={`w-full ${darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-black'} py-2 rounded flex justify-center items-center`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Add to Bag
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews */}
      <motion.section 
        className={`py-16 px-6 md:px-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-12 text-center">What Our Customers Say</motion.h3>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {[
            {name: "Sarah M.", review: "The quality of the fabrics exceeded my expectations. Definitely my go-to brand for essentials now.", rating: 5},
            {name: "James L.", review: "Perfect fit and incredibly comfortable. The attention to detail in the design is remarkable.", rating: 5},
            {name: "Emily R.", review: "Stylish, sustainable, and superb quality. I've received so many compliments on my new pieces!", rating: 4}
          ].map((review) => (
            <motion.div 
              key={review.name}
              className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-sm`}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex mb-3">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="mb-4 italic">{review.review}</p>
              <p className="font-medium">{review.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        className={`py-20 px-6 md:px-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-4">Join Our Community</motion.h3>
          <motion.p variants={fadeInUp} className="mb-8 text-gray-500 dark:text-gray-400">
            Subscribe to receive exclusive offers, early access to new collections, and 15% off your first order.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp} 
            className={`flex flex-col md:flex-row max-w-md mx-auto md:space-x-4 space-y-4 md:space-y-0 ${darkMode ? 'bg-gray-900' : 'bg-white'} p-2 rounded-lg shadow-sm`}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className={`flex-grow px-4 py-3 focus:outline-none rounded ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
            />
            <motion.button 
              className={`${darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} px-6 py-3 rounded font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`py-12 px-6 md:px-12 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-xl mb-4">LUXETHREAD</h4>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Contemporary fashion with a focus on quality materials and timeless design.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'pinterest'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-black">
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:underline">New Arrivals</a></li>
              <li><a href="#" className="hover:underline">Best Sellers</a></li>
              <li><a href="#" className="hover:underline">Sale Items</a></li>
              <li><a href="#" className="hover:underline">Collections</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Shipping Info</a></li>
              <li><a href="#" className="hover:underline">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:underline">Size Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Sustainability</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 LUXETHREAD. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;