import { loadList, loadDetails } from "./api";
import { getDetailsContentLayout } from "./details";
import { createFilterControl } from "./filter";

export default function initMap(ymaps, containerId) {
  const myMap = new ymaps.Map(containerId, {
    center: [55.76, 37.64], //изменить ширину и долготу на бэке (generate-data)
    controls: [],
    zoom: 10
  });

  const objectManager = new ymaps.ObjectManager({
    clusterize: true,
    gridSize: 64,
    clusterIconLayout: "default#pieChart",
    clusterDisableClickZoom: false
  });

  objectManager.objects.options.set({
    openBalloonOnClick: true, // было false и 3 geoObject
    hideIconOnBalloonOpen: false,
    balloonContentLayout: getDetailsContentLayout(ymaps),
    balloonPanelMaxMapArea: 0 //не было
  });

  //необходимо удалить для отображения Chart'а на метке кластера objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
  myMap.geoObjects.add(objectManager); //

  loadList().then(data => {
    objectManager.add(data);
  });

  // details
  objectManager.objects.events.add("click", event => {
    const objectId = event.get("objectId");
    const obj = objectManager.objects.getById(objectId);

    objectManager.objects.balloon.open(objectId);
    
    if (!obj.properties.details) {
      loadDetails(objectId).then(data => {
        obj.properties.details = data;
        objectManager.objects.balloon.setData(obj);
      });
    }
  });

  // filters
  const listBoxControl = createFilterControl(ymaps);
  myMap.controls.add(listBoxControl);

  var filterMonitor = new ymaps.Monitor(listBoxControl.state);
  filterMonitor.add("filters", filters => {
    objectManager.setFilter(
      obj => filters[obj.isActive ? "active" : "defective"]
    );
  });
}