import React from 'react';
import { LayoutDashboard, Briefcase, FileText, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'tracker', icon: Briefcase, label: 'Job Tracker' },
    { id: 'resume', icon: FileText, label: 'Resume Builder' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="glass-card" style={{
      width: 'var(--sidebar-width)',
      height: 'calc(100vh - 40px)',
      position: 'fixed',
      top: '20px',
      left: '20px',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 8px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'var(--primary)',
          borderRadius: '8px',
          display: 'grid',
          placeItems: 'center'
        }}>
          <LayoutDashboard size={20} color="white" />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>CareerFlow</h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === item.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === item.id ? 'var(--primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
              width: '100%',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) e.currentTarget.style.color = 'var(--text-main)';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-glass)' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '12px',
          border: 'none',
          background: 'transparent',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          fontSize: '0.9rem'
        }}>
          <LogOut size={18} />
          <span>Exit</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
