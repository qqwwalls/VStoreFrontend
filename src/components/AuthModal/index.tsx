import { useState } from 'react';
import { login } from '../../api/user';
import { useStore } from '../../context/StoreContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !agreed) {
      setError('You must agree to the terms to create an account.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userData = await login(email, password);
      setUser(userData);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-brand-surface w-full max-w-3xl rounded shadow-2xl border border-gray-700 relative overflow-hidden">
        
        {}
        <div className="flex justify-between items-center p-6 pb-2">
          <h2 className="text-2xl font-bold text-white tracking-wide uppercase">
            {isLogin ? 'Log In' : 'Create an account'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors absolute top-4 right-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">{error}</div>}

          {isLogin ? (
            <div className="flex flex-col md:flex-row gap-8">
              {}
              <div className="flex-1 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">User Name / Account Name</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                      placeholder="example@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm pr-10"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="bg-brand-accent hover:bg-green-400 text-black font-bold px-10 py-3 rounded transition-all active:scale-95 disabled:opacity-50"
                    >
                      {loading ? '...' : 'Sign In'}
                    </button>
                    <a href="#" className="text-sm text-gray-400 hover:text-white underline">
                      Help, I can't log in
                    </a>
                  </div>
                </form>

                <div className="pt-4">
                  <p className="text-gray-400 text-sm">
                    Not a member?{' '}
                    <button onClick={() => setIsLogin(false)} className="text-brand-accent hover:underline font-bold">
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>

              {}
              <div className="hidden md:flex flex-col items-center justify-center border-l border-gray-700 pl-8 w-64">
                <div className="bg-white p-2 rounded-lg mb-4">
                  <svg className="w-32 h-32 text-black" viewBox="0 0 33 33">
                    <path fill="currentColor" d="M0,0h7v7H0V0z M2,2v3h3V2H2z M10,0h1v7h-1V0z M12,0h1v1h-1V0z M14,0h2v1h-2V0z M18,0h1v3h-1V0z M20,0h1v2h-1V0z M24,0h2v1h-2V0z M26,0h7v7h-7V0z M28,2v3h3V2H28z M12,2h1v3h-1V2z M14,2h1v2h-1V2z M16,2h1v1h-1V2z M19,2h1v2h-1V2z M21,2h2v1h-2V2z M24,2h1v1h-1V2z M16,4h2v1h-2V4z M19,5h1v1h-1V5z M21,5h2v2h-2V5z M24,5h1v1h-1V5z M12,6h1v1h-1V6z M14,6h2v1h-2V6z M18,6h1v1h-1V6z M24,7h2v1h-2V7z M0,8h2v1H0V8z M3,8h2v2H3V8z M6,8h1v1H6V8z M8,8h2v1H8V8z M11,8h1v1h-1V8z M13,8h4v1h-4V8z M18,8h1v1h-1V8z M21,8h1v1h-1V8z M23,8h2v1h-2V8z M26,8h3v1h-3V8z M30,8h1v1h-1V8z M0,10h1v1H0V10z M2,10h1v1H2V10z M7,10h2v1H7V10z M10,10h4v1h-4V10z M15,10h1v1h-1V10z M17,10h2v1h-2V10z M20,10h1v2h-1V10z M22,10h1v1h-1V10z M24,10h3v1h-3V10z M29,10h1v2h-1V10z M31,10h2v1h-2V10z M0,12h2v1H0V12z M3,12h1v1H3V12z M6,12h1v2H6V12z M8,12h2v1H8V12z M11,12h2v2h-2V12z M14,12h1v1h-1V12z M16,12h2v1h-2V12z M19,12h1v1h-1V12z M23,12h1v1h-1V12z M25,12h2v1h-2V12z M28,12h1v1h-1V12z M0,14h1v1H0V14z M2,14h2v1H2V14z M5,14h1v1H5V14z M8,14h2v1H8V14z M13,14h1v1h-1V14z M15,14h2v1h-2V14z M18,14h2v1h-2V14z M21,14h1v2h-1V14z M23,14h1v1h-1V14z M25,14h2v1h-2V14z M28,14h1v1h-1V14z M30,14h2v1h-2V14z M0,16h2v1H0V16z M3,16h2v1H3V16z M6,16h1v1H6V16z M8,16h2v1H8V16z M11,16h2v1h-2V16z M14,16h1v1h-1V16z M17,16h1v1h-1V16z M19,16h2v1h-2V16z M22,16h1v1h-1V16z M24,16h3v1h-3V16z M29,16h1v1h-1V16z M31,16h2v1h-2V16z M0,18h1v1H0V18z M2,18h1v1H2V18z M4,18h1v1H4V18z M6,18h2v1H6V18z M9,18h1v1H9V18z M12,18h1v2h-1V18z M14,18h2v1h-2V18z M18,18h1v2h-1V18z M20,18h1v1h-1V18z M22,18h3v2h-3V18z M26,18h2v2h-2V18z M29,18h3v1h-3V18z M0,20h2v1H0V20z M3,20h1v1H3V20z M6,20h1v1H6V20z M8,20h2v1H8V20z M11,20h1v1h-1V20z M14,20h1v1h-1V20z M16,20h2v1h-2V20z M20,20h1v1h-1V20z M0,22h1v1H0V22z M2,22h2v1H2V22z M5,22h1v1H5V22z M8,22h2v1H8V22z M12,22h1v2h-1V22z M15,22h3v1h-3V22z M19,22h2v2h-2V22z M22,22h1v1h-1V22z M25,22h2v1h-2V22z M28,22h1v1h-1V22z M31,22h2v2h-2V22z M0,24h2v1H0V24z M3,24h2v2H3V24z M6,24h1v1H6V24z M8,24h2v1H8V24z M11,24h1v1h-1V24z M13,24h1v1h-1V24z M16,24h1v1h-1V24z M18,24h1v1h-1V24z M21,24h1v1h-1V24z M23,24h1v2h-1V24z M25,24h1v1h-1V24z M27,24h2v1h-2V24z M30,24h1v2h-1V24z M0,26h7v7H0V26z M2,28v3h3v-3H2z M8,26h1v1H8V26z M10,26h4v1h-4V26z M15,26h2v2h-2V26z M18,26h2v1h-2V26z M21,26h1v1h-1V26z M25,26h2v1h-2V26z M29,26h2v1h-2V26z M32,26h1v1h-1V26z M8,28h2v1H8V28z M12,28h1v1h-1V28z M14,28h1v2h-1V28z M18,28h1v1h-1V28z M20,28h3v1h-3V28z M24,28h1v2h-1V28z M26,28h2v1h-2V28z M29,28h1v1h-1V28z M31,28h2v2h-2V28z M8,30h1v1H8V30z M11,30h2v1h-2V30z M16,30h2v1h-2V30z M19,30h1v1h-1V30z M21,30h2v1h-2V30z M26,30h1v1h-1V30z M28,30h1v2h-1V30z M8,32h2v1H8V32z M12,32h1v1h-1V32z M14,32h1v1h-1V32z M16,32h1v1h-1V32z M18,32h2v1h-2V32z M21,32h1v1h-1V32z M23,32h1v1h-1V32z M25,32h2v1h-2V32z M31,32h2v1h-2V32z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400 font-medium">Sign in with QR code</p>
              </div>
            </div>
          ) : (
            
            <div className="max-w-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">User Name or Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors text-sm pr-10"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                  </div>
                </div>

                {}
                <div className="bg-gray-200 p-3 rounded flex items-center justify-between border border-gray-300 shadow-sm w-full max-w-[300px] my-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-6 h-6 rounded cursor-pointer" />
                    <span className="text-gray-700 font-medium">I'm not a robot</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="text-[10px] text-gray-500 mt-1">reCAPTCHA</span>
                  </div>
                </div>

                <div className="pt-2 pb-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input 
                        type="checkbox" 
                        className="peer appearance-none w-5 h-5 border border-gray-500 rounded bg-brand-bg checked:bg-brand-accent checked:border-brand-accent transition-colors"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <svg className="w-3.5 h-3.5 text-black absolute opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-sm text-gray-400 leading-tight">
                      I confirm that I'm 13 years old or older and I agree to the terms of the Subscriber Agreement and Privacy Policy.
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !agreed}
                  className="bg-brand-accent hover:bg-green-400 text-black font-bold px-10 py-3 rounded transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '...' : 'Sign Up'}
                </button>

                <div className="pt-4">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setIsLogin(true)} className="text-brand-accent hover:underline font-bold">
                      Log In
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
