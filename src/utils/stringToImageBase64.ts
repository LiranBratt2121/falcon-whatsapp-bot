export const stringToImageBase64 = (inputText: string): string => {
  const maxWidth = 300;
  const lineHeight = 30;
  const fontSize = 24;
  const maxCharsPerLine = Math.floor(maxWidth / (fontSize * 0.6));

  const wrapText = (text: string): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      if (currentLine.length + word.length + 1 <= maxCharsPerLine) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        // If the word is longer than maxCharsPerLine, split it
        if (word.length > maxCharsPerLine) {
          let remainingWord = word;
          while (remainingWord.length > 0) {
            lines.push(remainingWord.slice(0, maxCharsPerLine));
            remainingWord = remainingWord.slice(maxCharsPerLine);
          }
        } else {
          currentLine = word;
        }
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  const lines = wrapText(inputText);
  const height = Math.max(100, lines.length * lineHeight + 20);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${maxWidth}" height="${height}">
      <rect width="100%" height="100%" fill="white" />
      ${lines.map((line, index) => `
        <text 
          x="50%" 
          y="${(index + 0.5) * lineHeight + 10}" 
          font-family="Arial" 
          font-size="${fontSize}" 
          fill="black" 
          dominant-baseline="middle" 
          text-anchor="middle"
        >
          ${line}
        </text>
      `).join('')}
    </svg>
  `;

  const base64Encoded = Buffer.from(svg).toString('base64');

  return `data:image/svg+xml;base64,${base64Encoded}`;
};
