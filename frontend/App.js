const { useState, useEffect } = React;

// Importação dos componentes (serão criados nos próximos passos)
const Login = window.Login;
const Register = window.Register;
const Sidebar = window.Sidebar;
const PostList = window.PostList;
const NewPost = window.NewPost;
const Profile = window.Profile;
const EditProfile = window.EditProfile;
const Settings = window.Settings;
const Notifications = window.Notifications;
const Modal = window.Modal;

// Utilitário para obter o token do localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Utilitário para remover o token (logout)
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// App principal
function App() {
  // Estado global
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });
  const [page, setPage] = useState(token ? 'main' : 'login'); // login, register, main, profile, settings
  const [notification, setNotification] = useState(null);
  const [modal, setModal] = useState(null); // Para modais como "Saiba Mais"
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Persistência do tema
  useEffect(() => {
    document.body.style.background = theme === 'dark' ? '#1A1A1A' : '#FFFFFF';
    document.body.style.color = theme === 'dark' ? '#E5E7EB' : '#1A1A1A';
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Função para login bem-sucedido
  function handleLoginSuccess(token, user) {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setPage('main');
    setNotification({ type: 'success', message: 'Login realizado com sucesso!' });
  }

  // Função para logout
  function handleLogout() {
    logout();
    setToken(null);
    setUser(null);
    setPage('login');
    setNotification({ type: 'success', message: 'Logout realizado!' });
  }

  // Função para exibir notificações
  function showNotification(type, message) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  }

  // Função para alternar tema
  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  // Renderização condicional das páginas
  let content;
  if (!token) {
    content = (
      <div className="centered">
        {page === 'login' && (
          <Login
            onLogin={handleLoginSuccess}
            onSwitchToRegister={() => setPage('register')}
            onShowAbout={() => setModal('about')}
            showNotification={showNotification}
          />
        )}
        {page === 'register' && (
          <Register
            onRegister={handleLoginSuccess}
            onSwitchToLogin={() => setPage('login')}
            onShowAbout={() => setModal('about')}
            showNotification={showNotification}
          />
        )}
        {modal === 'about' && (
          <Modal onClose={() => setModal(null)}>
            <h2>Sobre o OpenNotes</h2>
            <p>
              OpenNotes é uma plataforma para compartilhar ideias curtas e conectar pessoas.<br/>
              Inspirado no X (antigo Twitter), aqui você pode postar, curtir, comentar e muito mais!
            </p>
          </Modal>
        )}
      </div>
    );
  } else {
    content = (
      <div>
        <Sidebar
          user={user}
          onNavigate={setPage}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="main-content">
          {page === 'main' && (
            <>
              <NewPost token={token} showNotification={showNotification} />
              <PostList
                token={token}
                onProfile={username => { setPage('profile'); setUser({ ...user, username }); }}
                showNotification={showNotification}
              />
            </>
          )}
          {page === 'profile' && (
            <Profile
              token={token}
              user={user}
              onEditProfile={() => setPage('editProfile')}
              showNotification={showNotification}
            />
          )}
          {page === 'editProfile' && (
            <EditProfile
              token={token}
              user={user}
              onProfileUpdated={updatedUser => { setUser(updatedUser); setPage('profile'); }}
              showNotification={showNotification}
            />
          )}
          {page === 'settings' && (
            <Settings
              theme={theme}
              toggleTheme={toggleTheme}
              onLogout={handleLogout}
              showNotification={showNotification}
            />
          )}
        </main>
        <Notifications notification={notification} />
      </div>
    );
  }

  return content;
}

// Renderiza o App no root
ReactDOM.createRoot(document.getElementById('root')).render(<App />);