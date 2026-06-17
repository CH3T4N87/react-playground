import { forwardRef, useImperativeHandle, useRef} from "react";



const Child = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput() {
      inputRef.current?.focus();
    },
  }));

  return <input ref={inputRef} placeholder="Type here" />;
});

export default function UseImperativeHandleDemo() {
  const childRef = useRef<any>(null);

  return (
    <>
      <Child ref={childRef} />
  

      <button onClick={() => childRef.current.focusInput()}>
        Focus Input
      </button>
    </>
  );
}