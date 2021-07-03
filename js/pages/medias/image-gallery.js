$(function () {
 
  // $('#aniimated-thumbnials').lightGallery({
  //     thumbnail: true,
  //     selector: 'a',
  // });

    $('#a_imageview').each(function (i, v) {

    
      $(v).lightGallery({
        thumbnail: false
      });
    });
});