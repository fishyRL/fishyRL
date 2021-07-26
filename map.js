function generateLevel() {
  tryTo('generate map', function () {
    return generateTiles() == randomPassableTile().getConnectedTiles().length;
  });

  generateMonsters();
  generateNPCs();

  for (let i = 0; i < 3; i++) {
    randomPassableTile().treasure = true;
  }

  if (level == numLevels)
    randomPassableTile().ring = true;
}

function generateTiles() {
  tiles = [];
  let passableTiles = 0;

  for (let i = 0; i < numTiles; i++) {
    tiles[i] = [];
    for (let j = 0; j < numTiles; j++) {

      if (level == 1) {
        if (!inBounds(i, j)) {
          tiles[i][j] = new Wall(i, j);
        } else {
          tiles[i][j] = new Floor(i, j);
          passableTiles++;
        }

      } else {
        if (Math.random() < 0.3 || !inBounds(i, j)) {
          tiles[i][j] = new Wall(i, j);
        } else {
          tiles[i][j] = new Floor(i, j);
          passableTiles++;
        }
      }
    }
  }
  return passableTiles;
}

function inBounds(x, y) {
  return x > 0 && y > 0 && x < numTiles - 1 && y < numTiles - 1;
}

function getTile(x, y) {
  if (inBounds(x, y))
    return tiles[x][y];
  else
    return new Wall(x, y);
}

function randomPassableTile() {
  let tile;
  tryTo('get random passable tile', function () {
    let x = randomRange(0, numTiles - 1);
    let y = randomRange(0, numTiles - 1);
    tile = getTile(x, y);
    return tile.passable && !tile.monster;
  });
  return tile;
}

function generateMonsters() {
  monsters = [];
  let numMonsters = level + 1;
  for (let i = 0; i < numMonsters; i++) {
    spawnMonster();
  }
}

function generateNPCs() {
  npcs = [];
  if (level == 1)
    npcs.push(new NPC(randomPassableTile(), "Yaz", ["I am the YazMan", "Look to my dungeon and despair!", "I'm so bored"]));
}

function spawnMonster() {
  let monsterType = shuffle([Dog, Rat, Crab, Beholder, Snake])[0];
  let monster = new monsterType(randomPassableTile());
  monsters.push(monster);
}