window.Sidebar = function Sidebar({ user, onNavigate, onLogout, theme, toggleTheme }) {
  const [open, setOpen] = React.useState(window.innerWidth > 1024);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    function handleResize() {
      setOpen(window.innerWidth > 1024);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (searchQuery.length > 2) {
      const results = mockUserData.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  function handleNav(page) {
    onNavigate(page);
    if (window.innerWidth <= 1024) setOpen(false);
  }

  function handleUserSearch(query) {
    setSearchQuery(query);
  }

  return (
    <>
      <button
        className="sidebar-toggle pointer"
        style={{
          position: 'fixed',
          top: 18,
          left: 18,
          zIndex: 30,
          background: '#1E3A8A',
          color: '#E5E7EB',
          border: 'none',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: window.innerWidth > 1024 ? 'none' : 'block'
        }}
        onClick={() => setOpen(!open)}
        aria-label="Abrir menu"
      >
        ☰
      </button>
      <nav className={`sidebar${open ? ' open' : ''}`}>
        <div style={{ marginBottom: 30, textAlign: 'center' }}>
          {user.photo && <img src={user.photo} alt="Foto do usuário" className="profile-photo" />}
          <img
            src={user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || user?.username || "U")}
            alt="Avatar"
            className="profile-avatar"
            style={{ margin: "0 auto" }}
          />
          <div className="profile-username" style={{ marginTop: 8 }}>
            @{user?.username}
          </div>
          <div className="profile-name" style={{ fontSize: "1em" }}>
            {user?.name}
          </div>
        </div>
        <a className="sidebar-link pointer" onClick={() => handleNav('main')}>Página Inicial</a>
        <a className="sidebar-link pointer" onClick={() => handleNav('profile')}>Meu Perfil</a>
        <a className="sidebar-link pointer" onClick={() => handleNav('settings')}>Configurações</a>
        <div className="theme-toggle" style={{ marginTop: 30 }}>
          <input
            type="checkbox"
            className="theme-checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            id="theme-toggle"
          />
          <label htmlFor="theme-toggle" style={{ color: "#E5E7EB", cursor: "pointer" }}>
            Tema {theme === 'dark' ? 'Escuro' : 'Claro'}
          </label>
        </div>
        <button className="logout-btn" onClick={onLogout} style={{ marginTop: 30 }}>
          Sair
        </button>
        <div style={{ marginTop: 30 }}>
          <input
            type="text"
            placeholder="Pesquisar usuários..."
            onChange={e => handleUserSearch(e.target.value)}
            style={{ width: "90%", padding: 6, borderRadius: 6, border: "1px solid #ccc" }}
          />
          <div id="search-results">
            {searchResults.map(result => (
              <div key={result.id} className="search-result" onClick={() => handleNav('profile', result)}>
                {result.username}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};