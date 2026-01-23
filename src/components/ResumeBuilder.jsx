import React from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { Download } from 'lucide-react';

const ResumeBuilder = ({ data, onChange }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-builder-container" style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(400px, 1fr) 1.25fr',
      gap: '40px',
      alignItems: 'start',
      position: 'relative'
    }}>
      {/* Scrollable Form Column */}
      <div style={{
        position: 'sticky',
        top: '20px',
        maxHeight: 'calc(100vh - 160px)',
        overflowY: 'auto',
        paddingRight: '10px'
      }}>
        <ResumeForm data={data} onChange={onChange} />
      </div>

      {/* Preview Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 8px'
        }}>
          <button className="btn-primary" onClick={handlePrint}>
            <Download size={18} />
            <span>Export PDF</span>
          </button>
        </div>

        <div className="preview-scroll" style={{
          maxHeight: 'calc(100vh - 220px)',
          overflowY: 'auto',
          borderRadius: '8px',
          background: 'rgba(0,0,0,0.2)',
          padding: '24px',
          border: '1px solid var(--border-glass)'
        }}>
          <div className="print-area">
            <ResumePreview data={data} />
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          .resume-preview {
            box-shadow: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
