
const mongoose = require('mongoose');
const Element = require('./Element');

const pageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: mongoose.Types.ObjectId,
        ref: 'Website'
    },
    element: [],
    createdAt: {
        type: Number,
        default: Date.now()
    }
});

const createElement = async function(pageId, element) {
  console.log(pageId, element)
    let elementDoc = await Element.create({type: element.type, element: element.element});
    let pageDoc = await Page.findByIdAndUpdate(
        pageId,
        {
          $push: {
            element: {
              _id: elementDoc._id,
              type: elementDoc.type,
              element: elementDoc.element
            }
          }
        },
        { new: true, useFindAndModify: false }
    );
    return elementDoc;
};

const editElement = async function(pageId, element) {
    let elementDoc = await Element.findByIdAndUpdate(element._id, element);
    let pageDoc = await Page.findByIdAndUpdate(pageId);

    pageDoc.element = pageDoc.element.map((elem) => {
      if(element._id == elem._id) {
        return {...elem, ...element};
      }
      return elem;
    });
    pageDoc.save();
    return {...elementDoc, ...element};
};

const deleteElement = async function(pageId, elementId) {
  await Element.findByIdAndDelete(elementId);
  let pageDoc = await Page.findById(pageId);

  pageDoc.element = pageDoc.element.filter((elem) => {
    return elementId != elem._id;
  });
  pageDoc.save();
};

const Page = mongoose.model('Page', pageSchema);


module.exports = Page;
module.exports.createElement = createElement;
module.exports.editElement = editElement;
module.exports.deleteElement = deleteElement;
