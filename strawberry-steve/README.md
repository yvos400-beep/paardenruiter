# Strawberry Steve: intro for The Weird Little Universe

A 10-second vertical (1080×1920, 9:16, 30 fps) 3D character intro, built in Three.js and rendered frame by frame.

- `strawberry-steve-intro.mp4`: the finished video
- `scene.html`: the scene, character rig, animation timeline and text overlays (`window.renderAt(t)` draws the frame at time `t`)
- `render.mjs`: renders every frame in headless Chromium and encodes the MP4 with ffmpeg

## Re-render

```bash
npm install                 # three + Fredoka font
node render.mjs             # needs Playwright (global) + ffmpeg
node render.mjs out 30 1.5,6.2   # render only selected timestamps to PNG for previews
```

## Timeline

| Time | Action | Caption |
|---|---|---|
| 0–2 s | Steve pops in with confetti, lands with a squash and stares at the camera | Meet Strawberry Steve 🍓 |
| 2–5 s | Slow blinks, droopy lids, slumps, sighs | Emotionally unavailable. |
| 5–8 s | Crosses his tiny arms, angry brows, side-eye, foot tap, 💢 | And honestly… so are you. |
| 8–10 s | Turns back to the camera, deadpan stare, one slow blink | Welcome to The Weird Little Universe. |
