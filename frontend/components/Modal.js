window.Modal = function Modal({ children, onClose }) {
  React.useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 18,
            background: "none",
            border: "none",
            color: "#E5E7EB",
            fontSize: 22,
            cursor: "pointer"
          }}
          aria-label="Fechar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};