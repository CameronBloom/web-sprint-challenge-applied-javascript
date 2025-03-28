import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.addEventListener("click", console.log(`${article.headline}`));

  const newHeadline = document.createElement("div");
  newHeadline.classList.add("headline");
  newHeadline.textContent = article.headline;

  const newAuthor = document.createElement("div");
  newAuthor.classList.add("author");

  const newImageContainer = document.createElement("div");
  newImageContainer.classList.add("img-container");

  const newImage = document.createElement("img");
  newImage.src = article.authorPhoto;

  const newSpan = document.createElement("span");
  newSpan.textContent = `By ${article.authorName}`;

  newCard.appendChild(newHeadline);
  newCard.appendChild(newAuthor);
  newAuthor.appendChild(newImageContainer);
  newAuthor.appendChild(newSpan);
  newImageContainer.appendChild(newImage);

  return newCard;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const parentElement = document.querySelector(selector);
  axios.get("http://localhost:5001/api/articles")
    .then(response => {
      return response.data.articles; // => category array => article array
    })
    .then(response => {
      // console.log(response);
      for (const subject in response) {
        // console.log(`Subject: ${subject}`);
        // console.log(response[subject]);
        response[subject].forEach((article) => {
          // console.log(article)
          const articleCard = Card(article);
          parentElement.appendChild(articleCard);
        });
      }

      // articlesBySubject.forEach(subject => {
      //   subject.forEach(article => {
      //     console.log(article);
      //   })
      // })
    })
}

export { Card, cardAppender }
