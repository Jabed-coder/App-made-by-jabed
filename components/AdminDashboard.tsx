
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Package, Users, DollarSign, TrendingUp, ShoppingBag, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Mon', sales: 4000, orders: 24, users: 40 },
  { name: 'Tue', sales: 3000, orders: 13, users: 30 },
  { name: 'Wed', sales: 2000, orders: 98, users: 20 },
  { name: 'Thu', sales: 2780, orders: 39, users: 27 },
  { name: 'Fri', sales: 1890, orders: 48, users: 18 },
  { name: 'Sat', sales: 2390, orders: 38, users: 23 },
  { name: 'Sun', sales: 3490, orders: 43, users: 34 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
        <div className="text-sm text-slate-500">Last updated: Today at 2:30 PM</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$128,430', change: '+12.5%', icon: DollarSign, color: 'indigo' },
          { label: 'Total Orders', value: '1,240', change: '+5.2%', icon: ShoppingBag, color: 'emerald' },
          { label: 'New Customers', value: '450', change: '+18.1%', icon: Users, color: 'amber' },
          { label: 'Inventory Items', value: '3,842', change: '-2 items', icon: Package, color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-lg`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Sales Overview</h3>
            <select className="bg-slate-50 border border-slate-200 text-xs rounded p-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Order Trends</h3>
            <TrendingUp size={18} className="text-emerald-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4 text-amber-800">
        <AlertCircle className="shrink-0" />
        <p className="text-sm font-medium">
          <strong>Inventory Alert:</strong> 12 products are running low on stock. Consider restocking soon.
        </p>
        <button className="ml-auto bg-amber-200 hover:bg-amber-300 px-3 py-1 rounded-lg text-xs font-bold transition-colors">
          View Items
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
