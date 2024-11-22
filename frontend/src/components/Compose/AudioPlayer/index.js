import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faPause, faPlay, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import styles from './AudioPlayer.module.scss';

const cx = classNames.bind(styles);

const AudioPlayer = ({ displayButtonText = true, audioLink, className, isEditable, onAudioUpload, audioId }) => {
  const { t } = useTranslation();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [file, setFile] = useState(null);
  // update progress
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const current = audio.currentTime || 0;
    const totalDuration = audio.duration || 1;

    setCurrentTime(current);
    setProgress((current / totalDuration) * 100);
  };

  // pause / play
  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // handle progress change
  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  // Set the total time when the audio is finished downloading
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  // convert seconds to mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setSelectedAudio(audioUrl); // Update audio source
      setAudioFileName(file.name);
      onAudioUpload(file);
    }
    // eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    if ( !!selectedAudio )
      setSelectedAudio( audioLink );
  }, [audioLink]);

  return (
    <div className={cx('container', className)}>
      {isEditable && (
        <Fragment>
          <span
            onClick={() => document.getElementById(`audio_input_${audioId}`).click()}
            className={cx('upload-audio-button', { small: !displayButtonText })}
          >
            <FontAwesomeIcon className={cx('icon')} icon={!!selectedAudio ? faArrowRightArrowLeft : faUpload} />
            {displayButtonText && (
              <span className={cx('text', 'hide-on-mobile-tablet')}>
                {audioFileName ? audioFileName : t('uploadAudio')}
              </span>
            )}
          </span>
          <input
            type="file"
            id={`audio_input_${audioId}`}
            style={{ display: 'none' }}
            accept="audio/*"
            value={''}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Fragment>
      )}

      {/* Only show audio controls if there is an audio file */}
      {(!isEditable || selectedAudio || audioLink) && (
        <div className={cx('player')}>
          <audio
            ref={audioRef}
            src={selectedAudio || audioLink} // Play the uploaded audio or default audio link
            type="audio/mpeg"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          <button onClick={togglePlay} className={cx('play-button')}>
            {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <input
            id={`audio_progress_${audioId}`}
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className={cx('progress-bar')}
          />
          <div className={cx('time')}>
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
