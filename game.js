// arrays where instances of classes will be stored
let listOfPokemon = []
let pokemonSkills = []

// Array that by randomly picking one of its elements will determine whether the pokémon can perform its attack or will miss it.
const possibilityToAttack = [true, false, true]

// ---------------Pokemon class---------------
class Pokemon {
    constructor(name, type){
        this.name = name.toUpperCase()
        this.type = type
        this.health = 100
        this.magic = 100
        this.level = 1
        this.exp = 0
        this.skills = []
        Pokemon.addPokemon(this)
    }

    // A method to push each instance of the class into an array (listOfPokemon)
    static addPokemon(pokemon) {
        listOfPokemon.push(pokemon)
    }

    // A simple math to calculate how many points the pokemon will earn regarding his health after battle
    get expPoints() {
        let expAverage = 100 + ((this.level - 1) * 25);
        let oneThird = expAverage / 3
        if (this.health > oneThird*2) {
            return 40
        } else if (this.health > oneThird) {
            return 30
        } else {
            return 15
        }
    }

    // Method to add the experience points the pokemon has earned after battle. If it has earned more than 100 points, it'll grow in level
    addExp(x) {
        this.exp += x
        console.log(`${this.name} gained ${x} EXP. Points!`);
        if (this.exp >= 100) {
            this.level += 1
            console.log(`${this.name} grew to level ${this.level}!`);
            this.exp -= 100
        }
    }

    // method to teach the pokemon a new skill
    learnAttackSkill(skill) {
        this.skills.push(skill)
        console.log(`${this.name} has learned ${skill.name}!`);
    }

    // method to be used by the pokemon to perform an attack
    attack(target) {
        // selects randomly one skill from the skills that the Pokemon has learnt
        let skill = randomPicker(this.skills)
        if (this.health > 0) {
            if (this.magic >= skill.magic) {
                // if randomPicker get true from the array[true,false,true] the pokemon can perform the attack, otherwise it's gonna missed it
                // increases/decreases the damage caused by his attack depending on his and his opponent's type.
                if (randomPicker(possibilityToAttack)) {
                    if ((this.type === 'water' && target.type === 'fire') || (this.type === 'electric' && target.type === 'water') || (this.type === 'fire' && target.type === 'grass') || (this.type === 'grass' && target.type === 'water')) {
                        target.health -= skill.damage * 1.4;
                        this.magic -= skill.magic * 0.6;
                    } else if (((this.type === 'fire' && target.type === 'water') || (this.type === 'water' && target.type === 'electric') || (this.type === 'grass' && target.type === 'fire') || (this.type === 'water' && target.type === 'grass'))) {
                        target.health -= skill.damage * 0.6;
                        this.magic -= skill.magic * 1.4;
                    } else {
                        target.health -= skill.damage;
                        this.magic -= skill.magic;
                    }

                    console.log(`${this.name} used ${skill.name}!`);
                    console.log(`${target.name} got ${skill.damage} damage\n`)

                    if (target.health <= 0) {
                        console.log(`${target.name} fainted!`);
                        console.log(`${this.name} wins!`);                        
                    }
                } else {
                    console.log(`${this.name}'s attack missed!\n`);
                }  
            } else {
                console.log(`${this.name} doesn't have enough energy to perform ${skill.name}!`);
            }
        }
    }

    // Method which is gonna show pokemon's status
    showStatus(){
        console.log(`${this.name} (lvl ${this.level}) => health: ${this.health} | magic: ${this.magic} | exp: ${this.exp}/100`);
    }

    // method to recover pokemon's health & magic after battle
    recover() {
        this.health = 100;
        this.magic = 100;
        if (this.level > 1) {
            this.health += ((this.level - 1) * 25)
            this.magic += ((this.level - 1) * 25)
        }
    }
}


// ---------------Skill class---------------

class AttackSkill {
    constructor(name, damage, magic, type) {
        this.name = name.toUpperCase()
        this.damage = damage
        this.magic = magic
        this.type = type
        AttackSkill.addSkill(this)
    }

    static addSkill(skill) {
        pokemonSkills.push(skill)
    }
}


// ---------------Functions---------------
randomPicker = arr => arr[Math.floor(Math.random() * arr.length)];

// passing Pokemon's array and Skills array to the function each pokemon will learn the skills of its type.
pokemonGym = (participants, skills) => skills.forEach(skill => participants.forEach(pokemon => { if(skill.type === pokemon.type) { pokemon.learnAttackSkill(skill) }}));


startPokemonBattle = opponents => {
    let whoStarts = randomPicker(opponents);
    let whoNotStarts = opponents.filter(pokemon => pokemon !== whoStarts)
    whoNotStarts = whoNotStarts[0]
    console.log('Starting the battle.......\n+ + + + + FIGHT! + + + + +\n');
    for (let i = 0; whoStarts.health > 0 && whoNotStarts.health > 0; i++) {
        whoStarts.attack(whoNotStarts)
        whoNotStarts.attack(whoStarts)
    }
    if (whoStarts.health <= 0) {
        const earnedExp = whoNotStarts.expPoints
        whoNotStarts.addExp(earnedExp)
        whoNotStarts.recover()
        //winners.push(whoNotStarts)
        return whoNotStarts
    } else if (whoNotStarts.health <= 0) {
        const earnedExp = whoStarts.expPoints
        whoStarts.addExp(earnedExp)
        whoStarts.recover()
        //winners.push(whoStarts)
        return whoStarts
    }

}

// ---------------Pokemon's instances---------------
let pikachu = new Pokemon("pikachu", 'electric');
let magnemite = new Pokemon("magnemite", 'electric');
let voltorb = new Pokemon("voltorb", 'electric');
let zapdos = new Pokemon("zapdos", 'electric');
let bulbasaur = new Pokemon("bulbasaur", 'grass');
let oddish = new Pokemon("oddish", 'grass');
let bellsprout = new Pokemon("bellsprout", 'grass');
let chikorita = new Pokemon("chikorita", 'grass');
let charmander = new Pokemon('charmander', 'fire');
let vulpix = new Pokemon('vulpix', 'fire');
let magmar = new Pokemon('magmar', 'fire');
let cyndaquil = new Pokemon('cyndaquil', 'fire');
let squirtle = new Pokemon('squirtle', 'water');
let psyduck = new Pokemon('psyduck', 'water');
let totodile = new Pokemon('totodile', 'water');
let vaporeon = new Pokemon('vaporeon', 'water');

// ---------------Skill's instances---------------
// (ELECTRIC)
let chargeBeam = new AttackSkill("charge beam", 20, 10, 'electric');
let thunderPunch = new AttackSkill("thunder punch", 25, 15, 'electric');
let thunderBolt = new AttackSkill("thunderbolt", 30, 20, 'electric');
let zapCannon = new AttackSkill("zap cannon", 40, 30, 'electric');
let catastropika = new AttackSkill ("catastropika", 50, 45, 'electric'); 
// (GRASS)
let razorLeaf = new AttackSkill ("razor leaf", 20, 10, 'grass');
let appleAcid = new AttackSkill ("apple acid", 25, 15, 'grass');
let poisonSeed = new AttackSkill ("poison seed", 30, 20, 'grass');
let solarBeam = new AttackSkill ("solar beam", 40, 30, 'grass');
let leafStorm = new AttackSkill ("leaf storm", 50, 45, 'grass'); 
// (FIRE)
let firePunch = new AttackSkill ("fire punch", 20, 10, 'fire');
let flamethrower = new AttackSkill("flamethrower", 25, 15, 'fire');
let magmaStorm = new AttackSkill ("magma storm", 30, 20, 'fire');
let fireBlast = new AttackSkill ("fireblast", 40, 30, 'fire');
let blastBurn = new AttackSkill ("blastburn", 50, 45, 'fire'); 
// (WATER)
let surf = new AttackSkill ("surf", 20, 10, 'water');
let waterGun = new AttackSkill ("water gun", 25, 15, 'water');
let bubbleBeam = new AttackSkill ("bubblebeam", 30, 20, 'water');
let waterfall = new AttackSkill ("waterfall", 40, 30, 'water');
let hydroCannon = new AttackSkill ("hydro cannon", 50, 45, 'water'); 



// ================ TEST ================
// pikachu.learnAttackSkill(thunderBolt);
// bulbasaur.learnAttackSkill(poisonSeed);
// pikachu.attack(bulbasaur);
// bulbasaur.attack(pikachu);
// pikachu.attack(bulbasaur);
// bulbasaur.attack(pikachu);
// pikachu.attack(bulbasaur);
// bulbasaur.attack(pikachu);
// pikachu.attack(bulbasaur);
// bulbasaur.attack(pikachu);
// pikachu.attack(bulbasaur);
// bulbasaur.attack(pikachu);
// pikachu.showStatus();
// bulbasaur.showStatus();
// pikachu.recover();
// bulbasaur.recover();
// pikachu.showStatus();
// bulbasaur.showStatus();
// pokemonGym([pikachu, bulbasaur, charmander], [chargeBeam, thunderPunch, razorLeaf, solarBeam, firePunch, fireBlast, waterGun, hydroCannon])