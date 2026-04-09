import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Voice, { type SpeechResultsEvent } from '@react-native-voice/voice';

export function SpeechToTextButton({ onResult }: { onResult: (text: string) => void }) {
  const [listening, setListening] = useState(false);

  const start = async () => {
    try {
      Voice.onSpeechResults = (e: SpeechResultsEvent) => {
        const text = e.value?.[0];
        if (text) onResult(text);
        stop();
      };
      Voice.onSpeechError = () => { Alert.alert('Could not recognise speech.'); stop(); };
      await Voice.start('en-US');
      setListening(true);
    } catch { Alert.alert('Microphone error', 'Could not access microphone.'); }
  };

  const stop = async () => {
    await Voice.stop();
    Voice.removeAllListeners();
    setListening(false);
  };

  return (
    <TouchableOpacity style={[s.btn, listening && s.active]} onPress={listening ? stop : start}>
      <Text style={s.icon}>{listening ? '⏹' : '🎤'}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: '#FFEBEE' },
  icon: { fontSize: 20 },
});
