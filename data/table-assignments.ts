export interface TableGroup {
  table: string; // TODO: enter the final table number here once decided
  guests: string[];
}

export interface VipPair {
  left: string;
  right: string;
}

export const tableAssignments: TableGroup[] = [
  { table: "1", guests: ["Charmie Bott", "Charles Bott", "Gabriella Eloise Bott", "Chariss Marqueses", "Tarcisio Dela Cruz/Roselo Lilo-an", "Sophia Marqueses", "Elias Marqueses", "Wilnard", "Mama amelita", "Niño Lilo-an"] },
  { table: "2", guests: ["Shairah Ybañez", "Raymart Ybañez", "Zeijian Ybañez", "Dave Arong", "Fatima Arong", "Rafael Arong", "Mary Grace Datoy", "Wendell Pino", "Kate Pino", "Rhea Pino"] },
  { table: "3", guests: ["Candice Pastor", "Jomily Irisawa", "Majesca Zamora", "Sofia Garcia", "Joshua Marvin Albiso", "Joshua Dave Degamo", "Angel Bamo", "Renz Forcadilla"] },
  { table: "4", guests: ["Joseph Argallon", "Yurina Argallon", "Arianne Argallon", "Leonardo Berjame", "Lorah", "Seth", "Shinn Everielle Booc", "Jemmelyn Pescadero", "Roy Mangubat", "Dra. Gel Mangubat"] },
  { table: "5", guests: ["Gemma Mendez", "Ramelito Mendez", "Jinky Mendez", "Louie Mendez", "Florie Mae Mendez", "Vicky Gera", "Nick Lumain", "Jess Michael Reyes", "Connie Salcedo"] },
  { table: "6", guests: ["Axziel Bartolabac", "Sophia Bartolabac", "Josh Nicolaus Abad", "James Vincent Abad", "Hannah Mae Abad", "Mary Orchid Lopez", "Jonathan Lopez", "Orje Marey Ceniza", "Vincy Ceniza", "Ramil Balbuena"] },
  { table: "7", guests: ["Eizel Jimenez", "Ellen Jimenez", "Abiel Jimenez", "Rogs Nuñez", "Kimarth Argallon", "Jill Argallon", "Rosalie", "Che-che", "Camille Dungog", "Arci Lim"] },
  { table: "8", guests: ["Wilson Abad", "Marinel Librea", "Carmelita Abad", "Mico Niel Abad", "Mona Abad", "Danielle Franz Abad", "Rino Zhel Abad", "Michelle Abad", "Sandro Agosto", "Mylene Pagubo"] },
  { table: "9", guests: ["Zhyrae Magpusao", "Zeius Magpusao", "Joeniry Magpusao", "Liezl Jualo", "Archie Aragones", "Chona Aragones", "Chean Aragones", "Czarina Aragones", "Amara Aragones"] },
  { table: "10", guests: ["Alfredo Kinaadman", "Carla Calooy", "Van Zulueta", "Mai Mai Zulueta", "Danny Navarro", "Merlyn Navarro", "Nelson Gabayan", "Nelson Mabugnon", "Agnes Mabugnon", "Jaen peramedi"] },
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
