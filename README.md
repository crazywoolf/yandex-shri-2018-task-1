**Инструменты:**
babel проверка стиля кода
Inspect Google Chrome для просмотра HTML кода текущей страницы и js консоли
git для работы с репозиторием
Cmder для работы с пакетами (npm)

**Ошибки: [файл | описание | решение]**
1. **Файл:** public/index.css 
**Описание:** Не задана высота контейнера #map 
**Решение:** 
```
#map { height: 100%; }
```

2. **Файл:** src/chart.js 
**Описание:** По оси Y было недостаточно параметров 
**Решение:** Добавить параметры:
```
    suggestedMin: 0,
	suggestedMax: Math.max(...data),
	stepSize: 2
```

3. **Файл:** src/details.js 
**Описание:** Объявление методов через стрелочные функции привело к потере контекста this 
**Решение:** Изменить декларацию функции на:
```
function() 
```

4. **Файл:** src/map.js 
**Описание:** Некорректное инициализированы балуны, согласно API
**Решение:** Установка параметров произведена с использованием сетеров. Добавлены параметры:
```
openBalloonOnClick: true,
	balloonPanelMaxMapArea: 0
```

5. **Файл:** src/map.js 
**Описание:** Лишняя установка пресета для кластеров
**Решение:** Удалить строку: 
```
objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
```

6. **Файл:** utils/generate-data.js 
**Описание:** Перепутаны координаты Москвы
**Решение:** поменять значения местами:
```
lat: 37.62102 + rand() * 0.180189,
	long: 55.755222 + rand() * 0.12242
```