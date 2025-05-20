window.PostList = function PostList({ token, onProfile, showNotification }) {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  // Função para buscar posts
  async function fetchPosts() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://backtest.lucasbreda.me/notes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao buscar posts');
      // Ordena por data decrescente
      setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setError(err.message);
      showNotification && showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchPosts();
    // Atualiza lista ao criar novo post
    function onPostCreated() { fetchPosts(); }
    window.addEventListener('postCreated', onPostCreated);
    return () => window.removeEventListener('postCreated', onPostCreated);
  }, []);

  if (loading) return <div className="card text-center">Carregando posts...</div>;
  if (error) return <div className="card form-error">{error}</div>;
  if (!posts.length) return <div className="card text-center">Nenhum post ainda.</div>;

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post._id}
          post={post}
          token={token}
          onProfile={onProfile}
          showNotification={showNotification}
        />
      ))}
    </div>
  );
};

// Carrega o componente Post (será criado em seguida)
const Post = window.Post;