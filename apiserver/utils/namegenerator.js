// see http://stackoverflow.com/questions/7666516/fancy-name-generator-in-node-js
//replace "_" by "", added strings with '' rather than ""

  var adjs = ["autumn", "hidden", "bitter", "misty", "silent", "dry",
  "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
  "winter", "patient", "twilight", "dawn", "crimson", "wispy", 
  "blue", "broken", "cold", "damp", "falling", "frosty", "green",
  "long", "late", "lingering", "bold", "little", "morning", "muddy",
  "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
  "wandering", "withered", "wild", "black", "young", "holy", "solitary",
  "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
  "polished", "ancient", "purple", "lively", 
  'bubble', 'insta', 'alpha', 'glowing', 'ware', 'round', 'rusty', 'shiny',
  'deep', 'orange', 'orchid', 'jelly', 'night', 'amber', 'foggy', 'sylvan',
  'auric', 'lunar', 'neural', 'sonic', 'solar', 'digital',
  'fancy', 'stormy', 'crazy', 'cloudy',
  'jolly', 'nice', 'deep', 'flat', 'square', 'wide',
  'huge', 'little', 'massive', 'tiny',
  'noisy', 'melodic', 'soft', 'quiet',
  'salty', 'tasty', 'juicy', 'fuzzy',
  'melted', 'shaky', 'smooth', 'sharp', 'silky', 'plastic', 'solid', 'sticky',
  'wet', 'wooden', 'yummy', 'shaggy',
  'breezy', 'curly', 'flaky', 'fluffy', 'glamorous', 'gorgeous', 'angry',
  'evil', 'lazy', 'nasty', 'naughty', 'nervous', 'nutty', 'scary', 'daffy',
  'barbarous', 'berserk', 'chubby', 'chunky', 'crabby', 'grouchy', 'brash',
  'burly', 'bumpy', 'exotic', 'fast', 'flashy', 'giddy', 'glossy', 'goofy',
  'groovy', 'grouchy', 'grumpy', 'gentle', 'giant', 'glorious', 'gusty',
  'high', 'hollow', 'jumpy', 'knotty', 'lean', 'light', 'lush', 'lucky',
  'mighty', 'meek', 'murky', 'null', 'nasty', 'naive', 'zealous', 'zippy',
  'zany', 'wacky', 'ultra', 'tracky', 'tough', 'sulky', 'sneaky', 'spiffy',
  'swanky', 'spicy', 'snotty', 'ritzy', 'robust', 'ratty', 'raspy', 'puffy',
  'puny', 'plucky', 'parched', 'odd',
  'outer', 'inner', 'edgy']

    , nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
  "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
  "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
  "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
  "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
  "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
  "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
  "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
  "frog", "smoke", "star",
  'ice', 'lab', 'move', '-o-matic', 'tron', 'izer', 'glow', 'tech', 'volt',
  'buzz', 'plus', 'live', 'curve', 'stamp',
  'way', 'up', 'out', 'fy', 'flex', 'rama',
  'gram', 'tone', 'ron', 'core', 'neutron', 'dart', 'age', 'dare',
  'orchid', 'orange', 'pick',
  'mouse', 'rat', 'squirrel', 'monkey', 'squid', 'ant', 'bat', 'bee', 'cheetah',
  'crow', 'donkey', 'duck', 'eagle', 'falcon', 'ferret', 'fox', 'shark', 'jay',
  'lion', 'koala', 'meerkat', 'narwhal', 'oryx', 'penguin', 'raven', 'serval',
  'spider', 'viper', 'wolf', 'wasp', 'sponge',
  'alder', 'apple', 'box', 'bay', 'berry', 'lilac', 'maple', 'shade',
  'rock', 'scisors', 'cutter', 'burst', 'space', ''];

console.log(adjs.length, ' * ', nouns.length, ' = ', adjs.length*nouns.length)

module.exports = function generator() {
  return adjs[Math.floor(Math.random()*(adjs.length-1))]
    +""
    +nouns[Math.floor(Math.random()*(nouns.length-1))];
}