import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Mail, User, Edit2, Save, X } from 'lucide-react';
import '../../assets/styles/ProfileComponent.css';

const ProfileComponent = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    username: user?.username || '',
    email: user?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Logic to save updated data
    console.log('Data to save:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      surname: user?.surname || '',
      username: user?.username || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={40} />
        </div>
        <div className="profile-title-section">
          <h2 className="profile-title">{isEditing ? 'Edit Profile' : 'Personal Information'}</h2>
          <p className="profile-subtitle">
            {isEditing 
              ? 'Update your personal data' 
              : 'Manage your personal data'}
          </p>
        </div>
        {!isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <Edit2 size={18} />
            <span>Edit</span>
          </button>
        ) : (
          <div className="edit-status">
            <div className="edit-status-indicator"></div>
            <span>Edit mode</span>
          </div>
        )}
      </div>

      <div className="profile-content">
        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-cards">
              <div className="form-card">
                <div className="form-card-header">
                  <User size={20} className="form-card-icon" />
                  <h3 className="form-card-title">Personal Data</h3>
                </div>
                <div className="form-card-content">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">First Name</label>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input disabled-input"
                          placeholder="Enter your first name"
                          disabled
                          data-tooltip-id="name-tooltip"
                        />
                        <ReactTooltip
                          id="name-tooltip" 
                          place="bottom"
                          type="dark"
                          effect="solid"
                          className="custom-tooltip"
                        >
                          Editing will be available soon
                        </ReactTooltip>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="surname">Last Name</label>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          id="surname"
                          name="surname"
                          value={formData.surname}
                          onChange={handleChange}
                          className="form-input disabled-input"
                          placeholder="Enter your last name"
                          disabled
                          data-tooltip-id="surname-tooltip"
                        />
                        <ReactTooltip
                          id="surname-tooltip"
                          place="bottom"
                          type="dark"
                          effect="solid"
                          className="custom-tooltip"
                        >
                          Editing will be available soon
                        </ReactTooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-card">
                <div className="form-card-header">
                  <Mail size={20} className="form-card-icon" />
                  <h3 className="form-card-title">Account Information</h3>
                </div>
                <div className="form-card-content">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="input-wrapper">
                      <User size={16} className="input-icon" />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-input disabled-input with-icon"
                        placeholder="Enter your username"
                        disabled
                        data-tooltip-id="username-tooltip"
                      />
                      <ReactTooltip
                        id="username-tooltip"
                        place="bottom"
                        type="dark"
                        effect="solid"
                        className="custom-tooltip"
                      >
                        Editing will be available soon
                      </ReactTooltip>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-wrapper">
                      <Mail size={16} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input disabled-input with-icon"
                        placeholder="Enter your email"
                        disabled
                        data-tooltip-id="email-tooltip"
                      />
                      <ReactTooltip
                        id="email-tooltip"
                        place="bottom"
                        type="dark"
                        effect="solid"
                        className="custom-tooltip"
                      >
                        Editing will be available soon
                      </ReactTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="form-action-button save disabled-button"
                disabled
                title="This feature is coming soon"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
              <button type="button" className="form-action-button cancel" onClick={handleCancel}>
                <X size={18} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-card">
              <div className="info-row">
                <div className="info-label">First Name</div>
                <div className="info-value">{user?.name || '—'}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Last Name</div>
                <div className="info-value">{user?.surname || '—'}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Username</div>
                <div className="info-value">
                  <User size={16} className="info-icon" />
                  {user?.username || '—'}
                </div>
              </div>
              <div className="info-row">
                <div className="info-label">Email</div>
                <div className="info-value">
                  <Mail size={16} className="info-icon" />
                  {user?.email || '—'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;