import React, { useState } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [ipoList, setIpoList] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    priceBand: '',
    openDate: '',
    closeDate: '',
    issueSize: '',
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.className = newTheme;
    setTheme(newTheme);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.priceBand ||
      !formData.openDate ||
      !formData.closeDate ||
      !formData.issueSize
    ) {
      alert('Please fill out all fields.');
      return;
    }

    setIpoList([...ipoList, formData]);
    setFormData({
      companyName: '',
      priceBand: '',
      openDate: '',
      closeDate: '',
      issueSize: '',
    });
    setShowForm(false);
  };

  const handleCompanyClick = (companyName) => {
    alert(`You clicked on ${companyName}! Here you can add enhanced actions like viewing detailed information, editing, or performing other operations.`);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">📈</div>
            <span className="header-title">IPO Dashboard</span>
          </div>
          <div className="header-actions">
            <button className="toggle-btn" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
            </button>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              ➕ Add IPO
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{ipoList.length}</div>
          <div className="stat-label">Total IPOs</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">3</div>
          <div className="stat-label">Upcoming</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹2.5K Cr</div>
          <div className="stat-label">Total Value</div>
        </div>
      </div>

      <div className="ipo-container">
        <div className="ipo-list">
          {ipoList.map((ipo, index) => (
            <div className="ipo-card" key={index}>
              <div className="card-header">
                <h3 
                  className="company-name clickable"
                  onClick={() => handleCompanyClick(ipo.companyName)}
                >
                  {ipo.companyName}
                </h3>
                <div className="status-badge">Active</div>
              </div>
              <div className="card-content">
                <div className="info-row">
                  <span className="label">💰 Price Band:</span>
                  <span className="value">{ipo.priceBand}</span>
                </div>
                <div className="info-row">
                  <span className="label">📅 Open:</span>
                  <span className="value">{ipo.openDate}</span>
                </div>
                <div className="info-row">
                  <span className="label">📅 Close:</span>
                  <span className="value">{ipo.closeDate}</span>
                </div>
                <div className="info-row">
                  <span className="label">💎 Issue Size:</span>
                  <span className="value highlight">{ipo.issueSize}</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="rating">
                  ⭐⭐⭐⭐⭐ 4.5/5
                </div>
                <button className="view-btn">👁️ View Details</button>
              </div>
            </div>
          ))}
        </div>

        {ipoList.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No IPOs Available</h3>
            <p>Get started by adding your first IPO listing</p>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              ➕ Add Your First IPO
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-popup active">
            <div className="form-header">
              <h2>✨ Add New IPO</h2>
              <button 
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>🏢 Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>
              <div className="form-group">
                <label>💰 Price Band</label>
                <input
                  type="text"
                  name="priceBand"
                  value={formData.priceBand}
                  onChange={handleChange}
                  placeholder="₹100-150"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>📅 Open Date</label>
                  <input
                    type="date"
                    name="openDate"
                    value={formData.openDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>📅 Close Date</label>
                  <input
                    type="date"
                    name="closeDate"
                    value={formData.closeDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>💎 Issue Size</label>
                <input
                  type="text"
                  name="issueSize"
                  value={formData.issueSize}
                  onChange={handleChange}
                  placeholder="₹500 Cr"
                />
              </div>
              <button type="submit" className="submit-btn">
                🚀 Submit IPO
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;