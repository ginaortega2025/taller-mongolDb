//Primera consulta MongolDB Encuentra todos los Pokémon de tipo Electric:

db.Pokemones.find({
  $or: [
    { Type1: "Electric" },
    { Type2: "Electric" }
  ]
});
//segunda consulta Muestra solo los nombres y el ataque de los Pokémon con más de 100 de ataque:

db.Pokemones.find(
  { Attack: { $gt: 100 } },
  { Name: 1, Attack: 1, _id: 0 }
);
//Consulta 3: Encuentra los Pokémon cuya defensa esté entre 80 y 100 (inclusive):

db.Pokemones.find(
    { Defense: { $gte: 80, $lte: 100 } },
    { Name: 1, Defense: 1, _id: 0 }
  );

//Consulta 4: Muestra el promedio de ataque de los Pokémon por tipo (Type1)

db.Pokemones.aggregate([
    {
      $group: {
        _id: "$Type1", // Agrupamos por el valor del campo Type1
        promedioAtaque: { $avg: "$Attack" } // Calculamos el promedio de ataque
      }
    },
    {
      $sort: { promedioAtaque: -1 } // Ordenamos de mayor a menor
    }
  ]);

//consulta 5: Encuentra el Pokémon con más HP de cada tipo.

  db.Pokemones.aggregate([
    // Ordenamos por Type1 y luego por HP de mayor a menor
    { $sort: { Type1: 1, HP: -1 } },
  
    // Agrupamos por tipo y nos quedamos con el primer documento (el de más HP)
    {
      $group: {
        _id: "$Type1",
        nombre: { $first: "$Name" },
        hpMaximo: { $first: "$HP" }
      }
    },
  
    // Ordenamos si quieres verlos por HP descendente
    { $sort: { hpMaximo: -1 } }
  ]);

// consulta 6: Muestra los 5 Pokemones mas rapidos:

  db.Pokemones.find({}, { Name: 1, Speed: 1, _id: 0 }).sort({ Speed: -1 }).limit(5);

//Punto 7: Muestra el promedio de ataque  de los Pokémon tipo “Water” ordenado de mayor a menor:

  db.Pokemones.aggregate([
    {
      $match: {
        $or: [
          { Type1: "Water" },
          { Type2: "Water" }
        ]
      }
    },
    {
      $group: {
        _id: "$Name",
        promedioAtaque: { $avg: "$Attack" }
      }
    },
    {
      $sort: { promedioAtaque: -1 }
    }
  ]);

 //punto 8: Encuentra el Pokémon con más ataque por generación y ordénalos de mayor a menor:

  db.Pokemones.aggregate([
    {
      $sort: { Generation: 1, Attack: -1 }
    },
    {
      $group: {
        _id: "$Generation",
        Nombre: { $first: "$Name" },
        Ataque: { $first: "$Attack" }
      }
    },
    {
      $sort: { Ataque: -1 }
    }
  ]);

//punto 9: Crea un índice en el campo Type1:

  db.Pokemones.createIndex({ Type1: 1, Generation: 1 });

//Punto 10 :Usa explain() para analizar el rendimiento de una búsqueda:

  db.Pokemones.find({ Type1: "Fire", Generation: 1 }).explain("executionStats");

// Punto 11 : Crea un índice compuesto en Type1 y Speed, y analiza una búsqueda:

  db.Pokemones.createIndex({ Type1: 1, Speed: 1 });

  db.Pokemones.find({ Type1: "Electric", Speed: { $gt: 90 } }).explain("executionStats");
