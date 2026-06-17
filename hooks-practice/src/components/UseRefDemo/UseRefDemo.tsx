import { useRef } from "react";

export default function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);

  function handleFocus() {
    inputRef.current?.focus();
  }

  function handleCount() {
    countRef.current += 1;
    alert(`Clicked ${countRef.current} times — component did NOT re-render`);
  }

  return (
    <div>
      <h2>useRef demo</h2>

      <input ref={inputRef} placeholder="I can be focused via ref" />
      <button onClick={handleFocus}>Focus input</button>
      <button onClick={handleCount}>
        Click me
      </button>
    </div>
  );
}