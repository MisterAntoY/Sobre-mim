# Versão Android (Capacitor)

O portfolio também é distribuído como app Android nativa via [Capacitor](https://capacitorjs.com).

## Pré-requisitos

1. **Node.js 18+** e dependências do projecto (`npm install`)
2. **Android Studio** ([download](https://developer.android.com/studio))
3. **JDK 21** (incluído no Android Studio recente)
4. **Android SDK** com plataforma 34 (API 34) ou superior
5. **Variáveis de ambiente** (Windows PowerShell):
   ```powershell
   $env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
   $env:JAVA_HOME    = "C:\Program Files\Android\Android Studio\jbr"
   ```

## Fluxo de desenvolvimento

```bash
# 1. Build do bundle web + sincronizar com Android
npm run android:sync

# 2. Abrir no Android Studio para emulador / debug
npm run android:open

# 3. Correr directamente num dispositivo conectado (adb)
npm run android:run

# 4. Gerar APK debug em android/app/build/outputs/apk/debug/
npm run android:assemble
```

## Funcionalidades nativas integradas

| Plugin                     | Uso                                                          |
|----------------------------|--------------------------------------------------------------|
| `@capacitor/status-bar`    | Cor da barra de estado a combinar com o tema (#0f172a)       |
| `@capacitor/splash-screen` | Splash escuro com fade-out de 250ms                          |
| `@capacitor/app`           | Botão "voltar" do Android navega pelo histórico              |
| `@capacitor/haptics`       | Feedback táctil ao descarregar CV / interagir com botões     |
| `@capacitor/browser`       | Abre links externos no Chrome Custom Tabs                    |

## Build de produção (Release / Play Store)

1. Criar keystore:
   ```bash
   cd android
   keytool -genkey -v -keystore release.keystore -alias portfolio -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Adicionar `android/keystore.properties`:
   ```properties
   storeFile=release.keystore
   storePassword=...
   keyAlias=portfolio
   keyPassword=...
   ```
3. Gerar AAB:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
   Output em `android/app/build/outputs/bundle/release/app-release.aab`.

## Identificadores

- **Package name:** `dev.isidromendes.portfolio`
- **App name:** `IM Portfolio`
- **Min SDK:** 23 (Android 6.0)
- **Target SDK:** 34 (Android 14)
