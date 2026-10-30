import { useState } from 'react';
import { Eye, EyeOff, LoaderCircle, LogIn, UserPlus, X } from 'lucide-react';
import { login, register } from '../../api/user';
import { getErrorMessage } from '../../api/client';
import { useStore } from '../../context/StoreContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const { completeAuth } = useStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const changeMode = () => {
    setIsLogin(value => !value);
    setError('');
    setPassword('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;
    if (!isLogin && !agreed) {
      setError('Please accept the terms to create an account.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const session = isLogin
        ? await login(email.trim(), password)
        : await register(username.trim(), email.trim(), password);
      completeAuth(session);
      onClose();
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="auth-title" className="bg-brand-surface w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl border border-gray-700 p-6 relative">
        <button type="button" aria-label="Close sign in" title="Close" onClick={onClose} disabled={loading} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white disabled:opacity-50">
          <X size={20} />
        </button>
        <h2 id="auth-title" className="text-2xl font-bold text-white mb-6 pr-10">{isLogin ? 'Log In' : 'Create an account'}</h2>
        {error && <p role="alert" className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-300 text-sm break-words">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="auth-username" className="block text-xs font-bold text-gray-400 mb-2 uppercase">Username</label>
              <input id="auth-username" autoComplete="username" required maxLength={100} value={username} onChange={event => setUsername(event.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-accent text-sm" />
            </div>
          )}
          <div>
            <label htmlFor="auth-email" className="block text-xs font-bold text-gray-400 mb-2 uppercase">Email</label>
            <input id="auth-email" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-accent text-sm" placeholder="example@gmail.com" />
          </div>
          <div>
            <label htmlFor="auth-password" className="block text-xs font-bold text-gray-400 mb-2 uppercase">Password</label>
            <div className="relative">
              <input id="auth-password" type={showPassword ? 'text' : 'password'} autoComplete={isLogin ? 'current-password' : 'new-password'} required minLength={isLogin ? undefined : 6} value={password} onChange={event => setPassword(event.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded px-4 py-3 pr-12 text-white focus:outline-none focus:border-brand-accent text-sm" />
              <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} title={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(value => !value)} className="absolute right-3 top-3 text-gray-400 hover:text-white">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {!isLogin && (
            <label className="flex items-start gap-3 text-sm text-gray-400">
              <input type="checkbox" checked={agreed} onChange={event => setAgreed(event.target.checked)} className="mt-1 accent-green-400" />
              <span>I agree to the Subscriber Agreement and Privacy Policy.</span>
            </label>
          )}
          <button type="submit" disabled={loading || (!isLogin && !agreed)} className="w-full min-h-12 bg-brand-accent hover:bg-green-400 text-black font-bold px-6 py-3 rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <LoaderCircle size={18} className="animate-spin" /> : isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
          <p className="text-sm text-gray-400 pt-2">
            {isLogin ? 'Not a member? ' : 'Already have an account? '}
            <button type="button" onClick={changeMode} disabled={loading} className="text-brand-accent hover:underline font-semibold">{isLogin ? 'Sign Up' : 'Log In'}</button>
          </p>
        </form>
      </section>
    </div>
  );
}
