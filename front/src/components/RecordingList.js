import { useEffect, useState } from "react";
import axios from "axios";

const RecordingList = () => {
    const [recordings, setRecordings] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/recordings/")
            .then((response) => setRecordings(response.data))
            .catch((error) => console.error("Erreur de chargement :", error));
    }, []);

    return (
        <div className="p-4">
            <h2>Enregistrements</h2>
            {recordings.map((rec) => (
                <div key={rec.id} className="p-2 border">
                    <p>{rec.text}</p>
                    <audio controls src={`http://127.0.0.1:8000${rec.audio}`} />
                    <a href={`http://127.0.0.1:8000${rec.audio}`} download className="text-blue-500">
                        Télécharger
                    </a>
                </div>
            ))}
        </div>
    );
};

export default RecordingList;
