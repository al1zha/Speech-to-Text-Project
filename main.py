from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import whisper
import uvicorn
import os

app = FastAPI()

# Allow frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify the frontend URL instead of "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained Whisper model
model = whisper.load_model("base")

# Mount the static folder to serve CSS and other static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve the HTML page directly
@app.get("/", response_class=HTMLResponse)
async def serve_html():
    with open("static/index.html", "r") as f:
        html_content = f.read()
    return html_content

# Endpoint for handling audio input and transcribing
@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...), language: str = Form("en")):
    # Save the uploaded audio file temporarily
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as audio_file:
        content = await file.read()
        audio_file.write(content)
    
    # Transcribe audio using the Whisper model
    result = model.transcribe(temp_file_path, language=language)
    
    # Delete temporary audio file
    os.remove(temp_file_path)

    return {"transcription": result["text"]}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
