import mongoose from "mongoose";
import config from "../config";
import { CaseQuestionModel } from "../app/modules/caseQuestion/caseQuestion.model";

const placeholderImage = "https://via.placeholder.com/150";

const seedData = [
  {
    name: "Labor Procedure",
    image: placeholderImage,
    children: [
      {
        name: "Unfair dismissal",
        image: placeholderImage,
        children: [
          {
            name: "Dismissal without prior notice",
            image: placeholderImage,
            children: [
              { name: "Did you complete your probation period?", image: placeholderImage },
              { name: "Was there a verbal warning before dismissal?", image: placeholderImage },
              { name: "Did you receive your final paycheck?", image: placeholderImage },
            ],
          },
          { name: "Discriminatory termination (Gender, Race, etc.)", image: placeholderImage },
          { name: "Retaliation for whistleblowing", image: placeholderImage },
          { name: "Breach of employment contract", image: placeholderImage },
        ],
      },
      { name: "Settlement and Severance", image: placeholderImage },
      { name: "Workplace harassment", image: placeholderImage },
      { name: "Voluntary resignation", image: placeholderImage },
      { name: "Unpaid Wages & Overtime", image: placeholderImage },
    ],
  },
  {
    name: "Family Problem",
    image: placeholderImage,
    children: [
      {
        name: "Divorce Proceedings",
        image: placeholderImage,
        children: [
          {
            name: "Mutual Consent Divorce",
            image: placeholderImage,
            children: [
              { name: "What is the mandatory waiting period?", image: placeholderImage },
              { name: "How to divide joint bank accounts?", image: placeholderImage },
              { name: "Can I withdraw consent after filing?", image: placeholderImage },
            ],
          },
          { name: "Contested Divorce (One-sided)", image: placeholderImage },
          { name: "Foreign/NRI Divorce laws", image: placeholderImage },
          { name: "Alimony & Maintenance claims", image: placeholderImage },
        ],
      },
      { name: "Child Custody & Support", image: placeholderImage },
      { name: "Domestic Violence", image: placeholderImage },
      { name: "Marriage Registration", image: placeholderImage },
      { name: "Inheritance Distribution", image: placeholderImage },
    ],
  },
  {
    name: "Criminal Matter",
    image: placeholderImage,
    children: [
      {
        name: "Bail Application",
        image: placeholderImage,
      },
      { name: "Theft or Burglary", image: placeholderImage },
      { name: "Physical Assault", image: placeholderImage },
      {
        name: "Cyber Crimes",
        image: placeholderImage,
        children: [
          { name: "Social Media Identity Theft", image: placeholderImage },
          { name: "Online Financial Fraud", image: placeholderImage },
          { name: "Hacking & Data Breach", image: placeholderImage },
          { name: "Online Defamation", image: placeholderImage },
        ],
      },
      { name: "Drug-related Offenses", image: placeholderImage },
    ],
  },
  {
    name: "Properties",
    image: placeholderImage,
    children: [
      {
        name: "Land Purchase/Sale",
        image: placeholderImage,
        children: [
          {
            name: "Verification of Title Deed",
            image: placeholderImage,
            children: [
              { name: "How to check for existing liens/mortgages?", image: placeholderImage },
              { name: "Is the current seller the legal owner?", image: placeholderImage },
              { name: "How to get a certified copy of the deed?", image: placeholderImage },
            ],
          },
          { name: "Power of Attorney issues", image: placeholderImage },
          { name: "Tax & Stamp Duty calculation", image: placeholderImage },
          { name: "Boundary Dispute with neighbor", image: placeholderImage },
        ],
      },
      { name: "Rental Agreements/Eviction", image: placeholderImage },
      { name: "Property Encroachment", image: placeholderImage },
      { name: "Registration & Documentation", image: placeholderImage },
      { name: "Mortgage & Loans", image: placeholderImage },
    ],
  },
];

async function seedQuestions(data: any[], parentId: mongoose.Types.ObjectId | null = null) {
  for (const item of data) {
    const question = await CaseQuestionModel.create({
      name: item.name,
      image: item.image,
      parent: parentId,
    });

    if (item.children && item.children.length > 0) {
      await seedQuestions(item.children, question._id as mongoose.Types.ObjectId);
    }
  }
}

async function runSeed() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connected to database for seeding.");

    // Optional: Clear existing questions if needed
    // await CaseQuestionModel.deleteMany({});
    // console.log("Cleared existing case questions.");

    await seedQuestions(seedData);
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

runSeed();
