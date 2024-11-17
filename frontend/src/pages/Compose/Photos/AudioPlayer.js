import classNames from 'classnames/bind';
import styles from './AudioPlayer.module.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faPause, faPlay, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useQuestion } from '~/context/QuestionProvider';
import Button from '~/components/Button';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const AudioPlayer = ({ audioLink, className, isEditable, onAudioUpload }) => {
  const { t } = useTranslation();
  const question = useQuestion();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState(audioLink);
  const [audioFileName, setAudioFileName] = useState('');
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

  // Handle audio upload
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setSelectedAudio(audioUrl); // Update audio source
      setAudioFileName(file.name);
      onAudioUpload(file);
    }
  };

  useEffect(() => {
    if (audioLink) setSelectedAudio(audioLink);
  }, [audioLink]);

  return (
    <div className={cx('container', className)}>
      {isEditable && (
        <Fragment>
          <Button
            primary
            success={!!selectedAudio}
            leftIcon={!!selectedAudio ? faArrowRightArrowLeft : faUpload}
            onClick={() => document.getElementById(`audioInput_${question.id}`).click()}
            className={cx('upload-audio')}
          >
            {!!selectedAudio ? t('changeAudio') : t('uploadAudio')}
          </Button>
          <input
            type="file"
            id={`audioInput_${question.id}`}
            style={{ display: 'none' }}
            accept="audio/*"
            value={''}
            onChange={handleAudioUpload}
          />
        </Fragment>
      )}

      {/* Only show audio controls if there is an audio file */}
      {!isEditable && (
        <Fragment>
          <audio
            ref={audioRef}
            src={audioLink} // Play the uploaded audio or default audio link
            type="audio/mpeg"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          <button onClick={togglePlay} className={cx('play-button')}>
            {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <input
            id={`audioProgress_${question.id}`}
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className={cx('progress-bar')}
          />
          <div className={cx('time')}>
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>
        </Fragment>
      )}
      {audioFileName && <div className={cx('file-name')}>{audioFileName}</div>}
    </div>
  );
};

export default AudioPlayer;
