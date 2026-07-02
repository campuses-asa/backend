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
        firstName: "Alex",
        lastName: "Rivera",
        email: "alex.rivera@example.edu",
        // imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        gpa: 3.62,
        campusId: 2,
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
      }
    ]
  });

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