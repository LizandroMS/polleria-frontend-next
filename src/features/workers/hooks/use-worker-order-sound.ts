'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SOUND_ENABLED_KEY = 'polleria_worker_order_sound_enabled';

type BrowserWindowWithAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

function getAudioContextConstructor() {
  if (typeof window === 'undefined') return null;

  const audioWindow = window as BrowserWindowWithAudio;
  return audioWindow.AudioContext ?? audioWindow.webkitAudioContext ?? null;
}

export function useWorkerOrderSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const AudioContextConstructor = getAudioContextConstructor();
    setSupported(Boolean(AudioContextConstructor));

    if (!AudioContextConstructor) return;

    const savedValue = localStorage.getItem(SOUND_ENABLED_KEY);
    if (savedValue === 'true') {
      setEnabled(true);
    }
  }, []);

  const ensureAudioContext = useCallback(async () => {
    const AudioContextConstructor = getAudioContextConstructor();

    if (!AudioContextConstructor) {
      setSupported(false);
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

  const enableSound = useCallback(async () => {
    const context = await ensureAudioContext();

    if (!context) return;

    localStorage.setItem(SOUND_ENABLED_KEY, 'true');
    setEnabled(true);

    // Nota para mí: reproduzco un sonido corto al activar para confirmar que el navegador ya permitió audio.
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.22);
  }, [ensureAudioContext]);

  const disableSound = useCallback(() => {
    localStorage.setItem(SOUND_ENABLED_KEY, 'false');
    setEnabled(false);
  }, []);

  const playNewOrderSound = useCallback(async () => {
    if (!enabled) return;

    try {
      const context = await ensureAudioContext();
      if (!context) return;

      // Nota para mí: dos beeps cortos para que el trabajador identifique rápido un pedido nuevo.
      const playBeep = (startAt: number, frequency: number) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, startAt);
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(0.22, startAt + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.28);

        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(startAt);
        oscillator.stop(startAt + 0.3);
      };

      const now = context.currentTime;
      playBeep(now, 880);
      playBeep(now + 0.36, 1046);
    } catch (error) {
      console.error('No se pudo reproducir el sonido del nuevo pedido:', error);
    }
  }, [enabled, ensureAudioContext]);

  return {
    enabled,
    supported,
    enableSound,
    disableSound,
    playNewOrderSound,
  };
}
