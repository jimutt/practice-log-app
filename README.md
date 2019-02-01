# Practice Log
<div style="display: flex; justify-content: center; width: 100%;">
<img alt="app screens" src="https://s3.eu-central-1.amazonaws.com/ju-media/practicelog_screens.png" height="400" />
</div>

### Demo available at: https://inspiring-leavitt-98b934.netlify.com

A Vue.js PWA concept app featuring IndexedDB storage and audio recording. The application's main purposes is to let you record and keep track of your practice sessions (with a focus on music, which explains the audio recording feature).

Key technologies/dependencies:

- Vuetify for GUI
- Custom HTML5 audio recorder using `MediaRecorder`.
- Local persistant storage in IndexedDB using Dexie.js.
- Vue CLI 3 for project setup

## Background and future
The application has been developed solely to fulfill personal needs. I ([Jimmy Utterström](https://twitter.com/jimutt)) have been wanting a really simple way of tracking my practice sessions for singing and flute playing. First I considered a native app approach, which perhaps makes more sense than a PWA for this kind of apps where you want offline storage and hardware access. Though I was more intrigued by making it as a PWA and get to evaluate Vuetify and get accustomed to IndexedDB. 

Currently the app only features local, offline storage with IndexedDB. I plan to add a backend API for cloud storage/synchronization of sessions and recordings as the local IndexedDB storage have certain [size limitations](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria) which does not allow for unlimited audio recordings to be stored locally.

## Limitations / shortcomings
- No handling of IndexedDB storage size limitations. 
- You can only set one goal which counts all the practice time. In reality you'd probably want to set goals for specific practice categories.
- Only tested on a couple of devices.
- No tests at all. 




## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
