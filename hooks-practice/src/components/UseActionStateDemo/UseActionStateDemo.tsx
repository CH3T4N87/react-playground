import { useActionState } from "react"

interface stateType {
    success: boolean
    error: string
}


const UseActionStateDemo = () => {
    const [state, submitAction, isPending] = useActionState(
        async (prevState: Partial<stateType>, formData: FormData): Promise<Partial<stateType>> => {
            const email = formData.get("email");

            if (!email) {
                return { error: "Email is required" };
            }

            return { success: true };
        },
        { success: false }
    );

    return (
        <form action={submitAction}>
            <input name="email" />
            <button disabled={isPending}>Submit</button>

            {state.error && <p>{state.error}</p>}
        </form>
    );
}

export default UseActionStateDemo