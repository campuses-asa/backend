import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // clear db first
  await prisma.student.deleteMany();
  await prisma.campus.deleteMany();

  // reset auto-increment counters for id on both tables
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "Student", "Campus" RESTART IDENTITY CASCADE;`
  )

  await prisma.campus.createMany({
    data: [
      {
        name: "Brooklyn College",
        address: "2900 Bedford Ave, Brooklyn, NY 11210",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
        description: "A beautiful historic campus located in the heart of Brooklyn, renowned for its liberal arts education and vibrant community."
      },
      {
        name: "Queens College",
        address: "65-30 Kissena Blvd, Queens, NY 11367",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
        description: "Located in a park-like setting in Flushing, Queens, offering a stellar research environment and diverse student body."
      },
      {
        name: "Hunter College",
        address: "695 Park Ave, New York, NY 10065",
        imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a91?w=600&h=400&fit=crop",
        description: "A premier public institution located in Manhattan, focused on academic excellence, accessibility, and high-impact research."
      },
      {
        name: "City College of New York",
        address: "160 Convent Ave, New York, NY 10031",
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
        description: "Located in historic Hamilton Heights, CCNY is known for its stunning neo-Gothic architecture and outstanding engineering and science programs."
      },
      {
        name: "Baruch College",
        address: "55 Lexington Ave, New York, NY 10010",
        imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&h=400&fit=crop",
        description: "An urban campus situated in Midtown Manhattan, widely recognized for its elite business programs and high social mobility."
      },
      {
        name: "Lehman College",
        address: "250 Bedford Park Blvd W, Bronx, NY 10468",
        imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop",
        description: "The only senior CUNY college in the Bronx, featuring a 37-acre tree-lined campus and strong healthcare and liberal arts programs."
      },
      {
        name: "College of Staten Island",
        address: "2800 Victory Blvd, Staten Island, NY 10314",
        imageUrl: "https://images.unsplash.com/photo-1525921429555-e4e2c9b450ed?w=600&h=400&fit=crop",
        description: "Set on a massive 204-acre park-like campus, offering comprehensive undergraduate and graduate programs in a serene setting."
      },
      {
        name: "New York University",
        address: "70 Washington Square S, New York, NY 10012",
        imageUrl: "https://images.unsplash.com/photo-1544161513-0179fe746fd5?w=600&h=400&fit=crop",
        description: "An iconic, deeply integrated campus centered around Greenwich Village, known for its global reach and top-tier artistic and academic programs."
      },
      {
        name: "Columbia University",
        address: "116th St & Broadway, New York, NY 10027",
        imageUrl: "https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?w=600&h=400&fit=crop",
        description: "An Ivy League institution in Upper Manhattan featuring classical architecture, world-renowned research faculties, and deep historical roots."
      },
      {
        name: "Fordham University",
        address: "441 E Fordham Rd, Bronx, NY 10458",
        imageUrl: "https://images.unsplash.com/photo-1583325946853-294a5e3ec457?w=600&h=400&fit=crop",
        description: "A stunning Jesuit university campus in the Bronx featuring gothic-style buildings, expansive lawns, and strong traditions in law and humanities."
      },
      {
        name: "Pratt Institute",
        address: "200 Willoughby Ave, Brooklyn, NY 11205",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        description: "A specialized art, design, and architecture college in Clinton Hill, Brooklyn, featuring a unique sculpture-filled historic campus."
      },
      {
        name: "University of California, Los Angeles",
        address: "405 Hilgard Ave, Los Angeles, CA 90095",
        imageUrl: "https://images.unsplash.com/photo-1595113340742-6f8c443b7404?w=600&h=400&fit=crop",
        description: "A world-renowned public research university in Westwood, famous for its Romanesque Revival architecture, rigorous academics, and elite athletic programs."
      },
      {
        name: "University of Southern California",
        address: "3551 Trousdale Pkwy, Los Angeles, CA 90089",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&h=400&fit=crop",
        description: "A premier private research university located near downtown LA, featuring brick-and-limestone architecture and world-class cinematic arts and business programs."
      },
      {
        name: "University of California, San Diego",
        address: "9500 Gilman Dr, La Jolla, CA 92093",
        imageUrl: "https://images.unsplash.com/photo-1567117623193-2798f828a2b5?w=600&h=400&fit=crop",
        description: "Perched along the Pacific coast in La Jolla, UCSD is celebrated for its brutalist Geisel Library, cutting-edge oceanography, and STEM research dominance."
      },
      {
        name: "San Diego State University",
        address: "5500 Campanile Dr, San Diego, CA 92182",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
        description: "A prominent public university noted for its striking Mission Revival style campus, high research activity, and dynamic student entrepreneurship programs."
      }
    ]
  });

  await prisma.student.createMany({
    data: [
      {
        firstName: "Sarah",
        lastName: "Jenkins",
        email: "sarah.jenkins@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
        gpa: 3.85,
        campusId: 1,
      },
      {
        firstName: "Emily",
        lastName: "Chen",
        email: "emily.chen@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        gpa: 3.95,
        campusId: 1,
      },
      {
        firstName: "Marcus",
        lastName: "Johnson",
        email: "marcus.johnson@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        gpa: 3.15,
        campusId: 3,
      },
      {
        firstName: "Chloe",
        lastName: "Patel",
        email: "chloe.patel@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        gpa: 3.78,
        campusId: 1,
      },
      {
        firstName: "Daniel",
        lastName: "Smith",
        email: "daniel.smith@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face",
        gpa: 3.45,
        campusId: 4,
      },
      {
        firstName: "Elena",
        lastName: "Rostova",
        email: "elena.rostova@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
        gpa: 3.91,
        campusId: undefined,
      },
      {
        firstName: "Tariq",
        lastName: "Mahmood",
        email: "tariq.mahmood@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
        gpa: 3.52,
        campusId: 6,
      },
      {
        firstName: "Maya",
        lastName: "Lin",
        email: "maya.lin@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        gpa: 3.73,
        campusId: 8,
      },
      {
        firstName: "Jordan",
        lastName: "Brooks",
        email: "jordan.brooks@example.edu",
        imageUrl: undefined,
        gpa: 2.98,
        campusId: 9,
      },
      {
        firstName: "Sofia",
        lastName: "Rodriguez",
        email: "sofia.rodriguez@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
        gpa: 3.67,
        campusId: 12,
      },
      {
        firstName: "Liam",
        lastName: "O'Connor",
        email: "liam.oconnor@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        gpa: 3.40,
        campusId: 13,
      },
      {
        firstName: "Aisha",
        lastName: "Diallo",
        email: "aisha.diallo@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
        gpa: 3.88,
        campusId: 14,
      },
      {
        firstName: "Lucas",
        lastName: "Kim",
        email: "lucas.kim@example.edu",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
        gpa: 3.21,
        campusId: 15,
      }
    ]
  });

  const studentCount = await prisma.student.count();
  const campusCount = await prisma.campus.count();
  console.log(`Seeded ${studentCount} students`);
  console.log(`Seeded ${campusCount} campuses`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());