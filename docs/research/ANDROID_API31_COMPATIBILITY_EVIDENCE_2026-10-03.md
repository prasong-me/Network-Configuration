# Android API 31+ Compatibility Evidence — 2026-10-03

Node: ANDROID API 31+ COMPATIBILITY EVIDENCE
Project: prasong-me/Network-Configuration
Related implementation repository: prasong-me/-Configuration-
Branch: feat/android-app-v1

## Scope

This record reconciles Android API 31+ compatibility evidence for the existing Android wrapper without changing the Project Roadmap or claiming runtime verification.

## Source/build facts already verified

- `apps/android/app/build.gradle.kts`: minSdk 31, compileSdk 35, targetSdk 35, JVM toolchain 17.
- `apps/android/app/src/main/AndroidManifest.xml`: INTERNET and ACCESS_NETWORK_STATE permissions; exported launcher Activity.
- `MainActivity.kt`: WebView loads `file:///android_asset/web/index.html`.
- Android App CI Run 21 / run ID `37057619693`: SUCCESS.
- Android App build job `111006096714`: SUCCESS.
- Artifact `configuration-android-debug`: produced and inspected.
- Artifact SHA-256: `4735bd3591c1a0d27794555d105556fe055777a509b5ec177a78cb1d76eaabf`.

These establish source/build/package evidence only.

## Official Android evidence

### ANDROID-API31-001 — Android 12 / API 31 behavior baseline

Source:
https://developer.android.com/about/versions/12/behavior-changes-12

Verification date: 2026-10-03
Result: VERIFIED-SOURCE

The official Android 12 documentation identifies API level 31 as the Android 12 target behavior baseline and documents behavior changes including WebView SameSite cookie behavior and safer exported-component requirements.

Project mapping:
- The manifest explicitly declares `android:exported="true"` on the launcher Activity.
- The project does not rely on custom notifications, PendingIntents, Bluetooth, foreground services, or other Android 12 behavior areas merely by virtue of the current wrapper.
- WebView behavior remains a runtime verification item.

### ANDROID-API31-002 — WebView availability and API surface

Source:
https://developer.android.com/reference/android/webkit/WebView

Verification date: 2026-10-03
Result: VERIFIED-SOURCE

The official API reference documents WebView as an Android framework component and exposes `loadUrl`, navigation, WebView client configuration, and renderer lifecycle APIs.

Project mapping:
- The existing MainActivity creates a WebView and calls `loadUrl("file:///android_asset/web/index.html")`.
- The implementation uses WebViewClient and WebChromeClient.
- The source is therefore compatible with the documented WebView API family at the source/API-contract level.

Runtime loading of the packaged page is NOT proven by this source evidence.

### ANDROID-API31-003 — WebSettings API surface

Source:
https://developer.android.com/reference/android/webkit/WebSettings

Verification date: 2026-10-03
Result: VERIFIED-SOURCE

The official API reference documents the settings used by the wrapper, including JavaScript, DOM storage, file/content access, cache mode, and zoom controls.

Project mapping:
- `javaScriptEnabled`
- `domStorageEnabled`
- `allowFileAccess`
- `allowContentAccess`
- `builtInZoomControls`
- `displayZoomControls`
- `cacheMode = LOAD_DEFAULT`

These settings are documented API concepts. Their combined behavior with the actual packaged web application still requires runtime verification.

### ANDROID-API31-004 — Back navigation API boundary

Source:
https://developer.android.com/reference/android/window/OnBackInvokedDispatcher

Verification date: 2026-10-03
Result: VERIFIED-SOURCE

The official reference states that `OnBackInvokedDispatcher` and its registration methods were added in API level 33.

Project mapping:
- MainActivity references the API 33 back-dispatch classes only inside `if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU)`.
- For API levels below 33, the existing code uses the deprecated `onBackPressed()` path guarded by `Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU`.

This establishes a source-level API guard for the API 33-only back-dispatch path. It does NOT prove execution on an API 31 device/emulator.

## Compatibility disposition

| Evidence class | Result |
|---|---|
| Android platform/source baseline | VERIFIED-SOURCE |
| Android 12/API 31 documented behavior baseline | VERIFIED-SOURCE |
| minSdk/targetSdk/build configuration | VERIFIED-SOURCE / BUILD |
| WebView API usage | VERIFIED-SOURCE |
| WebSettings API usage | VERIFIED-SOURCE |
| API 33 back-dispatch guarded for API <33 | VERIFIED-SOURCE |
| APK build/package | VERIFIED-BUILD |
| API 31 emulator/device launch | OPEN / UNVERIFIED |
| WebView page load on API 31 | OPEN / UNVERIFIED |
| Web app interaction/export on API 31 | OPEN / UNVERIFIED |
| Permission/runtime behavior on API 31 | OPEN / UNVERIFIED |
| OS acceptance/runtime interoperability | OPEN / UNVERIFIED |

## Completion gate

This record closes the versioned SOURCE/COMPATIBILITY evidence that can be established without executing Android 12/API 31.

It does NOT close the Android target as a whole.

Required remaining evidence:
1. API 31 emulator or physical-device launch.
2. WebView asset load.
3. Core interaction.
4. Export path.
5. Permission/runtime observation.
6. Result read-back and artifact/log evidence.

Status: API 31+ runtime gate remains OPEN / UNVERIFIED.
