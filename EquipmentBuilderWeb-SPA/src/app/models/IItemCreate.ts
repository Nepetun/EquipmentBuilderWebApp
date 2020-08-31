export interface IItemCreate {
    // item
    id: number;
    itemName: string;
    minHeroLvl: number;
    // itemstats
    hitPoints: number;
    hitPointsRege: number;
    mana: number;
    manaRegen: number;
    range: number;
    attackDamage: number;
    attackSpeed: number;
    armour: number;
    magicResistance: number;
    movementSpeed: number;
    abillityPower: number;
    cooldownReduction: number;
    armourPenetration: number;
    armourPenetrationProc: number;
    magicPenetration: number;
    magicPenetrationProc: number;
    lifeSteal: number;
    apLifeSteal: number;
    tenacity: number;
    criticalChance: number;
    additionalPotionPower: number;
    additionalHitPointsPerHit: number;
    additionalGoldPerTenSec: number;
    description: string;
    totalCost: number;
}



