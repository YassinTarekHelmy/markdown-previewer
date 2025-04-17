import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import './App.css';

const LOCAL_CHEAT_SHEET = {
  title: "Markdown Cheat Sheet",
  description: "Quick reference for Markdown syntax",
  basic_syntax: [
    { element: "Heading 1", syntax: "# H1", description: "First-level heading" },
    { element: "Heading 2", syntax: "## H2", description: "Second-level heading" },
    { element: "Heading 3", syntax: "### H3", description: "Third-level heading" },
    { element: "Bold", syntax: "**bold text**", description: "Make text bold" },
    { element: "Italic", syntax: "*italic text*", description: "Make text italic" },
    { element: "Blockquote", syntax: "> quote", description: "Create a blockquote" },
    { element: "Ordered List", syntax: "1. First item\n2. Second item", description: "Create a numbered list" },
    { element: "Unordered List", syntax: "- First item\n- Second item", description: "Create a bulleted list" },
    { element: "Code", syntax: "`code`", description: "Inline code" },
    { element: "Horizontal Rule", syntax: "---", description: "Create a divider" },
    { element: "Link", syntax: "[title](https://example.com)", description: "Create a hyperlink" },
    { element: "Image", syntax: "![alt text](image.jpg)", description: "Embed an image" }
  ],
  extended_syntax: [
    { element: "Table", syntax: "| Syntax | Description |\n| ----------- | ----------- |\n| Header | Title |", description: "Create a table" },
    { element: "Fenced Code Block", syntax: "```\ncode\n```", description: "Create a code block" },
    { element: "Footnote", syntax: "Here's a sentence with a footnote.[^1]\n[^1]: This is the footnote.", description: "Add footnotes" },
    { element: "Heading ID", syntax: "### My Great Heading {#custom-id}", description: "Add custom heading IDs" },
    { element: "Definition List", syntax: "term\n: definition", description: "Create definition lists" },
    { element: "Strikethrough", syntax: "~~strikethrough~~", description: "Strikethrough text" },
    { element: "Task List", syntax: "- [x] Task 1\n- [ ] Task 2", description: "Create interactive checklists" },
    { element: "Emoji", syntax: ":joy:", description: "Add emoji (may require extension)" }
  ]
};

const App = () => {
  // Load saved markdown from localStorage or use default
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem('markdown-content');
    return saved || '# Welcome\nStart writing markdown here...';
  });
  
  const [compiled, setCompiled] = useState(() => {
    const saved = localStorage.getItem('markdown-content');
    return marked(saved || '# Welcome\nStart writing markdown here...');
  });
  
  const [activeTab, setActiveTab] = useState('editor');
  const [showDocs, setShowDocs] = useState(false);

  // Save to localStorage whenever code changes
  useEffect(() => {
    localStorage.setItem('markdown-content', code);
    setCompiled(marked(code));
  }, [code]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const clearEditor = () => {
    if (window.confirm('Are you sure you want to clear the editor?')) {
      setCode('');
    }
  };

  return (
    <div className="app">
      <h1>Markdown Previewer</h1>
      <div className="container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('editor');
              setShowDocs(false);
            }}
          >
            Editor
          </button>
          <button
            className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('preview');
              setShowDocs(false);
            }}
          >
            Preview
          </button>
          <button
            className={`tab ${showDocs ? 'active' : ''}`}
            onClick={() => {
              setShowDocs(!showDocs);
            }}
          >
            Docs
          </button>
          <button
            className="tab clear-btn"
            onClick={clearEditor}
          >
            Clear
          </button>
        </div>

        <div className="content-area">
          {activeTab === 'editor' && (
            <textarea
              className="editor"
              value={code}
              onChange={handleChange}
              placeholder="Write your markdown here..."
            />
          )}

          {activeTab === 'preview' && (
            <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: compiled }}
            />
          )}

          {showDocs && (
            <div className="docs-panel">
              <div className="cheat-sheet">
                <h2>{LOCAL_CHEAT_SHEET.title}</h2>
                <p>{LOCAL_CHEAT_SHEET.description}</p>
                
                <h3>Basic Syntax</h3>
                <ul>
                  {LOCAL_CHEAT_SHEET.basic_syntax.map((item, i) => (
                    <li key={`basic-${i}`}>
                      <strong>{item.element}</strong>
                      <code>{item.syntax}</code>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>

                <h3>Extended Syntax</h3>
                <ul>
                  {LOCAL_CHEAT_SHEET.extended_syntax.map((item, i) => (
                    <li key={`extended-${i}`}>
                      <strong>{item.element}</strong>
                      <code>{item.syntax}</code>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;