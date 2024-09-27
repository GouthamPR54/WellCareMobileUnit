const ContactForm = require('../model/Contact');

exports.submitForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newForm = new ContactForm({
      name,
      email,
      phone,
      message,
    });

    await newForm.save();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit the form. Please try again.' });
  }
};

// Fetch all submissions
exports.getSubmissions = async (req, res) => {
    try {
      const submissions = await ContactForm.find(); // Use ContactForm here
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch submissions', error });
    }
  };
  