var _phaserBuffer = new Array(1024),
// Buffer of random values used to generate noise
_noiseBuffer  = new Array(32);
for (var i = _phaserBuffer.length; i--; ) {
_phaserBuffer[i] = 0;
for (var i = _noiseBuffer.length; i--; ) {
_noiseBuffer[i] = Math.random() * 2 - 1;
}

for (var i = 0; i < length; i++) {
if (_finished) {
return i;
}

// Repeats every _repeatLimit times, partially resetting the sound parameters
if (_repeatLimit) {
if (++_repeatTime >= _repeatLimit) {
  _repeatTime = 0;
  this.reset();
}
}

// If _changeLimit is reached, shifts the pitch
if (_changeLimit) {
if (++_changeTime >= _changeLimit) {
  _changeLimit = 0;
  _period *= _changeAmount;
}
}

// Acccelerate and apply slide
_slide += _deltaSlide;
_period *= _slide;

// Checks for frequency getting too low, and stops the sound if a minFrequency was set
if (_period > _maxPeriod) {
_period = _maxPeriod;
if (_minFreqency > 0) {
  _finished = true;
}
}

_periodTemp = _period;

// Applies the vibrato effect
if (_vibratoAmplitude > 0) {
_vibratoPhase += _vibratoSpeed;
_periodTemp *= 1 + Math.sin(_vibratoPhase) * _vibratoAmplitude;
}

_periodTemp |= 0;
if (_periodTemp < 8) {
_periodTemp = 8;
}

// Sweeps the square duty
if (!_waveType) {
_squareDuty += _dutySweep;
if (_squareDuty < 0) {
  _squareDuty = 0;
} else if (_squareDuty > .5) {
  _squareDuty = .5;
}
}

// Moves through the different stages of the volume envelope
if (++_envelopeTime > _envelopeLength) {
_envelopeTime = 0;

switch (++_envelopeStage)  {
  case 1:
    _envelopeLength = _envelopeLength1;
    break;
  case 2:
    _envelopeLength = _envelopeLength2;
}
}

// Sets the volume based on the position in the envelope
switch (_envelopeStage) {
case 0:
  _envelopeVolume = _envelopeTime * _envelopeOverLength0;
  break;
case 1:
  _envelopeVolume = 1 + (1 - _envelopeTime * _envelopeOverLength1) * 2 * _sustainPunch;
  break;
case 2:
  _envelopeVolume = 1 - _envelopeTime * _envelopeOverLength2;
  break;
case 3:
  _envelopeVolume = 0;
  _finished = true;
}

// Moves the phaser offset
if (_phaser) {
_phaserOffset += _phaserDeltaOffset;
_phaserInt = _phaserOffset | 0;
if (_phaserInt < 0) {
  _phaserInt = -_phaserInt;
} else if (_phaserInt > 1023) {
  _phaserInt = 1023;
}
}

// Moves the high-pass filter cutoff
if (_filters && _hpFilterDeltaCutoff) {
_hpFilterCutoff *= _hpFilterDeltaCutoff;
if (_hpFilterCutoff < .00001) {
  _hpFilterCutoff = .00001;
} else if (_hpFilterCutoff > .1) {
  _hpFilterCutoff = .1;
}
}

_superSample = 0;
for (var j = 8; j--; ) {
// Cycles through the period
_phase++;
if (_phase >= _periodTemp) {
  _phase %= _periodTemp;

  // Generates new random noise for this period
  if (_waveType == 3) {
    for (var n = _noiseBuffer.length; n--; ) {
      _noiseBuffer[n] = Math.random() * 2 - 1;
    }
  }
}

// Gets the sample from the oscillator
switch (_waveType) {
  case 0: // Square wave
    _sample = ((_phase / _periodTemp) < _squareDuty) ? .5 : -.5;
    break;
  case 1: // Saw wave
    _sample = 1 - _phase / _periodTemp * 2;
    break;
  case 2: // Sine wave (fast and accurate approx)
    _pos = _phase / _periodTemp;
    _pos = (_pos > .5 ? _pos - 1 : _pos) * 6.28318531;
    _sample = 1.27323954 * _pos + .405284735 * _pos * _pos * (_pos < 0 ? 1 : -1);
    _sample = .225 * ((_sample < 0 ? -1 : 1) * _sample * _sample  - _sample) + _sample;
    break;
  case 3: // Noise
    _sample = _noiseBuffer[Math.abs(_phase * 32 / _periodTemp | 0)];
}

// Applies the low and high pass filters
if (_filters) {
  _lpFilterOldPos = _lpFilterPos;
  _lpFilterCutoff *= _lpFilterDeltaCutoff;
  if (_lpFilterCutoff < 0) {
    _lpFilterCutoff = 0;
  } else if (_lpFilterCutoff > .1) {
    _lpFilterCutoff = .1;
  }

  if (_lpFilterOn) {
    _lpFilterDeltaPos += (_sample - _lpFilterPos) * _lpFilterCutoff;
    _lpFilterDeltaPos *= _lpFilterDamping;
  } else {
    _lpFilterPos = _sample;
    _lpFilterDeltaPos = 0;
  }

  _lpFilterPos += _lpFilterDeltaPos;

  _hpFilterPos += _lpFilterPos - _lpFilterOldPos;
  _hpFilterPos *= 1 - _hpFilterCutoff;
  _sample = _hpFilterPos;
}

// Applies the phaser effect
if (_phaser) {
  _phaserBuffer[_phaserPos % 1024] = _sample;
  _sample += _phaserBuffer[(_phaserPos - _phaserInt + 1024) % 1024];
  _phaserPos++;
}

_superSample += _sample;
}

// Averages out the super samples and applies volumes
_superSample *= .125 * _envelopeVolume * _masterVolume;

// Clipping if too loud
buffer[i] = _superSample >= 1 ? 32767 : _superSample <= -1 ? -32768 : _superSample * 32767 | 0;
}

return length;
}


// Adapted from http://codebase.es/riffwave/
var synth = new SfxrSynth();
// Export for the Closure Compiler
window['jsfxr'] = function(settings) {
// Initialize SfxrParams
synth._params.setSettings(settings);
// Synthesize Wave
var envelopeFullLength = synth.totalReset();
var data = new Uint8Array(((envelopeFullLength + 1) / 2 | 0) * 4 + 44);
var used = synth.synthWave(new Uint16Array(data.buffer, 44), envelopeFullLength) * 2;
var dv = new Uint32Array(data.buffer, 0, 44);
// Initialize header
dv[0] = 0x46464952; // "RIFF"
dv[1] = used + 36;  // put total size here
dv[2] = 0x45564157; // "WAVE"
dv[3] = 0x20746D66; // "fmt "
dv[4] = 0x00000010; // size of the following
dv[5] = 0x00010001; // Mono: 1 channel, PCM format
dv[6] = 0x0000AC44; // 44,100 samples per second
dv[7] = 0x00015888; // byte rate: two bytes per sample
dv[8] = 0x00100002; // 16 bits per sample, aligned on every two bytes
dv[9] = 0x61746164; // "data"
dv[10] = used;      // put number of samples here

// Base64 encoding written by me, @maettig
used += 44;
var i = 0,
base64Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
output = 'data:audio/wav;base64,';
for (; i < used; i += 3)
{
var a = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
output += base64Characters[a >> 18] + base64Characters[a >> 12 & 63] + base64Characters[a >> 6 & 63] + base64Characters[a & 63];
}
return output;
}
