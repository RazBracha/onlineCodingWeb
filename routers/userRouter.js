const express = require('express');
const userBLL = require('../BLL/userBLL');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await userBLL.getIsMentor();
    res.send(user);
    console.log(user)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { value } = req.body;
    console.log("value", req.body.value);
    const user = await userBLL.setIsMentor(req.body.value);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
