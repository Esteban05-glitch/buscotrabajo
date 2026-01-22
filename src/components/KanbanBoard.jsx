import React from 'react';
import JobCard from './JobCard';
import { Plus } from 'lucide-react';

const INITIAL_COLUMNS = [
    { id: 'todo', title: 'To Apply' },
    { id: 'applied', title: 'Applied' },
    { id: 'interviewing', title: 'Interviewing' },
    { id: 'offered', title: 'Offer / Accepted' },
];

const KanbanBoard = ({ jobs, onJobClick }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            width: '100%',
        }}>
            {INITIAL_COLUMNS.map(column => (
                <div key={column.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 8px'
                    }}>
                        <h3 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                            {column.title} <span style={{ marginLeft: '8px', opacity: 0.5 }}>
                                {jobs.filter(j => j.status === column.id).length}
                            </span>
                        </h3>
                    </div>

                    <div className="column-content" style={{
                        flex: 1,
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '16px',
                        padding: '12px',
                        minHeight: '400px',
                    }}>
                        {jobs.filter(j => j.status === column.id).map(job => (
                            <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
                        ))}

                        {jobs.filter(j => j.status === column.id).length === 0 && (
                            <div style={{
                                height: '100px',
                                display: 'grid',
                                placeItems: 'center',
                                padding: '20px',
                                textAlign: 'center',
                                color: 'var(--text-muted)',
                                fontSize: '0.8rem',
                                border: '2px dashed rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px'
                            }}>
                                Empty
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;
