const Slot = require('../model/Slot');

const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const saveOrUpdateSlot = async (req, res) => {
  const { slots } = req.body;
  try {
    for (const [date, slotsArray] of Object.entries(slots)) {
      let slot = await Slot.findOne({ date });
      if (slot) {
        slot.slots = slotsArray;
      } else {
        slot = new Slot({ date, slots: slotsArray });
      }
      await slot.save();
    }
    res.status(200).json({ message: 'Slots saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllSlots,
  saveOrUpdateSlot
};