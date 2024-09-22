export const stringToImageBase64 = (inputText: string): string => {
  const maxWidth = 300;
  const lineHeight = 30;
  const fontSize = 24;
  const maxCharsPerLine = Math.floor(maxWidth / (fontSize * 0.6)); 

  const lines = [];
  let currentLine = '';
  const words = inputText.split(' ');

  for (const word of words) {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

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