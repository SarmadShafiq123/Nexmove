import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaTruck } from 'react-icons/fa';
import { Input } from '../components/shared/Input';
import { Button } from '../components/shared/Button';
import { login, setToken } from '../services/authService.js';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(username, password);
      setToken(result.data.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0F1B2E] rounded-2xl shadow-2xl p-8 md:p-10">

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FaTruck className="text-3xl text-[#2C5F8A]" />
              <span className="text-2xl font-bold text-white tracking-wide">NEXMOVE</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-300">Admin Panel</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                Username
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={FaUser}
                placeholder="Enter username"
                required
                autoComplete="username"
                className="bg-white/5 border-white/10 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={FaLock}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                className="bg-white/5 border-white/10 text-white placeholder-gray-500"
              />
            </div>

            {error && (
              <div className="bg-red-900/40 border border-red-700/50 rounded-lg px-4 py-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className={`w-full mt-2 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
