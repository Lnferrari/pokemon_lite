// arrays where instances of classes will be stored
let listOfPokemon = []
let pokemonSkills = []

// Array that by randomly picking one of its elements will determine whether the pokémon can perform its attack or will miss it.
const possibilityToAttack = [true, false, true]

// array to store the winners of each round
let winners = [];

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
            // if the pokemon has enough magic to perform the attack it'll do it, otherwise it'll not be able to perform it and a message will be printed explaining why.
            if (this.magic >= skill.magic) {
                // if randomPicker get true from the array[true,false,true] the pokemon can perform the attack, otherwise it's gonna missed it
                if (randomPicker(possibilityToAttack)) {
                    // increases, decreases or does't the damage caused by his attack depending on his and his opponent's type.
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
        // if the Pokemon has a lvl greater than 1, it'll have a greater amount of life and magic (+25 for each level)
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

    // A method to push each instance of the class into an array (pokemonSkills)
    static addSkill(skill) {
        pokemonSkills.push(skill)
    }
}


// ---------------Functions---------------
randomPicker = arr => arr[Math.floor(Math.random() * arr.length)];

// passing Pokemon's array and Skills array to the function each pokemon will learn the skills of its type.
pokemonGym = (participants, skills) => skills.forEach(skill => participants.forEach(pokemon => { if(skill.type === pokemon.type) { pokemon.learnAttackSkill(skill) }}));

// Recursive function to execute battles between 2 pokemon.
// The function takes an array as an argument from which it will remove the first and last pokemon from the list each time the function is called
startPokemonBattle = participants => {
    // base case
    if (participants.length === 0) {
        return
    }
    // remove the first and last pokemon from the list each time the function is called
    let opponents = [participants.shift(), participants.pop()]
    // Choosing randomly who will be the first to attack
    let whoStarts = randomPicker(opponents);
    let whoNotStarts = opponents[0] !== whoStarts ? opponents[0] : opponents[1];
    console.log(`\n\n\t * * *  Let's see which will be the next battle  * * *\n\t * * * * * *  LET'S GET READY TO RUMBLE!!  * * * * * *\n\n\t =-=-=-=-=-=-=-=  ${whoStarts.name}  Vs  ${whoNotStarts.name}  =-=-=-=-=-=-=-= \n\n`);
    console.log('\nStarting the battle.......\n+ + + + + FIGHT! + + + + +\n');
    // As long as both pokemon have more than 0 health points continues the iteration for them to perform their attacks
    for (let i = 0; whoStarts.health > 0 && whoNotStarts.health > 0; i++) {
        whoStarts.attack(whoNotStarts)
        whoNotStarts.attack(whoStarts)        
    }
    // once one of the opponents loses all his health points...
    if (whoStarts.health <= 0) {
        // calls the getter to find out how many experience points (according to the remaining health points) the pokemon will earn
        const earnedExp = whoNotStarts.expPoints
        // ..and then it is added to the pokemon with the addExp() method.
        whoNotStarts.addExp(earnedExp)
        whoNotStarts.showStatus()
        // console.log(`\n${whoNotStarts.name} advances to the next round!\n`);
        // resets the values of health and magic
        whoNotStarts.recover()
        // pushes the winner of the battle into the winners array
        winners.push(whoNotStarts)
        return startPokemonBattle(participants)
    } else if (whoNotStarts.health <= 0) {
        const earnedExp = whoStarts.expPoints
        whoStarts.addExp(earnedExp)
        whoStarts.showStatus()
        // console.log(`\n${whoStarts.name} advances to the next round!\n`);
        whoStarts.recover()
        winners.push(whoStarts)
        return startPokemonBattle(participants)
    }
}

// function that initialises the tournament
startTournament = () => {
    let participants = [];
    
    // const howManyPokemon = prompt('How many Pokemon do you want to participate in the tournament (2-4-8-16)? ')
    const howManyPokemon = 16
    if (howManyPokemon % 2 !== 0) {
        howManyPokemon += 1
    }
    console.log('selecting the participants...\n');
    // chooses randomly he participants of the tournament according to the desired number of them
    for (let i = 1; i <= howManyPokemon; i++) {
        let participant = randomPicker(listOfPokemon)
        if (!participants.includes(participant)) {
            console.log(`- Participant ${i}: ${participant.name}`);
            participants.push(participant)
        } else {
            i--;
        }
    }
    console.log('\nThe Pokemon are training and learning new skills to be ready for the tournament.\nThey will be ready in a while...\n\n');

    // each pokemon of the participants array will learn the skills of its type.
    pokemonGym(participants, pokemonSkills)

    console.log('\n\n\t#####################################################\n\t##\t\t\t\t\t\t   ##\n\t##   WELCOME TO THE POKEMON MASTER CHAMPIONSHIP!   ##\n\t##\t\t\t\t\t\t   ##\n\t#####################################################\n\n');
    
    console.log(`\n\n\t+ + + + + + + + + + + + + + + + + + + + + + + + + + + +\n\t+ + + + + + + + + +   FIRST ROUND   + + + + + + + + + +\n\t+ + + + + + + + + + + + + + + + + + + + + + + + + + + +`);
    // starts the recursive function in order to get the winners
    startPokemonBattle(participants)
    // depending on the number of winners (after the first round) the corresponding case will be executed.
    while (winners.length > 1) {
        let winners2 = [...winners]
        winners = []
        switch (winners2.length) {
            case 8:
                console.log(`\n\n\t+ + + + + + + + + + + + + + + + + + + + + + + + + + + +\n\t+ + + + + + + + +   QUARTER  FINALS   + + + + + + + + +\n\t+ + + + + + + + + + + + + + + + + + + + + + + + + + + +`);
                startPokemonBattle(winners2)
                break;
            case 4:
                console.log(`\n\n\t+ + + + + + + + + + + + + + + + + + + + + + + + + + + +\n\t+ + + + + + + + + +   SEMI-FINALS   + + + + + + + + + +\n\t+ + + + + + + + + + + + + + + + + + + + + + + + + + + +`);
                startPokemonBattle(winners2)
                break;
            case 2:
                console.log(`\n\n\t+ + + + + + + + + + + + + + + + + + + + + + + + + + + +\n\t+ + + + + +   WELCOME TO THE FINAL BATTLE   + + + + + +\n\t+ + + + + + + + + + + + + + + + + + + + + + + + + + + +`);
                startPokemonBattle(winners2)
        }
    }
    console.log(`\n\t#########################################\n\t#\t\t\t\t\t#\n\t#\t${winners[0].name} is the CHAMPION!\t#\n\t#\t\t\t\t\t#\n\t#########################################`);
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



startTournament()