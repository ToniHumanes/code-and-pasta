---
authors: antoniohumanes
title: "No todas las discusiones de una Pull Request merecen ser ganadas"
description: "Un debate en una Pull Request sobre legibilidad, duplicación y riesgo que me recordó que no todas las discusiones técnicas merecen la misma importancia."
image: ./img/pr-decision.webp
tags: [development, pull-request, teamwork]
draft: true
# slug: custom-post-slug
---

![Imagen de una puerta azul que da acceso a una sala](@site/blog/img/pr-decision.webp)

Recientemente me encontré con un desacuerdo trabajando en equipo.

Había abordado un fix y mi enfoque me parecía correcto.

Hasta que alguien del equipo puso un comentario que me hizo replantearme cómo había enfocado el problema.

Os doy un poco de contexto para entenderlo mejor.

<!-- truncate -->

## Contexto

El fix en la PR se basaba en que en la aplicación existía un componente `ModalTitle`.

Este componente se encargaba de pintar el título mediante ciertos datos.

Era un componente presentacional sencillo.

Desde QA apareció un bug donde se indicaba lo siguiente:

El título debe mostrarse en `desktop` pero no en `tablet` ni `mobile` en todas las pantallas.

En una determinada pantalla esa condición no se estaba cumpliendo.

Decidí entrar en el código para encontrar el problema.

para mi sorpresa la condición se estaba haciendo por fuera del componente.

Algo así:

```tsx
isDesktop && <ModalTitle />;
```

Esto pasaba en varios flujos.

Entonces, me pareció buena idea encapsular el condicional dentro del componente.
En principio era una regla de presentación común para todos los flujos.

Mi solución fue la siguiente:

1. Eliminé la condición `isDesktop` de todos los flujos.
2. Encapsulé la condición dentro del componente:

```tsx
const ModalTitle = () => {
  if (!isDesktop) return <></>;

  // aquí había más lógica, pero para el ejemplo así nos vale.
  return <h1>...</h1>;
};
```

Presenté la solución al equipo y de repente apareció un comentario:

> Yo dejaría esa condición fuera del componente.
> Me parece más fácil de leer porque desde el padre se ve directamente cuándo debe mostrarse el título.

## Por qué mi solución tenía sentido

Ahora quiero contaros por qué mi solución tenía sentido para mí y qué puntos defendí.

Con la solución de encapsular la condición dentro del componente quería conseguir lo siguiente:

- Evitaba repetir la condición.
- Reducía la posibilidad de olvidarla en nuevos flujos.
- Precisamente el bug había aparecido por un olvido parecido.
- Centralizaba la regla de visibilidad en un único sitio.

## Por qué la propuesta del reviewer también tenía sentido

Pero por otro lado el comentario del reviewer tenía puntos a favor, se ganaban cosas importantes, como:

- La condición queda visible en el punto donde se usa (se gana legibilidad).
- No tienes un componente que silenciosamente devuelve vacío.
- Encaja mejor con la convención/criterio del equipo.
- La lectura del flujo es más explícita.

## La heurística que intento aplicar en las reviews

En ese punto tenía dos soluciones razonables.

En lugar de seguir discutiendo cuál prefería, intenté medir qué impacto real tendría equivocarnos.

Para eso me hice varias preguntas.

> ¿Qué ocurre si mantenemos la solución del reviewer y alguien se olvida?

Realmente poco, si alguien se olvida de añadir el condicional en un flujo el título aparecerá en `mobile`.

Es un título que no aporta demasiado, pero la aplicación no rompe, el usuario podrá seguir entendiendo el flujo.

> ¿Es grave?

No.

> ¿Es difícil corregirlo?

No, es tan sencillo como añadir un condicional.

> ¿Podemos cambiar de estrategia más adelante?

Sí, podemos pensar una mejor solución si esto se convierte en un problema.

> ¿Qué estamos ganando siguiendo la propuesta del reviewer?

- Legibilidad, un punto muy importante.
- La condición queda visible desde el primer momento.
- Seguir la convención del equipo.

Seguir discutiendo probablemente costaba más que equivocarnos.

Aquí intento aplicar una regla sencilla:

cuanto mayor sea el coste de equivocarse y de revertir una decisión, más merece la pena defenderla.

## No todas las decisiones técnicas pesan lo mismo

Una code review mezcla cosas muy distintas:

- naming
- estilo
- legibilidad
- duplicación
- performance
- arquitectura
- seguridad
- modelo de datos

El problema aparece cuando tratamos todas esas decisiones con la misma importancia.

Una variable mal nombrada puede merecer un comentario. Una abstracción mejorable puede merecer una conversación. Pero ninguna de las dos tiene normalmente el mismo impacto que introducir una vulnerabilidad, romper un contrato utilizado por otros sistemas o tomar una decisión arquitectónica difícil de revertir.

Y tampoco tiene sentido alargar una discusión simplemente porque una solución no coincide exactamente con cómo la habría escrito yo.

Esta heurística me ayuda precisamente a distinguir entre una preferencia personal y una decisión que puede tener consecuencias reales para el proyecto.

En mi caso, dejar el condicional fuera podía provocar que algún día apareciese un título en `mobile`. No era la solución que yo habría elegido inicialmente, pero tampoco era un riesgo que justificase seguir discutiendo la implementación.

## Qué hice finalmente

Volviendo al caso.

- Moví el condicional fuera.
- Acepté la convención del equipo.
- Añadí un test para cubrir ese comportamiento y reducir la posibilidad de que volviera a ocurrir.

Y la PR siguió adelante.

Todo esto fue posible gracias a seguir un modelo mental simple:

Si una decisión es **cara** y **difícil de revertir**, **defiéndela** con fuerza.

Si es **barata** y **reversible**, **cede** rápido.
