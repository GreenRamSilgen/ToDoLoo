import dragula from 'dragula'


let drake = dragula();
document.querySelectorAll(".b-card__body").forEach((block) => {drake.containers.push(block);});
// drake.containers.push(document.querySelector("#container1"));
// drake.containers.push(document.querySelector("#container2"));
// drake.containers.push(document.querySelector("#container3"));


// drake.containers.push(document.querySelector("#left"));
// drake.containers.push(document.querySelector("#center"));
// drake.containers.push(document.querySelector("#right"));