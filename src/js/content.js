// ============================================================
// Контент сайта — единый файл
// ============================================================
// Источник правды: draft_v2.md
// Для правки текста — редактируйте ТОЛЬКО этот файл.
// Не нужно трогать HTML или другие JS-файлы.
//
// Обе страницы (index.html, cv/index.html) загружают этот файл.
// Личная использует: meta, nav, hero, personal.*, contacts, footer
// CV использует:     meta, nav, hero, cv.*, contacts, footer
// ============================================================

const CONTENT = {
  ru: {

    // ── Мета ──
    meta: {
      title_personal: "Соловьев Максим — DevOps",
      title_cv: "Соловьев Максим — резюме DevOps-инженера",
      handle: "artfaal",
      host: "artfaal.ru",
      location: "Russia, Moscow",
      shell: "zsh",
      birth: "1989-07-24",
      // Даты для живых счётчиков опыта
      start_it: "2013-03-01",
      start_devops: "2019-12-01",
      // Для JSON-LD (личная страница)
      knowsAbout: ["DevOps", "CI/CD", "Infrastructure", "Monitoring", "LLM tooling", "MCP", "AI agents"],
      // Дата последнего обновления контента (тест напомнит обновить через 3 мес)
      last_updated: "2026-07-27",
    },

    // ── Навигация ──
    // --page= ссылки между страницами, --lang= переключатель языка
    nav: {
      personal: "жизнь",
      // «работа», а не «резюме» — намеренно: пара «работа | жизнь» (work-life
      // balance) поставлена специально. Слово «резюме» страница говорит в
      // заголовке вкладки и в секции «Резюме и контакты», таб для этого не нужен.
      cv: "работа",
    },

    // ── Hero (общий для обеих страниц) ──
    hero: {
      name: "Соловьев Максим",
      role: "DevOps-инженер",
      tagline: "Навожу порядок в сложных системах и автоматизирую рутину так, чтобы у людей оставались силы на жизнь.",
      sub: "Сейчас строю LLM-инструменты — те, что помогают делу, а не плодят новый зоопарк.",
      cta_primary: { label: "написать", href: "https://t.me/artfaal" },
      cta_secondary: { label: "github", href: "https://github.com/artfaal" },
      // Строки для терминальной анимации набора
      prompt_lines: { cv: ["whoami", "cat ~/cv.md"], personal: ["whoami", "cat ~/human.md"] },
    },

    // ── Контакты (общие) ──
    // ── Блог / заметки ──
    blog: {
      head: "// blog",
      title: "Блог",
      sub: "Живые заметки о технике, жизни и том, что реально зацепило. Дамп сознания.",
      links: [
        { label: "Telegram-канал", handle: "@artfaal_log", href: "https://t.me/artfaal_log", icon: "tg" },
        { label: "Лонгриды", handle: "log.artfaal.ru", href: "https://log.artfaal.ru/", icon: "blog" },
        { label: "X (Twitter)", handle: "@artfaal", href: "https://x.com/artfaal", icon: "x" },
      ],
    },

    contacts: {
      head: "// contact",
      title: "Связаться",
      sub: "Лучше всего — Telegram. Остальное тоже работает.",
      links: [
        { label: "Telegram",  handle: "@artfaal",         href: "https://t.me/artfaal",                       icon: "tg" },
        { label: "Блог",      handle: "@artfaal_log",     href: "https://t.me/artfaal_log",                   icon: "blog" },
        { label: "Email",     handle: "sys.dll@gmail.com", href: "mailto:sys.dll@gmail.com",                  icon: "mail" },
        { label: "GitHub",    handle: "artfaal",           href: "https://github.com/artfaal",                icon: "gh" },
        { label: "LinkedIn",  handle: "maksim-solovev",    href: "https://www.linkedin.com/in/maksim-solovev/", icon: "in" },
      ],
    },

    // ── Футер ──
    footer: {
      built: "собрано вручную",
      sig: "// end of file",
    },

    // ================================================================
    // ЛИЧНАЯ СТРАНИЦА (index.html)
    // ================================================================
    personal: {

      // -- Короткий портрет --
      about: {
        head: "// about",
        title: "Короткий портрет",
        body: [
          "Начинал единственным сисадмином в маленькой компании, дорос до DevOps-эксперта в «Инфосистемы Джет».",
          "Несколько лет строю инфраструктуру для enterprise-продуктов. Сейчас — DevOps-инженер на проекте Jet Detective, антифрод-платформе для банков и ритейла. На мне всё: от CI/CD и мониторинга до 160+ виртуалок.",
          "Из тимлидов сознательно ушёл обратно в инженеры. Командой рулить умею, но больше люблю копаться в сложном сам — разобраться, починить, автоматизировать, задокументировать.",
          "Люблю понятные системы, честные компромиссы и практичные решения. Не ведусь на «магические платформы» — отделяю то, что реально работает, от красивых слайдов.",
        ],
      },

      // -- Чем полезен --
      value: {
        head: "// value",
        title: "Чем полезен",
        items: [
          {
            k: "01",
            t: "Привожу хаос к форме",
            d: "Беру хаотичные процессы и собираю их в понятную, воспроизводимую структуру. Без косметики — по сути.",
          },
          {
            k: "02",
            t: "Автоматизирую по делу",
            d: "Не «потому что модно», а потому что рутина жрёт внимание. Оверинжиниринг — такой же враг, как ручной труд.",
          },
          {
            k: "03",
            t: "Держу сложное в одиночку",
            d: "Инфраструктура, дебаг, оркестрация. Беру сложную задачу и веду её в одного — от диагностики до production fix.",
          },
          {
            k: "04",
            t: "Мост infra ↔ AI tooling",
            d: "Быстро вижу, где настоящая польза, а где красивая обёртка. Главное, что вынес: дело не в модели, а в том, что вокруг — контекст и нормальная дока. Звучит скучно, зато работает =)",
          },
          {
            k: "05",
            t: "Инфраструктура без «хранителя тайного знания»",
            d: "Строю так, чтобы ничего не висело на одном человеке. Документация, прозрачность, самодокументируемые процессы.",
          },
        ],
      },

      // -- Принципы --
      principles: {
        head: "// principles",
        title: "Принципы",
        sub: "Несколько правил, по которым я работаю и живу. Не манифест — просто то, что себя окупило.",
        items: [
          {
            n: "01",
            t: "Сначала порядок, потом автоматизация",
            d: "Автоматизировать хаос — значит получить автоматизированный хаос. Сперва делаем процесс понятным.",
          },
          {
            n: "02",
            t: "Backup перед рискованными изменениями",
            d: "Всегда. Без исключений. Даже если «точно ничего не сломается».",
          },
          {
            n: "03",
            t: "Инструмент, а не вторая работа",
            d: "Если тул требует полставки на поддержку — это не инструмент, а проект.",
          },
          {
            n: "04",
            t: "Живое важнее стерильного",
            d: "Работающая система с небольшим техдолгом лучше идеальной архитектуры, которую никто не смог довести до прода.",
          },
          {
            n: "05",
            t: "Документация — часть работы",
            d: "Если это не записано — этого не существует. Через полгода ты сам не вспомнишь, почему так сделал.",
          },
          {
            n: "06",
            t: "set -e, никаких скипов",
            d: "Если что-то падает — разберись, а не обходи.",
          },
        ],
      },

      // -- Человеческий блок --
      human: {
        head: "// human",
        title: "По-человечески",
        sub: "Не «хобби», а то, что объясняет характер.",
        cards: [
          {
            t: "Мотоцикл",
            d: "Единственное место, где я ничего не пытаюсь оптимизировать. Просто еду — и этого хватает.",
            img: "/assets/moto.webp",
          },
          {
            t: "Книги",
            d: "Брендон Сандерсон ван лав! Интересно не столько «магия», сколько то, как автор строит правила мира и держит их.",
            img: "/assets/cosmere.webp",
          },
          {
            t: "Спортзал",
            d: "Получил второй разряд по жиму лёжа на соревах. Надеюсь дотянуть до мастера спорта =)",
            img: "/assets/gym.webp",
          },
          {
            t: "Персональный ассистент",
            d: "Дома на маке живёт свой агент, но центр тяжести давно переехал в обвязку: скиллы под задачи, роли-советники, консилиум перед сложной правкой. Цель была освободить время — сначала, конечно, вышло наоборот :D",
            img: "/assets/kloya.webp",
          },
          {
            t: "3D-принтер",
            d: "Печатаю всякую мелочь для быта. Кастомная подставка для электронной книги? А почему бы и нет =)",
            img: "/assets/printer.webp",
          },
          {
            t: "Аниме, игры",
            d: "Аниме — чтобы выключить рабочий режим. Игры пылятся в Steam, но всё равно слежу — вдруг успею на пенсии :D",
            img: "/assets/life.webp",
          },
        ],
      },

      // -- Side quests (личная инфра и живые системы) --
      sidequests: {
        head: "// side quests",
        title: "Side quests",
        sub: "Не «pet-projects» в привычном смысле — личная инфра, привычка мерить собственную жизнь и инструменты, которых не хватало под рукой. Звучит душно, но мне зашло =)",
        sagas: [
          {
            title: "Домашний прод",
            intro: "Растения и воздух — как сервисы с SLA. Свой Prometheus, своя Grafana, своя пиксельная панель на стене. Дома у меня маленький прод.",
            projects: [
              {
                name: "plants + co2",
                metric: "15 растений · Grafana · Divoom",
                d: "Датчики влажности почвы → Prometheus → дашборд с графиками по каждому растению и таймерами полива. Пиксельная панель рядом буквально кричит «пора поливать!» — иначе я бы забыл =)",
                img: "/assets/sq-plants.webp",
                stack: ["Python", "Prometheus", "Grafana"],
                href: "https://github.com/artfaal/tuya-exporter",
              },
              {
                name: "homelab",
                metric: "8 серверов · 3 дома + 5 VPS",
                d: "OpenVPN, свой DNS, VictoriaMetrics, Caddy, прокси-серверы в разных регионах. Всё версионируется в git — каждый хост с README, ISSUES и SSH-доступом.",
                stack: ["Ansible", "Docker", "Caddy"],
              },
            ],
          },
          {
            title: "Наблюдения за собой",
            intro: "DevOps-подход не только к серверам. Если что-то важно — значит у этого должны быть метрики и временные ряды. Да, я такой =)",
            projects: [
              {
                name: "budget",
                metric: "с сентября 2017 · каждый день",
                d: "Семейный бюджет: Google Sheets + Telegram-бот для быстрых записей + свой UI. Доходы, категории трат, крупные покупки — всё одной рукой прямо с экрана блокировки. Дебет с кредитом не всегда сходится =)",
                stack: ["Google Sheets", "aiogram", "Web UI"],
                href: "https://docs.google.com/spreadsheets/d/12mn8-DfR-qm6kzXMNCJ1Bl4BucB1oegfxq0EJiKmlLc/edit?usp=sharing",
              },
              {
                name: "hobby-tracker",
                metric: "каждый день с сентября 2025",
                d: "Telegram-бот + Grafana: каждый вечер отмечаю, чем занимался (спортзал, книги, работа, семья). Heatmap без жалости показывает, куда реально уходит время — иногда неприятно :D",
                stack: ["Python", "Grafana", "aiogram"],
                href: "https://github.com/artfaal/hobby-tracker",
              },
            ],
          },
          {
            title: "LLM по делу",
            intro: "LLM не как «вау», а как тихий инструмент для рутины. Остальные LLM-поделки отвалились сами — тут только то, что реально прижилось.",
            projects: [
              {
                name: "kindle-flashcards",
                d: "Закладки из Kindle + GPT = свежая пачка карточек Noji раз в неделю. Без напряга дочитал так пару книг на английском — язык подтягивается фоном =)",
                stack: ["Python", "OpenAI API", "Noji"],
                href: "https://github.com/artfaal/kindle-flashcards",
              },
              {
                name: "eater",
                metric: "с июля 2026 · вдвоём с женой",
                d: "Счётчик калорий, который не бесит. Наговорил голосом или сфоткал этикетку — модель разложила на КБЖУ и положила в нужный приём пищи. Понимает «съел половину» и «пицца целиком 800, взял 4 куска из 10». Готовые приложения просят подписку за гору функций, которыми я не пользуюсь =)",
                stack: ["Python", "OpenRouter", "ElevenLabs STT", "SQLite"],
              },
            ],
          },
          {
            title: "Сделал под себя",
            intro: "Не нашёл готового — сделал. Пользователь у них один — я =)",
            projects: [
              {
                name: "hangar",
                metric: "Go · TUI",
                d: "Mission control для параллельных сессий агента: кто чем занят, живые статусы, поиск, превью контекста — и переход в нужную вкладку терминала. Написал, когда понял, что сам себе диспетчер и прям путаюсь в сессиях.",
                stack: ["Go", "Bubble Tea"],
              },
              {
                name: "rest timer",
                metric: "watchOS · для зала",
                d: "Таймер отдыха между подходами прямо на часах: крутанул колёсико — пошёл отсчёт, телефон доставать не надо. Когда закрыл все подходы, часы кидают конфетти. Мелочь, а приятно =)",
                stack: ["Swift", "SwiftUI", "watchOS"],
              },
            ],
          },
        ],
        outro: [
          { label: "пишу про это в @artfaal_log", href: "https://t.me/artfaal_log" },
          { label: "ещё репозитории на github", href: "https://github.com/artfaal?tab=repositories" },
        ],
      },

      // -- Сейчас копаю --
      exploring: {
        head: "// exploring",
        title: "Сейчас копаю",
        sub: "Темы, в которые сейчас реально затянуло.",
        // status: hot — активно погружён; active — регулярно занимаюсь; exploring — в процессе изучения
        items: [
          {
            t: "Локальные модели на своём железе",
            d: "Интересно нащупать потолок, а не выбрать «самую большую»: что тянет железка без GPU, где начинается враньё. Модель побольше умеет бодро писать «всё хорошо», не заглянув ни в один лог :D",
            status: "hot",
          },
          {
            t: "Harness под рутину",
            d: "Конвейер из агентов: скиллы под задачи, контекст по проектам, eval-гейт перед деплоем — не зелёный, никуда не едет. Не гонюсь за новой моделью, кручу то, что вокруг неё.",
            status: "active",
          },
          {
            t: "Агент, который разбирает свои же косяки",
            d: "Ночью перечитывает мои сессии за день и ищет места, где пришлось переделывать. На выходе — не патч к коду, а патч к инструкции агенту: где я плохо объяснил, где он сам себе придумал. Отсматриваю руками, но кое-что уже прижилось.",
            status: "hot",
          },
        ],
      },
    },

    // ================================================================
    // CV СТРАНИЦА (cv/index.html)
    // ================================================================
    cv: {

      // -- About (расширенный, для работодателей) --
      about: {
        head: "// about",
        title: "Обо мне",
        body: [
          "DevOps Expert Engineer. Веду DevOps на антифрод-платформе Jet Detective («Инфосистемы Джет»). Построил с нуля CI/CD, мониторинг и систему управления 160+ ВМ.",
          "Опыт руководства командой из 7 человек, вывода релизов на прод в крупных гос. проектах, адаптации сервисов под Kubernetes.",
          "Сейчас строю AI-часть платформы: агенты под рутину с eval-гейтом перед деплоем, MCP-серверы и документацию, которой пользуются и люди, и агенты. Отдельное направление — локальные модели для закрытого контура, где данные наружу не уходят.",
        ],
      },

      // -- Опыт работы --
      experience: {
        head: "// experience",
        title: "Опыт работы",
        items: [
          {
            title: "DevOps Expert Engineer",
            company: "Инфосистемы Джет",
            period: "окт. 2023 – настоящее время",
            project: "Jet Detective — платформа противодействия мошенничеству и финансового мониторинга (антифрод для банков, ритейла, промышленности). Отвечаю за всю инфраструктуру продукта.",
            groups: [
              {
                title: "Инфраструктура и автоматизация",
                items: [
                  "Разработал JD-Gateway (Python) — единую точку правды для 160+ ВМ в vSphere: lifecycle management, TTL, REST API, dynamic inventory для Ansible и Prometheus, Web UI",
                  "Создал автоматический установщик продукта с поддержкой CentOS, RedOS и Astra Linux",
                  "Автоматизировал подготовку ВМ через Packer (4 ОС) и Ansible (10+ ролей)",
                  "Построил систему бэкапов (PostgreSQL, Jenkins, OpenSearch, Kafka) на MinIO S3",
                  "Встроил Apache Superset в продукт для embedded BI-дашбордов",
                ],
              },
              {
                title: "CI/CD",
                items: [
                  "Спроектировал и поддерживаю комплексные Jenkins-пайплайны для сборки и деплоя",
                  "Реализовал параллельные сборки, динамическое создание воркеров в vSphere",
                  "Встроил автотесты и SCA-проверку зависимостей в PR pipeline",
                  "Мигрировал репозитории из Bitbucket в GitLab с сохранением CI/CD интеграций",
                ],
              },
              {
                title: "Мониторинг и логирование",
                items: [
                  "Построил стек мониторинга с нуля: Telegraf + Prometheus + Grafana + Thanos",
                  "Настроил алертинг, создал дашборды, реализовал гибкую систему уведомлений",
                  "Развернул OpenSearch + Loki + Promtail + Logstash для логов",
                ],
              },
              {
                title: "Безопасность",
                items: [
                  "Внедрил HashiCorp Vault (GitOps) для управления секретами",
                  "Разработал SSH CA с Web UI и LDAP-аутентификацией",
                  "Устранял замечания ИБ для банковского заказчика",
                ],
              },
              {
                title: "LLM и агенты",
                items: [
                  "Агентский харнесс для DevOps-рутины: выбор движка после сравнения пяти фреймворков, eval-гейт перед деплоем (grounding, security, выбор инструментов), трейсинг вызовов модели",
                  "PoC диагностического агента на локальных моделях — расследование инцидентов без отправки данных контура в облако",
                  "MCP-серверы поверх документации и инфраструктуры — общий контекст для команды и LLM-агентов",
                  "MCP-сервер поверх JD-Gateway — агент заводит, гасит и снапшотит стенды сам, без кликов в vSphere",
                  "Vault MCP для агентов: секреты под deny-политиками, токен изолирован",
                ],
              },
              {
                title: "Собственные инструменты",
                items: [
                  "Telegram-бот для управления инфраструктурой: LDAP, аудит, защита от брутфорса",
                  "Портал релизов JD на Go: карточки релизов с артефактами, синхронизация с Jira, LDAP-авторизация и аудит",
                  "Платформа документации на базе MkDocs с drift-detection",
                ],
              },
            ],
          },
          {
            title: "Team Lead DevOps",
            company: "Инфосистемы Джет",
            period: "дек. 2019 – окт. 2023",
            project: "Проекты: ЕГРН, Атлант (Testing Automation Platform). Руководил DevOps-командой из 7 человек.",
            groups: [
              {
                title: "Проект ЕГРН",
                items: [
                  "Инфраструктура тестирования: 6+ стендов, 1000+ ВМ",
                  "Вывод релизов на прод — дебаг в боевых условиях, анализ логов",
                  "Обновление MongoDB на проде — плейбуки, продлайк-стенд, миграция данных",
                ],
              },
              {
                title: "Проект Атлант / TAP",
                items: [
                  "Архитектор системы: разработка, внедрение и поддержка платформы автоматизации тестирования",
                  "Адаптация сервисов под Kubernetes, развёртывание k8s-кластеров",
                  "CI/CD консалтинг для внутренних проектов, пресейлы для банковских заказчиков",
                ],
              },
            ],
          },
          {
            title: "Системный администратор / Веб-разработчик",
            company: "СаунаМастер → ЕОС Премиум-СПА-Технологии",
            period: "март 2013 – окт. 2019",
            project: "Начинал как единственный IT-специалист в компании, вырос из сисадмина в веб-разработчика.",
            groups: [
              {
                title: "Сисадмин (2013–2015)",
                items: [
                  "Спроектировал IT-инфраструктуру малого бизнеса с нуля: ЛВС, серверы, IP-телефония, видеонаблюдение",
                ],
              },
              {
                title: "Веб-разработка (2015–2019)",
                items: [
                  "Разработка коммерческих сайтов: DigitalOcean, Nginx, Python, Flask, MongoDB",
                  "Создание промо-сайтов под маркетинговые кампании",
                ],
              },
            ],
          },
        ],
      },

      // -- Кейсы --
      cases: {
        head: "// cases",
        title: "Избранные кейсы",
        items: [
          {
            num: "01",
            title: "JD-Gateway — единая точка правды для 160+ ВМ",
            task: "160+ виртуальных машин на стендах. Информация размазана по Confluence, головам инженеров и vSphere-консолям.",
            did: "Разработал JD-Gateway на Python — веб-приложение с REST API, интеграцией с vSphere, dynamic inventory для Ansible и Prometheus, TTL-системой и Web UI.",
            result: "Создание хоста руками через vSphere занимало 30 минут — стало пара минут. 14 человек закрывают операции сами, обращений по ним больше нет. TTL не даёт стендам превращаться в зомби.",
            lesson: "«Единая точка правды» — не архитектурный паттерн, а вопрос культуры. Техническая часть — 30%, остальное — убеждение и удобство.",
          },
          {
            num: "02",
            title: "Мониторинг с нуля для антифрод-платформы",
            task: "Продукт без мониторинга. Проблемы обнаруживались, когда падал стенд или кто-то жаловался.",
            did: "Построил полный стек: Prometheus, Grafana, Thanos для долгосрочного хранения. Алертинг с гибкой системой уведомлений. OpenSearch + Logstash для логов.",
            result: "Проблемы видны до того, как кто-то пожалуется. Дашборды — основной инструмент диагностики.",
            lesson: "Мониторинг — это не «поставить Prometheus». Это дашборд, который конкретный человек открывает каждое утро. Если не отвечает на «всё ли ок?» за 5 секунд — бесполезен.",
          },
          {
            num: "03",
            title: "Диагностический агент на локальной модели",
            task: "Данные банковского контура в облако отправлять нельзя. Вопрос простой: потянет ли локальная модель роль дежурного — сама сходить в логи, метрики и runbook'и, собрать факты и поставить диагноз.",
            did: "Собрал PoC: агент с набором инструментов, реестром найденных фактов и валидацией ответа. Прогнал Qwen3 (8B / 14B / 30B) против облачного DeepSeek как потолка качества. Добавил guard-правила против самого опасного режима — когда модель никуда не заглянула, но бодро отвечает «всё в порядке».",
            result: "14B без reasoning дала тот же результат, что и облако, — на обычной ВМ без GPU. Архитектор согласовал конфигурацию, собираю демо-стенд с воспроизводимыми поломками.",
            lesson: "Размер модели не чинит честность: 30B уверенно писала «healthy», не вызвав ни одного инструмента. Спасли скучные guard-правила, а не параметры.",
          },
          {
            num: "04",
            title: "Инфраструктура, которую можно спросить",
            task: "Команда ходит к девопсу с одними и теми же вопросами: как работает этот пайплайн, как считается версия, где это посмотреть. Ответы есть — но в Confluence, в Jenkinsfile'ах и в моей голове. Классика жанра: «спроси Макса».",
            did: "Собрал документацию JD в одном месте и поднял над ней MCP-сервер с векторным поиском. Спрашивают и люди, и LLM-агенты: на конкретный вопрос — конкретный ответ и шаги, без раскопок по десяти страницам.",
            result: "Боевая бета. Покрытие наращиваю на ходу, но часть вопросов уже уходит в доку, а не ко мне. Агенты берут контекст оттуда — и заметно реже сочиняют.",
            lesson: "Дело оказалось не в модели. Скучная дока под конкретный вопрос обыгрывает модель поумнее, но без контекста — каждый раз.",
          },
          {
            num: "05",
            title: "Обновление MongoDB на проде (ЕГРН)",
            task: "Обновить MongoDB на проде крупнейшего гос. IT-проекта. Даунтайм критичен, данные терять нельзя.",
            did: "Ansible-плейбуки для обновления. Продлайк-стенд для полного прогона. Отладка до полной воспроизводимости.",
            result: "Успешная миграция без потери данных и с минимальным даунтаймом.",
            lesson: "На проде не бывает «попробуем». Каждый шаг проверен на стенде. Плейбуки — документация, которая ещё и исполняется.",
          },
        ],
      },

      // -- Навыки / стек --
      skills: {
        head: "// skills",
        title: "Навыки",
        groups: [
          {
            title: "Core",
            items: ["Jenkins", "GitLab CI/CD", "Ansible", "Docker", "Prometheus", "Grafana", "HashiCorp Vault", "VMware vSphere", "Linux", "PostgreSQL"],
          },
          {
            title: "Extended",
            items: ["Thanos", "Packer", "OpenSearch", "Loki", "Promtail", "Logstash", "Telegraf", "Kafka", "Keycloak", "Nginx", "Kubernetes", "Terraform", "Go", "Python", "Bash", "Groovy", "MinIO/S3", "Apache Superset", "Git"],
          },
          {
            title: "AI / LLM",
            items: ["MCP-серверы", "Агентские харнессы", "LLM-evals (promptfoo)", "LLM-observability (Phoenix)", "Локальный inference", "Агентские CLI (Claude Code, Codex)", "OpenAI API"],
          },
          {
            title: "Ранее",
            items: ["Flask", "MongoDB", "HTML/JS/CSS", "DigitalOcean", "SonarQube"],
          },
        ],
      },

      // -- Языки --
      languages: {
        head: "// languages",
        title: "Языки",
        items: [
          { name: "Русский", level: "родной" },
          { name: "Английский", level: "продвинутый (чтение, восприятие на слух; разговорный подтягиваю)" },
        ],
      },

      education: {
        head: "// education",
        title: "Образование",
        items: [
          {
            title: "Яндекс.Практикум",
            detail: "DevOps для эксплуатации и разработки (включая Kubernetes)",
            year: "2022–2023",
          },
          {
            title: "ГБОУ СПО Педагогический колледж №1 им. К.Д. Ушинского",
            detail: "Социальная педагогика",
            year: "2006–2009",
          },
        ],
      },
      // Резюме — первым пунктом списка контактов на CV. Заголовок несёт слово
      // «резюме»: без него страница нигде не называет себя резюме, и человек,
      // не знающий, что «CV» — это оно, не имеет ни одной зацепки.
      contact: {
        title: "Резюме и контакты",
        sub: "Файл — забрать. Telegram — написать.",
        label: "Резюме",
      },
    },
  },

  en: {

    // ── Meta ──
    meta: {
      title_personal: "Maksim Solovev — DevOps",
      title_cv: "Maksim Solovev — DevOps CV",
      handle: "artfaal",
      host: "artfaal.ru",
      location: "Russia, Moscow",
      shell: "zsh",
      birth: "1989-07-24",
      start_it: "2013-03-01",
      start_devops: "2019-12-01",
      knowsAbout: ["DevOps", "CI/CD", "Infrastructure", "Monitoring", "LLM tooling", "MCP", "AI agents"],
      last_updated: "2026-07-27",
    },

    // ── Navigation ──
    nav: {
      personal: "life",
      cv: "job",
    },

    // ── Hero (shared across both pages) ──
    hero: {
      name: "Maksim Solovev",
      role: "DevOps Engineer",
      tagline: "I bring order to complex systems and automate the grind so people have energy left for life.",
      sub: "Currently building LLM tooling — the kind that actually helps, not the kind that breeds another zoo.",
      cta_primary: { label: "message me", href: "https://t.me/artfaal" },
      cta_secondary: { label: "github", href: "https://github.com/artfaal" },
      prompt_lines: { cv: ["whoami", "cat ~/cv.md"], personal: ["whoami", "cat ~/human.md"] },
    },

    // ── Blog / notes ──
    blog: {
      head: "// blog",
      title: "Blog",
      sub: "Live notes on tech, life, and things that really hit home. A brain dump.",
      links: [
        { label: "Telegram channel", handle: "@artfaal_log", href: "https://t.me/artfaal_log", icon: "tg" },
        { label: "Long reads", handle: "log.artfaal.ru", href: "https://log.artfaal.ru/", icon: "blog" },
        { label: "X (Twitter)", handle: "@artfaal", href: "https://x.com/artfaal", icon: "x" },
      ],
    },

    // ── Contacts (shared) ──
    contacts: {
      head: "// contact",
      title: "Get in touch",
      sub: "Telegram works best. Everything else works too.",
      links: [
        { label: "Telegram",  handle: "@artfaal",         href: "https://t.me/artfaal",                       icon: "tg" },
        { label: "Blog",      handle: "@artfaal_log",     href: "https://t.me/artfaal_log",                   icon: "blog" },
        { label: "Email",     handle: "sys.dll@gmail.com", href: "mailto:sys.dll@gmail.com",                  icon: "mail" },
        { label: "GitHub",    handle: "artfaal",           href: "https://github.com/artfaal",                icon: "gh" },
        { label: "LinkedIn",  handle: "maksim-solovev",    href: "https://www.linkedin.com/in/maksim-solovev/", icon: "in" },
      ],
    },

    // ── Footer ──
    footer: {
      built: "hand-assembled",
      sig: "// end of file",
    },

    // ================================================================
    // PERSONAL PAGE (index.html)
    // ================================================================
    personal: {

      // -- Short portrait --
      about: {
        head: "// about",
        title: "Short portrait",
        body: [
          "Started out as the sole sysadmin at a small company, grew into a DevOps Expert at Jet Infosystems.",
          "For the past several years I've been building infrastructure for enterprise products. Currently a DevOps Engineer on the Jet Detective project — an anti-fraud platform for banks and retail. Everything's on me: CI/CD, monitoring, 160+ VMs.",
          "Stepped down from team lead back to hands-on engineering — by choice. I can lead a team, but I'd rather dig into hard problems myself: figure it out, fix it, automate, document.",
          "I like clear systems, honest trade-offs, and practical solutions. I don't buy into \"magic platforms\" — I can tell what actually works from what just looks good on slides.",
        ],
      },

      // -- What I bring to the table --
      value: {
        head: "// value",
        title: "What I bring to the table",
        items: [
          {
            k: "01",
            t: "Turning chaos into structure",
            d: "I take messy processes and shape them into something clear and reproducible. No cosmetics — substance only.",
          },
          {
            k: "02",
            t: "Automation without cargo cults",
            d: "Not \"because it's trendy\" but because busywork eats attention. Over-engineering is just as much of an enemy as manual labor.",
          },
          {
            k: "03",
            t: "Handling complexity solo",
            d: "Infrastructure, debugging, orchestration. I take a hard problem and carry it end-to-end on my own — from diagnosis to production fix.",
          },
          {
            k: "04",
            t: "Bridge: infra ↔ AI tooling",
            d: "I quickly spot where the real value is and where it's just a shiny wrapper. The big takeaway: it's not about the model — it's about everything around it, the context and decent docs. Sounds boring, but it works =)",
          },
          {
            k: "05",
            t: "Infrastructure without a \"keeper of secret knowledge\"",
            d: "I build things so nothing hangs on a single person. Documentation, transparency, self-documenting processes.",
          },
        ],
      },

      // -- Principles --
      principles: {
        head: "// principles",
        title: "Principles",
        sub: "A few rules I work and live by. Not a manifesto — just things that have paid off.",
        items: [
          {
            n: "01",
            t: "Order first, automation second",
            d: "Automating chaos just gives you automated chaos. First make the process clear.",
          },
          {
            n: "02",
            t: "Backup before risky changes",
            d: "Always. No exceptions. Even when \"nothing can possibly break\".",
          },
          {
            n: "03",
            t: "A tool, not a second job",
            d: "If a tool takes a half-time hire to maintain — it's not a tool, it's a project.",
          },
          {
            n: "04",
            t: "Working beats sterile",
            d: "A running system with a bit of tech debt beats a perfect architecture that nobody could ship to production.",
          },
          {
            n: "05",
            t: "Documentation is part of the job",
            d: "If it's not written down — it doesn't exist. Six months from now you won't remember why you did it that way.",
          },
          {
            n: "06",
            t: "set -e, no skips",
            d: "If something fails — dig into it, don't work around it.",
          },
        ],
      },

      // -- Human side --
      human: {
        head: "// human",
        title: "The human side",
        sub: "Not \"hobbies\" — things that explain who I am.",
        cards: [
          {
            t: "Motorcycle",
            d: "The one place where I'm not trying to optimize anything. I just ride — and that's enough.",
            img: "/assets/moto.webp",
          },
          {
            t: "Books",
            d: "Brandon Sanderson all the way! It's less about the magic and more about how he builds the rules of his worlds — and sticks to them.",
            img: "/assets/cosmere.webp",
          },
          {
            t: "Gym",
            d: "Earned a Class II ranking in bench press at a competition. Hoping to reach Master of Sport someday =)",
            img: "/assets/gym.webp",
          },
          {
            t: "Personal assistant",
            d: "I run my own agent on the Mac at home, but the center of gravity moved into the scaffolding around it long ago: skills tuned to specific tasks, advisor roles, a panel review before anything tricky. The goal was to free up time — which, naturally, cost me time first :D",
            img: "/assets/kloya.webp",
          },
          {
            t: "3D printer",
            d: "I print all kinds of small bits and bobs for around the house. A custom stand for an e-reader? Why not =)",
            img: "/assets/printer.webp",
          },
          {
            t: "Anime, games",
            d: "Anime — to turn off work mode. My Steam library is gathering dust, but I still keep an eye on releases — maybe I'll get to them in retirement :D",
            img: "/assets/life.webp",
          },
        ],
      },

      // -- Side quests (personal infra and living systems) --
      sidequests: {
        head: "// side quests",
        title: "Side quests",
        sub: "Not \"pet projects\" in the usual sense — personal infra, a habit of measuring my own life, and tools I kept wishing existed. Sounds geeky, but I'm into it =)",
        sagas: [
          {
            title: "Home as prod",
            intro: "Plants and air — treated as services with an SLA. My own Prometheus, my own Grafana, my own pixel panel on the wall. A tiny prod at home.",
            projects: [
              {
                name: "plants + co2",
                metric: "15 plants · Grafana · Divoom",
                d: "Soil moisture sensors → Prometheus → a dashboard with per-plant graphs and watering timers. The pixel panel right next to it literally yells \"time to water!\" — otherwise I'd forget =)",
                img: "/assets/sq-plants.webp",
                stack: ["Python", "Prometheus", "Grafana"],
                href: "https://github.com/artfaal/tuya-exporter",
              },
              {
                name: "homelab",
                metric: "8 servers · 3 home + 5 VPS",
                d: "OpenVPN, my own DNS, VictoriaMetrics, Caddy, proxies in different regions. Everything versioned in git — each host with a README, ISSUES, and SSH access.",
                stack: ["Ansible", "Docker", "Caddy"],
              },
            ],
          },
          {
            title: "Self-tracking",
            intro: "DevOps mindset, not just for servers. If something matters, it deserves metrics and a time series. Yep, that's me =)",
            projects: [
              {
                name: "budget",
                metric: "since September 2017 · every day",
                d: "Family budget: Google Sheets + a Telegram bot for quick entries + my own UI. Income, spending categories, big purchases — all one-handed, right from the lockscreen. The books don't always balance =)",
                stack: ["Google Sheets", "aiogram", "Web UI"],
                href: "https://docs.google.com/spreadsheets/d/12mn8-DfR-qm6kzXMNCJ1Bl4BucB1oegfxq0EJiKmlLc/edit?usp=sharing",
              },
              {
                name: "hobby-tracker",
                metric: "every day since September 2025",
                d: "Telegram bot + Grafana: each evening I log what I did (gym, books, work, family). The heatmap shows no mercy — reveals where time actually goes, sometimes a bit painful :D",
                stack: ["Python", "Grafana", "aiogram"],
                href: "https://github.com/artfaal/hobby-tracker",
              },
            ],
          },
          {
            title: "LLMs that actually stuck",
            intro: "LLMs not as a \"wow\" moment, but as a quiet tool for routine. The rest of my LLM toys dropped off on their own — only what really stuck is here.",
            projects: [
              {
                name: "kindle-flashcards",
                d: "Kindle highlights + GPT = a fresh batch of Noji cards every week. Finished a couple of English books this way without even trying — the language picks itself up in the background =)",
                stack: ["Python", "OpenAI API", "Noji"],
                href: "https://github.com/artfaal/kindle-flashcards",
              },
              {
                name: "eater",
                metric: "since July 2026 · me and my wife",
                d: "A calorie tracker that doesn't get on my nerves. Say it out loud or snap the label — the model logs the calories and macros under the right meal. It gets \"I ate half\" and \"the whole pizza is 800, I had 4 slices of 10\". Ready-made apps want a subscription for a pile of features I never touch =)",
                stack: ["Python", "OpenRouter", "ElevenLabs STT", "SQLite"],
              },
            ],
          },
          {
            title: "Built for myself",
            intro: "Couldn't find one that fit, so I built it. These have exactly one user — me =)",
            projects: [
              {
                name: "hangar",
                metric: "Go · TUI",
                d: "Mission control for parallel agent sessions: who's working on what, live statuses, search, a context preview — and a jump straight to the right terminal tab. I wrote it once I realized I was my own dispatcher and kept genuinely losing track of my own sessions.",
                stack: ["Go", "Bubble Tea"],
              },
              {
                name: "rest timer",
                metric: "watchOS · for the gym",
                d: "A rest timer between sets, right on the watch: spin the crown and the countdown starts, no need to dig out the phone. When the last set is done, the watch throws confetti. A small thing, but it makes my day =)",
                stack: ["Swift", "SwiftUI", "watchOS"],
              },
            ],
          },
        ],
        outro: [
          { label: "I write about this on @artfaal_log", href: "https://t.me/artfaal_log" },
          { label: "more repos on github", href: "https://github.com/artfaal?tab=repositories" },
        ],
      },

      // -- Currently exploring --
      exploring: {
        head: "// exploring",
        title: "Currently exploring",
        sub: "Stuff I'm genuinely hooked on right now.",
        items: [
          {
            t: "Local models on my own hardware",
            d: "The fun part is finding the ceiling, not picking \"the biggest one\": what a box with no GPU can actually handle, where it starts making things up. A bigger model will happily write \"all good\" without opening a single log :D",
            status: "hot",
          },
          {
            t: "A harness for the grind",
            d: "A pipeline of agents: skills tuned to specific tasks, per-project context, an eval gate before deploy — not green, not shipping. I'm not chasing the next model, I'm working on everything around it.",
            status: "active",
          },
          {
            t: "An agent that reviews its own screw-ups",
            d: "Overnight it re-reads my sessions from the day and hunts for spots where something had to be redone. What comes out is not a patch to the code but a patch to the agent's instructions: where I explained badly, where it made things up. I check each one by hand, but a few have stuck.",
            status: "hot",
          },
        ],
      },
    },

    // ================================================================
    // CV PAGE (cv/index.html)
    // ================================================================
    cv: {

      // -- About (extended, for employers) --
      about: {
        head: "// about",
        title: "About me",
        body: [
          "DevOps Expert Engineer. Running DevOps for the Jet Detective anti-fraud platform (Jet Infosystems). Built CI/CD, monitoring, and a management system for 160+ VMs from scratch.",
          "Experience leading a team of 7, shipping releases to production on large government projects, and adapting services for Kubernetes.",
          "Currently building the AI side of the platform: agents for routine work with an eval gate before deploy, MCP servers, and documentation used by both people and agents. A separate track — local models for the closed network, where data never leaves the perimeter.",
        ],
      },

      // -- Work experience --
      experience: {
        head: "// experience",
        title: "Work experience",
        items: [
          {
            title: "DevOps Expert Engineer",
            company: "Jet Infosystems",
            period: "Oct 2023 – present",
            project: "Jet Detective — a fraud prevention and financial monitoring platform (anti-fraud for banks, retail, and industry). Responsible for all product infrastructure.",
            groups: [
              {
                title: "Infrastructure & automation",
                items: [
                  "Developed JD-Gateway (Python) — a single source of truth for 160+ VMs in vSphere: lifecycle management, TTL, REST API, dynamic inventory for Ansible and Prometheus, Web UI",
                  "Created an automated product installer supporting CentOS, RedOS, and Astra Linux",
                  "Automated VM provisioning via Packer (4 OSes) and Ansible (10+ roles)",
                  "Built a backup system (PostgreSQL, Jenkins, OpenSearch, Kafka) on MinIO S3",
                  "Integrated Apache Superset into the product for embedded BI dashboards",
                ],
              },
              {
                title: "CI/CD",
                items: [
                  "Designed and maintain complex Jenkins pipelines for build and deploy",
                  "Implemented parallel builds and dynamic worker creation in vSphere",
                  "Added auto-tests and SCA dependency scanning to the PR pipeline",
                  "Migrated repositories from Bitbucket to GitLab while preserving CI/CD integrations",
                ],
              },
              {
                title: "Monitoring & logging",
                items: [
                  "Built the monitoring stack from scratch: Telegraf + Prometheus + Grafana + Thanos",
                  "Set up alerting, created dashboards, implemented a flexible notification system",
                  "Deployed OpenSearch + Loki + Promtail + Logstash for logs",
                ],
              },
              {
                title: "Security",
                items: [
                  "Implemented HashiCorp Vault (GitOps) for secrets management",
                  "Developed an SSH CA with Web UI and LDAP authentication",
                  "Addressed security audit findings for a banking client",
                ],
              },
              {
                title: "LLM & agents",
                items: [
                  "Agent harness for DevOps routine: engine picked after comparing five frameworks, eval gate before deploy (grounding, security, tool selection), tracing of model calls",
                  "PoC of a diagnostic agent on local models — incident investigation without sending network data to the cloud",
                  "MCP servers on top of documentation and infrastructure — shared context for the team and LLM agents",
                  "MCP server on top of JD-Gateway — the agent spins environments up, shuts them down, and snapshots them itself, with no clicking around vSphere",
                  "Vault MCP for agents: secrets served under deny policies, token isolated",
                ],
              },
              {
                title: "Custom tooling",
                items: [
                  "Telegram bot for infrastructure management: LDAP, audit logging, brute-force protection",
                  "JD release portal in Go: release cards with artifacts, Jira sync, LDAP authorization, and audit logging",
                  "Documentation platform based on MkDocs with drift-detection",
                ],
              },
            ],
          },
          {
            title: "Team Lead DevOps",
            company: "Jet Infosystems",
            period: "Dec 2019 – Oct 2023",
            project: "Projects: EGRN, Atlant (Testing Automation Platform). Led a DevOps team of 7.",
            groups: [
              {
                title: "EGRN project",
                items: [
                  "Test infrastructure: 6+ environments, 1000+ VMs",
                  "Shipped releases to production — debugging under fire, log analysis",
                  "Production MongoDB upgrade — playbooks, production-like environment, data migration",
                ],
              },
              {
                title: "Atlant / TAP project",
                items: [
                  "System architect: design, implementation, and support of a test automation platform",
                  "Adapted services for Kubernetes, deployed k8s clusters",
                  "CI/CD consulting for internal projects, pre-sales for banking clients",
                ],
              },
            ],
          },
          {
            title: "System Administrator / Web Developer",
            company: "SaunaMaster → EOS Premium Spa Technologies",
            period: "Mar 2013 – Oct 2019",
            project: "Started as the sole IT specialist in the company, grew from sysadmin to web developer.",
            groups: [
              {
                title: "Sysadmin (2013–2015)",
                items: [
                  "Designed small-business IT infrastructure from scratch: LAN, servers, IP telephony, CCTV",
                ],
              },
              {
                title: "Web development (2015–2019)",
                items: [
                  "Commercial website development: DigitalOcean, Nginx, Python, Flask, MongoDB",
                  "Built promotional sites for marketing campaigns",
                ],
              },
            ],
          },
        ],
      },

      // -- Cases --
      cases: {
        head: "// cases",
        title: "Selected cases",
        items: [
          {
            num: "01",
            title: "JD-Gateway — single source of truth for 160+ VMs",
            task: "160+ virtual machines across environments. Information scattered across Confluence, engineers' heads, and vSphere consoles.",
            did: "Developed JD-Gateway in Python — a web app with REST API, vSphere integration, dynamic inventory for Ansible and Prometheus, TTL system, and Web UI.",
            result: "Creating a host used to take 30 minutes by hand through vSphere — now it's a couple of minutes. 14 people handle these operations themselves; the requests have stopped coming. TTL prevents environments from turning into zombies.",
            lesson: "\"Single source of truth\" is not an architectural pattern — it's a matter of culture. The technical part is 30%; the rest is persuasion and convenience.",
          },
          {
            num: "02",
            title: "Monitoring from scratch for an anti-fraud platform",
            task: "A product with zero monitoring. Issues were discovered when someone complained or an environment went down.",
            did: "Built the full stack: Prometheus, Grafana, Thanos for long-term storage. Alerting with a flexible notification system. OpenSearch + Logstash for logs.",
            result: "Problems are visible before anyone complains. Dashboards became the primary diagnostic tool.",
            lesson: "Monitoring isn't \"install Prometheus\". It's a dashboard that a specific person opens every morning. If it can't answer \"is everything OK?\" in 5 seconds — it's useless.",
          },
          {
            num: "03",
            title: "Diagnostic agent on a local model",
            task: "Data from the bank's closed network can't go to the cloud. Simple question: can a local model handle the on-call role — go into the logs, metrics, and runbooks on its own, gather the facts, and reach a diagnosis.",
            did: "Built a PoC: an agent with a toolset, a registry of gathered facts, and answer validation. Ran Qwen3 (8B / 14B / 30B) against cloud DeepSeek as the quality ceiling. Added guard rules against the worst failure mode — when the model hasn't looked at anything but cheerfully reports \"all clear\".",
            result: "14B without reasoning matched the cloud result — on an ordinary VM with no GPU. The architect signed off on the configuration; I'm putting together a demo environment with reproducible failures.",
            lesson: "Model size doesn't fix honesty: the 30B confidently wrote \"healthy\" without calling a single tool. What saved us were boring guard rules, not parameters.",
          },
          {
            num: "04",
            title: "Infrastructure you can just ask",
            task: "The team keeps coming to the DevOps engineer with the same questions: how does this pipeline work, how is the version computed, where do I look. The answers exist — but they're buried in Confluence, in Jenkinsfiles, and in my head. The classic \"ask Maks\".",
            did: "Pulled the JD documentation into one place and put an MCP server with vector search on top of it. Both people and LLM agents query it: a specific question gets a specific answer with steps — no digging through ten pages.",
            result: "Live beta. Coverage is still growing, but some questions already go to the docs instead of to me. Agents pull context from there too — and make things up noticeably less.",
            lesson: "It turned out not to be about the model. Boring docs aimed at a specific question beat a smarter model with no context — every single time.",
          },
          {
            num: "05",
            title: "Production MongoDB upgrade (EGRN)",
            task: "Upgrade MongoDB in production on one of the largest government IT projects. Downtime is critical, data loss is unacceptable.",
            did: "Ansible playbooks for the upgrade. A production-like environment for full dry runs. Debugging until fully reproducible.",
            result: "Successful migration with zero data loss and minimal downtime.",
            lesson: "In production there's no \"let's try\". Every step is verified on a staging environment. Playbooks are documentation that also executes.",
          },
        ],
      },

      // -- Skills / stack --
      skills: {
        head: "// skills",
        title: "Skills",
        groups: [
          {
            title: "Core",
            items: ["Jenkins", "GitLab CI/CD", "Ansible", "Docker", "Prometheus", "Grafana", "HashiCorp Vault", "VMware vSphere", "Linux", "PostgreSQL"],
          },
          {
            title: "Extended",
            items: ["Thanos", "Packer", "OpenSearch", "Loki", "Promtail", "Logstash", "Telegraf", "Kafka", "Keycloak", "Nginx", "Kubernetes", "Terraform", "Go", "Python", "Bash", "Groovy", "MinIO/S3", "Apache Superset", "Git"],
          },
          {
            title: "AI / LLM",
            items: ["MCP servers", "Agent harnesses", "LLM evals (promptfoo)", "LLM observability (Phoenix)", "Local inference", "Agentic CLIs (Claude Code, Codex)", "OpenAI API"],
          },
          {
            title: "Previously",
            items: ["Flask", "MongoDB", "HTML/JS/CSS", "DigitalOcean", "SonarQube"],
          },
        ],
      },

      // -- Languages --
      languages: {
        head: "// languages",
        title: "Languages",
        items: [
          { name: "Russian", level: "native" },
          { name: "English", level: "advanced (reading, listening; working on speaking)" },
        ],
      },

      education: {
        head: "// education",
        title: "Education",
        items: [
          {
            title: "Yandex Practicum",
            detail: "DevOps for Operations and Development (including Kubernetes)",
            year: "2022–2023",
          },
          {
            title: "Pedagogical College No. 1 (K.D. Ushinsky)",
            detail: "Social Pedagogy",
            year: "2006–2009",
          },
        ],
      },
      // В EN «CV» — бытовое слово, и той проблемы, из-за которой в RU появилось
      // «Резюме», здесь нет. Поэтому не калька: обычное CV и два императива.
      contact: {
        title: "CV and contacts",
        sub: "Grab the file. Ping me on Telegram.",
        label: "CV",
      },
    },
  },
};

if (typeof module !== 'undefined') module.exports = CONTENT;
