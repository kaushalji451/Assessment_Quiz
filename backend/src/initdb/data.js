const sampledata = [
  // Aptitude Questions
  {
    question: "What is the next number in the series: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "30"],
    correctAns: "32",
    questiontype: "Aptitude"
  },
  {
    question: "If a pen costs ₹15, how much do 4 pens cost?",
    options: ["30", "60", "45", "75"],
    correctAns: "60",
    questiontype: "Aptitude"
  },
  {
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctAns: "30",
    questiontype: "Aptitude"
  },

  // Personality Test Questions
  {
    question: "How do you usually solve conflicts?",
    options: ["Avoid them", "Talk calmly", "Get angry", "Ignore and move on"],
    correctAns: "Talk calmly",
    questiontype: "Personality Test"
  },
  {
    question: "What kind of work environment do you prefer?",
    options: ["Quiet and focused", "Fast-paced", "Collaborative", "Remote only"],
    correctAns: "Collaborative",
    questiontype: "Personality Test"
  },
  {
    question: "What motivates you the most?",
    options: ["Money", "Growth", "Recognition", "Challenge"],
    correctAns: "Growth",
    questiontype: "Personality Test"
  },

  // Technical Role (Coding)
  {
    question: "What is the output of: console.log(typeof [])?",
    options: ["object", "array", "list", "undefined"],
    correctAns: "object",
    questiontype: "technical_role"
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["let", "const", "var", "static"],
    correctAns: "const",
    questiontype: "technical_role"
  },
  {
    question: "Which data structure uses LIFO (Last In First Out)?",
    options: ["Queue", "Array", "Stack", "Tree"],
    correctAns: "Stack",
    questiontype: "technical_role"
  },

  // Business Role
  {
    question: "What does ROI stand for?",
    options: ["Return on Investment", "Rate of Interest", "Revenue of Investment", "Ratio of Income"],
    correctAns: "Return on Investment",
    questiontype: "business_role"
  },
  {
    question: "Which department is responsible for managing company finances?",
    options: ["Marketing", "Operations", "Finance", "Sales"],
    correctAns: "Finance",
    questiontype: "business_role"
  },
  {
    question: "Which is a key element of a business plan?",
    options: ["Cover image", "Employee birthdays", "Market analysis", "Lunch menu"],
    correctAns: "Market analysis",
    questiontype: "business_role"
  }
];
module.exports = {data : sampledata};