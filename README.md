This project is an **Audio Transcription System** using the Whisper model for converting speech in audio files into text. The backend API allows users to upload an audio file, which is then processed and transcribed into text using OpenAI's Whisper pre-trained model. It supports multiple languages and is accessible via a simple web interface.

**Key Features:**

1. **Audio Upload and Transcription**:
- Users can upload audio files (such as .mp3, .wav, etc.), which are processed and transcribed using the Whisper model.
- The transcription can be performed in multiple languages based on user input.
2. **Whisper Model Integration**:
   1. The API uses the pre-trained Whisper model from OpenAI, which is designed for robust and accurate transcription.
   1. The model is capable of handling noisy environments and supports multiple languages.
2. **Frontend Interface**:
   1. A simple HTML page served by the backend allows users to upload their audio files and specify the language for transcription.
   1. The system provides results in real-time, returning the transcribed text back to the user.
2. **CORS Support**:
   1. The API allows cross-origin requests to enable smooth communication between the frontend and backend, even if they are hosted on different servers.
2. **Static Files**:
- The application serves static files (HTML, CSS) to present a user-friendly interface for uploading audio files and receiving transcription results.

**Workflow:**

1. **File Upload**:
   1. Users upload an audio file and optionally specify the language of the audio through a form.
1. **Temporary File Storage**:
   1. The uploaded audio file is temporarily saved on the server for processing.
1. **Whisper Model Transcription**:
   1. The Whisper model processes the audio file, recognizing speech and converting it into text.
   1. The transcription result is returned in JSON format.
1. **Temporary File Deletion**:
- After transcription, the temporary audio file is deleted from the server to free up space.

**Endpoints:**

- **GET /**: Serves the HTML page, allowing users to upload an audio file.
- **POST /transcribe**: Accepts an audio file upload and optional language input, transcribes the audio, and returns the transcribed text.

**Input Data Structure:**

- **File**: An audio file (e.g., .mp3, .wav).
- **Form (optional)**: A string specifying the language of the audio. If not provided, English ("en") is used as the default language

**Stack:**

- **Backend**: FastAPI for handling API requests.
- **Machine Learning**: OpenAI Whisper model for transcription.
- **Static Files**: HTML, CSS for the frontend interface.
- **CORS Middleware**: Enabled for cross-origin requests.

This system provides a quick and efficient way to transcribe audio into text, supporting multiple languages and offering a user-friendly interface for interaction. It can be easily integrated into various applications requiring audio transcription, such as speech-to-text services, note-taking, or language processing.
