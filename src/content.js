// Bilingual content. Keep keys stable; swap by lang.
window.CONTENT = {
  ru: {
    meta: {
      title: "Соловьев Максим — DevOps",
      locale: "ru_RU",
      handle: "artfaal",
      host: "solovev.dev",
      shell: "zsh",
    },
    nav: {
      mode_label: "режим",
      mode_work: "по работе",
      mode_human: "по-человечески",
      lang_label: "язык",
    },
    hero: {
      name: "Соловьев Максим",
      role: "DevOps-инженер",
      prompt_lines: [
        "whoami",
        "cat ~/about.md",
      ],
      tagline: [
        "Навожу порядок в сложных системах и автоматизирую рутину",
        "так, чтобы у людей оставались силы на жизнь.",
      ],
      sub:
        "Сейчас особенно копаю LLM-инструменты — те, что помогают делу, а не плодят новый зоопарк.",
      cta_primary: "написать",
      cta_secondary: "github",
    },
    about: {
      head: "// about",
      title: "Короткий портрет",
      body: [
        "6+ лет в DevOps. Сейчас — единственный DevOps в команде, и это не жалоба, а рабочий контекст: сложные техконтексты я давно научился разруливать в одиночку.",
        "Люблю понятные системы, честные компромиссы и практичные решения. Не романтизирую «магическую платформу». Отделяю core от lab — и то и другое должно жить по своим правилам.",
      ],
      stats: [
        { k: "лет в devops", v: "6+" },
        { k: "devops в команде", v: "1" },
        { k: "культов", v: "0" },
      ],
    },
    value: {
      head: "// value",
      title: "Чем полезен",
      items: [
        {
          k: "01",
          t: "Привожу хаос к форме",
          d: "Беру запутанные процессы и собираю их в понятную, поддерживаемую штуку. Без косметики — по сути.",
        },
        {
          k: "02",
          t: "Автоматизирую без культов",
          d: "Не «потому что модно», а потому что рутина жрёт внимание. Оверинжиниринг — такой же враг, как ручной труд.",
        },
        {
          k: "03",
          t: "Держу сложное в одиночку",
          d: "Инфраструктура, дебаг, оркестрация. Работать без толпы — это навык, который тренируется годами.",
        },
        {
          k: "04",
          t: "Отличаю инструмент от демки",
          d: "Быстро вижу, где настоящая польза, а где красивая обёртка. Не даю зоопарку AI-тулов расти бесконтрольно.",
        },
        {
          k: "05",
          t: "Мост infra ↔ AI tooling",
          d: "Говорю на языке и железа, и современных LLM-процессов. Помогаю командам сшивать это без боли.",
        },
      ],
    },
    principles: {
      head: "// principles",
      title: "Принципы",
      sub: "Несколько правил, по которым я работаю. Не манифест — просто то, что себя окупило.",
      items: [
        {
          n: "01",
          t: "Сначала порядок, потом автоматизация",
          d: "Автоматизировать бардак — это ускоренный бардак. Сперва делаем процесс понятным.",
        },
        {
          n: "02",
          t: "Backup перед рискованными изменениями",
          d: "Скучно, дёшево, спасает карьеру. Всегда.",
        },
        {
          n: "03",
          t: "Инструмент упрощает жизнь, а не строит новую религию",
          d: "Если тул требует отдельного культа и переустройства мира — это не тул, это секта.",
        },
        {
          n: "04",
          t: "Живое важнее стерильного",
          d: "Идеальная система без людей — это памятник. Мне интереснее то, что работает и не ломает тех, кто с ним живёт.",
        },
      ],
    },
    human: {
      head: "// human",
      title: "По-человечески",
      sub: "То, что объясняет характер лучше любого резюме.",
      cards: [
        {
          t: "Cosmere",
          d: "Много-много Сандерсона. Интересно не столько «магия», сколько то, как автор строит правила мира и держит их.",
          tag: "книги",
          img: "books",
        },
        {
          t: "Варфоломей",
          d: "Мотоцикл. Имя дано не в шутку — это напарник, а не средство передвижения.",
          tag: "мотоцикл",
          img: "moto",
        },
        {
          t: "Пумба",
          d: "3D-принтер. Печатает кронштейны, корпуса, держатели и периодически — маленькие инженерные радости.",
          tag: "3D / CAD",
          img: "printer",
        },
        {
          t: "Игры, аниме, спортзал",
          d: "Всё это — способ держать голову и тело в рабочем состоянии. Без претензий, но серьёзно.",
          tag: "жизнь",
          img: "life",
        },
      ],
    },
    contacts: {
      head: "// contact",
      title: "Связаться",
      sub: "Лучше всего — Telegram. Остальное тоже работает.",
      links: [
        { label: "Telegram", handle: "@artfaal", href: "https://t.me/artfaal", key: "tg" },
        { label: "Блог", handle: "@artfaal_log", href: "https://t.me/artfaal_log", key: "blog" },
        { label: "Email", handle: "sys.dll@gmail.com", href: "mailto:sys.dll@gmail.com", key: "mail" },
        { label: "GitHub", handle: "artfaal", href: "https://github.com/artfaal", key: "gh" },
        { label: "LinkedIn", handle: "maksim-solovev", href: "https://www.linkedin.com/in/maksim-solovev/", key: "in" },
      ],
    },
    footer: {
      built: "собрано вручную",
      year: "2026",
      sig: "// end of file",
    },
  },

  en: {
    meta: {
      title: "Maksim Solovev — DevOps",
      locale: "en_US",
      handle: "artfaal",
      host: "solovev.dev",
      shell: "zsh",
    },
    nav: {
      mode_label: "mode",
      mode_work: "work",
      mode_human: "human",
      lang_label: "lang",
    },
    hero: {
      name: "Maksim Solovev",
      role: "DevOps engineer",
      prompt_lines: [
        "whoami",
        "cat ~/about.md",
      ],
      tagline: [
        "I bring order to messy systems and automate the grind",
        "so people have energy left for a life.",
      ],
      sub:
        "Currently digging into LLM tooling — the kind that actually moves work, not the kind that spawns another zoo.",
      cta_primary: "get in touch",
      cta_secondary: "github",
    },
    about: {
      head: "// about",
      title: "Short portrait",
      body: [
        "6+ years in DevOps. Right now — the only DevOps on the team. Not a complaint, just context: I've gotten good at holding complex technical situations alone.",
        "I like systems that are legible, compromises that are honest, and solutions that are practical. I don't romanticise the “magic platform”. I keep core and lab separate — each has its own rules.",
      ],
      stats: [
        { k: "years in devops", v: "6+" },
        { k: "devops on team", v: "1" },
        { k: "cults joined", v: "0" },
      ],
    },
    value: {
      head: "// value",
      title: "What I'm useful for",
      items: [
        {
          k: "01",
          t: "Turn chaos into shape",
          d: "I take tangled processes and reshape them into something legible and maintainable. No cosmetics — structural work.",
        },
        {
          k: "02",
          t: "Automate without cults",
          d: "Not because it's trendy — because toil eats attention. Overengineering is as much the enemy as manual labour.",
        },
        {
          k: "03",
          t: "Hold complexity solo",
          d: "Infra, debugging, orchestration. Working without a crowd is a skill; I've been sharpening it for years.",
        },
        {
          k: "04",
          t: "Tool vs. demo",
          d: "I see fast where the real utility lives and where it's just a pretty wrapper. I don't let an AI-tool zoo grow unchecked.",
        },
        {
          k: "05",
          t: "Bridge: infra ↔ AI tooling",
          d: "I speak both hardware and modern LLM workflows, and help teams stitch them together without pain.",
        },
      ],
    },
    principles: {
      head: "// principles",
      title: "Principles",
      sub: "A few rules I actually work by. Not a manifesto — just things that paid off.",
      items: [
        {
          n: "01",
          t: "Order first, automation second",
          d: "Automating a mess gives you a faster mess. Make the process legible before you script it.",
        },
        {
          n: "02",
          t: "Back up before risky moves",
          d: "Boring, cheap, career-saving. Every time.",
        },
        {
          n: "03",
          t: "A tool should simplify life, not start a religion",
          d: "If a tool demands its own cult and a rebuilt worldview — that's not a tool, that's a sect.",
        },
        {
          n: "04",
          t: "Alive beats sterile",
          d: "A perfect system without people is a monument. I'd rather have something that works and doesn't break the humans around it.",
        },
      ],
    },
    human: {
      head: "// human",
      title: "The human layer",
      sub: "The stuff that explains the character better than any résumé.",
      cards: [
        {
          t: "Cosmere",
          d: "Lots of Sanderson. What I like isn't the “magic” — it's how he builds the rules of a world and sticks to them.",
          tag: "books",
          img: "books",
        },
        {
          t: "Bartholomew",
          d: "The motorcycle. The name isn't a joke — he's a partner, not a vehicle.",
          tag: "moto",
          img: "moto",
        },
        {
          t: "Pumba",
          d: "The 3D printer. Prints brackets, enclosures, mounts, and the occasional tiny engineering joy.",
          tag: "3D / CAD",
          img: "printer",
        },
        {
          t: "Games, anime, the gym",
          d: "All of it is how I keep head and body in working order. No pretence, but taken seriously.",
          tag: "life",
          img: "life",
        },
      ],
    },
    contacts: {
      head: "// contact",
      title: "Say hi",
      sub: "Telegram works best. The rest works too.",
      links: [
        { label: "Telegram", handle: "@artfaal", href: "https://t.me/artfaal", key: "tg" },
        { label: "Blog", handle: "@artfaal_log", href: "https://t.me/artfaal_log", key: "blog" },
        { label: "Email", handle: "sys.dll@gmail.com", href: "mailto:sys.dll@gmail.com", key: "mail" },
        { label: "GitHub", handle: "artfaal", href: "https://github.com/artfaal", key: "gh" },
        { label: "LinkedIn", handle: "maksim-solovev", href: "https://www.linkedin.com/in/maksim-solovev/", key: "in" },
      ],
    },
    footer: {
      built: "hand-assembled",
      year: "2026",
      sig: "// end of file",
    },
  },
};
