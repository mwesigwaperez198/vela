'use client';

import Link from 'next/link';

export default function AdminOrdersPage() {
  const orders = [
    { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', phone: '0754321098', total: 4850000, status: 'pending', date: '2024-01-15 14:30' },
    { id: 'ORD-002', customer: 'Sarah Mukasa', email: 'sarah@example.com', phone: '0789123456', total: 3200000, status: 'confirmed', date: '2024-01-15 12:15' },
    { id: 'ORD-003', customer: 'David Ochieng', email: 'david@example.com', phone: '0701234567', total: 7100000, status: 'delivered', date: '2024-01-14 16:45' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <aside className="w-64 bg-luxuryBlack text-white min-h-screen fixed">
          <div className="p-6 border-b border-neutral-800">
            <Link href="/admin">
              <h1 className="font-serif text-xl tracking-extra-wide">DA-VELA CMS</h1>
              <p className="text-[10px] text-neutral-400 mt-1 tracking-editorial uppercase">Control Panel</p>
            </Link>
          </div>
          <nav className="p-4">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>📊</span><span className="font-light">Dashboard</span>
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>👗</span><span className="font-light">Products/Fashions</span>
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>🖼️</span><span className="font-light">Gallery Collection</span>
            </Link>
            <Link href="/admin/campaigns" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>🎬</span><span className="font-light">Hero Videos & Campaigns</span>
            </Link>
            <Link href="/admin/navigation" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>🧭</span><span className="font-light">Ghost Navigation</span>
            </Link>
            <Link href="/admin/payments" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>💳</span><span className="font-light">Payments & Settings</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-sm bg-neutral-900 rounded mb-1">
              <span>📋</span><span className="font-light">Orders & Logs</span>
            </Link>
            <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>💬</span><span className="font-light">Inquiries & Messages</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>⚙️</span><span className="font-light">Site Settings</span>
            </Link>
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="font-serif text-4xl mb-2">Orders & Logs</h2>
            <p className="text-neutral-600 font-light">Track all orders, payments, and system logs</p>
          </header>

          <div className="bg-white border border-neutral-200">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="font-serif text-xl">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Order ID</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Customer</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Contact</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Total</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Status</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Date</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="p-4 font-medium">{order.id}</td>
                      <td className="p-4">{order.customer}</td>
                      <td className="p-4 text-sm text-neutral-600">
                        <div>{order.email}</div>
                        <div>{order.phone}</div>
                      </td>
                      <td className="p-4">UGX {order.total.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-neutral-600">{order.date}</td>
                      <td className="p-4">
                        <button className="text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-0.5">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-white border border-neutral-200">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="font-serif text-xl">System Logs</h3>
            </div>
            <div className="p-6 space-y-2 text-sm font-mono text-neutral-600">
              <div>[2024-01-15 14:30:22] Order ORD-001 created</div>
              <div>[2024-01-15 14:31:05] Email notification sent to novaratechafrica@gmail.com</div>
              <div>[2024-01-15 14:31:06] WhatsApp notification queued</div>
              <div>[2024-01-15 12:15:18] Order ORD-002 created</div>
              <div>[2024-01-15 12:16:02] Email notification sent to novaratechafrica@gmail.com</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
