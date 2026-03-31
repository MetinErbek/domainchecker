import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      fetch(`/check-domain?name=${query}`)
        .then((res) => res.json())
        .then((data) => {
          // JSON yapısına göre results dizisini alıyoruz
          setResults(data.data.results || []);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Domain Checker</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Domain yaz..."
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "250px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      />

      {loading && <div style={{ marginBottom: 20 }}>Sorgulanıyor...</div>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {results.map((item) => (
          <div
            key={item.domain}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
              padding: "10px 15px",
              borderRadius: "8px",
              backgroundColor: item.available ? "#e0f8e9" : "#fde2e2",
              color: item.available ? "#2e7d32" : "#c62828",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <span>{item.domain}</span>
            <span>{item.available ? "✅" : "❌"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;