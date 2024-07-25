import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

function CustomTextField({ value, onChange, isEditable }) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={!isEditable}
        className={`p-2 rounded-md border-2 border-gray-300 text-center ${
          isEditable ? 'bg-white' : 'bg-gray-200 cursor-pointer'
        }`}
        readOnly={!isEditable}
      />
    </div>
  );
}

function Setting() {
  const [isEditable, setIsEditable] = useState(false);
  const [settings, setSettings] = useState({
    aboutUs: "",
    termsAndConditions: "",
    privacyPolicy: "",
    appStoreUrl: "",
    playStoreUrl: ""
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:3020/api/appSetting');
      const data = await response.json();
      if (data.status) {
        setSettings(data.data);
      } else {
        console.error('Failed to fetch settings:', data.message);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.value
    });
  };

  const handleToggle = async () => {
    if (isEditable) {
      try {
        const response = await fetch('http://localhost:3020/api/updateSetting/admin', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settings),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Settings updated successfully');
        } else {
          alert(result.message || 'Failed to update settings');
        }
      } catch (error) {
        console.error('Error updating settings:', error);
      }
    }
    setIsEditable(!isEditable);
  };

  

  return (
    <>
      <div className="px-10 mt-14">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl">App Settings</h1>
          <IconButton onClick={handleToggle}>
            {isEditable ? <DoneIcon /> : <EditIcon />}
          </IconButton>
        </div>
        <div className="flex flex-wrap gap-10 mt-14">
          <div>
            About us :
          <CustomTextField
            value={settings.aboutUs}
            onChange={handleChange('aboutUs')}
            isEditable={isEditable}
          />
          </div>
          <div>
          TermsAndConditions :
          <CustomTextField
            value={settings.TermsAndCondition}
            onChange={handleChange('TermsAndCondition')}
            isEditable={isEditable}
          />
          </div>
          <div>
          privacy&Policy :
          <CustomTextField
            value={settings.privacyPolicy}
            onChange={handleChange('privacyPolicy')}
            isEditable={isEditable}
          />
          </div>
         
        </div>
        <div className="flex flex-wrap gap-10 mt-20">
          <div>
            AppStore URL :
            <CustomTextField
              value={settings.appStoreUrl}
              onChange={handleChange('appStoreUrl')}
              isEditable={isEditable}
            />
          </div>
          <div>
            PlayStore URL :
            <CustomTextField
              value={settings.playStoreUrl}
              onChange={handleChange('playStoreUrl')}
              isEditable={isEditable}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
