window.NewPost = function NewPost({ token, showNotification }) {
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const maxChars = 280;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) {
      setError('O post não pode estar vazio.');
      return;
    }
    if (content.length > maxChars) {
      setError('O post excede o limite de 280 caracteres.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://backtest.lucasbreda.me/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: '', content })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao criar post');
      setContent('');
      showNotification && showNotification('success', 'Post publicado!');
      // Opcional: emitir evento para atualizar lista de posts
      window.dispatchEvent(new Event('postCreated'));
    } catch (err) {
      setError(err.message);
      showNotification && showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="new-post-card">
      <form onSubmit={handleSubmit}>
        <textarea
          className="new-post-textarea"
          placeholder="O que você está pensando?"
          value={content}
          onChange={e => {
            setContent(e.target.value);
            setError('');
          }}
          maxLength={maxChars + 10}
        />
        <div className="new-post-footer">
          <span className="char-counter" style={{ color: content.length > maxChars ? '#EF4444' : '#D1D5DB' }}>
            {content.length}/{maxChars}
          </span>
          <button type="submit" disabled={loading || !content.trim() || content.length > maxChars}>
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
};