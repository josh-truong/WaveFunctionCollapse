const tileImages = [];
const DIM = 15;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let wfc = new WFC(DIM);

function preload() {
  const path = 'tiles/circuit';
  for (let i = 0; i < 14; i++) {
    tileImages[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup() {
  var canvas = createCanvas(window.innerHeight, window.innerHeight);
  canvas.parent("canvas");
  // frameRate(5);
  // randomSeed(2);

  // Loaded and created the tiles
  wfc.AddTile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA']);
  wfc.AddTile(tileImages[1], ['BBB', 'BBB', 'BBB', 'BBB']);
  wfc.AddTile(tileImages[2], ['BBB', 'BCB', 'BBB', 'BBB']);
  wfc.AddTile(tileImages[3], ['BBB', 'BDB', 'BBB', 'BDB']);
  wfc.AddTile(tileImages[4], ['ABB', 'BCB', 'BBA', 'AAA']);
  wfc.AddTile(tileImages[5], ['ABB', 'BBB', 'BBB', 'BBA']);
  wfc.AddTile(tileImages[6], ['BBB', 'BCB', 'BBB', 'BCB']);
  wfc.AddTile(tileImages[7], ['BDB', 'BCB', 'BDB', 'BCB']);
  wfc.AddTile(tileImages[8], ['BDB', 'BBB', 'BCB', 'BBB']);
  wfc.AddTile(tileImages[9], ['BCB', 'BCB', 'BBB', 'BCB']);
  wfc.AddTile(tileImages[10], ['BCB', 'BCB', 'BCB', 'BCB']);
  wfc.AddTile(tileImages[11], ['BCB', 'BCB', 'BBB', 'BBB']);
  wfc.AddTile(tileImages[12], ['BBB', 'BCB', 'BBB', 'BCB']);
  wfc.AddTile(tileImages[13], ['BCB', 'BCB', 'BCB', 'BCB']);

  wfc.Run();
}


function draw() {
  background(0);
  const w = width / DIM;
  const h = height / DIM;

  for (let i = 0; i < DIM * DIM; i++) {
    const { row, col } = wfc.grid.TranslateIdx(i);
    const cell = wfc.grid.GetCell(i);
    if (cell.collapsed) {
      const index = cell.options[0];
      image(wfc.tiles[index].img, col * w, row * h, w, h);
    } else {
      noFill();
      stroke(51);
      rect(col * w, row * h, w, h);
    }
    if (wfc.nCollapsed < DIM * DIM) {
      stroke(255);
      rect(col * w, row * h, w, h);
      textSize(10);
      text(`${cell.options.length}`, col * w + w / 2, row * h + h / 2)
    }
  }

  try { wfc.StepAnimate(); }
  catch (e) { wfc.ReRun(); }
}