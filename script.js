document.addEventListener('DOMContentLoaded', function() {
    const themeIcon = document.getElementById('theme-icon');
    const languageIcon = document.getElementById('language-icon');
    const markdownInput = document.getElementById('markdown-input');
    const copyButton = document.getElementById('copy-button');
    const downloadButton = document.getElementById('download-button');
    const boldButton = document.getElementById('bold-button');
    const italicButton = document.getElementById('italic-button');
    const headingButton = document.getElementById('heading-button');
    const imageButton = document.getElementById('image-button');
    const linkButton = document.getElementById('link-button');
    const ulButton = document.getElementById('ul-button');
    const olButton = document.getElementById('ol-button');
    const alignLeftButton = document.getElementById('align-left-button');
    const alignCenterButton = document.getElementById('align-center-button');
    const alignRightButton = document.getElementById('align-right-button');
    const strikethroughButton = document.getElementById('strikethrough-button');
    const quoteButton = document.getElementById('quote-button');
    const inlineCodeButton = document.getElementById('inline-code-button');
    const codeBlockButton = document.getElementById('code-block-button');

    // Toggle dark/light mode
    themeIcon.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Toggle language
    languageIcon.addEventListener('click', function() {
        // Simple language toggle logic for demo purposes
        const lang = document.documentElement.lang === 'en' ? 'tr' : 'en';
        document.documentElement.lang = lang;
        document.title = lang === 'en' ? 'Markdown Editor' : 'Markdown Düzenleyici';
        markdownInput.placeholder = lang === 'en' ? 'Write your markdown here...' : 'Markdown\'ınızı buraya yazın...';
        copyButton.innerHTML = `<span class="material-icons">content_copy</span> ${lang === 'en' ? 'Copy' : 'Kopyala'}`;
        downloadButton.innerHTML = `<span class="material-icons">file_download</span> ${lang === 'en' ? 'Download' : 'İndir'}`;
    });

    // Markdown to HTML preview
    markdownInput.addEventListener('input', function() {
        const markdownText = markdownInput.value;
    });

    // Format text as bold
    boldButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '**');
    });

    // Format text as italic
    italicButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '_');
    });

    // Format text as heading
    headingButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '# ');
    });

    // Insert image
    imageButton.addEventListener('click', function() {
        const url = prompt('Enter the image URL');
        if (url) {
            wrapSelection(markdownInput, `![Alt text](${url})`);
        }
    });

    // Insert link
    linkButton.addEventListener('click', function() {
        const url = prompt('Enter the URL');
        if (url) {
            wrapSelection(markdownInput, `[`, `](${url})`);
        }
    });

    // Unordered list
    ulButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '* ');
    });

    // Ordered list
    olButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '1. ');
    });

    // Align left
    alignLeftButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '<div style="text-align:left">', '</div>');
    });

    // Align center
    alignCenterButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '<div style="text-align:center">', '</div>');
    });

    // Align right
    alignRightButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '<div style="text-align:right">', '</div>');
    });

    // Strikethrough text
    strikethroughButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '~~');
    });

    // Blockquote
    quoteButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '> ');
    });

    // Inline code
    inlineCodeButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '`');
    });

    // Code block
    codeBlockButton.addEventListener('click', function() {
        wrapSelection(markdownInput, '```', '```');
    });

    // Copy markdown content
    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(markdownInput.value).then(function() {
            alert('Markdown copied to clipboard!');
        });
    });

    // Download markdown content
    downloadButton.addEventListener('click', function() {
        const blob = new Blob([markdownInput.value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'markdown.md';
        a.click();
        URL.revokeObjectURL(url);
    });

    function wrapSelection(textarea, before, after = before) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.slice(start, end);
        const newText = text.slice(0, start) + before + selectedText + after + text.slice(end);
        textarea.value = newText;
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
    }
});
