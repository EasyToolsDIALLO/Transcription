import { useState, useRef } from "react";
import axios from "axios";

const AudioRecorder = () => {
    const [text, setText] = useState("");
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.current.push(event.data);
            }
        };

        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
            setAudioBlob(audioBlob);
        };

        mediaRecorder.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        setRecording(false);
    };

    const uploadRecording = async () => {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("audio", audioBlob, "recording.wav");

        try {
            await axios.post("http://127.0.0.1:8000/api/recordings/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Enregistrement envoyé !");
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
        <div className="p-4">
            <textarea
                className="w-full p-2 border"
                placeholder="Entrez votre texte ici..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={recording ? stopRecording : startRecording} className="px-4 py-2 bg-blue-500 text-white">
                {recording ? "Arrêter" : "Enregistrer"}
            </button>
            {audioBlob && (
                <>
                    <audio controls src={URL.createObjectURL(audioBlob)}></audio>
                    <button onClick={uploadRecording} className="px-4 py-2 bg-green-500 text-white">
                        Envoyer
                    </button>
                </>
            )}
        </div>
    );
};

export default AudioRecorder;
