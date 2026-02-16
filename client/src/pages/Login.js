import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const err = searchParams.get('error');
    if (err) setError(decodeURIComponent(err));
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  function handleOAuth(provider) {
    window.location.href = api.auth.oauthUrl(provider);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Bet Tracker</h1>
        <p className="subtitle">Log in to track your bets and wins</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="social-buttons">
          <button type="button" className="btn-google" onClick={() => handleOAuth('google')}>
            Continue with Google
          </button>
          <button type="button" className="btn-facebook" onClick={() => handleOAuth('facebook')}>
            Continue with Facebook
          </button>
        </div>

        <p className="auth-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>

        <p className="link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
