# Source images

Keep original, high-quality images in this directory.

The automated optimizer currently uses only the blog sources:

- `blog/` -> `blog/img/*.webp`

The images in `home/` are kept as stable originals for manual replacement when
needed. They are not part of the automated optimization workflow because they
change rarely.

Use JPG or PNG originals when possible. Avoid using already optimized WebP files
as source images because repeated lossy compression can make images look blurry.

After updating blog source images, regenerate the site images with:

```bash
npm run optimize-images -- --overwrite
```

Blog images are generated as:

| Source | Desktop output | Mobile output | Usage |
| --- | --- | --- | --- |
| `static/img/source-images/blog/*.{jpg,png}` | `blog/img/*.webp` at `900w` | `blog/img/*-mobile.webp` at `600w` | Post covers and latest-post cards |

## Manual stable images

Use these one-off commands for images that change rarely.

Home:

| Image | Desktop | Mobile | Usage |
| --- | --- | --- | --- |
| Hero light/dark | `720w` | `480w` | `22rem` mobile, `24rem` desktop |
| Feature icons | `256w` | `128w` | `4rem` rendered icon, supports high-density screens |

```bash
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/code-and-pasta-light.png').resize({width:720,withoutEnlargement:true}).webp({quality:72,effort:6}).toFile('static/img/home/code-and-pasta-light.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/code-and-pasta-light.png').resize({width:480,withoutEnlargement:true}).webp({quality:72,effort:6}).toFile('static/img/home/code-and-pasta-light-mobile.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/code-and-pasta-dark.png').resize({width:720,withoutEnlargement:true}).webp({quality:72,effort:6}).toFile('static/img/home/code-and-pasta-dark.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/code-and-pasta-dark.png').resize({width:480,withoutEnlargement:true}).webp({quality:72,effort:6}).toFile('static/img/home/code-and-pasta-dark-mobile.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/intro.png').resize({width:256,withoutEnlargement:true}).webp({quality:70,effort:6}).toFile('static/img/home/intro.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/intro.png').resize({width:128,withoutEnlargement:true}).webp({quality:50,effort:6}).toFile('static/img/home/intro-mobile.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/workSuchAs.png').resize({width:256,withoutEnlargement:true}).webp({quality:70,effort:6}).toFile('static/img/home/workSuchAs.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/workSuchAs.png').resize({width:128,withoutEnlargement:true}).webp({quality:50,effort:6}).toFile('static/img/home/workSuchAs-mobile.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/format.png').resize({width:256,withoutEnlargement:true}).webp({quality:70,effort:6}).toFile('static/img/home/format.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/source-images/home/format.png').resize({width:128,withoutEnlargement:true}).webp({quality:50,effort:6}).toFile('static/img/home/format-mobile.webp')"
```

About me:

| Image | Desktop | Mobile | Usage |
| --- | --- | --- | --- |
| Profile image | `900w` | `480w` | About hero image |
| Experience images | `640w` | `480w` | Experience cards |

```bash
node -e "const sharp=require('sharp'); sharp('static/img/about-me/profile-image.webp').resize({width:480,withoutEnlargement:true}).webp({quality:90}).toFile('static/img/about-me/profile-image-mobile.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/about-me/openbank-work-experience.jpg').resize({width:640,withoutEnlargement:true}).webp({quality:90}).toFile('static/img/about-me/openbank-work-experience.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/about-me/openbank-work-experience.jpg').resize({width:480,withoutEnlargement:true}).webp({quality:90}).toFile('static/img/about-me/openbank-work-experience-mobile.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/about-me/inditex-work-experience.jpg').resize({width:640,withoutEnlargement:true}).webp({quality:90}).toFile('static/img/about-me/inditex-work-experience.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/about-me/inditex-work-experience.jpg').resize({width:480,withoutEnlargement:true}).webp({quality:90}).toFile('static/img/about-me/inditex-work-experience-mobile.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/about-me/randstad-work-experience.jpg').resize({width:640,withoutEnlargement:true}).webp({quality:90}).toFile('static/img/about-me/randstad-work-experience.webp')"
node -e "const sharp=require('sharp'); sharp('static/img/about-me/randstad-work-experience.jpg').resize({width:480,withoutEnlargement:true}).webp({quality:90}).toFile('static/img/about-me/randstad-work-experience-mobile.webp')"
```
