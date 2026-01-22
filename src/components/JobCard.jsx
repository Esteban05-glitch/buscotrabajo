import React from 'react';
import { MapPin, Building2, Calendar, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const JobCard = ({ job, onClick }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'var(--error)';
            case 'Medium': return 'var(--warning)';
            case 'Low': return 'var(--success)';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            onClick={() => onClick(job)}
            style={{
                padding: '16px',
                marginBottom: '12px',
                cursor: 'pointer',
                borderLeft: `4px solid ${getPriorityColor(job.priority)}`,
                transition: 'transform 0.2s',
            }}
            whileHover={{ transform: 'translateY(-4px)' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-muted)'
                }}>
                    {job.type || 'Full-time'}
                </span>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                    <MoreVertical size={16} />
                </button>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>{job.title}</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>
                <Building2 size={14} />
                <span>{job.company}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} />
                    <span>{job.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    <span>{job.date}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;
