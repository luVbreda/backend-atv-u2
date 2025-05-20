window.Login = function Login({ onLogin, onSwitchToRegister, onShowAbout, showNotification }) {
  const [form, setForm] = React.useState({ userOrEmail: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Decide se é username ou email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.userOrEmail);
      const payload = isEmail
        ? { email: form.userOrEmail, password: form.password }
        : { username: form.userOrEmail.replace(/^@/, ''), password: form.password };

      const res = await fetch('https://backtest.lucasbreda.me/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao fazer login');
      onLogin(data.token, data.user);
    } catch (err) {
      setError(err.message);
      showNotification && showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="form-title">Entrar no OpenNotes</div>
      <form onSubmit={handleSubmit}>
        <input
          name="userOrEmail"
          type="text"
          placeholder="@username ou e-mail"
          value={form.userOrEmail}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        {error && <div className="form-error">{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <div className="form-link" onClick={onSwitchToRegister}>
        Não tem conta? Cadastre-se
      </div>
      <div className="form-link" onClick={onShowAbout}>
        Saiba Mais
      </div>
    </div>
  );
};