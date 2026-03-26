const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../models/Role');
const connectDB = require('../config/db');

dotenv.config();

const roles = [
  {
    name: 'Software Developer',
    description: 'Design, develop, and maintain software applications. Write clean, scalable code and collaborate with cross-functional teams.',
    defaultSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'Data Structures'],
    defaultEducation: 'B.Tech / B.E. in Computer Science or related field',
    defaultExperience: '1-3 years',
    department: 'Engineering',
  },
  {
    name: 'Data Analyst',
    description: 'Analyze large datasets to identify trends, create dashboards, and provide data-driven insights for business decisions.',
    defaultSkills: ['Python', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Statistics', 'Pandas', 'Data Visualization'],
    defaultEducation: 'B.Tech / B.Sc in CS, Statistics, or related field',
    defaultExperience: '0-2 years',
    department: 'Analytics',
  },
  {
    name: 'Web Developer',
    description: 'Build and maintain responsive websites and web applications using modern web technologies.',
    defaultSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Git'],
    defaultEducation: 'B.Tech / BCA / B.Sc in Computer Science',
    defaultExperience: '0-2 years',
    department: 'Engineering',
  },
  {
    name: 'HR Executive',
    description: 'Handle recruitment, employee relations, payroll coordination, and ensure compliance with HR policies.',
    defaultSkills: ['Recruitment', 'Communication', 'MS Office', 'HR Policies', 'Payroll', 'Employee Relations'],
    defaultEducation: 'MBA in HR / BBA',
    defaultExperience: '1-3 years',
    department: 'Human Resources',
  },
  {
    name: 'Marketing Executive',
    description: 'Plan and execute marketing campaigns, manage social media, and drive brand awareness and lead generation.',
    defaultSkills: ['Digital Marketing', 'SEO', 'Social Media', 'Content Writing', 'Google Analytics', 'Email Marketing'],
    defaultEducation: 'MBA in Marketing / BBA / B.Com',
    defaultExperience: '0-2 years',
    department: 'Marketing',
  },
  {
    name: 'UI/UX Designer',
    description: 'Create user-centered designs through wireframes, prototypes, and visual design for web and mobile applications.',
    defaultSkills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'CSS'],
    defaultEducation: 'B.Des / B.Tech / Any graduate with design portfolio',
    defaultExperience: '0-2 years',
    department: 'Design',
  },
];

const seedRoles = async () => {
  try {
    await connectDB();

    // Clear existing roles
    await Role.deleteMany({});
    console.log('Cleared existing roles');

    // Insert new roles
    const created = await Role.insertMany(roles);
    console.log(`Seeded ${created.length} roles:`);
    created.forEach((r) => console.log(`  ✓ ${r.name} (${r.department})`));

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedRoles();
