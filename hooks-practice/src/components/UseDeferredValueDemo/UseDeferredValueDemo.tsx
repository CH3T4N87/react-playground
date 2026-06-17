import { useDeferredValue, useState } from "react";

function UseDeferredValueDemo() {
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query); // ← lags behind intentionally

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* <HeavyList filter={deferred} /> only re-renders when React is free */}
    </>
  );
}

export default UseDeferredValueDemo;