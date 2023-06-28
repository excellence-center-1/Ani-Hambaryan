

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('questions', [
      {
          word: "python",
          question: "programming language",
          level: 'beginner'
      },
      {
          word: "github",
          question: "code hosting platform",
          level: 'beginner'
      },
      {
          word: "google",
          question: "famous search engine",
          level: 'beginner'
      },
      {
          word: "mysql",
          question: "a relational database system",
          level: 'beginner'
      },
      {
          word: "email",
          question: "related to exchanging messages",
          level: 'beginner'
      },
      {
          word: "html",
          question: "markup language for the web",
          level: 'beginner'
      },
      {
          word: "body",
          question: "visible part of a web page",
          level: 'beginner'
      },
      {
          word: "server",
          question: "computer or system that provides resources or services to other computers",
          level: 'mid2'
      },
      {
          word: "javascript",
          question: "programming language for the web",
          level: 'mid1'
      },
      {
          word: "react",
          question: "JavaScript library for building user interfaces",
          level: 'mid1'
      },
      {
          word: "bootstrap",
          question: "Popular CSS framework for building responsive websites",
          level: 'mid1'
      },
      {
          word: "authorization",
          question: "process of granting or denying access to a resource",
          level: 'mid1'
      },
      {
          word: "package",
          question: "a collection of code files or modules that can be reused in software development",
          level: 'mid1'
      },
      {
          word: "dependency",
          question: "a requirement or condition that another software component or module relies on",
          level: 'mid1'
      },
      {
          word: "registration",
          question: "process of signing up or creating an account",
          level: 'mid1'
      },
      {
          word: "library",
          question: "a collection of precompiled code and resources that can be reused in software development",
          level: 'mid1'
      },
      {
          word: "database",
          question: "Organized collection of structured information or data",
          level: 'mid2'
      },
      {
          word: "authentication",
          question: "Process of verifying the identity of a user or system",
          level: 'mid2'
      },
      {
          word: "framework",
          question: "Reusable set of libraries or tools that provide structure and functionality for building applications",
          level: 'mid2'
      },
      {
          word: "algorithm",
          question: "Step-by-step procedure or set of rules for solving a problem or accomplishing a task",
          level: 'mid2'
      },
      {
          word: "responsive",
          question: "Design or layout that adjusts and adapts to different screen sizes or devices",
          level: 'mid2'
      }
  
  ], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('questions', null, {});

  }
};
