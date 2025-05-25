// components/VoiceNarration.js

import { useState, useEffect, useRef } from 'react';

export default function VoiceNarration({ caseStudies }) {
    const [isNarrating, setIsNarrating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const utteranceRef = useRef(null);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Create speech content from case study
    const createSpeechContent = (casestudy) => {
        const title = casestudy.title || '';
        const content = casestudy.casestudyMarkup || '';
        
        // Remove HTML tags and clean up text
        const cleanContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        
        return `${title}. ${cleanContent}`;
    };

    // Start narration
    const startNarration = () => {
        if (!caseStudies || caseStudies.length === 0) {
            alert('No case studies available for narration.');
            return;
        }

        if (!('speechSynthesis' in window)) {
            alert('Voice narration is not supported in your browser.');
            return;
        }

        // If paused, resume
        if (isPaused && utteranceRef.current) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsNarrating(true);
            return;
        }

        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        const currentCaseStudy = caseStudies[currentIndex];
        const speechContent = createSpeechContent(currentCaseStudy);
        const utterance = new SpeechSynthesisUtterance(speechContent);
        
        utteranceRef.current = utterance;

        utterance.onstart = () => {
            setIsNarrating(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsNarrating(false);
            setIsPaused(false);
            utteranceRef.current = null;
            
            // Auto-continue to next case study if available
            if (currentIndex < caseStudies.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setTimeout(startNarration, 1000);
            } else {
                setCurrentIndex(0);
            }
        };

        utterance.onerror = () => {
            setIsNarrating(false);
            setIsPaused(false);
            utteranceRef.current = null;
        };

        window.speechSynthesis.speak(utterance);
    };

    // Pause or resume
    const pauseResumeNarration = () => {
        if (!utteranceRef.current) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsNarrating(true);
        } else {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsNarrating(false);
        }
    };

    // Stop narration
    const stopNarration = () => {
        window.speechSynthesis.cancel();
        setIsNarrating(false);
        setIsPaused(false);
        utteranceRef.current = null;
        setCurrentIndex(0);
    };

    return (
        <div className="voice-controls mt-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="mb-0 d-flex align-items-center me-4">
                            <i className="bi bi-volume-up fs-4 me-2 text-primary"></i> 
                            Voice Narration
                        </h5>
                        
                        <div className="btn-group">
                            <button 
                                className={`btn ${isNarrating && !isPaused ? 'btn-success' : 'btn-primary'}`} 
                                onClick={startNarration}
                                disabled={!caseStudies || caseStudies.length === 0}
                            >
                                <i className="bi bi-play-fill"></i> Play
                            </button>
                            <button 
                                className="btn btn-outline-primary" 
                                onClick={pauseResumeNarration}
                                disabled={!utteranceRef.current}
                            >
                                <i className={`bi ${isPaused ? 'bi-play-fill' : 'bi-pause-fill'}`}></i>
                                {isPaused ? 'Resume' : 'Pause'}
                            </button>
                            <button 
                                className="btn btn-outline-danger" 
                                onClick={stopNarration}
                                disabled={!isNarrating && !isPaused}
                            >
                                <i className="bi bi-stop-fill"></i> Stop
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}