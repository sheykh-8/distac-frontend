import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "./ui/button";

interface AudioPlayerProps {
  audioUrl: string;
  filename: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  filename,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current!,
      waveColor: "#A8DBA8",
      progressColor: "#3B8686",
      cursorColor: "#3B8686",
      barWidth: 2,
      barRadius: 3,
      height: 50,
    });

    

    wavesurferRef.current = wavesurfer;

    wavesurfer.load(audioUrl);

    wavesurfer.on("finish", () => setIsPlaying(false));

    return () => {
      wavesurfer.once("ready", () => {
        wavesurfer.destroy();
      })
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="">
      <div className="flex items-center space-x-4">
        <Button
          variant={"ghost"}
          className="text-gray-600"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
        <div
          ref={waveformRef}
          className="flex-grow"
          style={{ width: "100px" }}
        />
        <Button
          variant={"ghost"}
          className="text-gray-600"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
