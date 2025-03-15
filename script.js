require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
require(["vs/editor/editor.main"], function() {
    let htmlEditor = monaco.editor.create(document.getElementById("html-editor"), {
        value: "\n<!DOCTYPE html>",
        language: "html",
        automaticLayout: true,
        theme: "vs-dark"
    });
    
    let cssEditor = monaco.editor.create(document.getElementById("css-editor"), {
        value: "",
        language: "css",
        automaticLayout: true,
        theme: "vs-dark"
    });
    
    let jsEditor = monaco.editor.create(document.getElementById("js-editor"), {
        value: "console.log('Hello, World!');",
        language: "javascript",
        automaticLayout: true,
        theme: "vs-dark"
    });
    
    function run() {
        let htmlCode = htmlEditor.getValue();
        let cssCode = cssEditor.getValue();
        let jsCode = jsEditor.getValue();
        let output = document.getElementById("output").contentWindow;
        
        output.document.open();
        output.document.write(`<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`);
        output.document.close();
    }
    
    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor.onDidChangeModelContent(run);
    });
});