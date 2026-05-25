const { useEffect } = React;

const PALETTES = [
  { id: 'tierra',  label: 'Dorado tostado', swatch: ['#d9b46a', '#b48942', '#faf3e3'] },
  { id: 'bosque',  label: 'Bosque',         swatch: ['#5a7a52', '#2f5d44', '#eef2e8'] },
  { id: 'arcilla', label: 'Arcilla',        swatch: ['#c46a3e', '#9d4923', '#faeede'] },
  { id: 'lino',    label: 'Lino',           swatch: ['#a09680', '#7a715b', '#f5f1e8'] },
];

function PaletteSwatches({ value, onChange }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 12 }}>
      {PALETTES.map((p) => {
        const on = p.id === value;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            style={{
              border: on ? '2px solid #fff' : '1px solid rgba(255,255,255,0.15)',
              outline: on ? '1px solid rgba(255,255,255,0.4)' : 'none',
              borderRadius: 6,
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.04)',
              color: '#fff',
              fontSize: 12,
              fontFamily: 'inherit',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span style={{ display: 'flex', gap: 3 }}>
              {p.swatch.map((c, i) => (
                <span key={i} style={{ width: 18, height: 18, borderRadius: 4, background: c, border: '1px solid rgba(0,0,0,0.1)' }} />
              ))}
            </span>
            <span style={{ opacity: 0.85, fontSize: 11 }}>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  useEffect(() => {
    document.body.setAttribute('data-palette', t.palette);
    document.body.setAttribute('data-mode', t.mode);
  }, [t.palette, t.mode]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Paleta">
        <PaletteSwatches value={t.palette} onChange={(v) => setTweak('palette', v)} />
      </TweakSection>

      <TweakSection label="Modo">
        <TweakRadio
          label="Tema"
          value={t.mode}
          onChange={(v) => setTweak('mode', v)}
          options={[
            { value: 'light', label: 'Claro' },
            { value: 'dark',  label: 'Oscuro' },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<TweaksApp />);
