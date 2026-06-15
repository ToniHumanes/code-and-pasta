---
authors: antoniohumanes
title: "¿Sabes de dónde sale tu salario?"
description: "Una reflexión sobre por qué entender el negocio cambia la calidad del software que construimos y el valor que aportamos."
image: ./img/money.webp
tags: [product, business, development, features]
---

![Imagen de dinero en dólares sobre una mesa](@site/blog/img/money.webp)

Cuando empecé en el desarrollo de software, me obsesioné con aprender lo máximo posible a nivel técnico. Con el tiempo entendí que eso importa, pero también estaba ignorando algo igual de clave: el negocio.

Empecé a darme cuenta de que el negocio es una parte esencial para cualquier desarrollador y, en realidad, para cualquiera que trabaje en tecnología.

Si no entiendes el negocio, es probable que te estés perdiendo algo muy importante a la hora de escribir código y desarrollar productos.

<!-- truncate -->

## Cómo empecé a interesarme por el negocio

He trabajado en muchos proyectos, pero al inicio de mi carrera profesional, si te soy sincero, no prestaba mucha atención al negocio, a los usuarios ni a cómo se monetizaba.

Hasta que mi manager me abrió los ojos.

Nos preguntó lo siguiente: ¿Sabéis cómo esto está dando dinero y por qué todos podemos estar aquí?

Contesté lo que creía. No estaba muy desencaminado, pero me di cuenta de que me faltaban muchas piezas.

Por aquel entonces solo me preocupaban los temas técnicos.

La pregunta surgió porque el proyecto estaba sufriendo algunos cambios. No terminaba de encajar y los stakeholders no estaban muy contentos.

Después de escuchar nuestras respuestas, más o menos acertadas, nos explicó que debíamos entender qué se quería construir y cómo se quería hacer. También debíamos ser parte del producto, interesarnos por las necesidades de los usuarios y saber qué financiaba nuestro trabajo.

En aquella reunión se me abrió un mundo. Pasé de preocuparme únicamente por si la arquitectura escalaba a preguntarme por qué hacíamos lo que hacíamos, para quién, con qué fin, cómo generaba dinero y cómo aportaba valor a la empresa.

También llegué a la conclusión de que todos los que trabajamos en tecnología deberíamos tener esta mentalidad: developers, QAs, DevOps, etc.

Al final, es la mentalidad que tienen los POs, PMs o cualquier puesto que implique más negocio.

## Algunas experiencias que cambiaron mi visión

Después de aquella conversación con mi manager empecé a hacerme una pregunta en cada proyecto:

> ¿Quién paga realmente por esto?

A continuación os cuento cómo se monetizan algunos productos, experiencias y aprendizajes.

### **Banca**:

El más fácil a nivel de monetización, es simple.

El banco ofrece herramientas para gestionar tu dinero, transferirlo, ingresarlo, etc. A cambio te ofrecen servicios financieros de los cuales se llevan un porcentaje: préstamos, hipotecas, compra de acciones.

La confianza es uno de los pilares fundamentales de la banca.

Os cuento una experiencia personal.

Una persona mayor de mi entorno me contó que en su banco no le aparecía una cuenta que, básicamente era la principal.

Me lo contaba con mucha preocupación.

Yo como tengo experiencia en este sector sabía que no había pasado nada, sería un error puntual o algún documento requerido.

Exactamente fue un error en el front, faltaba un documento por firmar y no se mostraba la cuenta.

Eso es una mala experiencia de usuario.
Y también un problema de negocio.

Porque ya de primeras la sensación de ese cliente es negativa, aunque luego se lo solucionaron, pero el primer susto se lo llevó.

Hay que ponerse en la piel de usuarios que muchas veces no tienen un perfil técnico ni la misma familiaridad con la tecnología que nosotros.

Por cosas como estas un cliente puede decidir cambiar de banco.

### **Plataforma de búsqueda de empleo**:

La monetización de una plataforma de búsqueda de empleo tiene una parte, quizás no visible a simple vista.

Para el usuario es gratis y le ofrece muchas herramientas de búsqueda de empleo, creación de CV, etc.

Donde se monetiza es con las empresas que pagan para publicar ofertas, a las empresas les entregan candidatos ya filtrados y con el perfil más adecuado para la vacante y listos para trabajar.

El objetivo del usuario es encontrar empleo. Y quien busca trabajo suele hacerlo con cierta prisa, incertidumbre o incluso nervios.

Todo eso juega en nuestra contra porque un usuario con estas características es muy probable que no esté dispuesto a rellenar 20 campos de un formulario.

Por eso, detalles como la experiencia de los formularios, el proceso de alta o incluso ciertas mecánicas de gamificación podían marcar una diferencia enorme.

Hay otro tipo de usuario también, la empresa.

La empresa tiene necesidades completamente distintas. Quiere publicar la oferta rápidamente, que la plataforma le ayude a redactar la oferta y encontrar a alguien.

En este proyecto aprendí que el contexto es importante y un usuario que busca empleo no tiene la misma paciencia que un usuario que está comprando en Amazon, son cosas muy distintas.

Muy importante también: En una misma aplicación podemos tener varios tipos de usuarios con necesidades completamente distintas.

### **Plataforma de Gobierno del dato**:

Esta es la más difícil a la hora de identificar cómo genera valor porque no hay un intercambio de dinero directo, ayuda a negocio a tomar decisiones basadas en datos, mejorar procesos y hacer accesible la información.

Los usuarios eran perfiles técnicos y comerciales.

En esta experiencia aprendí algo que al principio no veía.

Hay que perder el miedo a hablar con ellos, hay que guiarles porque van a querer todo para ayer y hay que priorizar lo importante, además de escucharles, porque sí, ellos tienen más contexto que nosotros.

Recuerdo cuando empezamos el proyecto y teníamos demasiados cambios de prioridades.

Nos frenaba, complicaba la arquitectura y ralentizaba el desarrollo.

Pero lo peor era otra cosa: no estábamos aportando el valor que pretendíamos aportar.

Esto no fue culpa de nadie, fue simplemente que intentamos abarcar más de lo que pudimos y con un usuario exigente eso puede ser peligroso.

Para entender esto necesitamos entender el problema.

Necesitábamos entender qué información era realmente útil para las personas que iban a utilizar la plataforma.

Los stakeholders querían unificar los datos de la compañía.

El problema era que ni siquiera estaba claro qué datos podían unificarse ni cómo debía hacerse.

Rápidamente entramos en una estructura compleja de términos, atributos, relaciones, información extra que podían estar relacionados entre sí.

No digo que el nivel de complejidad no fuera necesario, pero se redujo mucho cuando la comunicación con los stakeholders fue más fluida.

:::note[Lección aprendida:]

1.  **Entiende el negocio** antes de tocar una línea de código.
2.  **Habla con tus usuarios**, entiende sus necesidades.
3.  **Comparte esta mentalidad** con el resto del equipo.

:::

## Conclusión

Durante años pensé que mi trabajo consistía en escribir buen código.

Con el tiempo entendí que mi trabajo consiste en ayudar a resolver problemas que generan valor.

Entender el negocio es entender por qué haces lo que haces.

Porque, al final, si no entiendes el negocio, es muy difícil entender de dónde sale tu salario.
