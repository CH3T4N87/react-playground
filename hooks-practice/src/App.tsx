import UseActionStateDemo from "./components/UseActionStateDemo/UseActionStateDemo"
import UseDeferredValueDemo from "./components/UseDeferredValueDemo/UseDeferredValueDemo"
import UseEffectEventDemo from "./components/UseEffectEventDemo/UseEffectEventDemo"
import UseImperativeHandleDemo from "./components/UseImperativeHandleDemo/UseImperativeHandleDemo"
import UseLayoutEffectDemo from "./components/UseLayoutEffectDemo/UseLayoutEffectDemo"
import UseOptimisticDemo from "./components/UseOptimisticDemo/UseOptimisticDemo"
import UseRefDemo from "./components/UseRefDemo/UseRefDemo"

const App = () => {
  return (
    <div>
      {/* <UseActionStateDemo/> */}
      {/* <UseDeferredValueDemo/> */}
      {/* <UseRefDemo/> */}
      {/* <UseImperativeHandleDemo/> */}
      {/* <UseLayoutEffectDemo/> */}
      {/* <UseOptimisticDemo/> */}
      <UseEffectEventDemo/>
    </div>
  )
}

export default App