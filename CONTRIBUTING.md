# Guía de Contribución

Para mantener el proyecto organizado, seguimos un flujo de trabajo estricto basado en Issues y la rama develop.

## 🚀 Flujo de Trabajo (Workflow)

Todo el desarrollo se realiza en ramas temporales que parten de develop. No se permiten commits directos a main ni a develop.

### 1. Requisito de Issue

Antes de escribir código, debe existir un Issue abierto que describa la tarea. Si no existe, por favor crea uno antes de empezar.

### 2. Creación de la Rama

Todas las ramas deben crearse a partir de develop y usar el prefijo feature/.

### 3. Desarrollo y Push

Realiza tus cambios y crea los commits con una descripción clara de lo que has hecho.

### 4. Pull Request (PR) y Cierre de Issue

Para integrar tus cambios, abre un Pull Request en GitHub comparando base: develop con tu rama feature/.

> [!IMPORTANT]
> Regla Obligatoria: En la descripción del Pull Request, debes incluir la instrucción de cierre vinculada al issue. Sin esta referencia, el PR no será procesado.

> Ejemplo: Closes #12 o Fixes #45.

## 💻 Ejemplo de Comandos

Si vas a trabajar en el Issue #45, sigue esta secuencia:

```bash
# Sincronizar con el servidor y posicionarse en develop
git checkout develop
git pull origin develop

# Crear rama nueva basada en el issue
git checkout -b feature/issue-nº de la issue-nombre-de-la-tarea

# (Realizar cambios en el código...)

# Confirmar cambios con descripción clara
git add .
git commit -m "Descripción de lo que se ha implementado + #número del issue"

# Subir la rama al repositorio remoto
git push origin feature/issue-nº de la issue-nombre-de-la-tarea
```

## 📋 Reglas del Proyecto

- Ramas: Solo se aceptan ramas con el formato feature/nombre-descriptivo.

- Merge: Una vez aprobado el PR, se realizará el merge hacia la rama develop.
