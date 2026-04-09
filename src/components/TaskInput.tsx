import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SpeechToTextButton } from './SpeechToTextButton';

export function TaskInput({ onSubmit }: { onSubmit: (title: string) => void }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
  };

  return (
    <View style={s.container}>
      <TextInput style={s.input} value={value} onChangeText={setValue}
        placeholder="Add a task..." placeholderTextColor="#999"
        returnKeyType="done" onSubmitEditing={submit} />
      <SpeechToTextButton onResult={text => setValue(text)} />
      <TouchableOpacity style={s.addBtn} onPress={submit}>
        <Text style={s.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  input: { flex: 1, fontSize: 16, paddingHorizontal: 8 },
  addBtn: { backgroundColor: '#1a1a1a', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 8, marginLeft: 8 },
  addText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
