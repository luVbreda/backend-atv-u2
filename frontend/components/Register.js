window.Register = function Register({ onRegister, onSwitchToLogin, onShowAbout, showNotification }) {
  const [form, setForm] = React.useState({
    username: '',
    name: '',
    email: '',
    password: '',
    avatar: null
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [photo, setPhoto] = React.useState('');

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    setError('');
    setSuccess('');
  }

  function validate() {
    if (!/^@[a-zA-Z0-9_]{3,15}$/.test(form.username)) {
      setError('O @username deve ter entre 3 e 15 caracteres e usar apenas letras, números e _.');
      return false;
    }
    if (!form.name.trim()) {
      setError('O nome é obrigatório.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('E-mail inválido.');
      return false;
    }
    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Monta o payload para envio (sem o @ no username)
      const payload = {
        username: form.username.replace(/^@/, ''),
        name: form.name,
        email: form.email,
        password: form.password,
      };

      // Se avatar for enviado, usa FormData, senão JSON normal
      let res, data;
      if (form.avatar) {
        const formData = new FormData();
        Object.entries(payload).forEach(([k, v]) => formData.append(k, v));
        formData.append('avatar', form.avatar);
        res = await fetch('https://backtest.lucasbreda.me/users/register', {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await fetch('https://backtest.lucasbreda.me/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao registrar');
      setSuccess('Cadastro realizado! Redirecionando...');
      showNotification && showNotification('success', 'Cadastro realizado!');
      setTimeout(() => onRegister(data.token, data.user), 1200);
    } catch (err) {
      setError(err.message);
      showNotification && showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="form-title">Criar conta no OpenNotes</div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="username"
          type="text"
          placeholder="@username"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <input
          name="name"
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <input
          type="text"
          placeholder="URL da foto (opcional)"
          value={photo}
          onChange={e => setPhoto(e.target.value)}
        />
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <div className="form-link" onClick={onSwitchToLogin}>
        Já tem conta? Entrar
      </div>
      <div className="form-link" onClick={onShowAbout}>
        Saiba Mais
      </div>
    </div>
  );
};