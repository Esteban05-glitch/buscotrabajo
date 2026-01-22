import React from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Globe } from 'lucide-react';

const ResumePreview = ({ data }) => {
    return (
        <div className="resume-preview" style={{
            background: 'white',
            color: '#334155',
            width: '100%',
            minHeight: '842px', // A4 aspect ratio approx
            padding: '40px',
            borderRadius: '4px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontSize: '14px',
            lineHeight: '1.5'
        }}>
            {/* Header */}
            <header style={{ borderBottom: '2px solid #6366f1', paddingBottom: '20px', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '-0.025em' }}>
                    {data.personal.name || 'Your Name'}
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#6366f1', fontWeight: 600, marginBottom: '16px' }}>
                    {data.personal.title || 'Professional Title'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#64748b', fontSize: '12px' }}>
                    {data.personal.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Mail size={12} /> {data.personal.email}
                        </div>
                    )}
                    {data.personal.location && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={12} /> {data.personal.location}
                        </div>
                    )}
                    {data.links?.linkedin && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Linkedin size={12} /> {data.links.linkedin.replace('https://', '')}
                        </div>
                    )}
                    {data.links?.github && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Github size={12} /> {data.links.github.replace('https://', '')}
                        </div>
                    )}
                    {data.links?.portfolio && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Globe size={12} /> {data.links.portfolio.replace('https://', '')}
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Experience
                            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#334155' }}>{exp.position}</h3>
                                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>{exp.duration}</span>
                                    </div>
                                    <p style={{ color: '#6366f1', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem' }}>{exp.company}</p>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Education
                            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{edu.degree}</h3>
                                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{edu.year}</span>
                                    </div>
                                    <p style={{ color: '#64748b' }}>{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && data.skills[0] !== "" && (
                    <section>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Skills
                            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                        </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {data.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: '#f1f5f9',
                                    color: '#475569',
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    border: '1px solid #e2e8f0'
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default ResumePreview;
