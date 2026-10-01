import { useState } from 'react';

export default function SupportPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const faqs = [
    'My purchases',
    'Refund',
    'My account',
    'Store',
    'Community products',
    'Family problems',
    'Info',
    'Frequent questions',
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Support</h1>
      
      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full max-w-md bg-brand-surface border border-gray-700 rounded-full py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-brand-accent transition-colors"
        />
        <svg className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="space-y-3 mb-10">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-brand-surface border border-gray-700 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:border-gray-500 transition-colors">
            <span className="text-gray-300 font-medium">{faq}</span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 text-gray-400 text-sm mb-16">
        <button className="hover:text-white">&lt; Prev</button>
        <span className="flex gap-2">
          <button className="text-white">1</button>
          <button className="hover:text-white">2</button>
          <button className="hover:text-white">3</button>
          <button className="hover:text-white">4</button>
          <button className="hover:text-white">5</button>
          <button className="hover:text-white">6</button>
        </span>
        <button className="hover:text-white">Next &gt;</button>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-6">Have any other questions?</h2>
        
        {!isFormOpen ? (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-brand-accent hover:bg-green-400 text-black font-bold px-8 py-3 rounded transition-all active:scale-95"
          >
            Contact us via email
          </button>
        ) : (
          <div className="bg-brand-surface border border-gray-700 rounded-xl p-8 max-w-2xl mx-auto text-left mt-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white mb-6 uppercase">Email Support</h3>
            <p className="text-sm text-gray-400 mb-6">Please provide as much information as possible. We will review your request and get back to you shortly.</p>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); setIsFormOpen(false); }}>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Name</label>
                <input type="text" className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Email</label>
                <input type="email" className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Issue</label>
                <input type="text" className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Concerning problems</label>
                <input type="text" className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Game platform</label>
                <select className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm">
                  <option>Windows</option>
                  <option>Mac</option>
                  <option>Linux</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Info</label>
                <textarea rows={4} className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Support passcode</label>
                <input type="text" className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm" />
              </div>
              
              <div className="pt-4 flex justify-between items-center">
                <button type="button" onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-white text-sm font-medium">Cancel</button>
                <button type="submit" className="bg-brand-accent hover:bg-green-400 text-black font-bold px-8 py-3 rounded transition-all active:scale-95">
                  Contact us via email
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
