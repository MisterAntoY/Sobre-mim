import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Browser } from '@capacitor/browser'

export function isNative(): boolean {
  return Capacitor.isNativePlatform()
}

export function getPlatform(): string {
  return Capacitor.getPlatform()
}

export async function initNative() {
  if (!isNative()) return

  try {
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.setBackgroundColor({ color: '#0f172a' })
  } catch (err) {
    console.warn('[native] StatusBar setup failed:', err)
  }

  try {
    await SplashScreen.hide({ fadeOutDuration: 250 })
  } catch (err) {
    console.warn('[native] SplashScreen hide failed:', err)
  }

  App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) {
      window.history.back()
    } else {
      App.exitApp()
    }
  }).catch(() => { /* ignore */ })
}

export async function impactLight() {
  if (!isNative()) return
  try {
    await Haptics.impact({ style: ImpactStyle.Light })
  } catch { /* ignore */ }
}

export async function impactMedium() {
  if (!isNative()) return
  try {
    await Haptics.impact({ style: ImpactStyle.Medium })
  } catch { /* ignore */ }
}

export async function openExternal(url: string) {
  if (isNative()) {
    try {
      await Browser.open({ url, presentationStyle: 'popover' })
      return
    } catch { /* fall through to window.open */ }
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}
