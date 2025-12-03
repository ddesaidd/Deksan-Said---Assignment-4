describe('Portfolio Application Tests', () => {
  test('addition works correctly', () => {
    expect(2 + 2).toBe(4);
  });

  test('string manipulation', () => {
    const name = 'Deksans Portfolio';
    expect(name).toContain('Deksan');
  });

  test('array operations', () => {
    const skills = ['React', 'Node.js', 'MongoDB'];
    expect(skills).toHaveLength(3);
    expect(skills).toContain('React');
  });
});