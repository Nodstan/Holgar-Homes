import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Building, Users, Settings, LogOut, Plus, Edit, Trash2, 
  Search, Bell, Eye, MessageSquare, ToggleLeft, ToggleRight, Star, MoreVertical 
} from 'lucide-react';
import { properties as initialProperties } from '../data/data';

// Mock extended data for admin
const mockAdminProperties = initialProperties.map((p, index) => ({
  ...p,
  status: index % 4 === 0 ? 'Sold' : index % 3 === 0 ? 'Under Contract' : 'Active',
  views: Math.floor(Math.random() * 2000) + 200,
  inquiries: Math.floor(Math.random() * 50) + 2,
  isFeatured: index < 3
}));

const initialLeads = [
  { id: 1, name: 'Aliko Dangote', email: 'contact@dangote.com', phone: '+234 800 000 0000', interest: '6-Bed Villa, Eko Atlantic', source: 'Website Form', status: 'Hot', lastContact: '2026-02-20', notes: 'Looking for a large family home.' },
  { id: 2, name: 'Femi Otedola', email: 'femi@otedola.com', phone: '+234 801 111 1111', interest: '4-Bed Penthouse, Victoria Island', source: 'WhatsApp', status: 'Warm', lastContact: '2026-02-18', notes: 'Interested in ocean views.' },
  { id: 3, name: 'Tony Elumelu', email: 'tony@heirs.com', phone: '+234 802 222 2222', interest: '5-Bed Villa, Banana Island', source: 'Referral', status: 'Cold', lastContact: '2026-02-10', notes: 'No rush, just browsing.' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminProperties, setAdminProperties] = useState(mockAdminProperties);
  const [propertySearch, setPropertySearch] = useState('');
  const [leads, setLeads] = useState(initialLeads);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');

  const toggleFeatured = (id: number) => {
    setAdminProperties(adminProperties.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const changeStatus = (id: number, newStatus: string) => {
    setAdminProperties(adminProperties.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
  };

  const deleteProperty = (id: number) => {
    if(window.confirm('Are you sure you want to delete this property?')) {
      setAdminProperties(adminProperties.filter(p => p.id !== id));
    }
  };

  const openNote = (lead: any) => {
    setActiveNoteId(lead.id);
    setNoteText(lead.notes);
  };

  const saveNote = () => {
    setLeads(leads.map(l => l.id === activeNoteId ? { ...l, notes: noteText } : l));
    setActiveNoteId(null);
  };

  const filteredProperties = adminProperties.filter(p => 
    p.title.toLowerCase().includes(propertySearch.toLowerCase()) || 
    p.location.toLowerCase().includes(propertySearch.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, here's what's happening today.</p>
        </div>
        <button 
          onClick={() => setActiveTab('properties')}
          className="bg-[#C5A059] hover:bg-[#b38f4a] text-white px-5 py-2.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Building size={16} /> Manage Properties
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1 font-medium">Total Properties</p>
            <p className="text-3xl font-serif text-slate-900">{adminProperties.length}</p>
          </div>
          <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059]">
            <Building size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1 font-medium">Active Leads</p>
            <p className="text-3xl font-serif text-slate-900">{leads.length}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <Users size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1 font-medium">Total Portfolio Value</p>
            <p className="text-3xl font-serif text-slate-900">₦3.2B</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
            <span className="font-serif text-2xl">₦</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-slate-900">Recent Leads</h2>
          <button onClick={() => setActiveTab('leads')} className="text-sm text-[#C5A059] hover:text-[#b38f4a] font-medium">View All</button>
        </div>
        <div className="p-0">
          {leads.map((lead, i) => (
            <div key={lead.id} className={`px-6 py-4 flex items-center justify-between ${i !== leads.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div>
                <p className="font-medium text-slate-900">{lead.name}</p>
                <p className="text-sm text-gray-500">Inquired about: <span className="text-[#C5A059]">{lead.interest}</span></p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                lead.status === 'Hot' ? 'bg-red-50 text-red-600' : 
                lead.status === 'Warm' ? 'bg-orange-50 text-orange-600' : 'bg-[#C5A059]/10 text-[#C5A059]'
              }`}>
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Properties Management</h1>
          <p className="text-sm text-gray-500">Manage your listings, update statuses, and track performance.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search properties..." 
              value={propertySearch}
              onChange={(e) => setPropertySearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
            />
          </div>
          <button className="bg-[#C5A059] hover:bg-[#b38f4a] text-white px-5 py-2.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map(prop => (
          <div key={prop.id} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
            {/* Thumbnail */}
            <div className="relative h-48">
              <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-sm shadow-sm text-white ${
                  prop.status === 'Active' ? 'bg-green-600' : 
                  prop.status === 'Under Contract' ? 'bg-amber-500' : 'bg-red-600'
                }`}>
                  {prop.status}
                </span>
                {prop.isFeatured && (
                  <span className="px-2.5 py-1 bg-[#C5A059] text-white text-xs font-medium rounded-sm shadow-sm flex items-center gap-1">
                    <Star size={12} className="fill-current" /> Featured
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif text-lg text-slate-900 leading-tight mb-1">{prop.title}</h3>
                  <p className="text-sm text-gray-500">{prop.location}</p>
                </div>
                <p className="font-medium text-[#C5A059] whitespace-nowrap ml-4">{prop.price}</p>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 mt-4 mb-6 py-3 border-y border-gray-100">
                <div className="flex items-center gap-1.5 text-sm text-gray-600" title="Total Views">
                  <Eye size={16} className="text-gray-400" />
                  <span className="font-medium">{prop.views.toLocaleString()}</span> views
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600" title="Total Inquiries">
                  <MessageSquare size={16} className="text-gray-400" />
                  <span className="font-medium">{prop.inquiries}</span> inquiries
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600 font-medium">Status</label>
                  <select 
                    value={prop.status}
                    onChange={(e) => changeStatus(prop.id, e.target.value)}
                    className="text-sm border border-gray-200 rounded-sm px-2 py-1 focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Contract">Under Contract</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600 font-medium">Feature on Home</label>
                  <button 
                    onClick={() => toggleFeatured(prop.id)}
                    className={`transition-colors ${prop.isFeatured ? 'text-[#C5A059]' : 'text-gray-300'}`}
                  >
                    {prop.isFeatured ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button className="flex-1 bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 hover:border-gray-300 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow">
                    <Edit size={16} /> Edit Details
                  </button>
                  <button 
                    onClick={() => deleteProperty(prop.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-red-500 border border-gray-200 hover:border-red-500 rounded-md transition-all duration-300 shadow-sm hover:shadow"
                    title="Delete Property"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Leads & Clients</h1>
          <p className="text-sm text-gray-500">Manage inquiries and client relationships.</p>
        </div>
        <button className="bg-[#C5A059] hover:bg-[#b38f4a] text-white px-4 py-2 text-sm font-medium rounded-sm flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={16} /> Add Lead
        </button>
      </div>

      <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Client Name</th>
              <th className="px-6 py-4 font-medium">Interest</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Last Contact</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {leads.map(lead => (
              <React.Fragment key={lead.id}>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                    <p className="text-xs text-gray-500">{lead.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-[#C5A059] font-medium">{lead.interest}</td>
                  <td className="px-6 py-4 text-gray-500">{lead.source}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-sm text-xs font-medium ${
                      lead.status === 'Hot' ? 'bg-red-50 text-red-600' : 
                      lead.status === 'Warm' ? 'bg-orange-50 text-orange-600' : 'bg-[#C5A059]/10 text-[#C5A059]'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{lead.lastContact}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openNote(lead)}
                      className="text-[#C5A059] hover:text-[#b38f4a] font-medium text-sm transition-colors"
                    >
                      Notes
                    </button>
                  </td>
                </tr>
                {activeNoteId === lead.id && (
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-slate-900">Client Notes & Preferences</label>
                        <textarea 
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:outline-none focus:border-[#C5A059] min-h-[100px]"
                          placeholder="Add notes about client preferences, budget, timeline..."
                        />
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setActiveNoteId(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={saveNote}
                            className="bg-[#C5A059] hover:bg-[#b38f4a] text-white px-4 py-2 text-sm font-medium rounded-sm transition-colors shadow-sm"
                          >
                            Save Notes
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-slate-900 mb-1">Platform Settings</h1>
        <p className="text-sm text-gray-500">Configure your brand, profile, and system preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 border-b border-gray-100 pb-2">Profile Settings</h2>
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                <img src="https://picsum.photos/seed/voke/200/200" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <button className="bg-white border border-gray-200 text-slate-900 hover:bg-gray-50 px-4 py-2 text-sm font-medium rounded-sm transition-colors mb-2">
                  Upload Headshot
                </button>
                <p className="text-xs text-gray-500">Recommended size: 400x400px</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" defaultValue="Voke Irekpita" className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" defaultValue="voke@hogarhomesng.com" className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]" />
              </div>
            </div>
          </div>

          {/* Site Branding */}
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 border-b border-gray-100 pb-2">Site Branding</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color Hex Code</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#C5A059] border border-gray-200 shadow-inner"></div>
                  <input type="text" defaultValue="#C5A059" className="w-32 border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                <div className="border-2 border-dashed border-gray-200 rounded-sm p-6 flex flex-col items-center justify-center bg-gray-50">
                  <div className="w-12 h-12 bg-[#C5A059] flex items-center justify-center rounded-sm mb-3">
                    <span className="font-serif text-white font-bold text-2xl leading-none">H</span>
                  </div>
                  <button className="text-sm font-medium text-[#C5A059] hover:text-[#b38f4a]">Click to upload</button>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, or JPG (max. 2MB)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 border-b border-gray-100 pb-2">Security</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 border-b border-gray-100 pb-2">Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700">Email me for new leads</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A059]"></div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700">Weekly sales report</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A059]"></div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700">Property expiration alerts</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A059]"></div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-sm border border-gray-200">
            <h3 className="text-sm font-medium text-slate-900 mb-2">Save Changes</h3>
            <p className="text-xs text-gray-500 mb-4">Don't forget to save your settings after making changes.</p>
            <button className="w-full bg-[#C5A059] hover:bg-[#b38f4a] text-white px-4 py-2 text-sm font-medium rounded-sm transition-colors shadow-sm">
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C5A059] flex items-center justify-center rounded-sm">
            <span className="font-serif text-white font-bold text-xl leading-none">H</span>
          </div>
          <span className="font-serif text-xl tracking-wide">Hogar Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#C5A059] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${activeTab === 'properties' ? 'bg-[#C5A059] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Building size={18} /> Properties
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${activeTab === 'leads' ? 'bg-[#C5A059] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={18} /> Leads & Clients
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-[#C5A059] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-sm text-sm font-medium transition-colors">
            <LogOut size={18} /> Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col ml-64 min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-sm px-3 py-2 w-96">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search properties, clients..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-[#C5A059] transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-slate-900">Voke Irekpita</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] font-bold border border-[#C5A059]/30">
                VI
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content based on activeTab */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'properties' && renderProperties()}
        {activeTab === 'leads' && renderLeads()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
}
