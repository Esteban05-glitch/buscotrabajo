import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import KanbanBoard from './components/KanbanBoard'
import JobModal from './components/JobModal'
import ResumeBuilder from './components/ResumeBuilder'
import Settings from './components/Settings'
import { Plus } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('tracker')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [targetColumn, setTargetColumn] = useState('todo')

  // Job Tracker State
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('bt_jobs');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Remote', date: '2 days ago', priority: 'High', status: 'todo', type: 'Full-time' },
      { id: 2, title: 'Product Designer', company: 'Apple', location: 'Cupertino, CA', date: '1 week ago', priority: 'Medium', status: 'applied', type: 'Freelance' },
    ];
  });

  // Resume State
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('bt_resume');
    const defaultData = {
      personal: { name: '', title: '', email: '', location: '', phone: '' },
      links: { linkedin: '', github: '', portfolio: '' },
      experience: [],
      education: [],
      skills: []
    };
    if (!saved) return defaultData;
    const parsed = JSON.parse(saved);
    return { ...defaultData, ...parsed, links: { ...defaultData.links, ...parsed.links } };
  });

  // Theme Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('bt_theme');
    if (savedTheme) {
      document.documentElement.style.setProperty('--primary', savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bt_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('bt_resume', JSON.stringify(resumeData));
  }, [resumeData]);

  const handleSaveJob = (jobData) => {
    if (editingJob) {
      setJobs(jobs.map(j => j.id === editingJob.id ? { ...jobData, id: j.id, date: j.date } : j));
    } else {
      const newJob = {
        ...jobData,
        id: Date.now(),
        date: 'Just now',
      };
      setJobs([...jobs, newJob]);
    }
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const openAddModal = (columnId = 'todo') => {
    setEditingJob(null);
    setTargetColumn(columnId);
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleImportData = (data) => {
    setJobs(data.bt_jobs);
    setResumeData(data.bt_resume);
    setActiveTab('tracker');
  };

  const handleResetData = () => {
    if (window.confirm('WARNING: This will delete ALL your jobs and resume data permanently. Continue?')) {
      setJobs([]);
      setResumeData({
        personal: { name: '', title: '', email: '', location: '', phone: '' },
        links: { linkedin: '', github: '', portfolio: '' },
        experience: [],
        education: [],
        skills: []
      });
      localStorage.clear();
      window.location.reload();
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'tracker': return 'Job Tracker';
      case 'resume': return 'Resume Builder';
      case 'settings': return 'Settings';
      default: return 'Workbench';
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case 'tracker': return 'Manage and track your job applications efficiently.';
      case 'resume': return 'Craft a professional resume with our premium builder.';
      case 'settings': return 'Configure your workspace and manage your data.';
      default: return '';
    }
  };

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container">
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
              {getTitle()}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
              {getDescription()}
            </p>
          </div>

          {activeTab === 'tracker' && (
            <button className="btn-primary" onClick={() => openAddModal()}>
              <Plus size={20} />
              <span>Add New Job</span>
            </button>
          )}
        </header>

        <section style={{
          width: '100%',
          minHeight: '400px',
        }}>
          {activeTab === 'tracker' && (
            <KanbanBoard jobs={jobs} onJobClick={openEditModal} />
          )}
          {activeTab === 'resume' && (
            <ResumeBuilder data={resumeData} onChange={setResumeData} />
          )}
          {activeTab === 'settings' && (
            <Settings
              jobs={jobs}
              resumeData={resumeData}
              onImport={handleImportData}
              onReset={handleResetData}
            />
          )}
        </section>
      </main>

      {isModalOpen && (
        <JobModal
          isOpen={isModalOpen}
          initialStatus={targetColumn}
          onClose={() => {
            setIsModalOpen(false);
            setEditingJob(null);
          }}
          onSave={handleSaveJob}
          job={editingJob}
        />
      )}
    </>
  )
}

export default App
