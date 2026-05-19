import { GildedRose } from "@/gilded-rose";
import { Item } from "../../app/models/item";
import { ItemType } from "../../app/models/item-type";

describe("Gilded Rose", () => {
  it("should handle empty item list", () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items).toEqual([]);
  });

  describe("normal items", () => {
    it("should degrade quality and sellIn", () => {
      const gildedRose = new GildedRose([new Item("Normal Item", 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    it("should degrade quality twice as fast after sellIn date", () => {
      const gildedRose = new GildedRose([new Item("Normal Item", 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });

    it("should not allow quality to be negative", () => {
      const gildedRose = new GildedRose([new Item("Normal Item", 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe("Aged Brie", () => {
    it("should increase quality", () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, 10, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(26);
    });

    it("should not increase quality above 50", () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, 10, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it("should still increase quality after sellIn date", () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, 0, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(27); // stijgt met 2 na sellIn
    });
  });

  describe("Sulfuras", () => {
    it("should not change quality or sellIn for Sulfuras", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Sulfuras, 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(80);
    });
  });

  describe("Backstage passes", () => {
    it("should increase quality by 1 when sellIn > 10", () => {
      const gildedRose = new GildedRose([
        new Item(ItemType.BackstagePass, 15, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
    });

    it("should increase quality by 2 when sellIn <= 10", () => {
      const gildedRose = new GildedRose([
        new Item(ItemType.BackstagePass, 10, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });

    it("should increase quality by 3 when sellIn <= 5", () => {
      const gildedRose = new GildedRose([
        new Item(ItemType.BackstagePass, 5, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it("should drop quality to 0 after concert", () => {
      const gildedRose = new GildedRose([
        new Item(ItemType.BackstagePass, 0, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("should not increase quality above 50", () => {
      const gildedRose = new GildedRose([
        new Item(ItemType.BackstagePass, 5, 49),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe("Conjured items", () => {
    it("should degrade quality twice as fast as normal items", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Conjured, 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(18);
    });

    it("should degrade quality four times as fast after sellIn date", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Conjured, 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(16);
    });

    it("should not allow quality to be negative", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Conjured, 5, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
});
