import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shreegurucool.app',
  appName: 'SGC',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      spinnerColor: '#3b82f6'
    }
  },
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'api.shreegurucool.in',
      'shreegurucool.in'
    ]
  }
};

export default config;
