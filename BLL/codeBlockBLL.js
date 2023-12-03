const CodeBlock = require('../models/codeblockModel');



const getAllCodeBloks = () => {
  return CodeBlock.find();
};

const getCodeBlockById = (CodeBlockId) => {
  return CodeBlock.findById(CodeBlockId);
};

const setMentorId = (id, userId) => {
  return CodeBlock.findByIdAndUpdate(id, { mentorId: userId })
}

module.exports = { getAllCodeBloks, getCodeBlockById, setMentorId }