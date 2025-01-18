function extractCoordinates(line) {
  const coordRegex = /\d+,\s*item Y:\s*\d+/g;
  const match = line.match(coordRegex);

  if (match) {
    return match[0];
  }

  return null;
}

module.exports = extractCoordinates;
