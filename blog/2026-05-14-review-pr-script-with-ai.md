---
authors: antoniohumanes
title: "Integrar OpenAI en mi CI fue fácil. Conseguir reviews útiles no."
description: "Cómo integré OpenAI en mi CI para revisar PRs del blog y qué aprendí sobre prompts, ruido, automatización y criterio técnico."
image: ./img/robot-reviewing-pr.webp
tags: [development, technical, features, AI]
# slug: custom-post-slug
# draft: true
---

![Imagen de portada del artículo](./img/robot-reviewing-pr.webp)

Mientras escribía los primeros posts del blog me di cuenta de que repetía algunos errores antes de publicar.

No eran errores enormes, pero sí lo bastante molestos como para hacerme perder tiempo revisando PRs, imágenes, estructura y detalles de estilo.

Esto me ralentizaba mucho a la hora de crear, revisar y modificar.

Antes de entrar en la solución, pongo un poco de contexto técnico sobre el blog.

<!-- truncate -->

Para dar más contexto cada post está escrito en archivos `md` que mediante el framework son convertidos a `html`, así que cualquier cambio pasa por el flujo normal de trabajo: commit, push y Pull Request.

El problema aquí es que muchas veces subía un post con algunos errores:

- Añadía el thumbnail pero no la imagen de cabecera.
- Algunas secciones eran demasiado largas.
- Algunas explicaciones técnicas no eran lo suficientemente profundas.
- En algún caso obviaba información que yo sí tenía pero el lector no.
- Alguna falta de ortografía o de puntuación.

Entonces pensé en una solución que pudiera ayudarme a revisar antes de mergear la PR: añadir IA a mi flujo de CI.

## El flujo de CI con IA que he implementado

La implementación es bastante sencilla, pero ahí no está el valor.

El valor está en comprobar si esta automatización ayuda de verdad o si solo añade ruido al flujo de desarrollo.

Estoy utilizando `GitHub Actions` y la `API` de OpenAI.

El flujo en resumidas cuentas consiste en lo siguiente:

1. Detecta qué archivos han cambiado en la Pull Request.
2. Genera un diff reducido para no enviar información innecesaria a la IA.
3. Decide si merece la pena ejecutar la review o si puede saltarla.
4. OpenAI analiza posibles problemas y genera o actualiza un comentario en la PR.

Creo que el flujo se puede entender mejor con un diagrama:

```mermaid
flowchart TD
  A[Se crea o actualiza una Pull Request] --> B[El workflow de CI ejecuta el script]
  B --> C[Obtiene los archivos modificados]
  C --> D[Filtra los archivos relevantes]
  D --> E{¿Hay cambios revisables?}
  E -->|No| F[Genera un comentario indicando que se salta la review]
  E -->|Si| G[Construye un diff reducido]
  G --> H[Envía el diff a OpenAI]
  H --> I[Recibe el análisis de la IA]
  I --> J[Construye el comentario de review]
  F --> K[Publica o actualiza el comentario en la PR]
  J --> K
  K --> L[La PR queda con feedback automático]
```

## Problemas que fui encontrando

Aunque era útil para mi caso, también empezó a generar bastante ruido:

- Sugerencias discutibles.
- Comentarios redundantes.
- Cambios de estilo que no quería.
- Críticas técnicamente correctas pero irrelevantes.

A veces veía problemas donde no los había y otras veces no detectaba partes que sí eran importantes.

Uno de los problemas más curiosos fue el tono.

La IA empezaba a sugerir cambios técnicamente correctos pero que hacían que el texto sonara menos mío.

Eso me obligó a ajustar bastante el prompt.

Quería una revisión que mantuviera mi estilo y eso a día de hoy sigue siendo muy complicado.

## Qué le pedí exactamente a la IA

Una de las partes más importantes fue dejar claro qué quería revisar.

No quería una review genérica del código. Quería una segunda capa de revisión enfocada en cosas concretas:

- Si el post tenía imagen de portada.
- Si el título y la descripción tenían sentido.
- Si había faltas de ortografía.
- Si alguna sección era demasiado larga.
- Si estaba dando por hecho contexto que el lector no tenía.
- Si el tono sonaba demasiado artificial.
- Si la implementación técnica tenía sentido (en el caso de algún post más técnico).

Esto cambió bastante el resultado.

La IA trabaja mejor cuando le damos contexto, límites claros y ejemplos concretos de lo que esperamos.

Cuando el prompt era demasiado abierto, la IA opinaba demasiado.
Cuando lo definí mejor, empezó a ser más útil.

## Conclusiones

Tengo algunas conclusiones claras:

- Meter IA en un workflow no significa automáticamente mejorar el workflow.
- No todo necesita IA: Quizás algunas comprobaciones deban ser reglas simples y no una llamada a la IA.
- Hay que vigilar si la automatización está generando valor o solo ruido.

Por ejemplo, validar que un post tiene imagen de portada o que el frontmatter está completo probablemente no necesita OpenAI.

Eso puede resolverse con un script.

En cambio, revisar si una explicación se entiende, si el tono suena artificial o si estoy dando por hecho contexto que el lector no tiene, encaja mejor con una revisión asistida por IA.

Lo difícil es tener criterio suficiente para decidir:

- Qué automatizar.
- Qué ignorar.
- Y qué decisiones deberían seguir siendo humanas.

Al final, automatizar una revisión no significa delegar la responsabilidad.

El comentario lo escribe la IA, pero la decisión sigue siendo nuestra.
