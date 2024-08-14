
interface SidebarProps {
    sidebar: string
}
export default function Sidebar(props: SidebarProps) {


    return (
        <div className={props.sidebar}>
            test
        </div>
    )
}