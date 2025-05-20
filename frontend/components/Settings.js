window.Settings = function Settings({ theme, toggleTheme, onLogout, showNotification }) {
  return (
    <div className="settings-card">
      <h2 style={{ color: "#1E3A8A", marginBottom: 20 }}>Configurações</h2>
      <div className="theme-toggle">
        <input
          type="checkbox"
          className="theme-checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          id="theme-toggle-settings"
        />
        <label htmlFor="theme-toggle-settings" style={{ color: "#E5E7EB", cursor: "pointer" }}>
          Tema {theme === 'dark' ? 'Escuro' : 'Claro'}
        </label>
      </div>
      <button
        className="logout-btn"
        onClick={() => {
          onLogout();
          showNotification && showNotification('success', 'Logout realizado!');
        }}
        style={{ marginTop: 30, width: "100%" }}
      >
        Sair da conta
      </button>
    </div>
  );
};