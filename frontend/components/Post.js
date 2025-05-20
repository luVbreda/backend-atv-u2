window.Post = function Post({ post, token, onProfile, showNotification }) {
  const [likes, setLikes] = React.useState(post.likes || 0);
  const [liked, setLiked] = React.useState(false);
  const [reposts, setReposts] = React.useState(post.reposts || 0);
  const [reposted, setReposted] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);

  // Função para curtir/descurtir
  async function handleLike() {
    try {
      const res = await fetch(`https://backtest.lucasbreda.me/notes/${post._id}/like`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao curtir');
      setLikes(data.likes || likes + (liked ? -1 : 1));
      setLiked(!liked);
    } catch (err) {
      showNotification && showNotification('error', err.message);
    }
  }

  // Função para repostar
  async function handleRepost() {
    try {
      const res = await fetch(`https://backtest.lucasbreda.me/notes/${post._id}/repost`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao repostar');
      setReposts(data.reposts || reposts + 1);
      setReposted(true);
      showNotification && showNotification('success', 'Repostado!');
      // Opcional: emitir evento para atualizar lista de posts
      window.dispatchEvent(new Event('postCreated'));
    } catch (err) {
      showNotification && showNotification('error', err.message);
    }
  }

  // Formata a data
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={post.author?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(post.author?.name || post.author?.username || "U")}
          alt="Avatar"
          className="post-avatar"
          onClick={() => onProfile && onProfile(post.author?.username)}
          style={{ cursor: "pointer" }}
        />
        <span className="post-username" onClick={() => onProfile && onProfile(post.author?.username)}>
          @{post.author?.username}
        </span>
        <span className="post-name">{post.author?.name}</span>
        <span className="post-date">{formatDate(post.createdAt)}</span>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <button className="post-action-btn" onClick={handleLike} title="Curtir">
          <span>{liked ? "❤️" : "🤍"}</span>
          <span className="post-likes">{likes}</span>
        </button>
        <button className="post-action-btn" onClick={handleRepost} title="Repostar" disabled={reposted}>
          <span>🔁</span>
          <span className="post-reposts">{reposts}</span>
        </button>
        <button className="post-action-btn" onClick={() => setShowComments(v => !v)} title="Comentários">
          💬 <span className="post-comments">{post.comments?.length || 0}</span>
        </button>
      </div>
      {showComments && (
        <CommentSection
          postId={post._id}
          token={token}
          showNotification={showNotification}
        />
      )}
    </div>
  );
};

// Carrega o componente CommentSection (será criado em seguida)
const CommentSection = window.CommentSection;