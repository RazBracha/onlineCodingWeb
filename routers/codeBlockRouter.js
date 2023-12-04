const express = require('express');
const codeBlockBLL = require('../BLL/codeBlockBLL');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const codeBlock = await codeBlockBLL.getAllCodeBloks();
    res.send(codeBlock);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const codeBlock = await codeBlockBLL.getCodeBlockById(id);
    res.send(codeBlock);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/locationChanged', async (req, res) => {
  req.setHeader("Access-Control-Allow-Origin", "https://example.com");
  req.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  req.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    console.log("locationChanged", req.body)
    const { userId, pageId } = req.body

    if (pageId) {
      const codeBlock = await codeBlockBLL.getCodeBlockById(pageId);
      if (!codeBlock.mentorId) {
        await codeBlockBLL.setMentorId(pageId, userId)
      }
    } else {
      const codeBlocks = await codeBlockBLL.getAllCodeBloks()
      const userMentorCodeBlock = codeBlocks.find(codeBlock => codeBlock.mentorId === userId)
      console.log("userMentorCodeBlock", userMentorCodeBlock)
      if (userMentorCodeBlock) {
        await codeBlockBLL.setMentorId(userMentorCodeBlock.id, '')
      }

    }
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = router;
