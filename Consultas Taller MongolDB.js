# Primera consulta MongolDB Encuentra todos los Pokémon de tipo Electric:

db.Pokemones.find({
  $or: [
    { Type1: "Electric" },
    { Type2: "Electric" }
  ]
});
# segunda consulta Muestra solo los nombres y el ataque de los Pokémon con más de 100 de ataque:

db.Pokemones.find(
  { Attack: { $gt: 100 } },
  { Name: 1, Attack: 1, _id: 0 }
);
