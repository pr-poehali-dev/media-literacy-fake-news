import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "Проблема", href: "#problem" },
  { label: "Обучение", href: "#education" },
  { label: "Примеры", href: "#examples" },
];

const STATS = [
  { value: "86%", label: "россиян сталкивались с фейками в соцсетях" },
  { value: "3 сек", label: "в среднем тратят на проверку новости" },
  { value: "500%", label: "рост ИИ-генерированного контента за 2 года" },
];

const METHODS = [
  {
    num: "01",
    title: "Проверяй источник",
    desc: "Найди сайт в поисковике. Есть ли у него история? Кто владелец? Зарегистрированные СМИ обязаны раскрывать эти данные.",
    icon: "Search",
  },
  {
    num: "02",
    title: "Ищи первоисточник",
    desc: "Большинство фейков — искажённые пересказы реальных событий. Найди оригинальное сообщение или официальное заявление.",
    icon: "FileSearch",
  },
  {
    num: "03",
    title: "Проверяй дату",
    desc: "Старые новости часто выдают за актуальные. Убедись, что события происходят сейчас, а не год-два назад.",
    icon: "Calendar",
  },
  {
    num: "04",
    title: "Анализируй эмоции",
    desc: "Если заголовок вызывает страх, злость или эйфорию — это манипуляция. Достоверные новости описывают факты нейтрально.",
    icon: "Brain",
  },
  {
    num: "05",
    title: "Используй фактчекеры",
    desc: "Проверяй информацию на Snopes, FactCheck.org, Лапша медиа. Специалисты уже разобрали тысячи популярных фейков.",
    icon: "ShieldCheck",
  },
];

const AI_MARKERS = [
  {
    id: "artifacts",
    label: "Артефакты рук",
    desc: "На видео у людей нечёткие или деформированные пальцы, руки сливаются или имеют неестественное число суставов.",
    severity: "high",
  },
  {
    id: "blinking",
    label: "Неестественное моргание",
    desc: "ИИ-персонажи моргают слишком редко, слишком часто или асинхронно. Глаза могут не двигаться во время речи.",
    severity: "high",
  },
  {
    id: "hairline",
    label: "Размытая линия волос",
    desc: "Граница между волосами и фоном выглядит нечёткой или «размытой». Особенно заметно при движении головы.",
    severity: "medium",
  },
  {
    id: "lighting",
    label: "Несоответствие освещения",
    desc: "Тени падают не туда, куда должны. Лицо освещено иначе, чем фон или тело — признак наложения.",
    severity: "medium",
  },
  {
    id: "sync",
    label: "Рассинхрон губ",
    desc: "Движения губ не совпадают с произносимыми звуками, особенно на сложных звуках вроде «п», «б», «м».",
    severity: "high",
  },
  {
    id: "context",
    label: "Отсутствие контекста",
    desc: "Видео не имеет метаданных, источника, даты. Его невозможно найти ни на одной официальной платформе.",
    severity: "medium",
  },
];

const FAKE_MANIPULATIONS = [
  { id: 1, type: "Анонимный источник", quote: "международная группа исследователей", color: "red" },
  { id: 2, type: "Эмоциональная нагрузка", quote: "шокирующие данные", color: "orange" },
  { id: 3, type: "Сенсационный заголовок", quote: "доказали", color: "red" },
  { id: 4, type: "Неизвестный сайт", quote: "НаукаСегодня.ру", color: "orange" },
];

export default function Index() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [showVerdict, setShowVerdict] = useState(false);

  const toggleCheck = (id: number) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    if (Object.values(updated).filter(Boolean).length >= 3) {
      setShowVerdict(true);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e8e0d5]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight">МедиаЩит</span>
            <span className="w-2 h-2 rounded-full bg-[#c0392b] animate-pulse-dot" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#555] hover:text-[#1a1a1a] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#examples"
            className="text-sm font-medium bg-[#1a1a1a] text-white px-4 py-2 hover:bg-[#c0392b] transition-colors"
          >
            Разобрать пример
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c0392b] uppercase tracking-widest mb-6 border border-[#c0392b]/30 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b] animate-pulse-dot" />
              Медиаграмотность · 2026
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              Не верь
              <br />
              <em className="not-italic text-[#c0392b]">своим глазам.</em>
              <br />
              Проверяй.
            </h1>
            <p className="text-lg text-[#555] leading-relaxed mb-8 max-w-md font-light">
              Эпоха фейков наступила. ИИ генерирует убедительные видео, тексты и изображения за секунды.
              Мы научим вас отличать правду от манипуляции.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#education"
                className="bg-[#1a1a1a] text-white px-6 py-3 font-medium hover:bg-[#c0392b] transition-colors"
              >
                Начать обучение
              </a>
              <a
                href="#problem"
                className="border border-[#1a1a1a] text-[#1a1a1a] px-6 py-3 font-medium hover:border-[#c0392b] hover:text-[#c0392b] transition-colors"
              >
                Узнать о проблеме
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-[#f7f4f0] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-2 border-[#1a1a1a]/10 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-2 border-[#c0392b]/30 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#c0392b]/10 flex items-center justify-center">
                        <Icon name="Eye" size={28} className="text-[#c0392b]" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-8 -right-16 bg-white border border-[#e8e0d5] px-3 py-1.5 text-xs font-mono shadow-sm">
                    DEEPFAKE?
                  </div>
                  <div className="absolute -bottom-6 -left-12 bg-[#c0392b] text-white px-3 py-1.5 text-xs font-mono shadow-sm">
                    FAKE NEWS
                  </div>
                  <div className="absolute top-12 -left-20 bg-white border border-[#e8e0d5] px-3 py-1.5 text-xs font-mono shadow-sm">
                    AI GEN
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-[#e8e0d5] grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-display text-4xl font-bold text-[#c0392b]">{stat.value}</span>
              <span className="text-sm text-[#777] leading-relaxed">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="bg-[#1a1a1a] text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs font-mono text-[#c0392b] uppercase tracking-widest mb-4">/ Проблема</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
                Информационная война
                <br />
                <em className="not-italic text-[#aaa]">уже идёт</em>
              </h2>
              <p className="text-[#aaa] leading-relaxed font-light text-lg">
                Искусственный интеллект изменил правила игры. То, что раньше требовало студии и команды
                профессионалов, теперь делается за несколько секунд в браузере.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: "Video",
                  title: "Дипфейк-видео",
                  desc: "Нейросети могут «вложить» любые слова в уста любого человека. Политики, учёные, знаменитости — никто не защищён.",
                },
                {
                  icon: "FileText",
                  title: "Синтетические тексты",
                  desc: "GPT-модели создают убедительные «научные статьи», «очевидцы событий» и «официальные заявления» за секунды.",
                },
                {
                  icon: "Image",
                  title: "Поддельные фото",
                  desc: "Генеративный ИИ создаёт фотореалистичные снимки несуществующих событий, людей и мест.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 border border-white/10 hover:border-[#c0392b]/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-[#c0392b] transition-colors">
                    <Icon
                      name={item.icon as "Video" | "FileText" | "Image"}
                      size={18}
                      className="text-[#aaa] group-hover:text-[#c0392b] transition-colors"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white">{item.title}</h3>
                    <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 pt-12 border-t border-white/10">
            <blockquote className="font-display text-2xl md:text-3xl font-light leading-relaxed text-center text-[#ddd]">
              «Ложь облетает полмира, пока правда ещё надевает ботинки»
            </blockquote>
            <p className="text-center text-[#666] text-sm mt-3 font-mono">— Марк Твен, актуально как никогда</p>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono text-[#c0392b] uppercase tracking-widest mb-4">/ Обучение</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
              Пять правил медиагигиены
            </h2>
            <p className="text-[#777] max-w-xl mx-auto font-light text-lg">
              Простые методы, которые защитят вас от большинства манипуляций
            </p>
          </div>
          <div className="space-y-px">
            {METHODS.map((method, i) => (
              <div
                key={i}
                className="group flex gap-8 p-8 border border-[#e8e0d5] hover:border-[#1a1a1a] transition-all hover:bg-[#fafaf8] items-start"
              >
                <span className="font-mono text-sm text-[#bbb] group-hover:text-[#c0392b] transition-colors flex-shrink-0 pt-1">
                  {method.num}
                </span>
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-[#e8e0d5] group-hover:border-[#1a1a1a] transition-colors">
                  <Icon
                    name={method.icon as "Search" | "FileSearch" | "Calendar" | "Brain" | "ShieldCheck"}
                    size={18}
                    className="text-[#999] group-hover:text-[#1a1a1a] transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#c0392b] transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-[#666] leading-relaxed">{method.desc}</p>
                </div>
                <Icon
                  name="ArrowRight"
                  size={18}
                  className="flex-shrink-0 text-[#ddd] group-hover:text-[#1a1a1a] transition-all group-hover:translate-x-1 mt-1 self-center"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="bg-[#f7f4f0] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono text-[#c0392b] uppercase tracking-widest mb-4">/ Примеры</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
              Учимся на реальных кейсах
            </h2>
            <p className="text-[#777] max-w-xl mx-auto font-light text-lg">
              Разберём манипулятивную новость и маркеры ИИ-видео
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Fake News Analyzer */}
            <div className="bg-white border border-[#e8e0d5]">
              <div className="p-6 border-b border-[#e8e0d5] flex items-center justify-between">
                <h3 className="font-semibold text-sm uppercase tracking-wide">Разбор манипулятивной новости</h3>
                <span className="text-xs font-mono bg-[#c0392b]/10 text-[#c0392b] px-2 py-0.5">Интерактивно</span>
              </div>
              <div className="p-6">
                <div className="border border-[#e8e0d5] p-5 mb-6 bg-[#fafaf8]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#aaa]">НаукаСегодня.ру</span>
                    <span className="text-xs font-mono text-[#aaa]">11 марта 2026</span>
                  </div>
                  <h4 className="font-display text-xl font-bold leading-tight mb-3 text-[#1a1a1a]">
                    Учёные доказали: смартфоны вызывают потерю памяти у детей за 30 дней
                  </h4>
                  <p className="text-sm text-[#888]">
                    <em>Международная группа исследователей</em> опубликовала{" "}
                    <em>шокирующие данные</em> — ежедневное использование смартфона
                    более двух часов приводит к необратимым изменениям...
                  </p>
                </div>

                <p className="text-xs text-[#999] mb-4 font-mono uppercase tracking-wide">
                  Отметьте признаки манипуляции:
                </p>
                <div className="space-y-3">
                  {FAKE_MANIPULATIONS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => toggleCheck(m.id)}
                      className={`w-full flex items-center gap-3 p-3 border text-left transition-all ${
                        checkedItems[m.id]
                          ? "border-[#c0392b] bg-[#c0392b]/5"
                          : "border-[#e8e0d5] hover:border-[#1a1a1a]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 flex-shrink-0 border flex items-center justify-center transition-all ${
                          checkedItems[m.id] ? "border-[#c0392b] bg-[#c0392b]" : "border-[#ccc]"
                        }`}
                      >
                        {checkedItems[m.id] && <Icon name="Check" size={12} className="text-white" />}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#1a1a1a]">{m.type}</span>
                        <span className="text-xs text-[#999] ml-2 font-mono">«{m.quote}»</span>
                      </div>
                    </button>
                  ))}
                </div>

                {showVerdict && (
                  <div className="mt-6 p-4 bg-[#c0392b] text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="AlertTriangle" size={16} />
                      <span className="font-semibold text-sm">Вердикт: манипуляция</span>
                    </div>
                    <p className="text-xs leading-relaxed text-white/80">
                      Вы нашли {Object.values(checkedItems).filter(Boolean).length} из 4 признаков. Эта новость
                      использует эмоциональные триггеры, анонимные источники и незарегистрированный сайт.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Video Markers */}
            <div className="bg-white border border-[#e8e0d5]">
              <div className="p-6 border-b border-[#e8e0d5] flex items-center justify-between">
                <h3 className="font-semibold text-sm uppercase tracking-wide">Маркеры ИИ-видео</h3>
                <span className="text-xs font-mono bg-[#1a1a1a]/10 text-[#1a1a1a] px-2 py-0.5">Нажми на точку</span>
              </div>
              <div className="p-6">
                <div className="relative bg-[#f0ece6] aspect-video mb-6 flex items-center justify-center border border-[#e8e0d5] overflow-hidden">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#1a1a1a]/10 flex items-center justify-center mx-auto mb-3">
                      <Icon name="Play" size={24} className="text-[#1a1a1a]/40" />
                    </div>
                    <p className="text-xs font-mono text-[#aaa]">ПРИМЕР: ИИ-сгенерированное видео</p>
                  </div>
                  {[
                    { x: "30%", y: "65%", id: "artifacts" },
                    { x: "52%", y: "28%", id: "blinking" },
                    { x: "40%", y: "18%", id: "hairline" },
                    { x: "70%", y: "45%", id: "lighting" },
                    { x: "48%", y: "60%", id: "sync" },
                    { x: "15%", y: "35%", id: "context" },
                  ].map((dot) => (
                    <button
                      key={dot.id}
                      style={{ left: dot.x, top: dot.y, transform: "translate(-50%, -50%)" }}
                      className={`absolute w-5 h-5 rounded-full border-2 transition-all ${
                        activeMarker === dot.id
                          ? "border-[#c0392b] bg-[#c0392b] scale-125"
                          : "border-[#c0392b] bg-white hover:bg-[#c0392b]/20"
                      }`}
                      onClick={() => setActiveMarker(activeMarker === dot.id ? null : dot.id)}
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  {AI_MARKERS.map((marker) => (
                    <button
                      key={marker.id}
                      onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
                      className={`w-full text-left p-3 border transition-all ${
                        activeMarker === marker.id
                          ? "border-[#c0392b] bg-[#c0392b]/5"
                          : "border-[#e8e0d5] hover:border-[#1a1a1a]/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            marker.severity === "high" ? "bg-[#c0392b]" : "bg-[#e67e22]"
                          }`}
                        />
                        <span className="text-sm font-medium">{marker.label}</span>
                        <span
                          className={`ml-auto text-xs font-mono ${
                            marker.severity === "high" ? "text-[#c0392b]" : "text-[#e67e22]"
                          }`}
                        >
                          {marker.severity === "high" ? "ВЫСОКИЙ РИСК" : "СРЕДНИЙ"}
                        </span>
                      </div>
                      {activeMarker === marker.id && (
                        <p className="text-xs text-[#666] mt-2 ml-5 leading-relaxed">{marker.desc}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white border-t border-[#e8e0d5]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            Делитесь знаниями.
            <br />
            <em className="not-italic text-[#c0392b]">Защитите близких.</em>
          </h2>
          <p className="text-[#777] text-lg font-light mb-10 max-w-xl mx-auto">
            Чем больше людей умеют распознавать фейки — тем менее эффективны манипуляции.
            Расскажите об этом сайте тем, кому доверяете.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-[#1a1a1a] text-white px-8 py-3 font-medium hover:bg-[#c0392b] transition-colors flex items-center gap-2">
              <Icon name="Share2" size={16} />
              Поделиться сайтом
            </button>
            <a
              href="#education"
              className="border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 font-medium hover:border-[#c0392b] hover:text-[#c0392b] transition-colors"
            >
              Повторить урок
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold">МедиаЩит</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b]" />
          </div>
          <p className="text-[#666] text-sm font-light">
            Просветительский проект о медиаграмотности · 2026
          </p>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="text-[#666] text-sm hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
