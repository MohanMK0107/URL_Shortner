
import { useState } from "react";
import "./App.css";
import { validateUrl } from "./utils/validateUrl";
import { generateUrl } from "./utils/api";

function App() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    try {
      if(!validateUrl(url)){
        alert("Enter a Valid Url");
        return
      }
      const response = await generateUrl(url,alias);
      console.log("response", response)

      setCopied(false);
    } catch {
      alert("Please enter a valid URL including https://");
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;

    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <header className="header">
        <div className="logo">
          <div className="logo-icon">↗</div>
          <h2>Shrink<span>ly.</span></h2>
        </div>
        <div className="header-tag">URL SHORTENER</div>
      </header>

      <main className="main-container">
        <div className="hero">
          <div className="hero-badge">
            <span className="status-dot"></span>
            SIMPLE. FAST. SECURE.
          </div>

          <h1>
            Shorten links.
            <br />
            <span>Expand possibilities.</span>
          </h1>

          <p>
            Turn your long URLs into short, memorable links.
            Share them anywhere, anytime.
          </p>
        </div>

        <section className="glass-card">
          <div className="card-heading">
            <div>
              <h3>Create your short link</h3>
              <p>Paste your long URL below to get started.</p>
            </div>
            <div className="link-icon">↗</div>
          </div>

          <div className="input-group">
            <label>YOUR LONG URL</label>
            <div className="input-wrapper">
              <span className="input-icon">🔗</span>
              <input
                type="url"
                placeholder="https://example.com/your-long-url..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>CUSTOM ALIAS <span>(OPTIONAL)</span></label>
            <div className="input-wrapper">
              <span className="alias-prefix">linkly/</span>
              <input
                type="text"
                placeholder="my-awesome-link"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
          </div>

          <button className="generate-btn" onClick={handleGenerate}>
            Generate Short URL
            <span>→</span>
          </button>

          <div className="result-section">
            <div className="result-heading">
              <span>YOUR SHORTENED URL</span>
              <span className="result-status">
                {shortUrl ? "READY" : "AWAITING URL"}
              </span>
            </div>

            <div className="result-box">
              <div className="result-url">
                <span className="result-link-icon">↗</span>
                <span className={shortUrl ? "generated" : "placeholder"}>
                  {shortUrl || "Your shortened URL will appear here"}
                </span>
              </div>

              <button
                className="copy-btn"
                onClick={handleCopy}
                disabled={!shortUrl}
              >
                {copied ? "Copied ✓" : "Copy ↗"}
              </button>
            </div>
          </div>
        </section>

        <div className="bottom-text">
          <span>✦</span> Make every character count.
        </div>
      </main>

      <footer>
        <span>© 2026 Linkly</span>
        <span>Made for better sharing ✦</span>
      </footer>
    </div>
  );
}

export default App;
