// Function to generate a random color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = .15; // alpha between 0 and 1, up to 2 decimal places
  return { r, g, b, a };
}


// Select all article elements with class 'thumb' and the container
const articles = document.querySelectorAll('.thumb');
const container = document.getElementById('main');
let currentTimeout;

// Listen for hover events on each article
articles.forEach((article) => {
  // Select the <a> element inside the article
  const imgLink = article.querySelector('a');

  imgLink.addEventListener('mouseover', function() {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    // Add a mask class to all other <a> elements
    articles.forEach((otherArticle) => {
      const otherImgLink = otherArticle.querySelector('a');
      if (otherImgLink !== imgLink) {
        const { r, g, b, a } = getRandomColor();
        // otherImgLink.style.transition = 'background-color 0s !important'; // Remove the transition
        // void otherImgLink.offsetWidth;
        otherImgLink.style.transition = 'filter .8s ease-in, background-color .8s ease-in';
        otherImgLink.style.setProperty('--mask-r', r);
        otherImgLink.style.setProperty('--mask-g', g);
        otherImgLink.style.setProperty('--mask-b', b);
        otherImgLink.style.setProperty('--mask-a', a);
        otherImgLink.style.filter = 'blur(5px)';
      } else {
        imgLink.style.transition = 'filter 0s ease-in, background-color 0s'; // Remove the transition

        imgLink.style.setProperty('--mask-r', 0);
        imgLink.style.setProperty('--mask-g', 0);
        imgLink.style.setProperty('--mask-b', 0);
        imgLink.style.setProperty('--mask-a', 0);
        imgLink.style.filter = 'blur(0px)';

        imgLink.style.transition = 'filter .1s ease-in, background-color 0s';

      }
    });


    // setTimeout(() => {
    //   articles.forEach((otherArticle) => {
    //     const otherImgLink = otherArticle.querySelector('a');
    //     if (otherImgLink !== imgLink) {
    //       otherImgLink.style.transition = 'filter 7s ease-out';
    //       otherImgLink.style.filter = 'blur(0px)';
    //     }
    //   });
    // }, 100);



    currentTimeout = setTimeout(() => {
      articles.forEach((otherArticle) => {
        const otherImgLink = otherArticle.querySelector('a');
        otherImgLink.style.transition = 'filter 5s ease-in, background-color 6s ease-out';
        // otherImgLink.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        // console.log("pre",currentBgColor);


        // otherImgLink.style.backgroundColor = currentBgColor;
        // console.log("post",otherImgLink.style.backgroundColor);


        otherImgLink.style.setProperty('--mask-r', 0);
        otherImgLink.style.setProperty('--mask-g', 0);
        otherImgLink.style.setProperty('--mask-b', 0);
        otherImgLink.style.setProperty('--mask-a', 0);
        otherImgLink.style.filter = 'blur(0px)';

      });
      // console.log(articles[0].style.transition);
    }, 3000);  // you can adjust time
  });
});


// // Select all article elements with class 'thumb' and the container
// const articles = document.querySelectorAll('.thumb');
// const container = document.getElementById('main');
//
// // Listen for hover events on each article
// articles.forEach((article) => {
//   // Select the <a> element inside the article
//   const imgLink = article.querySelector('a');
//
//   imgLink.addEventListener('mouseover', function() {
//     // Add a mask class to all other <a> elements
//     articles.forEach((otherArticle) => {
//       const otherImgLink = otherArticle.querySelector('a');
//       if (otherImgLink !== imgLink) {
//         otherImgLink.classList.add('mask');
//       }
//     });
//
//     // Remove the mask class after a certain time (1s here)
//     setTimeout(() => {
//       articles.forEach((otherArticle) => {
//         const otherImgLink = otherArticle.querySelector('a');
//         otherImgLink.classList.remove('mask');
//       });
//     }, 2500); // you can adjust time
//   });
// });
