"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var Tutorial = [
    {
        name: "Server-Side Includes Injection",
        description: "A server side injection is a very simple hacking method, the user inputs simple Linux commands into any given text input and as a result the command is executed. Commonly used for gaining access to local file systems.",
        link: "ssi-injection",
    },
    {
        name: "Structured Query Language Injection",
        description: "An SQL (Structured Query Language) Injection is a simple cyber attack, the hacker inputs a query that will return true and in return gain access to valuable information.",
        link: "sql-injection",
    },
    {
        name: "Review SSI and SQL",
        description: "This tutoial is a review of the prior learned skills with less guidance.",
        link: "review0-Tutorial",
    }
];
var Tutorials = function () { return (React.createElement(antd_1.Layout, null,
    React.createElement(antd_1.Row, { gutter: 16, justify: "center" }, Tutorial.map(function (Tutorial) { return (React.createElement(antd_1.Col, { span: 8, flex: "auto" },
        React.createElement(antd_1.Card, { title: Tutorial.name, bordered: false },
            React.createElement("span", null, Tutorial.description),
            React.createElement("br", null),
            React.createElement(antd_1.Button, { type: "primary", href: Tutorial.link }, "Start")))); })))); };
exports.default = Tutorials;
//# sourceMappingURL=tutorials.js.map