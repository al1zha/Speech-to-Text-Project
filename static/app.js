document.getElementById('startButton').addEventListener('click', function () {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Listening...";

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', (event) => {
            audioChunks.push(event.data);
        });

        document.getElementById('stopButton').addEventListener('click', function () {
            mediaRecorder.stop();
        });

        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.wav');

            fetch('/predict/', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.transcription) {
                        resultDiv.innerHTML = `<h3>Transcription: ${data.transcription}</h3>`;
                    } else {
                        resultDiv.innerHTML = `<h3>Error: ${data.error}</h3>`;
                    }
                })
                .catch(error => {
                    resultDiv.innerHTML = `<h3>Error: ${error.message}</h3>`;
                });
        });
    });

    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;

    document.getElementById('stopButton').addEventListener('click', function () {
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    });
});