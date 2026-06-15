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
          {
            name: "Discriminatory termination (Gender, Race, etc.)",
            image: placeholderImage,
            children: [
              { name: "What was the primary basis of discrimination?", image: placeholderImage },
              { name: "Do you have written proof or emails?", image: placeholderImage },
              { name: "Was the incident reported to HR?", image: placeholderImage },
            ],
          },
          {
            name: "Retaliation for whistleblowing",
            image: placeholderImage,
            children: [
              { name: "Did you report illegal activities?", image: placeholderImage },
              { name: "Did the termination occur soon after reporting?", image: placeholderImage },
            ],
          },
          {
            name: "Breach of employment contract",
            image: placeholderImage,
            children: [
              { name: "What specific clause of the contract was violated?", image: placeholderImage },
              { name: "Is the contract signed by both parties?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Settlement",
        image: placeholderImage,
        children: [
          {
            name: "Negotiation of exit package",
            image: placeholderImage,
            children: [
              { name: "How many years of service do you have?", image: placeholderImage },
              { name: "Is there an active settlement agreement?", image: placeholderImage },
            ],
          },
          {
            name: "Drafting of Mutual Release",
            image: placeholderImage,
            children: [
              { name: "Have both parties agreed to all terms?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Workplace harassment",
        image: placeholderImage,
        children: [
          {
            name: "Sexual harassment",
            image: placeholderImage,
            children: [
              { name: "Did the incident occur inside or outside the workplace?", image: placeholderImage },
              { name: "Did you document the dates and details?", image: placeholderImage },
            ],
          },
          {
            name: "Verbal or psychological abuse",
            image: placeholderImage,
            children: [
              { name: "Is the abuse coming from a manager or colleague?", image: placeholderImage },
              { name: "Has it affected your health or performance?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Voluntary resignation",
        image: placeholderImage,
        children: [
          {
            name: "Constructive dismissal (forced to resign)",
            image: placeholderImage,
            children: [
              { name: "What hostile conditions forced you to resign?", image: placeholderImage },
              { name: "Did you submit a formal resignation letter?", image: placeholderImage },
            ],
          },
          {
            name: "Standard resignation query",
            image: placeholderImage,
            children: [
              { name: "Did you serve the required notice period?", image: placeholderImage },
            ],
          },
        ],
      },
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
          {
            name: "Contested Divorce (One-sided)",
            image: placeholderImage,
            children: [
              { name: "What is the ground for divorce?", image: placeholderImage },
              { name: "Are there children from the marriage?", image: placeholderImage },
            ],
          },
          {
            name: "Foreign/NRI Divorce laws",
            image: placeholderImage,
            children: [
              { name: "Was the marriage registered abroad?", image: placeholderImage },
            ],
          },
          {
            name: "Alimony & Maintenance claims",
            image: placeholderImage,
            children: [
              { name: "What is your spouse's monthly income?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Child Custody & Support",
        image: placeholderImage,
        children: [
          {
            name: "Legal Custody vs Physical Custody",
            image: placeholderImage,
            children: [
              { name: "What is the age of the child?", image: placeholderImage },
            ],
          },
          {
            name: "Child Maintenance Payment",
            image: placeholderImage,
            children: [
              { name: "Are there special educational or medical needs?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Domestic Violence",
        image: placeholderImage,
        children: [
          {
            name: "Physical abuse",
            image: placeholderImage,
            children: [
              { name: "Do you need an immediate protection order?", image: placeholderImage },
            ],
          },
          {
            name: "Financial exploitation",
            image: placeholderImage,
            children: [
              { name: "Is the spouse withholding basic necessities?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Marriage Registration",
        image: placeholderImage,
        children: [
          {
            name: "Requirements for registration",
            image: placeholderImage,
            children: [
              { name: "Is it a religious or civil marriage?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Inheritance Distribution",
        image: placeholderImage,
        children: [
          {
            name: "Distribution under Will",
            image: placeholderImage,
            children: [
              { name: "Is there a registered last will and testament?", image: placeholderImage },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Criminal Matter",
    image: placeholderImage,
    children: [
      {
        name: "Bail Application",
        image: placeholderImage,
        children: [
          {
            name: "Anticipatory Bail",
            image: placeholderImage,
            children: [
              { name: "Is there an active arrest warrant?", image: placeholderImage },
            ],
          },
          {
            name: "Regular Bail",
            image: placeholderImage,
            children: [
              { name: "What are the charges in the FIR?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Theft or Burglary",
        image: placeholderImage,
        children: [
          {
            name: "Stolen property retrieval",
            image: placeholderImage,
            children: [
              { name: "Has a police report (FIR) been filed?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Physical Assault",
        image: placeholderImage,
        children: [
          {
            name: "Self-defense claims",
            image: placeholderImage,
            children: [
              { name: "Do you have a medical report of injuries?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Cyber Crimes",
        image: placeholderImage,
        children: [
          {
            name: "Online Financial Fraud",
            image: placeholderImage,
            children: [
              { name: "Was the money transferred bank-to-bank?", image: placeholderImage },
              { name: "Did you report to the cyber crime cell?", image: placeholderImage },
            ],
          },
          {
            name: "Social Media Identity Theft",
            image: placeholderImage,
            children: [
              { name: "Are fake accounts using your photos/name?", image: placeholderImage },
            ],
          },
        ],
      },
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
          {
            name: "Power of Attorney issues",
            image: placeholderImage,
            children: [
              { name: "Is the Power of Attorney registered?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Rental Agreements/Eviction",
        image: placeholderImage,
        children: [
          {
            name: "Tenant Eviction process",
            image: placeholderImage,
            children: [
              { name: "Is there a valid lease/rental agreement?", image: placeholderImage },
              { name: "Has the tenant stopped paying rent?", image: placeholderImage },
            ],
          },
        ],
      },
      {
        name: "Property Encroachment",
        image: placeholderImage,
        children: [
          {
            name: "Encroachment by neighbor",
            image: placeholderImage,
            children: [
              { name: "Do you have a land survey report?", image: placeholderImage },
            ],
          },
        ],
      },
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

    // Clear existing questions
    await CaseQuestionModel.deleteMany({});
    console.log("Cleared existing case questions.");

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
