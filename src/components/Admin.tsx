import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Building, Users, Settings, LogOut, Plus, Edit, Trash2, 
  Search, Bell, Eye, MessageSquare, ToggleLeft, ToggleRight, Star, MoreVertical, X,
  MapPin, Tag, FileText, Image as ImageIcon, BedDouble, Bath, Home as HomeIcon,
  Mail, Phone, Shield, Palette, User, Camera, Lock, CreditCard, Globe
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties';

// Mock extended data for admin
const mockAdminProperties = MOCK_PROPERTIES.map((p, index) => ({
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminProperties, setAdminProperties] = useState(mockAdminProperties);
  const [propertySearch, setPropertySearch] = useState('');
  const [leads, setLeads] = useState(initialLeads);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Settings State
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [passwordState, setPasswordState] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordFeedback, setPasswordFeedback] = useState<{type: 'success' | 'error', msg: string} | null>(null);
  const [settingsData, setSettingsData] = useState({
    profile: {
      fullName: 'Voke Irekpita',
      email: 'voke@hogarhomes.com',
      phone: '+234 800 000 0000',
      bio: 'Principal Agent at Hogar Homes. Expert in Lagos luxury real estate with over 10 years of experience.',
      avatar: 'VI'
    },
    security: {
      twoFactor: false
    },
    branding: {
      portfolioValue: '3.2',
      currency: 'NGN',
      maintenanceMode: false
    }
  });

  // Leads Modal State
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalMode, setLeadModalMode] = useState<'add' | 'edit'>('add');
  const [editingLeadId, setEditingLeadId] = useState<number | null>(null);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    status: 'Warm'
  });

  // Property Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    priceNumeric: 0,
    desc: '',
    image: '',
    type: 'Duplex',
    status: 'Active',
    tag: 'FOR SALE',
    beds: 0,
    baths: 0
  });

  // --- Handlers ---
  const handleOpenModal = (mode: 'add' | 'edit', property?: any) => {
    setModalMode(mode);
    if (mode === 'edit' && property) {
      setEditingId(property.id);
      setFormData({
        title: property.title,
        location: property.location,
        price: property.price,
        priceNumeric: property.priceNumeric,
        desc: property.desc,
        image: property.image,
        type: property.type,
        status: property.status,
        tag: property.tag,
        beds: property.beds,
        baths: property.baths
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        location: '',
        price: '',
        priceNumeric: 0,
        desc: '',
        image: '',
        type: 'Duplex',
        status: 'Active',
        tag: 'FOR SALE',
        beds: 0,
        baths: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'beds' || name === 'baths' || name === 'priceNumeric' ? Number(value) : value
    }));
  };

  const handleSubmitProperty = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      const newProperty = {
        ...formData,
        id: Math.max(...adminProperties.map(p => p.id)) + 1,
        views: 0,
        inquiries: 0,
        isFeatured: false
      };
      setAdminProperties([newProperty, ...adminProperties]);
    } else if (editingId !== null) {
      setAdminProperties(adminProperties.map(p => 
        p.id === editingId ? { ...p, ...formData } : p
      ));
    }
    
    handleCloseModal();
  };

  // --- Lead Handlers ---
  const handleOpenLeadModal = (mode: 'add' | 'edit', lead?: any) => {
    setLeadModalMode(mode);
    if (mode === 'edit' && lead) {
      setEditingLeadId(lead.id);
      setLeadFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        interest: lead.interest,
        status: lead.status
      });
    } else {
      setEditingLeadId(null);
      setLeadFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        status: 'Warm'
      });
    }
    setIsLeadModalOpen(true);
  };

  const handleCloseLeadModal = () => {
    setIsLeadModalOpen(false);
    setEditingLeadId(null);
  };

  const handleLeadInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLeadFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadModalMode === 'add') {
      const newLead = {
        ...leadFormData,
        id: Math.max(...leads.map(l => l.id)) + 1,
        source: 'Admin Manual',
        lastContact: new Date().toISOString().split('T')[0],
        notes: ''
      };
      setLeads([newLead, ...leads]);
    } else if (editingLeadId !== null) {
      setLeads(leads.map(l => 
        l.id === editingLeadId ? { ...l, ...leadFormData } : l
      ));
    }
    handleCloseLeadModal();
  };

  const deleteLead = (id: number) => {
    if (window.confirm('Are you sure you want to remove this lead?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setAdminProperties(adminProperties.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const changeStatus = (id, newStatus) => {
    setAdminProperties(adminProperties.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
  };

  const deleteProperty = (id) => {
    if(window.confirm('Are you sure you want to delete this property?')) {
      setAdminProperties(adminProperties.filter(p => p.id !== id));
    }
  };

  const openNote = (lead) => {
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

  // --- Sub-renderers ---
  const renderDashboard = () => (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, here's what's happening today.</p>
        </div>
        <button 
          onClick={() => setActiveTab('properties')}
          className="w-full md:w-auto bg-[#C5A059] hover:bg-[#b38f4a] text-white px-5 py-2.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Building size={16} /> Manage Properties
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
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
            <p className="text-sm text-gray-500 mb-1 font-medium">Portfolio Value</p>
            <p className="text-3xl font-serif text-slate-900">₦3.2B</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 font-serif text-2xl">
            ₦
          </div>
        </div>
      </div>

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
                <p className="text-sm text-gray-500">Inquired: <span className="text-[#C5A059]">{lead.interest}</span></p>
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
    <div className="p-4 md:p-8">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Properties Management</h1>
          <p className="text-sm text-gray-500">Update statuses and track listing performance.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filter list..." 
              value={propertySearch}
              onChange={(e) => setPropertySearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C5A059]"
            />
          </div>
          <button 
            onClick={() => handleOpenModal('add')}
            className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#b38f4a] text-white px-5 py-2.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Plus size={16} /> Add New Listing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredProperties.map(prop => (
          <div key={prop.id} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-48">
              <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-sm shadow-sm text-white ${
                  prop.status === 'Active' ? 'bg-green-600' : prop.status === 'Under Contract' ? 'bg-amber-500' : 'bg-red-600'
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

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif text-lg text-slate-900 mb-1">{prop.title}</h3>
                  <p className="text-sm text-gray-500">{prop.location}</p>
                </div>
                <p className="font-medium text-[#C5A059]">{prop.price}</p>
              </div>

              <div className="flex items-center gap-4 mt-4 mb-6 py-3 border-y border-gray-100">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Eye size={16} className="text-gray-400" />
                  <span className="font-medium">{prop.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MessageSquare size={16} className="text-gray-400" />
                  <span className="font-medium">{prop.inquiries}</span>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600 font-medium">Status</label>
                  <select 
                    value={prop.status}
                    onChange={(e) => changeStatus(prop.id, e.target.value)}
                    className="text-sm border border-gray-200 rounded-sm px-2 py-1 outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Contract">Under Contract</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600 font-medium">Feature on Home</label>
                  <button onClick={() => toggleFeatured(prop.id)} className={`transition-colors ${prop.isFeatured ? 'text-[#C5A059]' : 'text-gray-300'}`}>
                    {prop.isFeatured ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button 
                    onClick={() => handleOpenModal('edit', prop)}
                    className="flex-1 bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button onClick={() => deleteProperty(prop.id)} className="p-2 text-gray-400 hover:text-white hover:bg-red-500 border border-gray-200 hover:border-red-500 rounded-md transition-all">
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

  const renderPropertyModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleCloseModal}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-900 text-white">
          <h2 className="text-xl font-serif">{modalMode === 'add' ? 'Add New Property' : 'Edit Property'}</h2>
          <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmitProperty} className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <Building size={14} className="text-[#C5A059]" /> Property Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
                placeholder="e.g. Modern 5-Bedroom Duplex"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <MapPin size={14} className="text-[#C5A059]" /> Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
                placeholder="e.g. Lekki Phase 1, Lagos"
              />
            </div>

            {/* Price String */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <Tag size={14} className="text-[#C5A059]" /> Display Price
              </label>
              <input
                type="text"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
                placeholder="e.g. ₦150M"
              />
            </div>

            {/* Price Numeric */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <Tag size={14} className="text-[#C5A059]" /> Price (Millions)
              </label>
              <input
                type="number"
                name="priceNumeric"
                required
                value={formData.priceNumeric}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
                placeholder="e.g. 150"
              />
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <HomeIcon size={14} className="text-[#C5A059]" /> Property Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
              >
                {['Duplex', 'Penthouse', 'Apartment', 'Commercial', 'Mansion', 'Bungalow'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <Star size={14} className="text-[#C5A059]" /> Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
              >
                {['Active', 'Under Contract', 'Sold'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Beds */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <BedDouble size={14} className="text-[#C5A059]" /> Bedrooms
              </label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
              />
            </div>

            {/* Baths */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <Bath size={14} className="text-[#C5A059]" /> Bathrooms
              </label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
              <ImageIcon size={14} className="text-[#C5A059]" /> Image URL
            </label>
            <input
              type="text"
              name="image"
              required
              value={formData.image}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
              <FileText size={14} className="text-[#C5A059]" /> Description
            </label>
            <textarea
              name="desc"
              required
              value={formData.desc}
              onChange={handleInputChange}
              rows={4}
              className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none resize-none"
              placeholder="Detailed description of the property..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#C5A059] hover:bg-[#b38f4a] text-white py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-all shadow-lg"
            >
              {modalMode === 'add' ? 'Create Listing' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Leads & Clients</h1>
          <p className="text-sm text-gray-500">Manage inquiries and client relationships.</p>
        </div>
        <button 
          onClick={() => handleOpenLeadModal('add')}
          className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#b38f4a] text-white px-4 py-2 text-sm font-medium rounded-sm flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Add Lead
        </button>
      </div>

      <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Client Name</th>
              <th className="px-6 py-4 font-medium">Interest</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {leads.map(lead => (
              <React.Fragment key={lead.id}>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{lead.name}</p>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12} /> {lead.email}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1"><Phone size={12} /> {lead.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#C5A059] font-medium">{lead.interest}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-sm text-xs font-medium ${
                      lead.status === 'Hot' ? 'bg-red-50 text-red-600' : 
                      lead.status === 'Warm' ? 'bg-orange-50 text-orange-600' : 'bg-[#C5A059]/10 text-[#C5A059]'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => openNote(lead)} className="text-slate-400 hover:text-[#C5A059] transition-colors">
                        <MessageSquare size={18} />
                      </button>
                      <button onClick={() => handleOpenLeadModal('edit', lead)} className="text-slate-400 hover:text-blue-600 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteLead(lead.id)} className="text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
                {activeNoteId === lead.id && (
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="max-w-2xl">
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Lead Notes</label>
                        <textarea 
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:border-[#C5A059] outline-none min-h-[100px]"
                          placeholder="Add details about client preferences..."
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button onClick={() => setActiveNoteId(null)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
                          <button onClick={saveNote} className="bg-[#C5A059] text-white px-4 py-2 text-sm font-medium rounded-sm">Save Note</button>
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

  const renderLeadModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleCloseLeadModal}
      />
      <div className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-900 text-white">
          <h2 className="text-xl font-serif">{leadModalMode === 'add' ? 'Add New Lead' : 'Edit Lead Details'}</h2>
          <button onClick={handleCloseLeadModal} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmitLead} className="p-6 space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
              <Users size={12} className="text-[#C5A059]" /> Client Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={leadFormData.name}
              onChange={handleLeadInputChange}
              className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
              placeholder="e.g. Aliko Dangote"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <Mail size={12} className="text-[#C5A059]" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={leadFormData.email}
                onChange={handleLeadInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
                placeholder="client@example.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <Phone size={12} className="text-[#C5A059]" /> Phone Number
              </label>
              <input
                type="text"
                name="phone"
                required
                value={leadFormData.phone}
                onChange={handleLeadInputChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
                placeholder="+234..."
              />
            </div>
          </div>

          {/* Interest */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
              <Building size={12} className="text-[#C5A059]" /> Property of Interest
            </label>
            <input
              type="text"
              name="interest"
              required
              value={leadFormData.interest}
              onChange={handleLeadInputChange}
              className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none"
              placeholder="e.g. 6-Bed Villa, Eko Atlantic"
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
              <Star size={12} className="text-[#C5A059]" /> Lead Status
            </label>
            <select
              name="status"
              value={leadFormData.status}
              onChange={handleLeadInputChange}
              className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none bg-white"
            >
              {['Hot', 'Warm', 'Cold'].map(s => (
                <option key={s} value={s}>{s} Lead</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseLeadModal}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-sm font-bold uppercase tracking-widest text-[10px] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#C5A059] hover:bg-[#b38f4a] text-white py-3 rounded-sm font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg"
            >
              {leadModalMode === 'add' ? 'Add Client' : 'Update Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderSettings = () => {
    const tabs = [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'security', label: 'Security', icon: Shield },
      { id: 'branding', label: 'Platform & Branding', icon: Palette },
      { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    const renderProfileSettings = () => (
      <div className="space-y-6">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] font-bold text-2xl border-2 border-[#C5A059]">
                {settingsData.profile.avatar}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-[#C5A059] text-white rounded-full shadow-lg hover:bg-[#b38f4a] transition-colors border-2 border-white">
                <Camera size={12} />
              </button>
            </div>
            <div>
              <h3 className="font-serif text-lg text-slate-900">Agent Profile</h3>
              <p className="text-sm text-gray-500">Update your personal information and public bio.</p>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Full Name</label>
              <input 
                type="text" 
                value={settingsData.profile.fullName}
                onChange={(e) => setSettingsData({...settingsData, profile: {...settingsData.profile, fullName: e.target.value}})}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Email Address</label>
              <input 
                type="email" 
                value={settingsData.profile.email}
                onChange={(e) => setSettingsData({...settingsData, profile: {...settingsData.profile, email: e.target.value}})}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Phone Number</label>
              <input 
                type="text" 
                value={settingsData.profile.phone}
                onChange={(e) => setSettingsData({...settingsData, profile: {...settingsData.profile, phone: e.target.value}})}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Bio / Signature</label>
              <textarea 
                rows={4}
                value={settingsData.profile.bio}
                onChange={(e) => setSettingsData({...settingsData, profile: {...settingsData.profile, bio: e.target.value}})}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none resize-none"
              />
            </div>
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button className="bg-[#C5A059] hover:bg-[#b38f4a] text-white px-8 py-2.5 text-sm font-bold uppercase tracking-widest transition-all shadow-md">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );

    const handleUpdatePassword = (e: React.FormEvent) => {
      e.preventDefault();
      setPasswordFeedback(null);

      // 1. Basic Validation
      if (!passwordState.current || !passwordState.new || !passwordState.confirm) {
        setPasswordFeedback({ type: 'error', msg: 'Please fill in all password fields.' });
        return;
      }

      if (passwordState.new !== passwordState.confirm) {
        setPasswordFeedback({ type: 'error', msg: 'New passwords do not match.' });
        return;
      }

      if (passwordState.new.length < 8) {
        setPasswordFeedback({ type: 'error', msg: 'New password must be at least 8 characters long.' });
        return;
      }

      // 2. Mock Current Password Check
      // In a real app, you would send this to your backend
      if (passwordState.current !== 'admin123') {
        setPasswordFeedback({ type: 'error', msg: 'Incorrect current password.' });
        return;
      }

      // 3. Success State
      setPasswordFeedback({ type: 'success', msg: 'Password updated successfully!' });
      setPasswordState({ current: '', new: '', confirm: '' });

      // Clear feedback after 5 seconds
      setTimeout(() => setPasswordFeedback(null), 5000);
    };

    const renderSecuritySettings = () => (
      <div className="space-y-6">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-serif text-lg text-slate-900">Password Management</h3>
            <p className="text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
          </div>
          <form onSubmit={handleUpdatePassword}>
            <div className="p-6 space-y-6">
              {passwordFeedback && (
                <div className={`p-4 rounded-sm text-sm font-medium ${
                  passwordFeedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                  {passwordFeedback.msg}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwordState.current}
                    onChange={(e) => setPasswordState({...passwordState, current: e.target.value})}
                    className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwordState.new}
                    onChange={(e) => setPasswordState({...passwordState, new: e.target.value})}
                    className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Confirm Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwordState.confirm}
                    onChange={(e) => setPasswordState({...passwordState, confirm: e.target.value})}
                    className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none" 
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 text-sm font-bold uppercase tracking-widest transition-all shadow-md"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security to your admin account.</p>
              </div>
            </div>
            <button 
              onClick={() => setSettingsData({...settingsData, security: {twoFactor: !settingsData.security.twoFactor}})}
              className={`transition-colors ${settingsData.security.twoFactor ? 'text-[#C5A059]' : 'text-gray-300'}`}
            >
              {settingsData.security.twoFactor ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </button>
          </div>
        </div>
      </div>
    );

    const renderBrandingSettings = () => (
      <div className="space-y-6">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-serif text-lg text-slate-900">Platform Analytics</h3>
            <p className="text-sm text-gray-500">Manage global data displayed across the platform.</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <CreditCard size={14} className="text-[#C5A059]" /> Portfolio Value (Billions)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-serif">₦</span>
                <input 
                  type="text" 
                  value={settingsData.branding.portfolioValue}
                  onChange={(e) => setSettingsData({...settingsData, branding: {...settingsData.branding, portfolioValue: e.target.value}})}
                  className="w-full border border-gray-200 rounded-sm pl-8 pr-4 py-2.5 text-sm focus:border-[#C5A059] outline-none font-serif text-lg" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs uppercase font-bold">Billion</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                <Globe size={14} className="text-[#C5A059]" /> Base Currency
              </label>
              <select 
                value={settingsData.branding.currency}
                onChange={(e) => setSettingsData({...settingsData, branding: {...settingsData.branding, currency: e.target.value}})}
                className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:border-[#C5A059] outline-none bg-white"
              >
                <option value="NGN">Naira (₦)</option>
                <option value="USD">Dollar ($)</option>
                <option value="GBP">Pound (£)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-red-50/50 border border-red-100 rounded-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-medium text-red-900">Maintenance Mode</h3>
                <p className="text-sm text-red-700/70">Take the public website offline for maintenance.</p>
              </div>
            </div>
            <button 
              onClick={() => setSettingsData({...settingsData, branding: {...settingsData.branding, maintenanceMode: !settingsData.branding.maintenanceMode}})}
              className={`transition-colors ${settingsData.branding.maintenanceMode ? 'text-red-600' : 'text-gray-300'}`}
            >
              {settingsData.branding.maintenanceMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-slate-900 mb-2">Platform Settings</h1>
          <p className="text-sm text-gray-500">Manage your profile, security, and global platform preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sub-navigation */}
          <aside className="w-full md:w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSettingsTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all ${
                  activeSettingsTab === tab.id 
                    ? 'bg-[#C5A059] text-white shadow-md shadow-[#C5A059]/20' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </aside>

          {/* Settings Content */}
          <div className="flex-1">
            {activeSettingsTab === 'profile' && renderProfileSettings()}
            {activeSettingsTab === 'security' && renderSecuritySettings()}
            {activeSettingsTab === 'branding' && renderBrandingSettings()}
            {activeSettingsTab === 'notifications' && (
              <div className="bg-white border border-gray-200 rounded-sm p-12 text-center">
                <Bell size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="font-serif text-xl text-slate-900 mb-2">Notification Preferences</h3>
                <p className="text-gray-500 max-w-xs mx-auto">This section is coming soon. You'll be able to manage your email and push alerts here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* 1. Mobile Branding Header (Visible only on Mobile) */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C5A059] flex items-center justify-center rounded-sm">
            <span className="font-serif text-white font-bold text-xl leading-none">H</span>
          </div>
          <span className="font-serif text-xl tracking-wide">Hogar Admin</span>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-sm">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* 2. Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 3. Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-slate-900 text-white flex flex-col z-[70] 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:w-64
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C5A059] flex items-center justify-center rounded-sm">
              <span className="font-serif text-white font-bold text-xl leading-none">H</span>
            </div>
            <span className="font-serif text-xl tracking-wide">Hogar Admin</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'properties', icon: Building, label: 'Properties' },
            { id: 'leads', icon: Users, label: 'Leads & Clients' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-[#C5A059] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-sm text-sm font-medium transition-colors">
            <LogOut size={18} /> Back to Website
          </Link>
        </div>
      </aside>

      {/* 4. Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Dynamic Header: Search sits below user profile on mobile */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-30">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
            
            {/* Search - Below on Mobile, Left on Desktop */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-sm px-3 py-2 w-full md:w-96 shadow-sm">
              <Search size={16} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search listings, clients..." 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-900"
              />
            </div>

            {/* Profile - Top on Mobile, Right on Desktop */}
            <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6">
              <button className="text-gray-400 hover:text-[#C5A059] transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 md:border-l md:border-gray-200 md:pl-6">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900 leading-none mb-1">Voke Irekpita</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Super Admin</p>
                </div>
                <div className="w-10 h-10 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] font-bold border border-[#C5A059]/30">
                  VI
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Content Render */}
        <div className="flex-1 overflow-x-hidden">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'properties' && renderProperties()}
          {activeTab === 'leads' && renderLeads()}
          {activeTab === 'settings' && renderSettings()}
        </div>

        {/* Modals */}
        {isModalOpen && renderPropertyModal()}
        {isLeadModalOpen && renderLeadModal()}
      </main>
    </div>
  );
}