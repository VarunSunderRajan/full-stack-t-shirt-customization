import React from 'react'
import {SketchPicker} from 'react-color';
import {useSnapshot} from 'valtio';
import state from '../store';
const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div
      className = "absolute left-full ml-3"
    >
      <SketchPicker
        color = {snap.color}
        disableAlpha
        presetColors={[ '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
        ]}
        onChange = {(color) => state.color = color.hex}
        />
    </div>
  )
}

export default ColorPicker