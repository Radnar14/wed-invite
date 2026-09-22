export interface TableGroup {
  table: string; // TODO: enter the final table number here once decided
  guests: string[];
}

export interface VipPair {
  left: string;
  right: string;
}

export const tableAssignments: TableGroup[] = [
  { table: "", guests: ["Charmie Bott", "Charles Bott", "Gabriella Eloise Bott", "Chariss Marqueses", "Tarcisio Dela Cruz/Roselo Lilo-an", "Sophia Marqueses", "Elias Marqueses", "Wilnard", "Mama amelita", "Niño Lilo-an"] },
  { table: "", guests: ["Shairah Myrene Ybañez", "Raymart Ybañez", "Zeijian Wryle Ybañez", "Dave Arong", "Fatima Arong", "Rafael Arong", "Melai - kokoy", "Wendell Pino", "Kate Pino", "Rhea Pino"] },
  { table: "", guests: ["Candice Pastor", "Jomily Irisawa", "Majesca Shane Zamora", "Sofia Garcia", "Joshua Marvin Albiso", "Joshua Dave Degamo", "Angel Bamo", "Renz Forcadilla"] },
  { table: "", guests: ["Shinn Everielle Booc", "Jemmelyn Pescadero", "hpesoj", "aniruy", "Arianne Argallon", "Leonardo Berjame", "Lorah", "Seth"] },
  { table: "", guests: ["Gemma Mendez", "Ramelito Mendez", "Jinky Mendez", "Louie Mendez", "Florie Mae Mendez", "Vicky Gera", "Nick Lumain"] },
  { table: "", guests: ["Axziel Bartolabac", "Sophia Bartolabac", "Josh Nicolaus Abad", "James Vincent Abad", "Hannah Mae Abad", "Mary Orchid Lopez", "Jonathan Lopez", "Orje Marey Ceniza", "Vincy Ceniza"] },
  { table: "", guests: ["Eizel Jimenez", "Ellen Jimenez", "Abiel Jimenez", "Rogs Nuñez", "Kimarth Argallon", "Jill Argallon", "Rosalie", "Che-che", "Kuya Ramil"] },
  { table: "", guests: ["Wilson Abad", "Marinel Librea", "Carmelita Abad", "Mico", "Mona", "Danno", "Rino Zhel Abad", "Michelle Abad", "Ramon Yap"] },
  { table: "", guests: ["Zhyrae Magpusao", "Zeius Magpusao", "Joeniry Magpusao", "Liezl Jualo", "Archie Aragones", "Chona Aragones", "Chean Aragones", "Czarina Aragones", "Amara Aragones"] },
  { table: "", guests: ["Alfredo Kinaadman", "Yoyon Calooy", "Carla Calooy", "Van Zulueta", "Mai Mai Zulueta", "Danny Navarro", "Merlyn Navarro", "Nelson Gabayan", "Nelson Mabugnon", "Agnes Mabugnon"] },
];

export const vipTable: string = "Principals"; // TODO: enter the VIP table number here once decided

export const vipPairs: VipPair[] = [
  { left: "Myrna Ybañez", right: "Eduardo Pino" },
  { left: "Fe Manlunas", right: "Elson Manlunas" },
  { left: "Arlene Argallon", right: "Dante Argallon" },
  { left: "Engr. Criselda Caballero", right: "Allan Caballero" },
  { left: "Rowena Bartolabac", right: "Junrey Bartolabac" },
  { left: "Capt. Alley Berdin", right: "Celyn Kinaadman" },
  { left: "Elmarie Agosto", right: "Jeson Agosto" },
  { left: "Grace Esconde", right: "Eric Esconde" },
  { left: "Engr. Paul Bugarin", right: "Mira Bugarin" },
];
