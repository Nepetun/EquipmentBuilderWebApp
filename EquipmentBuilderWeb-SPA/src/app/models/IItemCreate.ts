export interface IItemCreate {
  // item
  id: number;
  itemName: string;
  minHeroLvl: number;
  // itemstats
  itemId: number;
  price: number;
  additionalHp: number;
  additionalDmg: number;
  additionalLifeSteal: number;
  additionalAp: number;
  additionalManaRegen: number;
  additionalPotionPower: number;
  additionalHitPointsPerHit: number;
  additionalGoldPerTenSec: number;
  additionalBasicManaRegenPercentage: number;
  additionalBasicHpRegenPercentage: number;
  additionalArmour: number;
  additionalMana: number;
  additionalMagicResist: number;
  additionalCooldownReduction: number;
  additionalAttackSpeed: number;
  additionalMovementSpeed: number;
  additionalCriticalChance: number;
  descriptions: string;
  gameId: number;
}
