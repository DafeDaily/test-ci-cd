//1st Constraint
  it('should throw an error if userId is not a string', () => {
    expect(() => userStatistics.recordPageView(123, 'home')).toThrow('userId must be a string');
  });

  it('should throw an error if page is not a string', () => {
    expect(() => userStatistics.recordPageView('user1', 456)).toThrow('page must be a string');
  });

  it('should throw an error if userId is not provided', () => {
    expect(() => userStatistics.recordPageView(undefined, 'home')).toThrow('userId is required');
  });

  it('should throw an error if page is not provided', () => {
    expect(() => userStatistics.recordPageView('user1', undefined)).toThrow('page is required');
  });

  //2nd Constraint
  it('should handle decimal page views correctly', () => {
    userStatistics.recordPageView('user1', 'home', 0.5);
    userStatistics.recordPageView('user1', 'home', 0.5);

    expect(userStatistics.getTotalPageViews('user1')).toBe(1);
  });

  //3rd Constraint Performance

  it('should handle large volumes of data', () => {
    jest.setTimeout(10000); // Increase timeout to 10 seconds

    const numUsers = 1000;
    const numPages = 10;

    for (let i = 0; i < numUsers; i++) {
      for (let j = 0; j < numPages; j++) {
        userStatistics.recordPageView(`user${i}`, `page${j}`);
      }
    }

    expect(userStatistics.getTotalPageViews('user0')).toBe(numPages);
  });
  // 4th Constraint
  it('should handle multiple users interacting simultaneously', () => {
    jest.setTimeout(10000); // Increase timeout to 10 seconds

    const numPages = 10;

    const promises = users.map(user => {
      const pageViews = Array.from({ length: numPages }, (_, i) => `page${i}`);
      return Promise.all(pageViews.map(page => userStatistics.recordPageView(user, page)));
    });

    return Promise.all(promises).then(() => {
      users.forEach(user => {
        expect(userStatistics.getTotalPageViews(user)).toBe(numPages);
      });
    });
  });