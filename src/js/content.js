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
      title_cv: "Соловьев Максим — DevOps CV",
      handle: "artfaal",
      host: "artfaal.ru",
      location: "Russia, Moscow",
      shell: "zsh",
      birth: "1989-07-24",
      // Даты для живых счётчиков опыта
      start_it: "2013-03-01",
      start_devops: "2019-12-01",
      // Для JSON-LD (личная страница)
      knowsAbout: ["DevOps", "CI/CD", "Infrastructure", "Monitoring", "LLM tooling"],
      // Дата последнего обновления контента (тест напомнит обновить через 3 мес)
      last_updated: "2026-04-22",
    },

    // ── Навигация ──
    // --page= ссылки между страницами, --lang= переключатель языка
    nav: {
      personal: "по-человечески",
      cv: "по работе",
    },

    // ── Hero (общий для обеих страниц) ──
    hero: {
      name: "Соловьев Максим",
      role: "DevOps-инженер",
      tagline: "Навожу порядок в сложных системах и автоматизирую рутину так, чтобы у людей оставались силы на жизнь.",
      sub: "Сейчас копаю LLM-инструменты — те, что помогают делу, а не плодят новый зоопарк.",
      cta_primary: { label: "написать", href: "https://t.me/artfaal" },
      cta_secondary: { label: "github", href: "https://github.com/artfaal" },
      // Строки для терминальной анимации набора
      prompt_lines: ["whoami", "cat ~/human.md"],
    },

    // ── Контакты (общие) ──
    // ── Блог / заметки ──
    blog: {
      head: "// blog",
      n: "05",
      title: "Блог",
      sub: "Живые заметки о технике, жизни и том, что реально зацепило. Дамп сознания.",
      links: [
        { label: "Telegram-канал", handle: "@artfaal_log", href: "https://t.me/artfaal_log", icon: "tg" },
        { label: "Лонгриды", handle: "log.artfaal.ru", href: "https://log.artfaal.ru/", icon: "blog" },
      ],
    },

    contacts: {
      head: "// contact",
      n: "06",
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
        n: "00",
        title: "Короткий портрет",
        body: [
          "Больше десяти лет в IT — от единственного сисадмина в маленькой компании до DevOps-эксперта в «Инфосистемы Джет».",
          "Несколько лет строю инфраструктуру для enterprise-продуктов. Сейчас — DevOps-инженер на проекте Jet Detective, антифрод-платформе для банков и ритейла. Отвечаю за всё: от CI/CD и мониторинга до управления 160+ виртуальными машинами.",
          "С позиции тимлида сознательно ушёл обратно в инженеры. Командой рулить умею, но больше люблю копаться в сложном сам — разобраться, починить, автоматизировать, задокументировать.",
          "Люблю понятные системы, честные компромиссы и практичные решения. Не ведусь на «магические платформы» — отделяю то, что реально работает, от красивых слайдов.",
        ],
      },

      // -- Чем полезен --
      value: {
        head: "// value",
        n: "01",
        title: "Чем полезен",
        items: [
          {
            k: "01",
            t: "Привожу хаос к форме",
            d: "Беру хаотичные процессы и собираю их в понятную, воспроизводимую структуру. Без косметики — по сути.",
          },
          {
            k: "02",
            t: "Автоматизирую без культов",
            d: "Не «потому что модно», а потому что рутина жрёт внимание. Оверинжиниринг — такой же враг, как ручной труд.",
          },
          {
            k: "03",
            t: "Держу сложное в одиночку",
            d: "Инфраструктура, дебаг, оркестрация. Разруливаю сложные техконтексты в одного — от диагностики до production fix.",
          },
          {
            k: "04",
            t: "Отличаю инструмент от демки",
            d: "Быстро вижу, где настоящая польза, а где красивая обёртка. Не даю зоопарку AI-тулов расти бесконтрольно.",
          },
          {
            k: "05",
            t: "Мост infra ↔ AI tooling",
            d: "Ковыряюсь в LLM-зоопарке изнутри — понимаю, что там реально работает, а что красивая демка. Помогаю командам сшивать это без боли.",
          },
          {
            k: "06",
            t: "Инфраструктура без «хранителя тайного знания»",
            d: "Строю так, чтобы система не требовала одного конкретного человека. Документация, прозрачность, самодокументируемые процессы.",
          },
        ],
      },

      // -- Принципы --
      principles: {
        head: "// principles",
        n: "02",
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
            t: "Инструмент упрощает жизнь, а не строит новую религию",
            d: "Если тул требует полставки на поддержку — это не инструмент, это проект.",
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
            d: "Если что-то падает — разберись, а не обойди.",
          },
        ],
      },

      // -- Человеческий блок --
      human: {
        head: "// human",
        n: "03",
        title: "По-человечески",
        sub: "Не «хобби», а то, что объясняет характер.",
        cards: [
          {
            t: "Книги",
            d: "Брендон Сандерсон ван лав! Интересно не столько «магия», сколько то, как автор строит правила мира и держит их.",
            img: "/assets/cosmere.webp",
          },
          {
            t: "Мотоцикл",
            d: "Единственное место, где я ничего не пытаюсь оптимизировать. Просто еду — и этого хватает.",
            img: "/assets/moto.webp",
          },
          {
            t: "Персональный ассистент",
            d: "В свободное время пилю «Клою» — персонального ассистента на базе OpenClaw. Цель была освободить время на другие дела, но пока в основном больше дебажу :D",
            img: "/assets/kloya.webp",
          },
          {
            t: "3D-принтер",
            d: "Проектирую маленькие прикладные проекты для дома. Кастомная подставка для электронной книги? Почему бы и нет.",
            img: "/assets/printer.webp",
          },
          {
            t: "Спортзал",
            d: "Получил второй разряд по жиму лёжа на соревах. Надеюсь дотянуть до мастера спорта =)",
            img: "/assets/gym.webp",
          },
          {
            t: "Аниме, игры",
            d: "Аниме — чтобы выключить рабочий режим. Игры пылятся в Steam, но всё равно слежу — вдруг успею на пенсии :D",
            img: "/assets/life.webp",
          },
        ],
      },

      // -- Сейчас копаю --
      exploring: {
        head: "// exploring",
        n: "04",
        title: "Сейчас копаю",
        sub: "Что интересует прямо сейчас.",
        items: [
          {
            t: "LLM и оркестрация агентов",
            d: "~300 часов за полтора месяца на эксперименты с агентными фреймворками и оркестрацией LLM. Ищу способы реально снять когнитивную нагрузку с инженерных процессов.",
          },
          {
            t: "Встраивание LLM-инструментов в рабочие процессы",
            d: "Как перетащить наработки из домашней песочницы в боевой DevOps — без культа и без боли.",
          },
          {
            t: "Снижение когнитивной нагрузки",
            d: "Не только рутина — ещё и шаблонные решения. Если я всё равно выбираю по инструкции, пусть это делает скрипт.",
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
        n: "00",
        title: "Обо мне",
        body: [
          "DevOps Expert Engineer. DevOps на антифрод-платформе Jet Detective («Инфосистемы Джет»). Построил с нуля CI/CD, мониторинг и систему управления 160+ ВМ.",
          "Опыт руководства командой из 7 человек, вывода релизов на прод в крупных гос. проектах, адаптации сервисов под Kubernetes.",
        ],
      },

      // -- Опыт работы --
      experience: {
        head: "// experience",
        n: "01",
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
                ],
              },
              {
                title: "CI/CD",
                items: [
                  "Спроектировал и поддерживаю комплексные Jenkins pipeline для сборки и деплоя",
                  "Реализовал параллельные сборки, динамическое создание воркеров в vSphere",
                  "Встроил автотесты в PR pipeline и внедрил OWASP Dependency Check",
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
                title: "Собственные инструменты",
                items: [
                  "Telegram-бот для управления инфраструктурой с LDAP и аудитом",
                  "Глубокая система бэкапов (PostgreSQL, Jenkins, OpenSearch, Kafka) на MinIO S3",
                  "GitLab webhook-сервер для автоматизации MR",
                  "Apache Superset для embedded BI-дашбордов в продукте",
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
                  "Обеспечение инфраструктуры тестовых стендов (6+ стендов, 1000+ ВМ)",
                  "Вывод релизов на продуктив — дебаг в боевых условиях, анализ логов",
                  "Обновление MongoDB на продуктиве — плейбуки, продлайк-стенд, миграция данных",
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
        n: "02",
        title: "Избранные кейсы",
        items: [
          {
            num: "01",
            title: "JD-Gateway — единая точка правды для 160+ ВМ",
            task: "160+ виртуальных машин на стендах. Информация размазана по Confluence, головам инженеров и vSphere-консолям.",
            did: "Разработал JD-Gateway на Python — веб-приложение с REST API, интеграцией с vSphere, dynamic inventory для Ansible и Prometheus, TTL-системой и Web UI.",
            result: "Вместо ручного создания ВМ — API-вызов. Вместо «спроси Макса» — self-service. TTL не дают стендам превращаться в зомби.",
            lesson: "«Единая точка правды» — не архитектурный паттерн, а культурное решение. Техническая часть — 30%, остальное — убеждение и удобство.",
          },
          {
            num: "02",
            title: "Мониторинг с нуля для антифрод-платформы",
            task: "Продукт без мониторинга. Проблемы обнаруживались, когда кто-то жаловался или падал стенд.",
            did: "Построил полный стек: Prometheus, Grafana, Thanos для долгосрочного хранения. Алертинг с гибкой системой уведомлений. OpenSearch + Logstash для логов.",
            result: "Проблемы видны до того, как кто-то пожалуется. Дашборды — основной инструмент диагностики.",
            lesson: "Мониторинг — это не «поставить Prometheus». Это дашборд, который конкретный человек открывает каждое утро. Если не отвечает на «всё ли ок?» за 5 секунд — бесполезен.",
          },
          {
            num: "03",
            title: "Jenkins как основа CI/CD на enterprise-проекте",
            task: "Сложный продукт, много компонентов, несколько ОС, куча стендов. Нужен надёжный и быстрый CI/CD.",
            did: "Комплексные pipeline для полного цикла. Параллельные сборки, динамические воркеры в vSphere. Active Choice UI. Автотесты в PR. OWASP Dependency Check.",
            result: "Команда деплоит сама. PR не мержится без тестов. Зависимости проверяются на уязвимости автоматически.",
            lesson: "Jenkins — мощный, но опасный. Без дисциплины pipeline превращаются в нечитаемые Groovy-скрипты.",
          },
          {
            num: "04",
            title: "Обновление MongoDB на продуктиве (ЕГРН)",
            task: "Обновить MongoDB на продуктиве крупнейшего гос. IT-проекта. Даунтайм критичен, данные терять нельзя.",
            did: "Ansible-плейбуки для обновления. Продлайк-стенд для полного прогона. Отладка до полной воспроизводимости.",
            result: "Успешная миграция без потери данных и с минимальным даунтаймом.",
            lesson: "На проде не бывает «попробуем». Каждый шаг проверен на стенде. Плейбуки — документация, которая ещё и исполняется.",
          },
          {
            num: "05",
            title: "Полтора месяца в LLM-зоопарке",
            task: "Понять, можно ли с помощью LLM-агентов реально снять когнитивную нагрузку в ежедневной инженерной работе.",
            did: "299 часов за полтора месяца. 16 агентов на двух Mac mini. Попробовал OpenClaw, Claude Code, Codex, Gemini, Hermes, локальные модели, системы памяти.",
            result: "Оставил 3 инструмента: Claude Code (код), Клоя / OpenClaw (персональный агент с памятью), Hermes (глубокий анализ). Остальное — выкинул.",
            lesson: "Главная ловушка LLM — «когда у тебя молоток, всё вокруг гвозди». 16 агентов давали эндорфины, но не результат. Путь от усложнения к упрощению.",
          },
        ],
      },

      // -- Навыки / стек --
      skills: {
        head: "// skills",
        n: "03",
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
            title: "Ранее",
            items: ["Flask", "MongoDB", "HTML/JS/CSS", "DigitalOcean", "Ruby", "Java", "SonarQube"],
          },
        ],
      },

      // -- Языки --
      languages: {
        head: "// languages",
        n: "04",
        title: "Языки",
        items: [
          { name: "Русский", level: "родной" },
          { name: "Английский", level: "продвинутый (чтение, восприятие на слух; разговорный подтягиваю)" },
        ],
      },

      education: {
        head: "// education",
        n: "05",
        title: "Образование",
        items: [
          {
            title: "Яндекс.Практикум",
            detail: "DevOps для эксплуатации и разработки (включая Kubernetes)",
            year: "2022–2023",
          },
          {
            title: "Coursera",
            detail: "An Introduction to Interactive Programming in Python",
            year: "2014",
          },
          {
            title: "ГБОУ СПО Педагогический колледж №1 им. К.Д. Ушинского",
            detail: "Социальная педагогика",
            year: "2006–2009",
          },
        ],
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
      knowsAbout: ["DevOps", "CI/CD", "Infrastructure", "Monitoring", "LLM tooling"],
      last_updated: "2026-04-22",
    },

    // ── Navigation ──
    nav: {
      personal: "personal",
      cv: "career",
    },

    // ── Hero (shared across both pages) ──
    hero: {
      name: "Maksim Solovev",
      role: "DevOps Engineer",
      tagline: "I bring order to complex systems and automate the grind so people have energy left for life.",
      sub: "Currently digging into LLM tooling — the kind that actually helps, not the kind that breeds another zoo.",
      cta_primary: { label: "message me", href: "https://t.me/artfaal" },
      cta_secondary: { label: "github", href: "https://github.com/artfaal" },
      prompt_lines: ["whoami", "cat ~/human.md"],
    },

    // ── Blog / notes ──
    blog: {
      head: "// blog",
      n: "05",
      title: "Blog",
      sub: "Live notes on tech, life, and things that really hit home. A brain dump.",
      links: [
        { label: "Telegram channel", handle: "@artfaal_log", href: "https://t.me/artfaal_log", icon: "tg" },
        { label: "Long reads", handle: "log.artfaal.ru", href: "https://log.artfaal.ru/", icon: "blog" },
      ],
    },

    // ── Contacts (shared) ──
    contacts: {
      head: "// contact",
      n: "06",
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
        n: "00",
        title: "Short portrait",
        body: [
          "Over a decade in IT — from being the sole sysadmin at a small company to DevOps Expert at Jet Infosystems.",
          "For the past several years I've been building infrastructure for enterprise products. Currently a DevOps Engineer on the Jet Detective project — an anti-fraud platform for banks and retail. I own everything: CI/CD, monitoring, managing 160+ virtual machines.",
          "Stepped back from team lead into hands-on engineering — by choice. I can lead a team, but I'd rather dig into hard problems myself: figure it out, fix it, automate, document.",
          "I like clear systems, honest trade-offs, and practical solutions. I don't buy into \"magic platforms\" — I can tell what actually works from what just looks good on slides.",
        ],
      },

      // -- What I bring to the table --
      value: {
        head: "// value",
        n: "01",
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
            d: "Infrastructure, debugging, orchestration. I work through complex technical contexts solo — from diagnosis to production fix.",
          },
          {
            k: "04",
            t: "Telling a tool from a demo",
            d: "I quickly spot where the real value is and where it's just a shiny wrapper. I don't let the AI-tool zoo grow unchecked.",
          },
          {
            k: "05",
            t: "Bridge: infra ↔ AI tooling",
            d: "Elbow-deep in the LLM zoo — I know what actually works and what's just a shiny demo. I help teams wire it in painlessly.",
          },
          {
            k: "06",
            t: "Infrastructure without a \"keeper of secret knowledge\"",
            d: "I build things so the system doesn't depend on any single person. Documentation, transparency, self-documenting processes.",
          },
        ],
      },

      // -- Principles --
      principles: {
        head: "// principles",
        n: "02",
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
            t: "A tool should simplify life, not start a new religion",
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
        n: "03",
        title: "The human side",
        sub: "Not \"hobbies\" — things that explain who I am.",
        cards: [
          {
            t: "Books",
            d: "Brandon Sanderson all the way! It's less about the magic and more about how he builds the rules of his worlds — and sticks to them.",
            img: "/assets/cosmere.webp",
          },
          {
            t: "Motorcycle",
            d: "The one place where I'm not trying to optimize anything. I just ride — and that's enough.",
            img: "/assets/moto.webp",
          },
          {
            t: "Personal assistant",
            d: "In my spare time I'm building \"Kloya\" — a personal assistant based on OpenClaw. The goal was to free up time for other things, but so far I'm mostly debugging :D",
            img: "/assets/kloya.webp",
          },
          {
            t: "3D printer",
            d: "I design small practical things for around the house. A custom stand for an e-reader? Why not.",
            img: "/assets/printer.webp",
          },
          {
            t: "Gym",
            d: "Earned a Class II ranking in bench press at a competition. Hoping to reach Master of Sport someday =)",
            img: "/assets/gym.webp",
          },
          {
            t: "Anime, games",
            d: "Anime — to turn off work mode. My Steam library is gathering dust, but I still keep an eye on releases — maybe I'll get to them in retirement :D",
            img: "/assets/life.webp",
          },
        ],
      },

      // -- Currently exploring --
      exploring: {
        head: "// exploring",
        n: "04",
        title: "Currently exploring",
        sub: "What I'm digging into right now.",
        items: [
          {
            t: "LLM and agent orchestration",
            d: "~300 hours over six weeks experimenting with agent frameworks and LLM orchestration. Looking for ways to genuinely reduce cognitive load in engineering workflows.",
          },
          {
            t: "Integrating LLM tools into workflows",
            d: "Porting what works from my home sandbox into production DevOps — no cargo cults, no pain.",
          },
          {
            t: "Reducing cognitive load",
            d: "Not just routine — boilerplate decisions too. If the choice already follows a script, let a script make it.",
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
        n: "00",
        title: "About me",
        body: [
          "DevOps Expert Engineer. Running DevOps for the Jet Detective anti-fraud platform (Jet Infosystems). Built CI/CD, monitoring, and a management system for 160+ VMs from scratch.",
          "Experience leading a team of 7, shipping releases to production on large government projects, and adapting services for Kubernetes.",
        ],
      },

      // -- Work experience --
      experience: {
        head: "// experience",
        n: "01",
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
                ],
              },
              {
                title: "CI/CD",
                items: [
                  "Designed and maintain complex Jenkins pipelines for build and deploy",
                  "Implemented parallel builds and dynamic worker creation in vSphere",
                  "Integrated auto-tests into PR pipelines and introduced OWASP Dependency Check",
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
                title: "Custom tooling",
                items: [
                  "Telegram bot for infrastructure management with LDAP and audit logging",
                  "Comprehensive backup system (PostgreSQL, Jenkins, OpenSearch, Kafka) to MinIO S3",
                  "GitLab webhook server for MR automation",
                  "Apache Superset for embedded BI dashboards in the product",
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
                  "Managed test environment infrastructure (6+ environments, 1000+ VMs)",
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
        n: "02",
        title: "Selected cases",
        items: [
          {
            num: "01",
            title: "JD-Gateway — single source of truth for 160+ VMs",
            task: "160+ virtual machines across environments. Information scattered across Confluence, engineers' heads, and vSphere consoles.",
            did: "Developed JD-Gateway in Python — a web app with REST API, vSphere integration, dynamic inventory for Ansible and Prometheus, TTL system, and Web UI.",
            result: "Instead of manual VM creation — an API call. Instead of \"ask Maks\" — self-service. TTL prevents environments from turning into zombies.",
            lesson: "\"Single source of truth\" is not an architectural pattern — it's a cultural decision. The technical part is 30%; the rest is persuasion and convenience.",
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
            title: "Jenkins as the CI/CD backbone for an enterprise project",
            task: "A complex product with many components, multiple OSes, lots of environments. Needed reliable and fast CI/CD.",
            did: "Complex pipelines for the full cycle. Parallel builds, dynamic workers in vSphere. Active Choice UI. Auto-tests in PRs. OWASP Dependency Check.",
            result: "The team deploys on their own. PRs don't merge without tests. Dependencies are automatically checked for vulnerabilities.",
            lesson: "Jenkins is powerful but dangerous. Without discipline, pipelines turn into unreadable Groovy scripts.",
          },
          {
            num: "04",
            title: "Production MongoDB upgrade (EGRN)",
            task: "Upgrade MongoDB in production on one of the largest government IT projects. Downtime is critical, data loss is unacceptable.",
            did: "Ansible playbooks for the upgrade. A production-like environment for full dry runs. Debugging until fully reproducible.",
            result: "Successful migration with zero data loss and minimal downtime.",
            lesson: "In production there's no \"let's try\". Every step is verified on a staging environment. Playbooks are documentation that also executes.",
          },
          {
            num: "05",
            title: "Six weeks in the LLM zoo",
            task: "Figure out whether LLM agents can genuinely reduce cognitive load in day-to-day engineering work.",
            did: "299 hours over six weeks. 16 agents on two Mac minis. Tried OpenClaw, Claude Code, Codex, Gemini, Hermes, local models, memory systems.",
            result: "Kept 3 tools: Claude Code (code), Kloya / OpenClaw (personal agent with memory), Hermes (deep analysis). Dropped the rest.",
            lesson: "The main LLM trap — \"when all you have is a hammer, everything looks like a nail\". 16 agents gave endorphins but not results. The real journey: from overcomplicating to simplifying.",
          },
        ],
      },

      // -- Skills / stack --
      skills: {
        head: "// skills",
        n: "03",
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
            title: "Previously",
            items: ["Flask", "MongoDB", "HTML/JS/CSS", "DigitalOcean", "Ruby", "Java", "SonarQube"],
          },
        ],
      },

      // -- Languages --
      languages: {
        head: "// languages",
        n: "04",
        title: "Languages",
        items: [
          { name: "Russian", level: "native" },
          { name: "English", level: "advanced (reading, listening; working on speaking)" },
        ],
      },

      education: {
        head: "// education",
        n: "05",
        title: "Education",
        items: [
          {
            title: "Yandex Practicum",
            detail: "DevOps for Operations and Development (including Kubernetes)",
            year: "2022–2023",
          },
          {
            title: "Coursera",
            detail: "An Introduction to Interactive Programming in Python",
            year: "2014",
          },
          {
            title: "Pedagogical College No. 1 (K.D. Ushinsky)",
            detail: "Social Pedagogy",
            year: "2006–2009",
          },
        ],
      },
    },
  },
};

if (typeof module !== 'undefined') module.exports = CONTENT;
