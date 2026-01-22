import React from 'react';
import { Download, Upload, Trash2, Palette, Database, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = ({ jobs, resumeData, onImport, onReset }) => {
    const exportData = () => {
        const data = {
            bt_jobs: jobs,
            bt_resume: resumeData,
            version: '1.0.0',
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `job-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.bt_jobs && data.bt_resume) {
                    if (window.confirm('This will overwrite your current data. Are you sure?')) {
                        onImport(data);
                    }
                } else {
                    alert('Invalid backup file format.');
                }
            } catch (err) {
                alert('Error parsing backup file.');
            }
        };
        reader.readAsText(file);
    };

    const themes = [
        { name: 'Indigo Dream', primary: '#6366f1' },
        { name: 'Emerald Forest', primary: '#10b981' },
        { name: 'Rose Petal', primary: '#f43f5e' },
        { name: 'Amber Sunset', primary: '#f59e0b' },
        { name: 'Cyan Ocean', primary: '#06b6d4' },
    ];

    const changeTheme = (color) => {
        document.documentElement.style.setProperty('--primary', color);
        localStorage.setItem('bt_theme', color);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Data Management Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ padding: '32px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
                        <Database size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Data Management</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Backup, restore or reset your application data.</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <button className="btn-secondary" onClick={exportData} style={{ justifyContent: 'center', padding: '16px' }}>
                        <Download size={20} />
                        <span>Export Backup (JSON)</span>
                    </button>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                        />
                        <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
                            <Upload size={20} />
                            <span>Import Backup (JSON)</span>
                        </button>
                    </div>

                    <button
                        className="btn-secondary"
                        onClick={onReset}
                        style={{
                            gridColumn: 'span 2',
                            justifyContent: 'center',
                            padding: '16px',
                            color: 'var(--error)',
                            borderColor: 'rgba(239, 68, 68, 0.2)',
                            background: 'rgba(239, 68, 68, 0.05)'
                        }}
                    >
                        <Trash2 size={20} />
                        <span>Reset All Data</span>
                    </button>
                </div>
            </motion.div>

            {/* Appearance Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card"
                style={{ padding: '32px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
                        <Palette size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Appearance</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Customize the look and feel of your workspace.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {themes.map((theme) => (
                        <button
                            key={theme.name}
                            onClick={() => changeTheme(theme.primary)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 16px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-glass)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--text-main)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: theme.primary }} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{theme.name}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
