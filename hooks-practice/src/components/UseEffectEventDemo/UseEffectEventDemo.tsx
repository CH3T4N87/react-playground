import { useEffect, useEffectEvent, useState } from "react";

export default function UseEffectEventDemo() {
  const [count, setCount] = useState(0);

  const logCount = useEffectEvent(() => {
    console.log(count);
  });

  useEffect(() => {
    const interval = setInterval(() => {
        console.log(count)
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}