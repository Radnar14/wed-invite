// EDIT HERE: This is the only file to update for entourage names and roles.
// You may add, remove, or reorder people within each group.
// IMPORTANT: The first person in bridesSide and groomsSide is displayed as
// that side's lead role (Matron of Honor or Best Man).

export interface EntourageMember {
  name: string;
  role: string;
}

export const groomsParents: EntourageMember[] = [
  { name: "Glen Abad", role: "Father" },
  { name: "Sarah Abad", role: "Mother" },
];

export const bridesParents: EntourageMember[] = [
  { name: "Tarcisio Dela Cruz", role: "Father" },
  { name: "Amelita Dela Cruz ♱", role: "Mother" },
];

export const bridesSide: EntourageMember[] = [
  { name: "Chariss Ann Marqueses", role: "Matron of Honor" },
  { name: "Shinn Everielle Booc", role: "Bridesmaid" },
  { name: "Jemmelyn Pescadero", role: "Bridesmaid" },
  { name: "Jomily Irisawa", role: "Bridesmaid" },
  { name: "Majesca Shane Zamora", role: "Bridesmaid" },
  { name: "Candice Pastor", role: "Bridesmaid" },
  { name: "Sofia Garcia", role: "Bridesmaid" },
];

export const groomsSide: EntourageMember[] = [
  { name: "NAME", role: "Best Man" },
  { name: "Niño Anton Liloan", role: "Groomsman" },
  { name: "Eizel Jimenez", role: "Groomsman" },
  { name: "Josh Nicolaus Abad", role: "Groomsman" },
  { name: "Leonardo Berjame", role: "Groomsman" },
  { name: "Axziel Bartolabac", role: "Groomsman" },
  { name: "James Vincent Abad", role: "Groomsman" },
];

export const primarySponsors = [
  { name: "Mr. Elson Manlunas & Mrs. Fe Manlunas" },
  { name: "Mr. Eric Esconde & Mrs. Mary Grace Esconde" },
  { name: "Mr. Dante Argallon & Mrs. Arlene Argallon" },
  { name: "Mr. Junrey Bartolabac & Mrs. Rowena Bartolabac" },
  { name: "Mr. Engr. Paul Bugarin & Mrs. Mira Bugarin" },
  { name: "Mr. Kap Alley Berdin & Mrs. Celyn Kinaadman" },
  { name: "Mr. Allan Caballero & Mrs. Engr. Criselda Caballero" },
  { name: "Mr. Jeson Agosto & Mrs. Elmarie Agosto" },
  { name: "Mr. Eduardo Pino & Mrs. Myrna Ybañez" },
  { name: "Mr. Elizady Abad & Mrs. Vangie Abad" },
];

export const secondarySponsors = {
  veil: ["Mr. Vincy Ceniza", "Mrs. Orje Marey Ceniza"],
  cord: ["Mr. Charles Bott", "Mrs. Charmie Sheen Bott"],
  candle: ["Mr. Louie Mendez", "Mrs. Florie Mae Mendez"],
};

export const flowerGirls: EntourageMember[] = [
  { name: "Gabriella Eloise Bott", role: "Flower Girl" },
  { name: "Sophia Scarlett Marqueses", role: "Flower Girl" },
  { name: "Sophia Syziel Bartolabac", role: "Flower Girl" },
  { name: "Arianne Argallon", role: "Flower Girl" },
  { name: "Hannah Mae Abad", role: "Flower Girl" },
];

export const bearers: EntourageMember[] = [
  { name: "Elias Caden Marqueses", role: "Ring Bearer" },
  { name: "Abiel Jimenez", role: "Bible Bearer" },
  { name: "Zeijan Wryle Ybañez", role: "Coin Bearer" },
];
