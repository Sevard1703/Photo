/* ==========================================================================
   data.js — PHOTO. archive index (single source of truth for archive, viewer, counters)

   Как заменить кадр своей фотографией:
   1. Положите файлы в images/archive/ с теми же именами: <id>-640.jpg, <id>-1280.jpg, <id>-2000.jpg
      (число — длинная сторона в пикселях).
   2. Обновите здесь title, text, category, w/h и widths (фактическая ширина каждого варианта).
   3. ph — цвет подложки, пока кадр загружается.
   Текущие 24 кадра — генеративные заглушки, созданные для этого архива.
   ========================================================================== */
window.PHOTO_ARCHIVE = {
  "categories": [
    {
      "key": "night",
      "label": "NIGHT"
    },
    {
      "key": "architecture",
      "label": "ARCHITECTURE"
    },
    {
      "key": "nature",
      "label": "NATURE"
    },
    {
      "key": "water",
      "label": "WATER"
    },
    {
      "key": "abstract",
      "label": "ABSTRACT"
    }
  ],
  "collections": [
    {
      "key": "after-dark",
      "n": "01",
      "title": "City After Dark",
      "text": "Город после заката: окна, трассы, неон и туман. Всё, что светится, когда день выключен.",
      "cover": "0001",
      "ids": [
        "0001",
        "0002",
        "0003",
        "0004",
        "0005"
      ]
    },
    {
      "key": "lost-geometry",
      "n": "02",
      "title": "Lost Geometry",
      "text": "Бетон, лестницы, арки и тени. Архитектура как чистая форма — без адреса и без людей, почти.",
      "cover": "0007",
      "ids": [
        "0006",
        "0007",
        "0008",
        "0009",
        "0010"
      ]
    },
    {
      "key": "silent-nature",
      "n": "03",
      "title": "Silent Nature",
      "text": "Хребты, дюны, лес и ночное небо. Пейзажи с минимумом деталей и максимумом тишины.",
      "cover": "0011",
      "ids": [
        "0011",
        "0012",
        "0013",
        "0014",
        "0015"
      ]
    },
    {
      "key": "low-frequency",
      "n": "04",
      "title": "Low Frequency",
      "text": "Вода в длинной выдержке: горизонт, туман, круги на поверхности, дождь на стекле.",
      "cover": "0016",
      "ids": [
        "0016",
        "0017",
        "0018",
        "0019"
      ]
    },
    {
      "key": "fragments",
      "n": "05",
      "title": "Fragments",
      "text": "Засветки, зерно, сбой сигнала, интерференция — то, что остаётся от изображения, когда сюжета уже нет.",
      "cover": "0020",
      "ids": [
        "0020",
        "0021",
        "0022",
        "0023",
        "0024"
      ]
    }
  ],
  "photos": [
    {
      "id": "0001",
      "index": 1,
      "title": "AFTERGLOW GRID",
      "text": "Окна, которые ещё не спят. Город после полуночи, собранный из сотен светящихся ячеек.",
      "category": "night",
      "collection": "after-dark",
      "tone": "COLOR",
      "tags": "city night skyline windows lights",
      "ratio": "3:2",
      "w": 2000,
      "h": 1333,
      "orient": "h",
      "ph": "#101320",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0002",
      "index": 2,
      "title": "VECTOR / A-12",
      "text": "Длинная выдержка: трасса превращается в линии красного и белого света.",
      "category": "night",
      "collection": "after-dark",
      "tone": "COLOR",
      "tags": "road highway long exposure light trails motion night",
      "ratio": "16:9",
      "w": 2000,
      "h": 1125,
      "orient": "h",
      "ph": "#1a1618",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0003",
      "index": 3,
      "title": "SOFT CURRENCY",
      "text": "Полный расфокус. От города остаются только круги света.",
      "category": "night",
      "collection": "after-dark",
      "tone": "COLOR",
      "tags": "bokeh blur lights city night",
      "ratio": "4:5",
      "w": 1600,
      "h": 2000,
      "orient": "v",
      "ph": "#1c181b",
      "widths": {
        "640": 512,
        "1280": 1024,
        "2000": 1600
      }
    },
    {
      "id": "0004",
      "index": 4,
      "title": "CYAN TUBE",
      "text": "Неоновый знак под дождём и его отражение на мокром асфальте.",
      "category": "night",
      "collection": "after-dark",
      "tone": "COLOR",
      "tags": "neon sign rain reflection cyan night",
      "ratio": "2:3",
      "w": 1333,
      "h": 2000,
      "orient": "v",
      "ph": "#081012",
      "widths": {
        "640": 427,
        "1280": 853,
        "2000": 1333
      }
    },
    {
      "id": "0005",
      "index": 5,
      "title": "RED BEACON",
      "text": "Башня в тумане. Одна красная точка на вершине.",
      "category": "night",
      "collection": "after-dark",
      "tone": "MONO",
      "tags": "tower fog beacon mono night",
      "ratio": "2:3",
      "w": 1333,
      "h": 2000,
      "orient": "v",
      "ph": "#1c1c1c",
      "widths": {
        "640": 427,
        "1280": 853,
        "2000": 1333
      }
    },
    {
      "id": "0006",
      "index": 6,
      "title": "CELL BLOCK",
      "text": "Бетонный фасад как таблица: ряды, ячейки и косая тень.",
      "category": "architecture",
      "collection": "lost-geometry",
      "tone": "MONO",
      "tags": "concrete facade brutalist grid shadow",
      "ratio": "4:5",
      "w": 1600,
      "h": 2000,
      "orient": "v",
      "ph": "#3b3b3b",
      "widths": {
        "640": 512,
        "1280": 1024,
        "2000": 1600
      }
    },
    {
      "id": "0007",
      "index": 7,
      "title": "DESCENT",
      "text": "Лестница, одинокая фигура и диагональ, которая держит весь кадр.",
      "category": "architecture",
      "collection": "lost-geometry",
      "tone": "MONO",
      "tags": "stairs figure diagonal concrete",
      "ratio": "1:1",
      "w": 2000,
      "h": 2000,
      "orient": "sq",
      "ph": "#575757",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0008",
      "index": 8,
      "title": "VERTICAL FIELD",
      "text": "Взгляд вверх между двумя корпусами. Небо — узкая полоса.",
      "category": "architecture",
      "collection": "lost-geometry",
      "tone": "MONO",
      "tags": "towers looking up sky vertical",
      "ratio": "2:3",
      "w": 1333,
      "h": 2000,
      "orient": "v",
      "ph": "#686868",
      "widths": {
        "640": 427,
        "1280": 853,
        "2000": 1333
      }
    },
    {
      "id": "0009",
      "index": 9,
      "title": "SEVEN PORTALS",
      "text": "Семь арок уходят вглубь, каждая на тон темнее предыдущей.",
      "category": "architecture",
      "collection": "lost-geometry",
      "tone": "COLOR",
      "tags": "arches portals corridor",
      "ratio": "3:2",
      "w": 2000,
      "h": 1333,
      "orient": "h",
      "ph": "#97928a",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0010",
      "index": 10,
      "title": "NOON, WALL",
      "text": "Полдень. Тень режет стену пополам.",
      "category": "architecture",
      "collection": "lost-geometry",
      "tone": "COLOR",
      "tags": "wall shadow noon light",
      "ratio": "3:2",
      "w": 2000,
      "h": 1333,
      "orient": "h",
      "ph": "#736d65",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0011",
      "index": 11,
      "title": "SIX RIDGES",
      "text": "Шесть хребтов в дымке — каждый следующий светлее.",
      "category": "nature",
      "collection": "silent-nature",
      "tone": "MONO",
      "tags": "mountains ridges haze panorama landscape",
      "ratio": "21:9",
      "w": 2000,
      "h": 857,
      "orient": "pano",
      "ph": "#7b7b7b",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0012",
      "index": 12,
      "title": "WIND COPY",
      "text": "Ветер переписывает дюны слой за слоем.",
      "category": "nature",
      "collection": "silent-nature",
      "tone": "COLOR",
      "tags": "dunes desert sand wind",
      "ratio": "3:2",
      "w": 2000,
      "h": 1333,
      "orient": "h",
      "ph": "#5c4d42",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0013",
      "index": 13,
      "title": "THIN FOREST",
      "text": "Лес в тумане: стволы теряют плотность по мере удаления.",
      "category": "nature",
      "collection": "silent-nature",
      "tone": "MONO",
      "tags": "forest fog trees",
      "ratio": "4:5",
      "w": 1600,
      "h": 2000,
      "orient": "v",
      "ph": "#676767",
      "widths": {
        "640": 512,
        "1280": 1024,
        "2000": 1600
      }
    },
    {
      "id": "0014",
      "index": 14,
      "title": "HIGH MOON",
      "text": "Луна над тёмным хребтом. Почти пустой кадр.",
      "category": "nature",
      "collection": "silent-nature",
      "tone": "COLOR",
      "tags": "moon night sky ridge",
      "ratio": "1:1",
      "w": 2000,
      "h": 2000,
      "orient": "sq",
      "ph": "#0a0b0f",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0015",
      "index": 15,
      "title": "POLAR NOISE",
      "text": "Полярное сияние над чёрной линией гор.",
      "category": "nature",
      "collection": "silent-nature",
      "tone": "COLOR",
      "tags": "aurora polar sky night stars",
      "ratio": "16:9",
      "w": 2000,
      "h": 1125,
      "orient": "h",
      "ph": "#0b131d",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0016",
      "index": 16,
      "title": "HORIZON 0.48",
      "text": "Длинная выдержка стирает волны. Остаются горизонт и камень.",
      "category": "water",
      "collection": "low-frequency",
      "tone": "MONO",
      "tags": "ocean sea horizon long exposure rock",
      "ratio": "21:9",
      "w": 2000,
      "h": 857,
      "orient": "pano",
      "ph": "#707070",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0017",
      "index": 17,
      "title": "PIER INTO WHITE",
      "text": "Пирс уходит в туман и растворяется на середине кадра.",
      "category": "water",
      "collection": "low-frequency",
      "tone": "MONO",
      "tags": "pier fog sea",
      "ratio": "3:2",
      "w": 2000,
      "h": 1333,
      "orient": "h",
      "ph": "#b9b9b9",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0018",
      "index": 18,
      "title": "CONCENTRIC",
      "text": "Круги на тёмной воде, снятые сверху.",
      "category": "water",
      "collection": "low-frequency",
      "tone": "COLOR",
      "tags": "ripples water circles",
      "ratio": "1:1",
      "w": 2000,
      "h": 2000,
      "orient": "sq",
      "ph": "#1d262d",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0019",
      "index": 19,
      "title": "WINDOW, RAIN",
      "text": "Капли на стекле, за ним — размытые огни.",
      "category": "water",
      "collection": "low-frequency",
      "tone": "COLOR",
      "tags": "rain glass window drops lights",
      "ratio": "4:5",
      "w": 1600,
      "h": 2000,
      "orient": "v",
      "ph": "#222024",
      "widths": {
        "640": 512,
        "1280": 1024,
        "2000": 1600
      }
    },
    {
      "id": "0020",
      "index": 20,
      "title": "LEAK",
      "text": "Засветка плёнки: cyan, фиолетовый и тёплый край.",
      "category": "abstract",
      "collection": "fragments",
      "tone": "COLOR",
      "tags": "light leak film colour",
      "ratio": "4:5",
      "w": 1600,
      "h": 2000,
      "orient": "v",
      "ph": "#3b4964",
      "widths": {
        "640": 512,
        "1280": 1024,
        "2000": 1600
      }
    },
    {
      "id": "0021",
      "index": 21,
      "title": "0.618",
      "text": "Зерно и одна линия на высоте золотого сечения.",
      "category": "abstract",
      "collection": "fragments",
      "tone": "COLOR",
      "tags": "grain line golden ratio minimal",
      "ratio": "3:2",
      "w": 2000,
      "h": 1333,
      "orient": "h",
      "ph": "#262727",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0022",
      "index": 22,
      "title": "CARRIER LOST",
      "text": "Потерянный сигнал: строки сдвигаются и рвутся.",
      "category": "abstract",
      "collection": "fragments",
      "tone": "COLOR",
      "tags": "glitch signal noise lines",
      "ratio": "16:9",
      "w": 2000,
      "h": 1125,
      "orient": "h",
      "ph": "#102832",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0023",
      "index": 23,
      "title": "INTERFERENCE",
      "text": "Две системы кругов накладываются и рождают третью.",
      "category": "abstract",
      "collection": "fragments",
      "tone": "MONO",
      "tags": "moire interference circles pattern",
      "ratio": "1:1",
      "w": 2000,
      "h": 2000,
      "orient": "sq",
      "ph": "#343434",
      "widths": {
        "640": 640,
        "1280": 1280,
        "2000": 2000
      }
    },
    {
      "id": "0024",
      "index": 24,
      "title": "AFTERNOON FRAME",
      "text": "Свет из окна ложится на стену искажённой решёткой.",
      "category": "abstract",
      "collection": "fragments",
      "tone": "COLOR",
      "tags": "window shadow light wall",
      "ratio": "4:5",
      "w": 1600,
      "h": 2000,
      "orient": "v",
      "ph": "#594c3e",
      "widths": {
        "640": 512,
        "1280": 1024,
        "2000": 1600
      }
    }
  ]
};
