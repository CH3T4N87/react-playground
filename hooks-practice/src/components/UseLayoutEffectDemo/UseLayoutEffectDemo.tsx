import { useEffect, useLayoutEffect } from "react";

export default function UseLayoutEffectDemo() {
  console.log("Render");

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, []);

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return <h1>Hello</h1>;
}