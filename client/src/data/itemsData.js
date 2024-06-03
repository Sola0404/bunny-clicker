import cursorImage from "../assets/shopItems/cursor.png";
import hayImage from "../assets/shopItems/hay.png";
import carrotImage from "../assets/shopItems/carrot.png";
import farmImage from "../assets/shopItems/farm.png";
import gardenImage from "../assets/shopItems/garden.png";
import vegetableImage from "../assets/shopItems/vegetable.png";
import treatImage from "../assets/shopItems/treat.png";
import grandmaImage from "../assets/shopItems/grandma.png";
import houseImage from "../assets/shopItems/house.png";
import poopImage from "../assets/shopItems/poop.png";
import toiletImage from "../assets/shopItems/toilet.png";
import orchardImage from "../assets/shopItems/orchard.png";
import palaceImage from "../assets/shopItems/palace.png";

const itemsData = [
  {
    id: "cursor",
    name: "Cursor",
    image: cursorImage,
    cost: 15,
    increment: 1,
    amount: 0,
    upgrade: [{
      name: "Stone Cursor",
      description: "Cursors are twice as efficient.",
      cost: 300,
      increment: 2,
      bought: false,
    },
    {
      name: "Iron Cursor",
      description: "Cursors are twice as efficient.",
      cost: 1200,
      increment: 4,
      bought: false,
    },]
  },
  {
    id: "hay",
    name: "Hay",
    image: hayImage,
    cost: 50,
    increment: 2,
    amount: 0,
    upgrade: [{
      name: "Oaten Hay",
      description: "Hay is twice as efficient.",
      cost: 1000,
      increment: 4,
      bought: false,
    },
    {
      name: "Alfalfa Hay",
      description: "Hay is twice as efficient.",
      cost: 4000,
      increment: 8,
      bought: false,
    }]
  },
  {
    id: "carrot",
    name: "Carrot",
    image: carrotImage,
    cost: 100,
    increment: 4,
    amount: 0,
    upgrade: [{
      name: "Organic Carrot",
      description: "Carrots are twice as efficient.",
      cost: 2000,
      increment: 8,
      bought: false,
    }]
  },
  {
    id: "vegetable",
    name: "Vegetable",
    image: vegetableImage,
    cost: 200,
    increment: 8,
    amount: 0,
    upgrade: [{
      name: "Organic Vegetable",
      description: "Vegetables are twice as efficient.",
      cost: 4000,
      increment: 16,
      bought: false,
    }]
  },
  {
    id: "treat",
    name: "Treat",
    image: treatImage,
    cost: 500,
    increment: 16,
    amount: 0,
    upgrade: [{
      name: "Joint Treat",
      description: "Treats are twice as efficient.",
      cost: 8000,
      increment: 32,
      bought: false,
    }]
  },
  {
    id: "grandma",
    name: "Grandma",
    image: grandmaImage,
    cost: 1000,
    increment: 32,
    amount: 0,
    upgrade: [{
      name: "Wise Grandma",
      description: "Grandmas are twice as efficient.",
      cost: 16000,
      increment: 64,
      bought: false,
    }]
  },
  {
    id: "house",
    name: "House",
    image: houseImage,
    cost: 2000,
    increment: 64,
    amount: 0,
    upgrade: [{
      name: "Mansion",
      description: "Houses are twice as efficient.",
      cost: 32000,
      increment: 128,
      bought: false,
    }]
  },
  {
    id: "poop",
    name: "Poop",
    image: poopImage,
    cost: 4000,
    increment: 128,
    amount: 0,
    upgrade: [{
      name: "Nutrient-Rich Poop",
      description: "Poop is twice as efficient.",
      cost: 64000,
      increment: 256,
      bought: false,
    }]
  },
  {
    id: "toilet",
    name: "Toilet",
    image: toiletImage,
    cost: 8000,
    increment: 256,
    amount: 0,
    upgrade: [{
      name: "Bidet",
      description: "Toilets are twice as efficient.",
      cost: 128000,
      increment: 512,
      bought: false,
    }]
  },
  {
    id: "farm",
    name: "Farm",
    image: farmImage,
    cost: 16000,
    increment: 512,
    amount: 0,
    upgrade: [{
      name: "Ranch",
      description: "Farms are twice as efficient.",
      cost: 32000,
      increment: 1024,
      bought: false,
    }]
  },
  {
    id: "garden",
    name: "Garden",
    image: gardenImage,
    cost: 32000,
    increment: 1024,
    amount: 0,
    upgrade: [{
      name: "Botanical Garden",
      description: "Gardens are twice as efficient.",
      cost: 64000,
      increment: 2048,
      bought: false,
    }]
  },
  {
    id: "orchard",
    name: "Orchard",
    image: orchardImage,
    cost: 64000,
    increment: 2048,
    amount: 0,
    upgrade: [{
      name: "Fruit Orchard",
      description: "Orchards are twice as efficient.",
      cost: 128000,
      increment: 4096,
      bought: false,
    }]
  },
  {
    id: "palace",
    name: "Palace",
    image: palaceImage,
    cost: 128000,
    increment: 4096,
    amount: 0,
    upgrade: [{
      name: "Castle",
      description: "Palaces are twice as efficient.",
      cost: 256000,
      increment: 8192,
      bought: false,
    }]
  }
];

export default itemsData;