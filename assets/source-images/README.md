# Source images

Keep original, high-quality images in this directory.

These files are the source assets used to regenerate optimized images served by
the site:

- `home/` -> `static/img/home/*.webp`
- `blog/` -> `blog/img/*.webp`

Use JPG or PNG originals when possible. Avoid using already optimized WebP files
as source images because repeated lossy compression can make images look blurry.

After updating source images, regenerate the site images with:

```bash
npm run optimize-images -- --overwrite
```
