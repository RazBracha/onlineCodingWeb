const CodeBlock = require('../models/codeblockModel');



const getAllCodeBlocks = () => {
  return CodeBlock.find();
};

const getCodeBlockById = (CodeBlockId) => {
  return CodeBlock.findById(CodeBlockId);
};

const setMentorId = (id, userId) => {
  return CodeBlock.findByIdAndUpdate(id, { mentorId: userId })
}

module.exports = { getAllCodeBlocks, getCodeBlockById, setMentorId }