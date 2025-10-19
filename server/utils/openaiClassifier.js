// Only require OpenAI if API key is available
let OpenAI = null;
let openai = null;

if (process.env.OPENAI_API_KEY) {
  try {
    OpenAI = require('openai');
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } catch (error) {
    console.log('⚠️ OpenAI package not available or API key invalid');
  }
}

/**
 * Classify complaint description into appropriate department
 * @param {string} description - The complaint description
 * @returns {Promise<string>} - The classified department
 */
async function classifyComplaint(description) {
  // Return default if OpenAI is not configured
  if (!openai) {
    console.log('⚠️ OpenAI not configured - using default department');
    return 'electrician';
  }
  
  try {
    const prompt = `
Classify the following complaint description into one of these departments:
- electrician (for electrical issues like lights, fans, power, wiring)
- plumber (for water, pipes, leaks, drainage, toilets)
- carpenter (for furniture, doors, windows, woodwork)
- cleaner (for cleaning, maintenance, general upkeep)
- IT support (for computers, internet, software, technical issues)

Complaint: "${description}"

Respond with only the department name (e.g., "electrician", "plumber", etc.):
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that classifies maintenance complaints into appropriate departments. Always respond with just the department name."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 10,
      temperature: 0.1
    });

    const classification = response.choices[0].message.content.trim().toLowerCase();
    
    // Validate the classification
    const validDepartments = ['electrician', 'plumber', 'carpenter', 'cleaner', 'IT support'];
    
    if (validDepartments.includes(classification)) {
      return classification;
    } else {
      // Fallback to electrician if classification is not valid
      return 'electrician';
    }
  } catch (error) {
    console.error('OpenAI classification error:', error);
    // Fallback to electrician if OpenAI fails
    return 'electrician';
  }
}

module.exports = { classifyComplaint };
