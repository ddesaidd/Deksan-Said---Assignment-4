return (
  <Router>
    {/* ADD THIS BANNER */}
    <div style={{
      backgroundColor: '#FF5722',
      color: 'white',
      padding: '25px',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      border: '5px solid black',
      margin: '10px'
    }}>
      ✅ UPDATED: December 2, 2025 - CI/CD Working - Assignment 4 - Deksan
    </div>
    {/* END BANNER */}
    
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  </Router>
);