# Guía de Contribución

¡Gracias por querer colaborar! Para mantener el proyecto organizado, seguimos un flujo de trabajo estricto basado en Issues y la rama develop.

## 🚀 Flujo de Trabajo (Workflow)

Todo el desarrollo se realiza en ramas temporales que parten de develop. No se permiten commits directos a main ni a develop.

### 1. Requisito de Issue
Antes de escribir código, debe existir un Issue abierto que describa la tarea. Si no existe, por favor crea uno antes de empezar.

### 2. Creación de la Rama
Todas las ramas deben crearse a partir de develop y usar el prefijo feature/.

### 3. Desarrollo y Push
Realiza tus cambios y crea los commits con una descripción clara de lo que has hecho:

### 4. Pull Request (PR) y Cierre de Issue
Para integrar tus cambios, abre un Pull Request en GitHub comparando base: develop con tu rama feature/.

> [!IMPORTANT]
> **Regla Obligatoria:** En la descripción del Pull Request, debes incluir la instrucción de cierre vinculada al issue.
>
> Ejemplo: `Closes #12` o `Fixes #45`.
>
> Sin esta referencia, el PR no será procesado, ya que es necesaria para el cierre automático del issue.

## 📋 Reglas del Proyecto
*   **Ramas:** Solo se aceptan ramas con el formato feature/nombre-descriptivo.
*   **Merge:** Una vez aprobado el PR, se realizará el merge hacia la rama develop.
