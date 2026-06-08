'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SOUND_ENABLED_KEY = 'polleria_worker_order_sound_enabled';
const NEW_ORDER_MESSAGE = 'Tiene un nuevo pedido';

type AudioContextConstructor = new () => AudioContext;

type BrowserWindowWithAudio = Window & {
  AudioContext?: AudioContextConstructor;
  webkitAudioContext?: AudioContextConstructor;
};

function getAudioContextConstructor(): AudioContextConstructor | null {
  if (typeof window === 'undefined') return null;

  const audioWindow = window as BrowserWindowWithAudio;
  return audioWindow.AudioContext ?? audioWindow.webkitAudioContext ?? null;
}

function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

function speakMessage(message: string) {
  if (!isSpeechSupported()) return false;

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'es-PE';
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('es'));

  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }

  // Nota para mí: cancelo audios pendientes para que el aviso nuevo no se mezcle con uno anterior.
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);

  return true;
}

function playBeep(context: AudioContext, startAt: number, frequency: number, volume = 0.18) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.28);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + 0.3);
}

export function useWorkerOrderSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const AudioContextConstructor = getAudioContextConstructor();

    // Nota para mí: el aviso principal usa voz. El beep queda como respaldo si el navegador no permite voz.
    setSupported(Boolean(AudioContextConstructor) || isSpeechSupported());

    const savedValue = localStorage.getItem(SOUND_ENABLED_KEY);
    if (savedValue === 'true') {
      setEnabled(true);
    }
  }, []);

  const ensureAudioContext = useCallback(async () => {
    const AudioContextConstructor = getAudioContextConstructor();

    if (!AudioContextConstructor) {
      return null;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextConstructor();
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }, []);

  const playFallbackBeep = useCallback(async () => {
    const context = await ensureAudioContext();
    if (!context) return;

    const now = context.currentTime;
    playBeep(context, now, 880);
    playBeep(context, now + 0.36, 1046);
  }, [ensureAudioContext]);

  const enableSound = useCallback(async () => {
    const canSpeak = isSpeechSupported();
    const context = await ensureAudioContext();

    if (!canSpeak && !context) {
      setSupported(false);
      return;
    }

    localStorage.setItem(SOUND_ENABLED_KEY, 'true');
    setEnabled(true);

    // Nota para mí: reproduzco una prueba al activar para que el trabajador confirme que el navegador permitió audio.
    if (!speakMessage('Audio activado')) {
      await playFallbackBeep();
    }
  }, [ensureAudioContext, playFallbackBeep]);

  const disableSound = useCallback(() => {
    localStorage.setItem(SOUND_ENABLED_KEY, 'false');
    setEnabled(false);

    if (isSpeechSupported()) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const playNewOrderSound = useCallback(async () => {
    if (!enabled) return;

    try {
      // Nota para mí: el aviso debe ser claro para operación: “Tiene un nuevo pedido”.
      if (!speakMessage(NEW_ORDER_MESSAGE)) {
        await playFallbackBeep();
      }
    } catch (error) {
      console.error('No se pudo reproducir el aviso del nuevo pedido:', error);
    }
  }, [enabled, playFallbackBeep]);

  return {
    enabled,
    supported,
    enableSound,
    disableSound,
    playNewOrderSound,
  };
}
