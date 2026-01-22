import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Award, Plus, Trash2, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeForm = ({ data, onChange }) => {
    const [activeSection, setActiveSection] = useState('personal');

    const updateNested = (section, index, field, value) => {
        const newList = [...data[section]];
        newList[index] = { ...newList[index], [field]: value };
        onChange({ ...data, [section]: newList });
    };

    const addItem = (section, emptyItem) => {
        onChange({ ...data, [section]: [...data[section], emptyItem] });
    };

    const removeItem = (section, index) => {
        const newList = data[section].filter((_, i) => i !== index);
        onChange({ ...data, [section]: newList });
    };

    const SectionHeader = ({ id, icon: Icon, title }) => (
        <button
            onClick={() => setActiveSection(activeSection === id ? null : id)}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: activeSection === id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: activeSection === id ? 'var(--primary)' : 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '8px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={20} />
                <span style={{ fontWeight: 600 }}>{title}</span>
            </div>
            {activeSection === id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
    );

    return (
        <div className="resume-form" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Personal Info */}
            <div className="glass-card" style={{ padding: '8px' }}>
                <SectionHeader id="personal" icon={User} title="Personal Information" />
                <AnimatePresence>
                    {activeSection === 'personal' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', padding: '0 16px 16px 16px' }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Full Name</label>
                                    <input
                                        className="form-input"
                                        value={data.personal.name}
                                        onChange={(e) => onChange({ ...data, personal: { ...data.personal, name: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Title</label>
                                    <input
                                        className="form-input"
                                        value={data.personal.title}
                                        onChange={(e) => onChange({ ...data, personal: { ...data.personal, title: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Email</label>
                                    <input
                                        className="form-input"
                                        value={data.personal.email}
                                        onChange={(e) => onChange({ ...data, personal: { ...data.personal, email: e.target.value } })}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Experience */}
            <div className="glass-card" style={{ padding: '8px' }}>
                <SectionHeader id="experience" icon={Briefcase} title="Work Experience" />
                <AnimatePresence>
                    {activeSection === 'experience' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', padding: '0 16px 16px 16px' }}
                        >
                            {data.experience.map((exp, index) => (
                                <div key={index} style={{ marginBottom: '24px', position: 'relative', borderLeft: '2px solid var(--border-glass)', paddingLeft: '16px' }}>
                                    <button
                                        onClick={() => removeItem('experience', index)}
                                        style={{ position: 'absolute', right: 0, top: 0, background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <input
                                            placeholder="Company"
                                            className="form-input"
                                            value={exp.company}
                                            onChange={(e) => updateNested('experience', index, 'company', e.target.value)}
                                        />
                                        <input
                                            placeholder="Position"
                                            className="form-input"
                                            value={exp.position}
                                            onChange={(e) => updateNested('experience', index, 'position', e.target.value)}
                                        />
                                        <input
                                            placeholder="Duration"
                                            className="form-input"
                                            value={exp.duration}
                                            onChange={(e) => updateNested('experience', index, 'duration', e.target.value)}
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Description of responsibilities..."
                                        className="form-input"
                                        style={{ marginTop: '12px', minHeight: '80px', resize: 'vertical' }}
                                        value={exp.description}
                                        onChange={(e) => updateNested('experience', index, 'description', e.target.value)}
                                    />
                                </div>
                            ))}
                            <button
                                className="btn-secondary"
                                onClick={() => addItem('experience', { company: '', position: '', duration: '', description: '' })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px dashed var(--border-glass)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}
                            >
                                <Plus size={16} /> Add Experience
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Skills */}
            <div className="glass-card" style={{ padding: '8px' }}>
                <SectionHeader id="skills" icon={Award} title="Skills" />
                <AnimatePresence>
                    {activeSection === 'skills' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', padding: '0 16px 16px 16px' }}
                        >
                            <textarea
                                className="form-input"
                                placeholder="React, Node.js, Design Systems... (separate by comma)"
                                style={{ minHeight: '100px', resize: 'vertical' }}
                                value={data.skills.join(', ')}
                                onChange={(e) => onChange({ ...data, skills: e.target.value.split(',').map(s => s.trim()) })}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Links */}
            <div className="glass-card" style={{ padding: '8px' }}>
                <SectionHeader id="links" icon={Share2} title="Professional Links" />
                <AnimatePresence>
                    {activeSection === 'links' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', padding: '0 16px 16px 16px' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div>
                                    <label className="form-label">LinkedIn URL</label>
                                    <input
                                        className="form-input"
                                        placeholder="https://linkedin.com/in/username"
                                        value={data.links.linkedin}
                                        onChange={(e) => onChange({ ...data, links: { ...data.links, linkedin: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">GitHub URL</label>
                                    <input
                                        className="form-input"
                                        placeholder="https://github.com/username"
                                        value={data.links.github}
                                        onChange={(e) => onChange({ ...data, links: { ...data.links, github: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Portfolio / Website</label>
                                    <input
                                        className="form-input"
                                        placeholder="https://yourportfolio.com"
                                        value={data.links.portfolio}
                                        onChange={(e) => onChange({ ...data, links: { ...data.links, portfolio: e.target.value } })}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ResumeForm;
