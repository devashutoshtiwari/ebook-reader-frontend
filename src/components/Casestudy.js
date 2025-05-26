'use client';
import { useState } from 'react';
import BookmarkButton from '@/components/features/bookmarks/BookmarkButton';
import VoiceNarration from '@/components/VoiceNarration';

export default function Casestudy({ casestudy }) {
  // Convert single case study to array for VoiceNarration component
  const caseStudyArray = casestudy ? [casestudy] : [];

  // Accessibility state
  const [fontSize, setFontSize] = useState(16); // Default font size in px
  const [fontFamily, setFontFamily] = useState('default');
  const [showAccessibilityControls, setShowAccessibilityControls] = useState(false);

  // Font size options
  const fontSizeOptions = [
    { label: 'Small', value: 14 },
    { label: 'Normal', value: 16 },
    { label: 'Large', value: 18 },
    { label: 'Extra Large', value: 20 },
    { label: 'XXL', value: 24 }
  ];

  // Font family options
  const fontFamilyOptions = [
    { label: 'Default', value: 'default', css: 'inherit' },
    { label: 'Sans Serif', value: 'sans-serif', css: 'Arial, Helvetica, sans-serif' },
    { label: 'Serif', value: 'serif', css: 'Georgia, "Times New Roman", serif' },
    { label: 'Dyslexia Friendly', value: 'dyslexia', css: 'OpenDyslexic, Arial, sans-serif' },
    { label: 'Monospace', value: 'monospace', css: 'Consolas, Monaco, monospace' }
  ];

  // Get current font family CSS
  const getCurrentFontFamily = () => {
    const option = fontFamilyOptions.find(opt => opt.value === fontFamily);
    return option ? option.css : 'inherit';
  };

  // Increase font size
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 28));
  };

  // Decrease font size
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  // Reset to defaults
  const resetAccessibility = () => {
    setFontSize(16);
    setFontFamily('default');
  };

  return (
    <div className="reader-view">
      <section className="chapter">
        <div className="chapter-heading">
          <h2 className="display-title">{casestudy?.title}</h2>
          
          {/* Page Actions */}
          <div className="page-actions">
            <BookmarkButton/>
            
            {/* Accessibility Controls Toggle */}
            <button 
              className="btn btn-outline-primary btn-sm rounded-circle me-2 page-action-btn" 
              title="Accessibility options"
              aria-label="Toggle accessibility options"
              aria-expanded={showAccessibilityControls}
              onClick={() => setShowAccessibilityControls(!showAccessibilityControls)}
            >
              <i className="bi bi-universal-access"></i>
            </button>
            
            <button 
              className="btn btn-outline-primary btn-sm rounded-circle me-2 page-action-btn" 
              title="Add note to this page" 
              aria-label="Add note to this page"
            >
              <i className="bi bi-pencil"></i>
            </button>
          </div>
        </div>

        {/* Accessibility Controls Panel */}
        {showAccessibilityControls && (
          <div className="accessibility-panel border rounded p-3 mb-3 ">
            <h3 className="h6 mb-3">
              <i className="bi bi-universal-access me-2"></i>
              Reading Preferences
            </h3>
            
            <div className="row g-3">
              {/* Font Size Controls */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Font Size</label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={decreaseFontSize}
                    aria-label="Decrease font size"
                    disabled={fontSize <= 12}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  
                  <span className="badge bg-secondary px-3 py-2" aria-live="polite">
                    {fontSize}px
                  </span>
                  
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={increaseFontSize}
                    aria-label="Increase font size"
                    disabled={fontSize >= 28}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                
                {/* Font Size Presets */}
                <div className="btn-group-sm" role="group" aria-label="Font size presets">
                  {fontSizeOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      className={`btn btn-sm me-1 mb-1 ${fontSize === option.value ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFontSize(option.value)}
                      aria-pressed={fontSize === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family Controls */}
              <div className="col-md-6">
                <label htmlFor="font-family-select" className="form-label fw-semibold">
                  Font Family
                </label>
                <select 
                  id="font-family-select"
                  className="form-select form-select-sm mb-2"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  aria-describedby="font-family-help"
                >
                  {fontFamilyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <small id="font-family-help" className="form-text ">
                  Choose a font that's comfortable for reading
                </small>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-3">
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={resetAccessibility}
                aria-label="Reset font settings to default"
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Reset to Default
              </button>
            </div>
          </div>
        )}

        {/* Voice Narration for single case study */}
        <VoiceNarration caseStudies={caseStudyArray} />

        {/* Case Study Content with Applied Accessibility Settings */}
        <div 
          className="chapter-content"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: getCurrentFontFamily(),
            lineHeight: 1.6, // Better readability
            letterSpacing: fontFamily === 'dyslexia' ? '0.5px' : 'normal'
          }}
        >
          {casestudy?.casestudyMarkup}
        </div>
      </section>

  
    </div>
  );
}