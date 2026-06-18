"use client";

import { useEffect, useRef, useState } from "react";

/* ── project schematic SVGs (brutalist line diagrams) ────────── */
function PipelineViz() {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet">
      <line x1="40" y1="100" x2="280" y2="100" stroke="#26262b" strokeWidth="1" />
      {[40, 120, 200, 280].map((x, i) => (
        <g key={x}>
          <rect
            x={x - 13}
            y={87}
            width="26"
            height="26"
            fill="none"
            stroke={i === 0 ? "#5b8cff" : i === 3 ? "#c6f24e" : "#54544e"}
            strokeWidth="1.2"
          />
          <text x={x} y={132} fill="#54544e" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle">
            {["WS", "CHAN", "WRITE", "DB"][i]}
          </text>
        </g>
      ))}
      <circle r="3" fill="#c6f24e">
        <animate attributeName="cx" values="40;280" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="100;100" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.9;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <circle r="2.5" fill="#5b8cff">
        <animate attributeName="cx" values="40;280" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
        <animate attributeName="cy" values="100;100" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.9;1" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function EscrowViz() {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet">
      <line x1="50" y1="100" x2="160" y2="100" stroke="#26262b" strokeWidth="1" />
      <line x1="160" y1="100" x2="270" y2="100" stroke="#26262b" strokeWidth="1" />
      <rect x="38" y="88" width="24" height="24" fill="none" stroke="#5b8cff" strokeWidth="1.2" />
      <text x="50" y="130" fill="#54544e" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle">POSTER</text>
      {/* lock */}
      <rect x="144" y="86" width="32" height="32" fill="none" stroke="#c6f24e" strokeWidth="1.3" />
      <rect x="154" y="100" width="12" height="9" fill="#c6f24e" />
      <path d="M156 100 v-4 a4 4 0 0 1 8 0 v4" fill="none" stroke="#c6f24e" strokeWidth="1.2" />
      <text x="160" y="136" fill="#54544e" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle">ESCROW PDA</text>
      <rect x="258" y="88" width="24" height="24" fill="none" stroke="#c6f24e" strokeWidth="1.2" />
      <text x="270" y="130" fill="#54544e" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle">HUNTER</text>
      <circle r="3" fill="#c6f24e">
        <animate attributeName="cx" values="50;270" dur="3s" repeatCount="indefinite" />
        <animate attributeName="cy" values="100;100" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.9;1" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function FanoutViz() {
  const targets = [40, 75, 110, 145, 180];
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet">
      {targets.map((y) => (
        <line key={y} x1="60" y1="100" x2="250" y2={y + 10} stroke="#26262b" strokeWidth="1" />
      ))}
      <rect x="47" y="87" width="26" height="26" fill="none" stroke="#c6f24e" strokeWidth="1.3" />
      <text x="60" y="132" fill="#54544e" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle">SENDER</text>
      {targets.map((y, i) => (
        <rect key={y} x="244" y={y + 4} width="12" height="12" fill="none" stroke={i % 2 ? "#5b8cff" : "#c6f24e"} strokeWidth="1.1" />
      ))}
      {targets.map((y, i) => (
        <circle key={y} r="2.5" fill="#c6f24e">
          <animate attributeName="cx" values="60;250" dur="2.2s" begin={`${i * 0.16}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values={`100;${y + 10}`} dur="2.2s" begin={`${i * 0.16}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur="2.2s" begin={`${i * 0.16}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

const PROJECTS = [
  {
    n: "001",
    status: "LIVE · MAINNET",
    blue: false,
    name: "Solana Indexer",
    tag: "Real-time Raydium swap pipeline",
    desc:
      "A Rust service that subscribes to the live Solana program-log stream over WebSocket, decodes Raydium AMM swap events, and persists them to Postgres in batches. Bounded-channel backpressure, exponential-backoff reconnect, idempotent writes, and an Axum query API. Indexing mainnet right now.",
    stack: ["Rust", "Tokio", "Axum", "tokio-tungstenite", "sqlx", "Postgres", "Fly.io"],
    links: [
      { t: "Live demo", u: "https://indexer.opebiyi.dev" },
      { t: "Source", u: "https://github.com/femiopebiyi/solana-indexer" },
    ],
    Viz: PipelineViz,
  },
  {
    n: "002",
    status: "LIVE · DEVNET",
    blue: true,
    name: "OpenBounty",
    tag: "Trustless GitHub bounties on Solana",
    desc:
      "Post a crypto reward on any open GitHub issue. Funds lock in an on-chain escrow PDA and release automatically to the contributor whose pull request merges, with no manual review and no custodian. A Rust service watches the GitHub GraphQL API for merged PRs and triggers winner selection on-chain.",
    stack: ["Anchor", "Rust", "Axum", "Next.js", "Postgres", "SOL · USDC escrow"],
    links: [
      { t: "Live site", u: "https://openbounty.tech" },
      { t: "Source", u: "https://github.com/femiopebiyi/bounty-board" },
    ],
    Viz: EscrowViz,
  },
  {
    n: "003",
    status: "LIVE",
    blue: false,
    name: "BulkPay",
    tag: "One-click mass payments on Solana",
    desc:
      "A bulk payment protocol that lets crypto teams send payouts to hundreds of wallets in a single transaction, with automatic scheduling for recurring runs. Built as a Rust and TypeScript monorepo, with the on-chain program handling batched transfers and a scheduler driving payroll-style disbursements.",
    stack: ["Solana program", "Rust", "TypeScript", "Recurring scheduler"],
    links: [
      { t: "Live site", u: "https://bulkpayapp.vercel.app" },
      { t: "Source", u: "https://github.com/femiopebiyi/bulkpay" },
    ],
    Viz: FanoutViz,
  },
];

const CAPS = [
  { k: "On-chain · Solana", v: ["Anchor", "Solana programs", "PDAs & escrow", "SPL tokens", "CPI", "event decoding"] },
  { k: "Backend · Rust", v: ["Axum", "Tokio", "async / await", "sqlx", "streaming pipelines", "WebSocket / SSE", "backpressure"] },
  { k: "Frontend", v: ["Next.js", "TypeScript", "React", "Tailwind", "wallet adapters", "real-time UIs"] },
  { k: "Infra & data", v: ["Postgres", "Docker", "Fly.io", "Vercel", "Neon", "CI/CD"] },
];

export default function Page() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle("solid", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div className="frame-l" />
      <div className="frame-r" />

      {/* NAV */}
      <nav className="nav" ref={navRef}>
        <div className="nav-in">
          <a href="#top" className="logo" onClick={() => setMenuOpen(false)}>
            <span className="blk">FO</span>FEMI_OPEBIYI
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#stack">Stack</a>
            <a href="#path">Path</a>
            <a href="#about">About</a>
            <a href="#contact" className="nav-hire">Hire →</a>
          </div>
          <button
            className={`nav-burger${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <a href="#work">Work</a>
        <a href="#stack">Stack</a>
        <a href="#path">Path</a>
        <a href="#about">About</a>
        <a href="#contact" className="nav-hire">Hire →</a>
      </div>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="shell">
          <div className="hero-meta">
            <span className="cell on"><span className="dot" />AVAILABLE FOR WORK</span>
            <span className="cell">RUST</span>
            <span className="cell">SOLANA</span>
            <span className="cell">REMOTE</span>
          </div>

          <h1 className="hero-title">
            <span className="ln"><span>BACKEND &amp;</span></span>
            <span className="ln"><span className="hollow">ON-CHAIN</span></span>
            <span className="ln"><span>SYSTEMS<span className="volt">.</span></span></span>
          </h1>

          <div className="hero-grid">
            <p className="hero-lede">
              I design and ship production-grade infrastructure in <strong>Rust</strong> on{" "}
              <strong>Solana</strong> and beyond. On-chain protocols, real-time indexers, and the
              backend services that connect them. From smart contract to live mainnet, end to end.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn fill">Start a project<span className="ar">→</span></a>
              <a href="#work" className="btn">View the work<span className="ar">↓</span></a>
            </div>
          </div>
        </div>
      </header>

      {/* WORK */}
      <section className="block" id="work">
        <div className="shell">
          <div className="reveal">
            <div className="tag"><span className="br">[</span><span className="num">01</span> / SELECTED_WORK <span className="br">]</span></div>
            <h2 className="h2">Shipped to production.</h2>
            <p className="lead">Not prototypes. Each one runs live on a real network, handling real value and real data.</p>
          </div>

          <div className="work reveal">
            {PROJECTS.map((p) => {
              const Viz = p.Viz;
              return (
                <article className="proj" key={p.n}>
                  <div className="proj-idx">{p.n}</div>
                  <div className="proj-main">
                    <div className={`proj-status${p.blue ? " blue" : ""}`}><span className="sq" />{p.status}</div>
                    <h3 className="proj-name">{p.name}</h3>
                    <div className="proj-tag">{p.tag}</div>
                    <p className="proj-desc">{p.desc}</p>
                    <div className="proj-links">
                      {p.links.map((l) => (
                        <a key={l.u} href={l.u} target="_blank" rel="noopener noreferrer">{l.t} →</a>
                      ))}
                    </div>
                  </div>
                  <div className="proj-side">
                    <div className="proj-viz"><Viz /></div>
                    <div className="proj-stack">
                      {p.stack.map((s) => <span key={s}>{s}</span>)}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="block" id="stack">
        <div className="shell">
          <div className="reveal">
            <div className="tag"><span className="br">[</span><span className="num">02</span> / CAPABILITIES <span className="br">]</span></div>
            <h2 className="h2">What I bring to a build.</h2>
            <p className="lead">Deep in Rust and Solana, comfortable across the full stack. I pick tools by fit, not habit.</p>
          </div>
          <div className="caps reveal">
            {CAPS.map((c) => (
              <div className="cap-row" key={c.k}>
                <div className="cap-key"><span className="sq" />{c.k}</div>
                <div className="cap-val">{c.v.map((x) => <span key={x}>{x}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATH */}
      <section className="block" id="path">
        <div className="shell">
          <div className="reveal">
            <div className="tag"><span className="br">[</span><span className="num">03</span> / THE_PATH <span className="br">]</span></div>
            <h2 className="h2">How I got to systems work.</h2>
            <p className="lead">From shipping mobile apps at scale to building on-chain infrastructure in Rust.</p>
          </div>
          <div className="path reveal">
            <div className="path-row">
              <div className="path-when">2025 → NOW</div>
              <div>
                <div className="path-role">Rust &amp; Solana Systems Engineer</div>
                <div className="path-where">Independent · freelance &amp; contract</div>
                <div className="path-detail">Designing and shipping on-chain protocols and backend infrastructure in Rust. Built OpenBounty, BulkPay, and a live Solana mainnet indexer, each taken from architecture to production deployment.</div>
              </div>
            </div>
            <div className="path-row">
              <div className="path-when">PRIOR</div>
              <div>
                <div className="path-role">Senior Frontend Engineer</div>
                <div className="path-where">React · health &amp; commerce platforms</div>
                <div className="path-detail">Shipped and maintained production web apps in telemedicine and e-commerce: real-time features, CI/CD pipelines, and integrations with live backend services at scale.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="block" id="about">
        <div className="shell">
          <div className="reveal">
            <div className="tag"><span className="br">[</span><span className="num">04</span> / ABOUT <span className="br">]</span></div>
            <h2 className="h2">The engineer behind it.</h2>
          </div>
          <div className="about-grid reveal">
            <div className="about-prose">
              <p>I&apos;m a full-stack engineer who lives in <span className="volt">Rust</span>, specializing in the Solana blockchain. I have a real command of the ownership model, async, error handling, and the idiomatic patterns that keep systems safe under load.</p>
              <p>What I care about most is <strong>shipping things that actually run</strong>. It is one thing to write a smart contract; it is another to take it all the way to mainnet with the indexing, the backend, the reconnect logic, and the deployment that make it a real service. That end-to-end ownership is where I am strongest.</p>
              <p>If you are building on Solana, or you need a backend engineer comfortable reading a smart contract and wiring up the pipeline around it, that is exactly the work I want.</p>
            </div>
            <div className="about-facts">
              <div className="f"><span className="k">Based</span><span className="v">Nigeria · Remote</span></div>
              <div className="f"><span className="k">Core</span><span className="v">Rust · Solana</span></div>
              <div className="f"><span className="k">Also</span><span className="v">Go · TypeScript</span></div>
              <div className="f"><span className="k">Shipped to</span><span className="v">Mainnet &amp; Devnet</span></div>
              <div className="f"><span className="k">Status</span><span className="v">Open to work</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="shell">
          <div className="reveal">
            <div className="tag"><span className="br">[</span><span className="num">05</span> / CONTACT <span className="br">]</span></div>
            <div className="big">
              LET&apos;S<br />
              <span className="hollow">BUILD</span> <span className="volt">SOMETHING.</span>
            </div>
            <div className="contact-row">
              <a href="mailto:opebiyibiodun10@gmail.com" className="btn fill">opebiyibiodun10@gmail.com<span className="ar">→</span></a>
              <a href="https://github.com/femiopebiyi" target="_blank" rel="noopener noreferrer" className="btn">GitHub<span className="ar">→</span></a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell foot-in">
          <span className="l">© {new Date().getFullYear()} FEMI OPEBIYI</span>
          <span className="r">
            <a href="https://github.com/femiopebiyi" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://indexer.opebiyi.dev" target="_blank" rel="noopener noreferrer">Indexer</a>
            <a href="mailto:opebiyibiodun10@gmail.com">Email</a>
          </span>
        </div>
      </footer>
    </>
  );
}
