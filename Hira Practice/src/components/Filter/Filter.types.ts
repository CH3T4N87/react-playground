export type Option = {
    label: string,
    value: string | number
}
export default interface FilterProps {
    name: string,
    options: Option[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}