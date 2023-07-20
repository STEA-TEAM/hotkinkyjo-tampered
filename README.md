# 「 hotkinkyjo enhanced script 」 [简体中文](README_zh-CN.md)

[📦 Install](#Install)

[📚 Features](#Features)

[👻 Compatibility](#Compatibility)

[📝 Develop](#Develop)

# Install

You need
to install [Tampermonkey](https://tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) extension in your browser,
then choose a link below to install.

| GhProxy Mirror                                                                                                                  | GitHub Release                                                                                              |
|---------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| [Install](https://ghproxy.com/https://github.com/STEA-TEAM/hotkinkyjo-tampered/releases/latest/download/hotkinkyjo-tampered.user.js) | [Install](https://github.com/STEA-TEAM/hotkinkyjo-tampered/releases/latest/download/hotkinkyjo-tampered.user.js) |

# Features

- [x] Download videos.
- [] Batch download videos.
- [] Batch download images.

# Compatibility

## Script manager

### [Tampermonkey](https://tampermonkey.net/) / [Violentmonkey](https://violentmonkey.github.io/)

Compatible, but Violentmonkey may not be able to run this script in older browsers.

### [Greasemonkey](https://www.greasespot.net/)

Not compatible.

### [AdGuard](https://adguard.com/zh_cn/adguard-windows/overview.html)

Not tested.

# Develop

### Clone and install dependencies

```bash
git clone https://github.com/STEA-TEAM/hotkinkyjo-tampered.git
cd hotkinkyjo-tampered
pnpm install
```

### Dev (with hot reload)

```bash
pnpm run dev
# Create a new script in tampermonkey panel, copy the content of console output or `./dist/main.user.dev.js` into it and save
# Refresh the browser page after the code is hot updated to see the changes
```

### Build

```bash
pnpm run build
# Publish the content of `./dist/main.user.js`
```
