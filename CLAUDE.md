# CLAUDE.md

## Правила работы с проектом

### Контент
- **content.js — единственный источник правды.** Весь текст, даты, ссылки — только там. Не хардкодить в HTML, JS или generate-cv.js.
- **Русский и английский синхронизированы.** При любом изменении в `CONTENT.ru` — обязательно обновить `CONTENT.en`.
- **Даты и числа вычисляются, а не хардкодятся.** Возраст, стаж — из `meta.birth`, `meta.start_it`, `meta.start_devops`. Не писать "13 лет" в тексте.
- **`meta.last_updated` обновлять при правке контента.** Тест напомнит если дата старше 3 месяцев.

### Код
- **Одна фича — один коммит.** Не смешивать несвязанные изменения.
- **Перед коммитом — проверка пользователем.** Не коммитить без одобрения.
- **Рефакторинг перед коммитом.** Проверить дифф, убрать мусор, мёртвый код, лишние комментарии.
- **Тесты на новые фичи.** Если добавляешь секцию, поле или файл — добавь проверку в test.js.
- **`_lang` — глобальное состояние языка.** Не прокидывать lang параметром через всю цепочку, читать `_lang`.
- **escapeHTML() для пользовательского контента** в HTML-атрибутах и опасных контекстах.

### Стиль
- **Mobile-first.** Базовые стили — мобильные, расширяем через `min-width`.
- **CSS-переменные из base.css.** Не хардкодить цвета и шрифты.
- **Нет `!important`** кроме `prefers-reduced-motion`.

### Изображения
- **Только WebP** в assets/. Формат: `cwebp -q 82 -resize 800 0 input -o output.webp`.
- **.gitignore блокирует jpg/png/PNG** в assets/ — сырые файлы не попадут в репу.
- **Lazy loading** на всех изображениях (`loading="lazy"`).

### PDF
- **`node generate-cv.js`** — русский PDF. **`node generate-cv.js --en`** — английский.
- **Pre-commit hook** автоматически перегенерирует оба PDF при изменении content.js или generate-cv.js.
- **Заголовки секций в PDF** берутся из content.js, не хардкодятся.

### Тесты
- **166 тестов** запускаются автоматически при каждом коммите.
- **Коммит блокируется** при провале тестов.
- **`node test.js`** — запуск вручную. **`SKIP_PDF_GEN=1 node test.js`** — без перегенерации PDF.

### Git
- **Pre-commit hook** (`.githooks/pre-commit`): тесты + PDF + sitemap lastmod.
- **`core.hooksPath = .githooks/`** — хуки в репе, версионируются.
- **Не пушить без тестов.**

### Структура
```
index.html              — личная страница
cv/index.html           — CV (URL: /cv/)
src/js/content.js       — весь контент (ru + en)
src/js/utils.js         — calcAge, calcYears (browser + Node)
src/js/shared.js        — рендер, анимации, общая логика
src/js/page-personal.js — секции личной страницы
src/js/page-cv.js       — секции CV
src/js/icons.js         — SVG-иконки
src/styles/base.css     — токены, ресет, анимации
src/styles/layout.css   — сетки, responsive
src/styles/components.css — компоненты
generate-cv.js          — генерация PDF (Node + Chrome headless)
test.js                 — 166 тестов
assets/                 — изображения (WebP only)
```
