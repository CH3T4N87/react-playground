import { useState } from "react";
import "./App.css";

const FILTERS = {
  role: ["admin", "user", "moderator"],
  status: ["active", "inactive", "banned"],
  plan: ["free", "pro", "enterprise"],
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const toggle = (key: string, value: string) => {
    setSelected(prev => {
      const current = prev[key] ?? [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const totalSelected = Object.values(selected).flat().length;

  const handleApply = () => {
    const params = new URLSearchParams();
    Object.entries(selected).forEach(([key, values]) =>
      values.forEach(v => params.append(key, v))
    );
    alert(`https://api.myapp.com/users?${params.toString()}`);
    setOpen(false);
  };

  return (
    <>
      {open && <div className="backdrop" onClick={() => setOpen(false)} />}

      <div className="popup-anchor">
        <button className="filter-btn" onClick={() => setOpen(p => !p)}>
          Filters {totalSelected > 0 && <span className="dot">{totalSelected}</span>}
        </button>

        {open && (
          <div className="popup">
            {Object.entries(FILTERS).map(([key, values]) => (
              <div className="filter-group" key={key}>
                <h4>{key}</h4>
                {values.map(value => (
                  <label key={value}>
                    <input
                      type="checkbox"
                      checked={(selected[key] ?? []).includes(value)}
                      onChange={() => toggle(key, value)}
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                ))}
              </div>
            ))}
            <div className="popup-actions">
              <button onClick={() => setSelected({})}>Reset</button>
              <button className="apply" onClick={handleApply}>Apply</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}