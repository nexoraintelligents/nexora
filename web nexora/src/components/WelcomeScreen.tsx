import { useEffect } from 'react';

export function WelcomeScreen() {
    useEffect(() => {
        const speakGreeting = () => {
            // Strict check to prevent multiple plays (React StrictMode fires useEffect twice)
            if (sessionStorage.getItem('nexora_voice_played')) return;

            const text = "Welcome to Nexora.";
            const utterance = new SpeechSynthesisUtterance(text);
            
            const setVoice = () => {
                // Important: clear this callback so it doesn't fire again if voices change later
                window.speechSynthesis.onvoiceschanged = null;

                const voices = window.speechSynthesis.getVoices();
                if (voices.length === 0) return;

                // Stricter female voice selection
                let preferredVoice = voices.find(v => {
                    const name = v.name.toLowerCase();
                    return name.includes("female") || 
                           name.includes("zira") ||     // Windows Female
                           name.includes("samantha") || // Apple/Mac Female
                           name.includes("victoria") || // Apple/Mac Female
                           name.includes("karen") ||    // Mac
                           name.includes("tessa") ||    // Mac
                           name.includes("hazel") ||    // Windows UK Female
                           name.includes("susan");      // Windows Female
                });

                // If no explicit female name found, pick an English voice that is NOT male
                if (!preferredVoice) {
                    preferredVoice = voices.find(v => {
                        const name = v.name.toLowerCase();
                        return v.lang.startsWith('en') && 
                               !name.includes("male") && 
                               !name.includes("david") && // Windows Male
                               !name.includes("mark") &&  // Windows Male
                               !name.includes("daniel") && // Mac Male
                               !name.includes("george") &&
                               !name.includes("guy");
                    });
                }
                
                if (preferredVoice) utterance.voice = preferredVoice;
                
                utterance.pitch = 0.9;
                utterance.rate = 0.85; 
                utterance.volume = 1;
                
                // Cancel any currently queued or playing speech to prevent duplicates
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
                
                // Mark as played so it never runs again this session
                sessionStorage.setItem('nexora_voice_played', 'true');
            };

            if (window.speechSynthesis.getVoices().length > 0) {
                setVoice();
            } else {
                window.speechSynthesis.onvoiceschanged = setVoice;
            }
        };

        const handleInteraction = () => {
            speakGreeting();
            // Remove listeners immediately
            ['click', 'keydown', 'scroll', 'touchstart'].forEach(evt => 
                window.removeEventListener(evt, handleInteraction)
            );
        };

        // Attempt immediately
        speakGreeting();

        // Attach listeners for fallback (use 'once' and capture so it fires immediately on first touch anywhere)
        ['click', 'keydown', 'scroll', 'touchstart'].forEach(evt => 
            window.addEventListener(evt, handleInteraction, { once: true, capture: true })
        );

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
            ['click', 'keydown', 'scroll', 'touchstart'].forEach(evt => 
                window.removeEventListener(evt, handleInteraction, { capture: true })
            );
        };
    }, []);

    // Return nothing so the user goes straight to the homepage
    return null;
}
