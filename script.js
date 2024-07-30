document.addEventListener('DOMContentLoaded', () => {
    document.body.setAttribute('data-theme', 'light');
    document.body.setAttribute('data-language', 'en');
    createColorPalette();
});

function updatePreview() {
    const markdownText = document.getElementById('markdown-input').value;
    const htmlContent = marked.parse(markdownText);
    document.getElementById('preview').innerHTML = htmlContent;
}

function formatText(command) {
    const textarea = document.getElementById('markdown-input');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    let formattedText;

    switch (command) {
        case 'bold':
            formattedText = `**${text.substring(start, end)}**`;
            break;
        case 'italic':
            formattedText = `*${text.substring(start, end)}*`;
            break;
        case 'heading':
            formattedText = `# ${text.substring(start, end)}`;
            break;
        case 'unordered-list':
            formattedText = `- ${text.substring(start, end)}`;
            break;
        case 'ordered-list':
            formattedText = `1. ${text.substring(start, end)}`;
            break;
        case 'strikethrough':
            formattedText = `~~${text.substring(start, end)}~~`;
            break;
        case 'blockquote':
            formattedText = `> ${text.substring(start, end)}`;
            break;
        case 'inline-code':
            formattedText = `\`${text.substring(start, end)}\``;
            break;
        case 'code-block':
            formattedText = `\`\`\`\n${text.substring(start, end)}\n\`\`\``;
            break;
    }

    textarea.setRangeText(formattedText, start, end, 'end');
    updatePreview();
}

function insertImage() {
    const url = prompt('Enter image URL');
    if (url) {
        const textarea = document.getElementById('markdown-input');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const formattedText = `![alt text](${url})`;
        textarea.setRangeText(formattedText, start, end, 'end');
        updatePreview();
    }
}

function insertLink() {
    const url = prompt('Enter URL');
    if (url) {
        const textarea = document.getElementById('markdown-input');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const formattedText = `[${text.substring(start, end)}](${url})`;
        textarea.setRangeText(formattedText, start, end, 'end');
        updatePreview();
    }
}

function alignText(alignment) {
    const textarea = document.getElementById('markdown-input');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    let formattedText;

    switch (alignment) {
        case 'left':
            formattedText = `<div style="text-align: left;">${text.substring(start, end)}</div>`;
            break;
        case 'center':
            formattedText = `<div style="text-align: center;">${text.substring(start, end)}</div>`;
            break;
        case 'right':
            formattedText = `<div style="text-align: right;">${text.substring(start, end)}</div>`;
            break;
    }

    textarea.setRangeText(formattedText, start, end, 'end');
    updatePreview();
}

function copyMarkdown() {
    const markdownText = document.getElementById('markdown-input').value;
    navigator.clipboard.writeText(markdownText).then(() => {
        alert('Markdown copied to clipboard');
    });
}

function downloadMarkdown() {
    const markdownText = document.getElementById('markdown-input').value;
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
}

function toggleLanguage() {
    const currentLanguage = document.body.getAttribute('data-language');
    const newLanguage = currentLanguage === 'en' ? 'tr' : 'en';
    document.body.setAttribute('data-language', newLanguage);
    updateToolbarText(newLanguage);
}

function updateToolbarText(language) {
    const buttons = document.querySelectorAll('.toolbar button');
    const tooltips = {
        en: ['Bold', 'Italic', 'Heading', 'Image', 'Link', 'Unordered List', 'Ordered List',
            'Align Left', 'Align Center', 'Align Right', 'Strikethrough', 'Quote', 'Inline Code',
            'Code Block', 'Toggle Theme', 'Toggle Language'],
        tr: ['Kalın', 'İtalik', 'Başlık', 'Görsel', 'Bağlantı', 'Sırasız Liste', 'Sıralı Liste',
            'Sola Hizala', 'Ortala', 'Sağa Hizala', 'Üstü Çizili', 'Alıntı', 'Kod', 'Kod Bloğu',
            'Tema Değiştir', 'Dil Değiştir']
    };

    buttons.forEach((button, index) => {
        button.setAttribute('title', tooltips[language][index]);
    });
}