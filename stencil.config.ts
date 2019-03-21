import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'arcgishub',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  copy: [
    { src: 'authenticate.html' }
  ]
};
