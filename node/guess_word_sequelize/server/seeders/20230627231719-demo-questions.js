

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
       await queryInterface.bulkInsert('questions', [
        {
            word: "python",
            question: "programming language"
        },
        {
            word: "github",
            question: "code hosting platform"
        },
        {
            word: "google",
            question: "famous search engine"
        },
        {
            word: "mysql",
            question: "a relational database system"
        },
        {
            word: "email",
            question: "related to exchanging messages"
        },
        {
            word: "html",
            question: "markup language for the web"
        },
        {
            word: "body",
            question: "visible part of a web page"
        },
        {
            word: "server",
            question: "computer or system that provides resources or services to other computers"
        },
        {
            word: "javascript",
            question: "programming language for the web"
        },
        {
            word: "react",
            question: "JavaScript library for building user interfaces"
        },
        {
            word: "bootstrap",
            question: "Popular CSS framework for building responsive websites"
        },
        {
            word: "authorization",
            question: "process of granting or denying access to a resource"
        },
        {
            word: "package",
            question: "a collection of code files or modules that can be reused in software development"
        },
        {
            word: "dependency",
            question: "a requirement or condition that another software component or module relies on"
        },
        {
            word: "registration",
            question: "process of signing up or creating an account"
        },
        {
            word: "library",
            question: "a collection of precompiled code and resources that can be reused in software development"
        },
        {
            word: "database",
            question: "Organized collection of structured information or data"
        },
        {
            word: "authentication",
            question: "Process of verifying the identity of a user or system"
        },
        {
            word: "framework",
            question: "Reusable set of libraries or tools that provide structure and functionality for building applications"
        },
        {
            word: "algorithm",
            question: "Step-by-step procedure or set of rules for solving a problem or accomplishing a task"
        },
        {
            word: "responsive",
            question: "Design or layout that adjusts and adapts to different screen sizes or devices"
        }
    
    ], {});
  
    },
  
    async down (queryInterface, Sequelize) {
       await queryInterface.bulkDelete('questions', null, {});
  
    }
  };
  