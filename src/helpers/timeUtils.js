function calculateTimeRemaining(dueDateStr) {
    const now = new Date();
    const dueDateParts = dueDateStr.split(' ');
    const datePart = dueDateParts[0];
    const timePart = dueDateParts[1];
  
    const [day, month, year] = datePart.split('-').map(part => parseInt(part));
    const [hoursDue, minutesDue] = timePart.split(':').map(part => parseInt(part));
  
    const due = new Date(year, month - 1, day, hoursDue, minutesDue); // Months are zero-indexed in JavaScript Date objects
  
    if (now > due) {
      return "due date gone";
    }
  
    // Calculate the difference in milliseconds
    const diffMs = due - now;
  
    // Convert milliseconds to days, hours, and minutes
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    // Construct the time remaining string
    let timeRemaining = "";
    if (days > 0) {
      timeRemaining += `${days}d `;
    }
    if (hours > 0) {
      timeRemaining += `${hours}h `;
    }
    if (minutes > 0) {
      timeRemaining += `${minutes}m left`;
    }
    return timeRemaining.trim();
  }
  
  module.exports = { calculateTimeRemaining };
  