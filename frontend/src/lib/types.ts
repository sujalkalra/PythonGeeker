export interface Topic {
  id: string;
  title: string;
  description: string;
  defaultCode: string;
}

export interface Module {
  id: string;
  title: string;
  topics: Topic[];
}

export const SAMPLE_MODULES: Module[] = [
  {
    id: "module-1",
    title: "Python Basics",
    topics: [
      {
        id: "print-variables",
        title: "Print & Variables",
        description: "Learn how to print output and use variables in Python.",
        defaultCode: "print('Hello, PythonGeeker!')\n\nname = 'Python'\nprint(f'I am learning {name}')",
      },
      {
        id: "data-types",
        title: "Data Types",
        description: "Understand integers, strings, booleans, and floats.",
        defaultCode: "x = 10\ny = 3.14\nz = 'Hello'\n\nprint(type(x))\nprint(type(y))\nprint(type(z))",
      },
      {
        id: "input-output",
        title: "Input / Output",
        description: "Learn how to take user input.",
        defaultCode: "# Note: In this sandbox, input() might be simulated or limited.\nname = 'Developer'\nprint(f'Hello, {name}!')",
      },
      {
        id: "comments",
        title: "Comments",
        description: "How to write comments in Python.",
        defaultCode: "# This is a single line comment\n\n'''\nThis is a \nmulti-line comment\n'''\nprint('Comments are ignored by Python')",
      },
    ],
  },
  {
    id: "module-2",
    title: "Control Flow",
    topics: [
      {
        id: "if-else",
        title: "If / Else Statements",
        description: "Make decisions in your code.",
        defaultCode: "age = 18\n\nif age >= 18:\n    print('You are an adult')\nelse:\n    print('You are a minor')",
      },
      {
        id: "loops",
        title: "Loops",
        description: "Repeat code with for and while loops.",
        defaultCode: "for i in range(5):\n    print(f'Iteration {i}')",
      },
      {
        id: "break-continue",
        title: "Break & Continue",
        description: "Control the flow of your loops.",
        defaultCode: "for i in range(10):\n    if i == 5:\n        break\n    print(i)",
      },
    ],
  },
];
