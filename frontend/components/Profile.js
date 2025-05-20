window.Profile = function Profile({ token, user, onEditProfile, showNotification }) {
  const [profile, setProfile] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  // Busca perfil e posts do usuário
  async function fetchProfile() {
    setLoading(true);
    setError('');
    try {
      const username = user?.username;
      const res = await fetch(`https://backtest.lucasbreda.me/users/${username}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao buscar perfil');
      setProfile(data);

      // Busca posts do usuário
      const resPosts = await fetch(`https://backtest.lucasbreda.me/users/${username}/posts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const postsData = await resPosts.json();
      if (!resPosts.ok) throw new Error(postsData.message || 'Erro ao buscar posts');
      setPosts(postsData);
    } catch (err) {
      setError(err.message);
      showNotification && showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchProfile();
  }, [user?.username]);

  if (loading) return <div className="card text-center">Carregando perfil...</div>;
  if (error) return <div className="card form-error">{error}</div>;
  if (!profile) return null;

  return (
    <div>
      <div className="profile-header">
        <img
          src={profile.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name || profile.username || "U")}
          alt="Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <div className="profile-username">@{profile.username}</div>
          <div className="profile-name">{profile.name}</div>
          <div className="profile-bio">{profile.bio || <span style={{ color: "#888" }}>Sem bio</span>}</div>
          {user?.username === profile.username && (
            <button className="edit-profile-btn" onClick={onEditProfile}>
              Editar Perfil
            </button>
          )}
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <h3 style={{ color: "#1E3A8A", marginBottom: 10 }}>Posts</h3>
        {posts.length === 0 ? (
          <div className="card text-center">Nenhum post ainda.</div>
        ) : (
          posts.map(post => (
            <Post
              key={post._id}
              post={post}
              token={token}
              onProfile={() => {}}
              showNotification={showNotification}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Carrega o componente Post (já criado)
const Post = window.Post;