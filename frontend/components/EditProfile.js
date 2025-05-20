window.EditProfile = function EditProfile({ token, user, onProfileUpdated, showNotification }) {
  const [form, setForm] = React.useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: null
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      let res, data;
      if (form.avatar) {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('bio', form.bio);
        formData.append('avatar', form.avatar);
        res = await fetch(`https://backtest.lucasbreda.me/users/${user.username}`, {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
      } else {
        res = await fetch(`https://backtest.lucasbreda.me/users/${user.username}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name: form.name, bio: form.bio })
        });
      }
      data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao atualizar perfil');
      setSuccess('Perfil atualizado!');
      showNotification && showNotification('success', 'Perfil atualizado!');
      setTimeout(() => onProfileUpdated(data), 1200);
    } catch (err) {
      setError(err.message);
      showNotification && showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="form-title">Editar Perfil</div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Bio (máx. 160 caracteres)"
          value={form.bio}
          onChange={handleChange}
          maxLength={160}
          style={{ minHeight: 60, resize: "vertical" }}
        />
        <label style={{ color: "#D1D5DB", fontSize: "0.95em", marginBottom: 8 }}>
          Nova foto de perfil:
          <input
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "block", marginTop: 4 }}
          />
        </label>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};