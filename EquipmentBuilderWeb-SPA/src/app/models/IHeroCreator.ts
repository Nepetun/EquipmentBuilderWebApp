export interface IHeroCreator {
    id: number;
    heroName: string;
    hitPoints: number;
    hitPointsRegen: number;
    mana: number;
    manaRegen: number;
    range: number;
    attackDamage: number;
    attackSpeed: number;
    armour: number;
    magicResistance: number;
    movementSpeed: number;
    abilityPower: number;
    cooldownReduction: number;
    armourPenetration: number;
    armourPenetrationProc: number;
    magicPenetration: number;
    magicPenetrationProc: number;
    lifeSteal: number;
    apLifeSteal: number;
    tenacity: number;
    criticalChance: number;
    gameId: number;
}
