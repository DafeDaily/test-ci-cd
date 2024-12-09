class UserStatistics {
    constructor() {
      this.pageViews = {}; // Object to hold page view counts per user
    }
  
    // Method to record a page view for a specific user and page
    recordPageView(userId, page, views = 1) {
      // Check if userId is provided and is a string
      if (userId === undefined) {
        throw new Error('userId is required');
      }
      if (typeof userId !== 'string') {
        throw new Error('userId must be a string');
      }
  
      // Check if page is provided and is a string, and ensure it's not an empty string
      if (page === undefined) {
        throw new Error('page is required');
      }
      if (typeof page !== 'string') {
        throw new Error('page must be a string');
      }
      if (page === '') {
        throw new Error('page cannot be an empty string');
      }
  
      // Initialize the user object if it doesn't exist yet
      if (!this.pageViews[userId]) {
        this.pageViews[userId] = {};
      }
  
      // Initialize the page view count for the specific page if it doesn't exist
      if (!this.pageViews[userId][page]) {
        this.pageViews[userId][page] = 0;
      }
  
      // Add the views (allowing fractional values)
      this.pageViews[userId][page] += views;
    }
  
    // Method to get the page views for a specific user
    getPageViews(userId) {
      // Return the page views for the given user, or an empty object if the user doesn't exist
      return this.pageViews[userId] || {};
    }
  
    // Method to get the total page views for a specific user
    getTotalPageViews(userId) {
      // Get the page views for the user
      const pageViews = this.getPageViews(userId);
  
      // Return the total sum of views for the user, or 0 if no data is available
      return Object.values(pageViews).reduce((total, count) => total + count, 0);
    }
  }
  
  module.exports = UserStatistics;
  