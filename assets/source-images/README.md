# Source images

Keep original, high-quality images in this directory.

The automated optimizer currently uses only the blog sources:

- `assets/source-images/blog/` -> `blog/img/*.webp`

The images in `home/` and `about-me/` are kept as stable originals for manual
replacement when needed. They are not part of the automated optimization workflow
because they change rarely.

Use JPG or PNG originals when possible. Avoid using already optimized WebP files
as source images because repeated lossy compression can make images look blurry.

After updating blog source images, regenerate the site images with:

```bash
npm run optimize-images -- --overwrite
```

Blog images are generated as:

| Source                                  | Desktop output              | Mobile output                      | Usage                             |
| --------------------------------------- | --------------------------- | ---------------------------------- | --------------------------------- |
| `assets/source-images/blog/*.{jpg,png}` | `blog/img/*.webp` at `900w` | `blog/img/*-mobile.webp` at `600w` | Post covers and latest-post cards |

## Manual stable images

Use these one-off commands for images that change rarely.

The source images live in:

```txt
assets/source-images/
```

The optimized public images are generated into:

```txt
static/img/
```

## Home

| Image           | Desktop | Mobile | Usage                           |
| --------------- | ------- | ------ | ------------------------------- |
| Hero light/dark | `720w`  | `416w` | `22rem` mobile, `24rem` desktop |
| Feature icons   | `128w`  | `64w`  | `4rem` rendered icon            |

```bash
# Hero light
node -e "const sharp=require('sharp'); sharp('assets/source-images/home/code-and-pasta-light.png').resize({width:480,height:480,fit:'cover',withoutEnlargement:true}).webp({quality:74,effort:6}).toFile('static/img/home/code-and-pasta-light.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/home/code-and-pasta-light.png').resize({width:416,height:416,fit:'cover',withoutEnlargement:true}).webp({quality:70,effort:6}).toFile('static/img/home/code-and-pasta-light-mobile.webp')"

# Hero dark

node -e "const sharp=require('sharp'); sharp('assets/source-images/home/code-and-pasta-dark.png').resize({width:480,height:480,fit:'cover',withoutEnlargement:true}).webp({quality:74,effort:6}).toFile('static/img/home/code-and-pasta-dark.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/home/code-and-pasta-dark.png').resize({width:416,height:416,fit:'cover',withoutEnlargement:true}).webp({quality:70,effort:6}).toFile('static/img/home/code-and-pasta-dark-mobile.webp')"

# Feature icons
node -e "const sharp=require('sharp'); sharp('assets/source-images/home/intro.png').resize({width:128,height:128,fit:'cover',withoutEnlargement:true}).webp({quality:68,effort:6}).toFile('static/img/home/intro.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/home/intro.png').resize({width:64,height:64,fit:'cover',withoutEnlargement:true}).webp({quality:66,effort:6}).toFile('static/img/home/intro-mobile.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/home/workSuchAs.png').resize({width:128,height:128,fit:'cover',withoutEnlargement:true}).webp({quality:68,effort:6}).toFile('static/img/home/workSuchAs.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/home/workSuchAs.png').resize({width:64,height:64,fit:'cover',withoutEnlargement:true}).webp({quality:66,effort:6}).toFile('static/img/home/workSuchAs-mobile.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/home/format.png').resize({width:128,height:128,fit:'cover',withoutEnlargement:true}).webp({quality:68,effort:6}).toFile('static/img/home/format.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/home/format.png').resize({width:64,height:64,fit:'cover',withoutEnlargement:true}).webp({quality:66,effort:6}).toFile('static/img/home/format-mobile.webp')"
```

## About me

| Image             | Desktop | Mobile | Usage            |
| ----------------- | ------- | ------ | ---------------- |
| Profile image     | `900w`  | `480w` | About hero image |
| Experience images | `640w`  | `480w` | Experience cards |

```bash
# Profile image
node -e "const sharp=require('sharp'); sharp('assets/source-images/about-me/profile-image.jpg').resize({width:900,withoutEnlargement:true}).webp({quality:82,effort:6}).toFile('static/img/about-me/profile-image.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/about-me/profile-image.jpg').resize({width:480,withoutEnlargement:true}).webp({quality:80,effort:6}).toFile('static/img/about-me/profile-image-mobile.webp')"

# Openbank experience image
node -e "const sharp=require('sharp'); sharp('assets/source-images/about-me/openbank-work-experience.jpg').resize({width:640,withoutEnlargement:true}).webp({quality:78,effort:6}).toFile('static/img/about-me/openbank-work-experience.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/about-me/openbank-work-experience.jpg').resize({width:480,withoutEnlargement:true}).webp({quality:76,effort:6}).toFile('static/img/about-me/openbank-work-experience-mobile.webp')"

# Inditex experience image
node -e "const sharp=require('sharp'); sharp('assets/source-images/about-me/inditex-work-experience.jpg').resize({width:640,withoutEnlargement:true}).webp({quality:78,effort:6}).toFile('static/img/about-me/inditex-work-experience.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/about-me/inditex-work-experience.jpg').resize({width:480,withoutEnlargement:true}).webp({quality:76,effort:6}).toFile('static/img/about-me/inditex-work-experience-mobile.webp')"

# Randstad experience image
node -e "const sharp=require('sharp'); sharp('assets/source-images/about-me/randstad-work-experience.jpg').resize({width:640,withoutEnlargement:true}).webp({quality:78,effort:6}).toFile('static/img/about-me/randstad-work-experience.webp')"

node -e "const sharp=require('sharp'); sharp('assets/source-images/about-me/randstad-work-experience.jpg').resize({width:480,withoutEnlargement:true}).webp({quality:76,effort:6}).toFile('static/img/about-me/randstad-work-experience-mobile.webp')"
```

## Notes

- Keep the current naming convention:
  - desktop: `image.webp`
  - mobile: `image-mobile.webp`
- Source images live in `assets/source-images/`.
- Optimized public images are generated into `static/img/`.
- The home hero uses `720w` for desktop and `416w` for mobile because PageSpeed reports the rendered size around `416x416`.
- Feature icons are generated at `128w` and `64w` because they are rendered at `4rem`.
- Avoid `quality: 90` unless the image is visually critical.
- Avoid using already optimized WebP files as source images.
- Use `fit: cover` only for images rendered in fixed square containers.
