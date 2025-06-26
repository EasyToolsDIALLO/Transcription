import AudioRecorder from "./components/AudioRecorder";
import RecordingList from "./components/RecordingList";

function App() {
    return (
        <div className="p-4">
            <h1 className="text-2xl">Enregistrement Audio</h1>
            <AudioRecorder />
            <RecordingList />
        </div>
    );
}

export default App;
