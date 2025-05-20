window.CommentSection = function CommentSection({ postId, token, showNotification }) {
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [newComment, setNewComment] = React.useState('');
  const [sending, setSending] = React.useState(false);

  // Buscar comentários
  async function fetchComments() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://backtest.lucasbreda.me/notes/${postId}/comments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao buscar comentários');
      setComments(data);
    } catch (err) {
      setError(err.message);
      showNotification && showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchComments();
  }, [postId]);

  // Enviar novo comentário
  async function handleSend(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`https://backtest.lucasbreda.me/notes/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao comentar');
      setNewComment('');
      fetchComments();
      showNotification && showNotification('success', 'Comentário publicado!');
    } catch (err) {
      showNotification && showNotification('error', err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ marginTop: 12, background: "#232323", borderRadius: 8, padding: 12 }}>
      <form onSubmit={handleSend} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Adicionar comentário..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          maxLength={180}
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={sending || !newComment.trim()}>
          {sending ? "Enviando..." : "Comentar"}
        </button>
      </form>
      {loading ? (
        <div style={{ color: "#D1D5DB" }}>Carregando comentários...</div>
      ) : error ? (
        <div className="form-error">{error}</div>
      ) : comments.length === 0 ? (
        <div style={{ color: "#D1D5DB" }}>Nenhum comentário ainda.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {comments.map(c => (
            <li key={c._id} style={{ marginBottom: 10 }}>
              <span style={{ color: "#1E3A8A", fontWeight: "bold" }}>@{c.author?.username}</span>
              <span style={{ color: "#D1D5DB", marginLeft: 6 }}>{c.content}</span>
              <span style={{ color: "#888", marginLeft: 10, fontSize: "0.9em" }}>
                {new Date(c.createdAt).toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};