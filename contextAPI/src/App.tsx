import { useState } from "react";
import "./App.css";

const FILTERS = {
  role: ["admin", "user", "moderator"],
  status: ["active", "inactive", "banned"],
  plan: ["free", "pro", "enterprise"],
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );

  const handleApply = () => {
    const query = selected.join("&");
    alert(`https://api.myapp.com/users?${query}`);
    setOpen(false);
  };

  return (
    <>
      {open && <div className="backdrop" onClick={() => setOpen(false)} />}

      <div className="popup-anchor">
        <button className="filter-btn" onClick={() => setOpen(p => !p)}>
          Filters {selected.length > 0 && <span className="dot">{selected.length}</span>}
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
                      checked={selected.includes(`${key}:${value}`)}
                      onChange={() => toggle(`${key}:${value}`)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            ))}
            <div className="popup-actions">
              <button onClick={() => setSelected([])}>Reset</button>
              <button className="apply" onClick={handleApply}>Apply</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}