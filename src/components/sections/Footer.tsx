import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../constants';
import { Mail, Phone, Globe, MessageSquare, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import CodeTyping from '../ui/CodeTyping';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    // EmailJS logic
    // Replace these with your actual IDs from EmailJS dashboard
    emailjs.sendForm(
      'YOUR_SERVICE_ID', 
      'YOUR_TEMPLATE_ID',
      formRef.current!,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      setLoading(false);
      setStatus('success');
      formRef.current?.reset();
      setTimeout(() => setStatus('idle'), 5000);
    }, (error) => {
      setLoading(false);
      setStatus('error');
      console.error('EmailJS Error:', error);
      setTimeout(() => setStatus('idle'), 5000);
    });
  };

  return (
    <section id="contact" className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-600 dark:text-secondary text-[18px] uppercase tracking-wider">Liên hệ</p>
          <h2 className="text-slate-900 dark:text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Kết Nối.</h2>
          
          <p className="mt-4 text-slate-700 dark:text-secondary text-[17px] leading-[30px]">
            Tôi luôn sẵn sàng cho những cơ hội mới và những dự án thú vị. Đừng ngần ngại liên hệ với tôi!
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4 text-slate-600 dark:text-secondary hover:text-blue-600 dark:hover:text-neonBlue transition-colors">
              <Phone className="w-6 h-6" />
              <span>{personalInfo.contact.phone}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600 dark:text-secondary hover:text-blue-600 dark:hover:text-neonBlue transition-colors">
              <Mail className="w-6 h-6" />
              <span>{personalInfo.contact.email}</span>
            </div>
            <div className="flex gap-6 mt-10">
              <a href={personalInfo.contact.github} target="_blank" rel="noreferrer" className="p-3 glassmorphism rounded-full border border-slate-200 dark:border-white/10 hover:shadow-xl transition-all">
                <Globe className="w-6 h-6 text-slate-700 dark:text-white" />
              </a>
              <a href={personalInfo.contact.twitter} target="_blank" rel="noreferrer" className="p-3 glassmorphism rounded-full border border-slate-200 dark:border-white/10 hover:shadow-xl transition-all">
                <MessageSquare className="w-6 h-6 text-slate-700 dark:text-white" />
              </a>
            </div>
            
            <div className="mt-10 -ml-4">
               <CodeTyping />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-black-100 p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl relative"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-medium mb-2">Tên của bạn</span>
              <input
                type="text"
                name="from_name"
                required
                placeholder="Nhập tên..."
                className="bg-slate-50 dark:bg-primary py-4 px-6 placeholder:text-slate-400 dark:placeholder:text-secondary text-slate-900 dark:text-white rounded-lg outline-none border border-slate-200 dark:border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-medium mb-2">Email</span>
              <input
                type="email"
                name="from_email"
                required
                placeholder="Nhập email..."
                className="bg-slate-50 dark:bg-primary py-4 px-6 placeholder:text-slate-400 dark:placeholder:text-secondary text-slate-900 dark:text-white rounded-lg outline-none border border-slate-200 dark:border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-medium mb-2">Lời nhắn</span>
              <textarea
                rows={4}
                name="message"
                required
                placeholder="Bạn muốn nói gì với tôi?"
                className="bg-slate-50 dark:bg-primary py-4 px-6 placeholder:text-slate-400 dark:placeholder:text-secondary text-slate-900 dark:text-white rounded-lg outline-none border border-slate-200 dark:border-none font-medium resize-none"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1d1836] dark:bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl flex items-center gap-2 hover:bg-blue-600 dark:hover:bg-neonBlue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Đang gửi... <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : (
                <>Gửi đi <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Status Messages */}
          <div className="absolute bottom-4 right-8">
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-500 font-bold"
              >
                <CheckCircle className="w-5 h-5" /> Cảm ơn! Tôi sẽ phản hồi sớm.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 font-bold"
              >
                <AlertCircle className="w-5 h-5" /> Lỗi! Vui lòng thử lại sau.
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="mt-20 text-center text-secondary text-sm border-t border-white/5 pt-8">
        <p>© 2026 {personalInfo.name}. All rights reserved.</p>
        <p className="mt-2 italic text-xs">“Code không chỉ là kỹ thuật — đó là nghệ thuật kể chuyện.”</p>
      </div>
    </section>
  );
};

export default Footer;
