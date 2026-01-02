// /* eslint-disable prefer-const */
// export function floatTo16BitPCM(float32: Float32Array) {
//   const pcm = new ArrayBuffer(float32.length * 2);
//   const view = new DataView(pcm);
//   let offset = 0;

//   for (let i = 0; i < float32.length; i++, offset += 2) {
//     let sample = Math.max(-1, Math.min(1, float32[i]));
//     view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
//   }

//   return pcm;
// }

/* eslint-disable prefer-const */
export function floatTo16BitPCM(float32) {
  const pcm = new ArrayBuffer(float32.length * 2);
  const view = new DataView(pcm);
  let offset = 0;

  for (let i = 0; i < float32.length; i++, offset += 2) {
    let sample = Math.max(-1, Math.min(1, float32[i]));
    view.setInt16(
      offset,
      sample < 0 ? sample * 0x8000 : sample * 0x7fff,
      true
    );
  }

  return pcm;
}
