import React, { useRef, useState, useEffect } from "react";
import { PlayCircle, PauseCircle, SkipForward, SkipBack } from "lucide-react";

// Import each background image from the src folder
import hindiBackground from "../assets/Background/background1.jpg";
import englishBackground from "../assets/Background/background2.jpg";
import gujaratiBackground from "../assets/Background/background3.jpg";
import punjabiBackground from "../assets/Background/background4.jpg";

// Map the imported variables to the categories
const categoryBackgrounds = {
  Hindi: hindiBackground,
  English: englishBackground,
  Gujarati: gujaratiBackground,
  Punjabi: punjabiBackground,
  Other: englishBackground, // Use a default background for the 'Other' category
};

function Home({ activeCategory, categorizedMusicAPI, categorizedVideoArray }) {
  // Defensive checks: Ensure lists are always arrays, even if activeCategory is invalid
  const currentMusicList = categorizedMusicAPI[activeCategory] || [];
  const currentVideoList = categorizedVideoArray[activeCategory] || [];

  // We'll manage playback for a single audio player, but display multiple cards
  const [musicIndex, setMusicIndex] = useState(0);
  const [currentMusicDetails, setCurrentMusicDetails] = useState(
    currentMusicList.length > 0 ? currentMusicList[0] : null // Initialize safely
  );
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicTotalLength, setMusicTotalLength] = useState("00 : 00");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();
  const avatarClass = ["object-cover", "object-contain", ""];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);

  // On category change
  useEffect(() => {
    // Ensure the list for the new category is not empty before trying to set details
    if (categorizedMusicAPI[activeCategory]?.length > 0) {
      setMusicIndex(0);
      const musicObject = categorizedMusicAPI[activeCategory][0];
      setCurrentMusicDetails(musicObject);
      if (currentAudio.current) {
        currentAudio.current.src = musicObject.songSrc;
        currentAudio.current.load();
        if (isAudioPlaying) {
          currentAudio.current.play();
        }
      }
    } else {
      // If category is empty or invalid, reset to default/empty state
      setMusicIndex(0);
      setCurrentMusicDetails(null); // Set to null or a placeholder object
      setIsAudioPlaying(false);
      if (currentAudio.current) {
        currentAudio.current.pause();
        currentAudio.current.src = ""; // Clear audio source
      }
    }
    setVideoIndex(0);
  }, [activeCategory, categorizedMusicAPI, isAudioPlaying]);

  // On song change (triggered by next/prev or selecting from a card)
  useEffect(() => {
    // Only proceed if currentMusicList is not empty and musicIndex is valid
    if (currentMusicList.length > 0 && musicIndex < currentMusicList.length) {
      const musicObject = currentMusicList[musicIndex];
      setCurrentMusicDetails(musicObject);
      if (currentAudio.current) {
        currentAudio.current.src = musicObject.songSrc;
        currentAudio.current.load(); // Force load new source
        if (isAudioPlaying) {
          // Only play if it should be playing
          currentAudio.current.play();
        }
      }
    }
  }, [musicIndex, currentMusicList, isAudioPlaying]);

  // Background video cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prevIndex) => (prevIndex + 1) % currentVideoList.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentVideoList.length]);

  // Modified handleAudioPlay to accept an optional index
  const handleAudioPlay = (clickedIndex = musicIndex) => {
    // If a different card's play button was clicked, switch to that song first
    if (clickedIndex !== musicIndex) {
      setMusicIndex(clickedIndex);
      setIsAudioPlaying(true); // Will trigger useEffect to load and play new song
      return; // Exit to let useEffect handle the playback
    }

    // Otherwise, toggle play/pause for the currently active song
    if (currentAudio.current && currentMusicDetails) {
      if (currentAudio.current.paused) {
        currentAudio.current.play();
        setIsAudioPlaying(true);
      } else {
        currentAudio.current.pause();
        setIsAudioPlaying(false);
      }
    }
  };

  const handleMusicProgressBar = (e) => {
    if (currentAudio.current?.duration) {
      setAudioProgress(e.target.value);
      currentAudio.current.currentTime =
        (e.target.value * currentAudio.current.duration) / 100;
    }
  };

  const handleAvatar = () => {
    setAvatarClassIndex((prevIndex) => (prevIndex + 1) % avatarClass.length);
  };

  const handleNextSong = () => {
    if (currentMusicList.length > 0) {
      setMusicIndex((prevIndex) => (prevIndex + 1) % currentMusicList.length);
    }
  };

  const handlePrevSong = () => {
    if (currentMusicList.length > 0) {
      setMusicIndex(
        (prevIndex) =>
          (prevIndex - 1 + currentMusicList.length) % currentMusicList.length
      );
    }
  };

  const handleAudioUpdate = () => {
    if (currentAudio.current?.duration) {
      const duration = currentAudio.current.duration;
      const current = currentAudio.current.currentTime;
      const format = (time) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`;
      };
      setMusicTotalLength(format(duration));
      setMusicCurrentTime(format(current));
      setAudioProgress((current / duration) * 100 || 0);
    }
  };

  // Function to handle selecting a song from a specific card (main card click)
  const handleSelectSongFromCard = (index) => {
    // If clicking the currently playing card, toggle play/pause
    if (musicIndex === index) {
      handleAudioPlay(index); // Use the modified handleAudioPlay
    } else {
      // If clicking a different card, set it as active and play
      setMusicIndex(index);
      setIsAudioPlaying(true);
    }
  };

  const bgImage = categoryBackgrounds[activeCategory] || englishBackground;

  // Render a message if no songs are available for the current category
  if (!currentMusicDetails && currentMusicList.length === 0) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-10 text-white text-xl">
        <p>No songs available for this category.</p>
        {/* You can still show background video/image if desired */}
        <video
          src={currentVideoList[videoIndex]}
          loop
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover -z-20 opacity-70 transition-opacity duration-1000 ease-in-out"
          key={activeCategory + videoIndex}
        />
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center -z-10 transition-all duration-1000"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-0 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Background Video */}
      <video
        src={currentVideoList[videoIndex]}
        loop
        muted
        autoPlay
        className="absolute inset-0 w-full h-full object-cover -z-20 opacity-70 transition-opacity duration-1000 ease-in-out"
        key={activeCategory + videoIndex}
      />

      {/* Static Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center -z-10 transition-all duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-0 pointer-events-none" />

      {/* Single Audio Element for playback */}
      <audio
        src={currentMusicDetails?.songSrc} // Use optional chaining
        ref={currentAudio}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
        onLoadedData={() => {
          // This ensures total length is set when the audio data loads
          if (currentAudio.current) {
            const dur = currentAudio.current.duration || 0;
            const min = Math.floor(dur / 60);
            const sec = Math.floor(dur % 60);
            setMusicTotalLength(
              `${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`
            );
          }
        }}
      />

      {/* Container for multiple Music Player Cards */}
      <div className="relative z-10 w-full flex flex-wrap justify-center gap-4 p-4 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
        {currentMusicList.map((song, index) => (
          <div
            key={index}
            className={`w-full sm:w-[calc(33.33%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] p-4 flex flex-col items-center text-center rounded-3xl shadow-xl backdrop-blur-2xl border border-white/20 animate-fadeUp
              ${
                musicIndex === index
                  ? "bg-purple-700/20 scale-105" // Highlight active song
                  : "bg-white/10"
              }`}
            onClick={() => handleSelectSongFromCard(index)} // Click to play this song
          >
            {/* Song Details for this card */}
            <p className="text-xs text-white/60 tracking-wide mb-1">
              {musicIndex === index && isAudioPlaying
                ? "NOW PLAYING"
                : "CLICK TO PLAY"}
            </p>
            <h2 className="text-base font-bold text-white drop-shadow-md truncate w-full">
              {song.songName}
            </h2>
            <p className="text-xs text-gray-300 mb-2 truncate w-full">
              {song.songArtist}
            </p>

            <img
              src={song.songAvatar}
              onClick={handleAvatar}
              className={`w-24 h-24 rounded-full my-3 transition-all duration-500 cursor-pointer shadow-xl hover:scale-105
                ${
                  musicIndex === index && isAudioPlaying
                    ? "animate-spin-slow"
                    : "animation-paused"
                }
                ${avatarClass[avatarClassIndex]}`}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/200x200/cccccc/000000?text=No+Image";
              }}
              alt="Song Avatar"
            />

            {/* Progress bar and controls for all cards */}
            <>
              <div className="flex justify-between w-full text-white/80 text-xs mb-1">
                {musicIndex === index ? (
                  <>
                    <span>{musicCurrentTime}</span>
                    <span>{musicTotalLength}</span>
                  </>
                ) : (
                  <>
                    <span>00 : 00</span>
                    <span>00 : 00</span>
                  </>
                )}
              </div>

              <input
                type="range"
                className="w-full h-1 rounded-lg bg-gray-700 accent-purple-500 mb-3"
                value={musicIndex === index ? audioProgress : 0} // Only show progress for active song
                onChange={handleMusicProgressBar}
              />

              {/* Controls */}
              <div className="flex gap-3 items-center justify-center mt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from propagating
                    handlePrevSong();
                  }}
                  className="text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 shadow-md transition"
                >
                  <SkipBack size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from propagating
                    handleAudioPlay(index); // Pass the index of the clicked card
                  }}
                  className="text-white p-2.5 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg transition transform hover:scale-105"
                >
                  {musicIndex === index && isAudioPlaying ? (
                    <PauseCircle size={32} />
                  ) : (
                    <PlayCircle size={32} />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from propagating
                    handleNextSong();
                  }}
                  className="text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 shadow-md transition"
                >
                  <SkipForward size={18} />
                </button>
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
