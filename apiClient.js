/**
 * SwasthyaSathi API Client
 * Connects the frontend UI to the Node.js + Express Backend
 */

const API_BASE_URL = window.API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = {
  /**
   * Send health query to backend for safety checks, clinical guidance & hospital mapping
   */
  async askQuestion(query, language = 'en', userLocation = null, synthesizeVoice = false) {
    const response = await fetch(`${API_BASE_URL}/chat/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, language, userLocation, synthesizeVoice })
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to process question');
    return result.data;
  },

  /**
   * Evaluate user eligibility for Government Healthcare schemes (PM-JAY, ABHA, PMMVY, etc.)
   */
  async checkSchemeEligibility(userProfile) {
    const response = await fetch(`${API_BASE_URL}/schemes/check-eligibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfile)
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to check eligibility');
    return result.data;
  },

  /**
   * Fetch public and empanelled hospitals with optional filters
   */
  async getHospitals(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        queryParams.append(key, String(val));
      }
    });

    const response = await fetch(`${API_BASE_URL}/hospitals?${queryParams.toString()}`);
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch hospitals');
    return result.data;
  },

  /**
   * Synthesize text to audio speech using Gnani TTS API
   */
  async synthesizeVoice(text, languageCode = 'hi-IN', gender = 'female') {
    const response = await fetch(`${API_BASE_URL}/voice/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, languageCode, gender })
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to synthesize speech');
    return result.data;
  },

  /**
   * Transcribe audio to text using Gnani STT API
   */
  async transcribeAudio(audioBlob, languageCode = 'hi-IN') {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'speech.wav');
    formData.append('languageCode', languageCode);

    const response = await fetch(`${API_BASE_URL}/voice/stt`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to transcribe audio');
    return result.data;
  },

  /**
   * Check backend health
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
};
