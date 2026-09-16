import { useEffect, useRef, useState } from "react";
import { SITE, PHOTOS, VIDEOS, HERO_IMG, whatsappLink } from "./config.js";
import "./App.css";

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const HIGHLIGHTS = [
  { t: "Muy luminoso", s: "Luz natural todo el día", d: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m11 11 1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { t: "Ubicación estratégica", s: "Cerca de todo", d: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
  { t: "Alquiler permanente", s: "Tu hogar a largo plazo", d: "M8 7V5m8 2v2M6 5h12v14H6zM6 10h12M10 14h4" },
  { t: "Apto profesional", s: "Ideal para trabajar", d: "M4 8h16v11H4zM9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 13h16" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [grid, setGrid] = useState(false);
  const touchX = useRef(null);
  const wa = whatsappLink();
  const total = PHOTOS.length;

  const goTo = (i) => setIndex(((i % total) + total) % total);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    touchX.current = null;
  };

  const handleVideoPlay = (e) => {
    const v = e.currentTarget;
    try {
      if (document.fullscreenElement) return;
      if (v.requestFullscreen) {
        const p = v.requestFullscreen();
        if (p && p.catch) p.catch(() => {});
      } else if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      }
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    if (!lightbox) return;
    const fn = (e) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, total]);

  return (
    <div className="page">
      <header className="topbar">
        <span className="logo-dot" /> VILLA · RENTA
        <a className="top-cta" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
      </header>

      {/* HERO */}
      <section className="hero">
        <img src={HERO_IMG} alt="Foto principal del departamento" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="pill">{SITE.badge}</span>
          <h1>{SITE.titulo}<br /><em>{SITE.zona}</em></h1>
          <p>{SITE.subtitulo}</p>
          <div className="hero-actions">
            <a className="btn-wa" href={wa} target="_blank" rel="noreferrer">📲 Consultar por WhatsApp</a>
            <a className="btn-ghost" href="#galeria">Ver fotos</a>
          </div>
          <small>{SITE.precio}</small>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section">
        <h2>Lo que lo hace especial</h2>
        <div className="high-grid">
          {HIGHLIGHTS.map((h) => (
            <div className="high-card" key={h.t}>
              <Icon d={h.d} />
              <strong>{h.t}</strong>
              <span>{h.s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GALERÍA GRANDE CON TRANSICIÓN */}
      <section className="section gal-section" id="galeria">
        <div className="sec-head">
          <h2>Galería · {total} fotos</h2>
          <button className="link" onClick={() => setGrid(!grid)}>{grid ? "Ver slider" : "Ver todas"}</button>
        </div>

        {!grid ? (
          <>
            <div
              className="slider-viewport"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="slider-track"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {PHOTOS.map((src, i) => (
                  <button
                    key={src}
                    className={`slider-slide ${i === index ? "active" : ""}`}
                    onClick={() => { setIndex(i); setLightbox(true); }}
                    aria-label={`Abrir foto ${i + 1}`}
                    tabIndex={i === index ? 0 : -1}
                  >
                    <img
                      src={src}
                      alt={`Foto ${i + 1} del departamento`}
                      loading={i < 2 ? "eager" : "lazy"}
                      draggable="false"
                    />
                  </button>
                ))}
              </div>

              <span className="slider-count">{index + 1} / {total}</span>
              <button className="slider-arrow left" onClick={prev} aria-label="Anterior">‹</button>
              <button className="slider-arrow right" onClick={next} aria-label="Siguiente">›</button>
            </div>

            <div className="slider-dots">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  className={i === index ? "on" : ""}
                  onClick={() => goTo(i)}
                  aria-label={`Ir a foto ${i + 1}`}
                />
              ))}
            </div>
            <p className="hint">Desliza o usa las flechas · toca para ampliar</p>
          </>
        ) : (
          <div className="grid">
            {PHOTOS.map((src, i) => (
              <button key={src} onClick={() => { setIndex(i); setLightbox(true); }}>
                <img src={src} alt={`Foto ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* VIDEO FULLSCREEN AL DAR PLAY */}
      {VIDEOS.length > 0 && (
        <section className="section">
          <h2>Video tour</h2>
          {VIDEOS.map((v) => (
            <video
              key={v}
              src={v}
              controls
              preload="metadata"
              playsInline
              className="video"
              onPlay={handleVideoPlay}
            />
          ))}
          <p className="hint">Al darle play se abre a pantalla completa</p>
        </section>
      )}

      {/* DESCRIPCIÓN */}
      <section className="section card">
        <h2>Un espacio pensado para ti</h2>
        <p>
          <strong>Living-Comedor:</strong> Amplio y muy luminoso, con pisos de
          primera calidad y salida directa al amplio balcón terraza en 8vo piso.
        </p>
        <ul className="check">
          <li>✓ <strong>A estrenar</strong> en Villa Crespo</li>
          <li>✓ <strong>Aire Acondicionado</strong></li>
          <li>✓ <strong>Cocina integrada:</strong> Diseño moderno con muebles bajo mesada y alacenas completas, cocina con anafe y horno de última generación.</li>
          <li>✓ <strong>Dormitorio:</strong> Confortable, con excelente luz natural y placard equipado.</li>
          <li>✓ <strong>Baño:</strong> Completo, con espejo, accesorios y griferías de categoría.</li>
          <li>✓ <strong>Amenities del edificio:</strong> Salón de Usos Múltiples (SUM) con parrilla, ideal para reuniones (pendiente de habilitación).</li>
          <li>✓ <strong>Cocheras:</strong> Posibilidad de alquilar cochera en el mismo edificio (opcional, no incluida en el precio).</li>
          <li>✓ <strong>Apto profesional</strong></li>
        </ul>
        <p className="muted">¿Quieres la descripción completa? Pídela por WhatsApp y te enviamos todos los detalles + ubicación exacta.</p>
      </section>

      {/* CONTACTO / CIERRE */}
      <section className="section card dark" id="contacto">
        <h2>Agenda tu visita hoy</h2>
        <p className="price">{SITE.precioMensual} <span>/ mes</span></p>
        <p>📍 {SITE.ubicacionAprox}</p>
        <h3>Condiciones</h3>
        <ul>
          {SITE.requisitos.map((r) => <li key={r}>· {r}</li>)}
        </ul>
        <a className="btn-wa big" href={wa} target="_blank" rel="noreferrer">📲 Consultar por WhatsApp</a>
        <small>Respuesta rápida · Sin compromiso</small>
      </section>

      <footer>Hecho para renta inmediata · Fotos reales del inmueble</footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lb" onClick={() => setLightbox(false)}>
          <img src={PHOTOS[index]} alt="Foto ampliada" onClick={(e) => e.stopPropagation()} />
          <div className="lb-bar" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIndex((index - 1 + total) % total)}>‹</button>
            <span>{index + 1} / {total}</span>
            <button onClick={() => setIndex((index + 1) % total)}>›</button>
            <button onClick={() => setLightbox(false)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
