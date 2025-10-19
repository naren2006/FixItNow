// Simple classification without OpenAI dependency
// This will work even without OpenAI package installed

/**
 * Classify complaint description into appropriate department
 * @param {string} description - The complaint description
 * @returns {Promise<string>} - The classified department
 */
async function classifyComplaint(description) {
  console.log('🔍 Classifying complaint using keyword matching...');
  
  const desc = description.toLowerCase();
  
  // Simple keyword-based classification
  if (desc.includes('water') || desc.includes('pipe') || desc.includes('leak') || 
      desc.includes('toilet') || desc.includes('drain') || desc.includes('faucet') ||
      desc.includes('shower') || desc.includes('bathroom') || desc.includes('sink')) {
    console.log('✅ Classified as: plumber');
    return 'plumber';
  }
  
  if (desc.includes('computer') || desc.includes('internet') || desc.includes('wifi') ||
      desc.includes('software') || desc.includes('laptop') || desc.includes('printer') ||
      desc.includes('network') || desc.includes('email') || desc.includes('system')) {
    console.log('✅ Classified as: IT support');
    return 'IT support';
  }
  
  if (desc.includes('door') || desc.includes('window') || desc.includes('furniture') ||
      desc.includes('wood') || desc.includes('cabinet') || desc.includes('shelf') ||
      desc.includes('table') || desc.includes('chair') || desc.includes('desk')) {
    console.log('✅ Classified as: carpenter');
    return 'carpenter';
  }
  
  if (desc.includes('clean') || desc.includes('dirty') || desc.includes('mess') ||
      desc.includes('trash') || desc.includes('garbage') || desc.includes('maintenance')) {
    console.log('✅ Classified as: cleaner');
    return 'cleaner';
  }
  
  // Default to electrician for electrical issues
  console.log('✅ Classified as: electrician (default)');
  return 'electrician';
}

module.exports = { classifyComplaint };
