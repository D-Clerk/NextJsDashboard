import SideNav from '@/app/ui/dashboard/sidenav';  // Adjust path to your side nav component

export default function CustomersLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-100">
        <SideNav />
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
