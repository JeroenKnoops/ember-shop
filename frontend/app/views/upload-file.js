// See also:
// http://jsfiddle.net/marciojunior/LxEsF/
// http://emberjs.jsbin.com/qiyodojo/10/edit
//
// Not read or tested:
// http://laika.io/2014/01/27/uploading-base64-images-with-carrierwave.html
// http://www.jqueryrain.com/demo/jquery-crop-image-plugin/
//
// Generate base64 from URL (?):
// http://stackoverflow.com/questions/1547008/how-to-encode-media-in-base64-given-url-in-ruby
import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  type: 'file',
  attributeBindings: ['name'],
  change: function (e) {
    var reader = new FileReader(),
    that = this;
    reader.onload = function (e) {
      var fileToUpload = e.srcElement.result;
      Ember.run(function() {
        that.set('file', fileToUpload);
      });
    };
    return reader.readAsDataURL(e.target.files[0]);
  }
});
