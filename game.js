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
                    console.log(`${target.name} got ${skill.damage} damage`)

                    if (target.health <= 0) {
                        console.log(`${target.name} fainted!`);
                        console.log(`${this.name} wins!`);                        
                    }
                } else {
                    console.log(`${this.name}'s attack missed!`);
                }  
            } else {
                console.log(`${this.name} doesn't have enough energy to perform ${skill}!`);
            }
        }
    }

    // Method which is gonna show pokemon's status
    showStatus(){
        console.log(`${this.name} (lvl ${this.level}) => health: ${this.health} | magic: ${this.magic}`);
    }

    // method to recover pokemon's health & magic after battle
    recover() {
        this.health = 100;
        this.magic = 100;
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





// ---------------Pokemon's instances---------------
let pikachu = new Pokemon("pikachu", 'electric');
let bulbasaur = new Pokemon("bulbasaur", 'grass');
let charmander = new Pokemon('charmander', 'fire');
let squirtle = new Pokemon('squirtle', 'water');

// ---------------Skill's instances---------------
let thunderBolt = new AttackSkill("thunderbolt", 30, 20, 'electric');
let poisonSeed = new AttackSkill ("poison seed", 30, 20, 'grass');
let magmaStorm = new AttackSkill ("magma storm", 30, 20, 'fire');
let bubbleBeam = new AttackSkill ("bubblebeam", 30, 20, 'water');



// =======================================
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