import React from 'react';
import './SectionHeader.css';

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="section-header">
      <div className="section-header-text">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="section-header-action">{action}</div>}
    </div>
  );
}

export default SectionHeader; 