const formSubmissions = []; 

exports.submitForm = (req, res) => {
  const { name, email, phone, message } = req.body;

  // Simple validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newSubmission = {
    id: formSubmissions.length + 1,
    name,
    email,
    phone,
    message,
    submittedAt: new Date()
  };

  formSubmissions.push(newSubmission);

  res.status(200).json({ message: 'Form submitted successfully!', data: newSubmission });
};
