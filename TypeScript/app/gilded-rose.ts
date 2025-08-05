import { Item } from "./models/item";
import { ItemType } from "./models/item-type";

export class GildedRose {
  items: Array<Item>;
  maximumQuality = 50;
  minimumQuality = 0;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Item[] {
    for (const item of this.items) {
      switch (item.name) {
        case ItemType.Sulfuras:
          // Legendary item, no changes
          break;

        case ItemType.AgedBrie:
          this.updateAgedBrie(item);
          break;

        case ItemType.BackstagePass:
          this.updateBackstagePass(item);
          break;

        case ItemType.Conjured:
          this.updateConjuredItem(item);
          break;

        default:
          this.updateNormalItem(item);
          break;
      }
    }

    return this.items;
  }

  private updateNormalItem(item: Item) {
    item.sellIn--;
    const degradation = item.sellIn < 0 ? 2 : 1;
    item.quality = Math.max(this.minimumQuality, item.quality - degradation);
  }

  private updateAgedBrie(item: Item) {
    item.sellIn--;
    const increase = item.sellIn < 0 ? 2 : 1;
    item.quality = Math.min(this.maximumQuality, item.quality + increase);
  }

  private updateBackstagePass(item: Item) {
    item.sellIn--;

    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }

    let increase = 1;
    if (item.sellIn < 5) increase = 3;
    else if (item.sellIn < 10) increase = 2;

    item.quality = Math.min(this.maximumQuality, item.quality + increase);
  }

  private updateConjuredItem(item: Item) {
    item.sellIn--;

    const degradation = item.sellIn < 0 ? 4 : 2;
    item.quality = Math.max(this.minimumQuality, item.quality - degradation);
  }
}
