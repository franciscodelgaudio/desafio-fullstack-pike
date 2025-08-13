import SidebarLink from "@/components/sidebarlink";

export default function Sidebar()
{
    return(
        <aside className="bg-gray-100 border-r border-gray-300 min-h-screen w-60 p-4 flex flex-col">
            <h2 className="text-lg font-bold mb-4 p-4">Menu</h2>
            <SidebarLink href="/projeto">Projetos</SidebarLink>
            <SidebarLink href="/tarefas">Tarefas</SidebarLink>
        </aside>
    );
}