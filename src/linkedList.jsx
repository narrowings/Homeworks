import React, { useState, useEffect, useRef } from "react";

class Song {
  constructor(name, artist) {
    this.name = name;
    this.artist = artist;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(name, artist) {
    const newSong = new Song(name, artist);

    if (!this.head) {
      this.head = newSong;
    } else {
      this.tail.next = newSong;
    }

    this.tail = newSong;
    this.length++;
  }

  getAllSongs() {
    const songsArray = [];
    let current = this.head;

    while (current) {
      songsArray.push({ name: current.name, artist: current.artist });
      current = current.next;
    }

    return songsArray;
  }
}

const Playlist = () => {
  const playlistRef = useRef(new LinkedList());
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const playlist = playlistRef.current;

    if (playlist.length === 0) { 
      playlist.append("Just Awake", "Fear Lothin Vegas");
      playlist.append("Imagine", "John Lennon");
      playlist.append("just pretend", "bad omens");
      playlist.append("end of me", "ashes remain");
      playlist.append("courtesy call", "foot thousand krutch");

      setSongs(playlist.getAllSongs());
      setCurrentSong(playlist.head);
    }
  }, []);

  const handleNext = () => {
    if (currentSong && currentSong.next) {
      setCurrentSong(currentSong.next);
    } else {
      alert("Ya llegaste al final de la playlist 🎶");
    }
  };

  const handleRestart = () => {
    setCurrentSong(playlistRef.current.head);
  };

  return (
    <>
      <h1>Playlist</h1>

      {currentSong ? (
        <div style={{ margin: "20px 0" }}>
          <h2>▶ Reproduciendo ahora:</h2>
          <h1 style={{ fontSize: "2rem", color: "blue" }}>
            {currentSong.name} - {currentSong.artist}
          </h1>
          <button onClick={handleNext}>Siguiente</button>
          <button onClick={handleRestart}>Reiniciar</button>
        </div>
      ) : (
        <h2>No hay canciones en la playlist</h2>
      )}

      <h3>Lista completa:</h3>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            {song.name} - {song.artist}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Playlist;
