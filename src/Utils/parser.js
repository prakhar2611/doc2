export default function parseNodeToPlainText(node) {
    if (!node) return '';
  
    try {
      switch (node.type) {
        case 'doc':
        case 'paragraph':
        case 'codeBlock':
        case 'orderedList':
        case 'bulletList':
        case 'listItem':
        case 'blockquote': // Handle blockquotes
          return node.content.map(parseNodeToPlainText).join(' ');
  
        case 'heading':
          return `${node.content.map(parseNodeToPlainText).join('')}\n`;
  
        case 'text':
          if (node.marks && node.marks.length > 0) {
            const linkMark = node.marks.find(mark => mark.type === 'link');
            const codeMark = node.marks.find(mark => mark.type === 'code');
            if (linkMark) {
              return node.text;  // If it's a link, just return the text
            }
            if (codeMark) {
              return `\`${node.text}\``;  // Format inline code with backticks
            }
            return node.text;
          }
          return node.text;
  
        case 'image':
          return `[Image: ${node.attrs.alt}]`;
  
        case 'hardBreak': // Handle line breaks
          return '\n';
  
        case 'horizontalRule':
          return '---';
  
        case 'taskList':
          return node.content.map(parseNodeToPlainText).join('\n');
  
        case 'taskItem':
          const isChecked = node.attrs.checked ? '[x]' : '[ ]';
          return `${isChecked} ${node.content.map(parseNodeToPlainText).join('')}`;
  
        default:
          console.error(`Unknown type: ${node.type}`, node);
          return '';
      }
    } catch (error) {
      console.error(`Error parsing node of type ${node.type}:`, node, error);
      return '';
    }
  }